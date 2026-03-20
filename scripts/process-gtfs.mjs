#!/usr/bin/env node
/**
 * Descarga y procesa datos de transporte de Montevideo (Intendencia / datos-abiertos).
 * Fuentes:
 *   Recorridos: http://intgis.montevideo.gub.uy/sit/tmp/v_uptu_lsv.zip      (Shapefile)
 *   Paradas:    http://intgis.montevideo.gub.uy/sit/tmp/v_uptu_paradas.zip   (Shapefile)
 *   Horarios:   https://datos-abiertos.montevideo.gub.uy/uptu_pasada_variante.zip (CSV)
 *
 * Salida: public/data/gtfs/
 *   routes.json
 *   shapes/{lineNum}_{cod_variante}.json
 *   stops/{cod_linea}.json
 *   schedules/{cod_linea}.json
 *
 * Uso: node scripts/process-gtfs.mjs
 */

import { createRequire } from 'module'
import fs   from 'fs'
import path from 'path'
import os   from 'os'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT   = path.join(__dirname, '..')
const OUTPUT = path.join(ROOT, 'public', 'data', 'gtfs')

/* ── Dependencias ── */
let AdmZip, shapefileLib, proj4Lib
try { AdmZip = require('adm-zip') }
catch { console.warn('⚠  adm-zip no instalado — npm install adm-zip'); process.exit(0) }
try { shapefileLib = await import('shapefile') }
catch { console.warn('⚠  shapefile no instalado — npm install shapefile'); process.exit(0) }
try { proj4Lib = (await import('proj4')).default }
catch { console.warn('⚠  proj4 no instalado — npm install proj4'); process.exit(0) }

/* ── Reproyección UTM 21S → WGS84 ── */
proj4Lib.defs('EPSG:32721', '+proj=utm +zone=21 +south +datum=WGS84 +units=m +no_defs')
function toWGS84(e, n) {
  const [lng, lat] = proj4Lib('EPSG:32721', 'WGS84', [e, n])
  return { lat, lng }
}

/* ── Color determinístico por número de línea ── */
const PALETTE = [
  '#e11d48','#7c3aed','#0284c7','#059669',
  '#d97706','#dc2626','#2563eb','#16a34a',
  '#db2777','#0891b2','#65a30d','#ea580c',
  '#9333ea','#0d9488','#c2410c','#1d4ed8',
]
function colorFromLine(num) {
  let hash = 0
  for (const c of String(num)) hash = (hash * 31 + c.charCodeAt(0)) | 0
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

/* ── Helpers ── */
function ensureDir(d) { fs.mkdirSync(d, { recursive: true }) }

async function downloadZip(url, label) {
  console.log(`    ↓ ${label}…`)
  const r = await fetch(url)
  if (!r.ok) throw new Error(`HTTP ${r.status} descargando ${label}`)
  const buf = Buffer.from(await r.arrayBuffer())
  const tmp = path.join(os.tmpdir(), `mvd_${Date.now()}_${Math.random().toString(36).slice(2)}.zip`)
  fs.writeFileSync(tmp, buf)
  return tmp
}

async function readShapefile(zipFile, name) {
  const zip = new AdmZip(zipFile)
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shp_'))
  zip.extractAllTo(tmpDir, true)
  const src = await shapefileLib.open(
    path.join(tmpDir, name + '.shp'),
    path.join(tmpDir, name + '.dbf'),
    { encoding: 'utf-8' },
  )
  const features = []
  while (true) {
    const { value, done } = await src.read()
    if (done) break
    if (value) features.push(value)
  }
  return features
}

/* ── Formato de hora HHMM numérico → "HH:MM" ── */
function parseHora(h) {
  const s = String(h).padStart(4, '0')
  return s.slice(0, 2) + ':' + s.slice(2, 4)
}

/* ── Resumen de horarios ── */
function summarize(set) {
  if (!set || set.size === 0) return { times: [], first: '', last: '', freq: '' }
  const times = [...set].sort()
  const first = times[0]
  const last  = times[times.length - 1]
  let freq = ''
  if (times.length > 2) {
    const gaps = []
    for (let i = 1; i < Math.min(times.length, 10); i++) {
      const [h1, m1] = times[i - 1].split(':').map(Number)
      const [h2, m2] = times[i].split(':').map(Number)
      const diff = (h2 * 60 + m2) - (h1 * 60 + m1)
      if (diff > 0 && diff < 120) gaps.push(diff)
    }
    if (gaps.length > 0) {
      const avg = Math.round(gaps.reduce((a, b) => a + b) / gaps.length)
      freq = `Cada ${avg} min aprox.`
    }
  }
  return { times, first, last, freq }
}

/* ══════════════════════════════════════════════════════════════
   Main
══════════════════════════════════════════════════════════════ */
async function main() {
  console.log('🚌 Procesando datos de transporte de Montevideo…')

  ensureDir(OUTPUT)
  ensureDir(path.join(OUTPUT, 'shapes'))
  ensureDir(path.join(OUTPUT, 'stops'))
  ensureDir(path.join(OUTPUT, 'schedules'))

  /* ── 1. Trigger shapefile generation in IMM portal ── */
  console.log('  Preparando archivos en portal IMM…')
  await Promise.all([
    fetch('http://intgis.montevideo.gub.uy/sit/php/common/datos/generar_zip2.php?nom_tab=v_uptu_lsv&tipo=gis').catch(() => {}),
    fetch('http://intgis.montevideo.gub.uy/sit/php/common/datos/generar_zip2.php?nom_tab=v_uptu_paradas&tipo=gis').catch(() => {}),
  ])
  await new Promise(r => setTimeout(r, 3000))

  /* ── 2. Recorridos (route shapes) ── */
  console.log('  Procesando recorridos…')
  const routesZip    = await downloadZip('http://intgis.montevideo.gub.uy/sit/tmp/v_uptu_lsv.zip', 'recorridos')
  const routeFeats   = await readShapefile(routesZip, 'v_uptu_lsv')

  /* lineNum → { id, name, color, variants: [{cod, dir, coords}] } */
  const lineMap = {}

  for (const feat of routeFeats) {
    const p       = feat.properties
    const lineNum = p.DESC_LINEA?.trim()
    const lineCod = String(p.COD_LINEA)
    const name    = p.DESC_SUBLI?.trim() || ''
    const varCod  = String(p.COD_VARIAN)
    const varDir  = p.DESC_VARIA?.trim() === 'B' ? '1' : '0'
    const geom    = feat.geometry

    if (!lineNum || lineNum === '0' || !geom || geom.type !== 'LineString') continue

    if (!lineMap[lineNum]) {
      lineMap[lineNum] = { id: lineCod, number: lineNum, name, color: colorFromLine(lineNum), variants: [] }
    }

    // Only keep one variant per direction (first seen)
    const existing = lineMap[lineNum].variants.find(v => v.dir === varDir)
    if (existing) continue

    const coords = geom.coordinates.map(([e, n]) => {
      const { lat, lng } = toWGS84(e, n)
      return [lat, lng]
    })
    lineMap[lineNum].variants.push({ cod: varCod, dir: varDir, coords, name })
  }

  /* Build routes array + write shape files */
  const routes    = []
  const lineShapes = {}  // lineNum → { dir → shapeKey }

  for (const [lineNum, data] of Object.entries(lineMap)) {
    const shapeIds = {}
    for (const v of data.variants) {
      const key = `${lineNum}_${v.cod}`
      shapeIds[v.dir] = key
      fs.writeFileSync(path.join(OUTPUT, 'shapes', `${key}.json`), JSON.stringify(v.coords))
    }
    // Best display name: use variant 0 name, or variant 1, or lineNum
    const mainVariant = data.variants.find(v => v.dir === '0') ?? data.variants[0]
    routes.push({
      id:      data.id,
      number:  lineNum,
      name:    mainVariant?.name || lineNum,
      color:   data.color,
      type:    3,
      agency:  '',
      shapeIds,
    })
    lineShapes[lineNum] = shapeIds
  }

  routes.sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }))
  fs.writeFileSync(path.join(OUTPUT, 'routes.json'), JSON.stringify(routes))
  const totalShapes = Object.values(lineShapes).flatMap(s => Object.values(s)).length
  console.log(`  ✓ ${routes.length} líneas, ${totalShapes} shapes`)

  /* ── 3. Paradas (stops) ── */
  console.log('  Procesando paradas…')
  const stopsZip  = await downloadZip('http://intgis.montevideo.gub.uy/sit/tmp/v_uptu_paradas.zip', 'paradas')
  const stopFeats = await readShapefile(stopsZip, 'v_uptu_paradas')

  /* lineNum → variantCod → ordered stops */
  const stopsByLV = {}

  for (const feat of stopFeats) {
    const p       = feat.properties
    const lineNum = p.DESC_LINEA?.trim()
    const varCod  = String(p.COD_VARIAN)
    const stopId  = String(p.COD_UBIC_P)
    const ordinal = p.ORDINAL ?? 0
    const street  = p.CALLE?.trim()  || ''
    const corner  = p.ESQUINA?.trim() || ''
    const name    = street && corner ? `${street} esq. ${corner}` : street || corner || stopId

    if (!lineNum || lineNum === '0') continue

    const { lat, lng } = toWGS84(p.X, p.Y)

    if (!stopsByLV[lineNum])         stopsByLV[lineNum]         = {}
    if (!stopsByLV[lineNum][varCod]) stopsByLV[lineNum][varCod] = []
    stopsByLV[lineNum][varCod].push({ seq: ordinal, id: stopId, name, lat, lng, code: stopId })
  }

  /* Write stops/{cod_linea}.json for each route */
  for (const route of routes) {
    const lineNum    = route.number
    const variantData = stopsByLV[lineNum] || {}
    const byDir      = {}

    for (const [dir, shapeKey] of Object.entries(lineShapes[lineNum] || {})) {
      const varCod = shapeKey.split('_').slice(1).join('_')  // handles multi-underscore
      const stops  = (variantData[varCod] || []).slice().sort((a, b) => a.seq - b.seq)
      byDir[dir]   = stops
    }

    fs.writeFileSync(path.join(OUTPUT, 'stops', `${route.id}.json`), JSON.stringify(byDir))
  }
  console.log(`  ✓ Paradas guardadas para ${routes.length} líneas`)

  /* ── 4. Horarios ── */
  console.log('  Procesando horarios (archivo ~10 MB, puede tardar)…')
  const schedZip     = await downloadZip('https://datos-abiertos.montevideo.gub.uy/uptu_pasada_variante.zip', 'horarios')
  const schedAdmZip  = new AdmZip(schedZip)
  const schedText    = schedAdmZip.readAsText('uptu_pasada_variante.csv')
  const schedLines   = schedText.split('\n')

  /* tipo_dia: 1=lun-vie, 2=sábado, 3=domingo/festivo */
  /* col: tipo_dia;cod_variante;frecuencia;cod_ubic_parada;ordinal;hora;dia_anterior */

  // Build variantCod → lineNum lookup (from stops data, most comprehensive)
  const varToLine = {}
  for (const [lineNum, varMap] of Object.entries(stopsByLV)) {
    for (const varCod of Object.keys(varMap)) varToLine[varCod] = lineNum
  }
  // Also add from routes
  for (const route of routes) {
    for (const shapeKey of Object.values(lineShapes[route.number] || {})) {
      const varCod = shapeKey.split('_').slice(1).join('_')
      if (!varToLine[varCod]) varToLine[varCod] = route.number
    }
  }

  /* Collect departure times per lineNum per day type (first stop only: ordinal=1) */
  const lineSchedules = {}  // lineNum → { weekday: Set, saturday: Set, sunday: Set }

  for (let i = 1; i < schedLines.length; i++) {
    const line = schedLines[i].trim()
    if (!line) continue
    const parts = line.split(';')
    if (parts.length < 6) continue

    const tipoDia  = parts[0]
    const varCod   = parts[1]
    const ordinal  = parseInt(parts[4])
    const hora     = parts[5]

    if (ordinal !== 1) continue  // only first stop of each trip

    const lineNum = varToLine[varCod]
    if (!lineNum) continue

    const h = parseInt(hora)
    if (isNaN(h) || h >= 2400) continue

    const time = parseHora(h)
    if (!lineSchedules[lineNum]) {
      lineSchedules[lineNum] = { weekday: new Set(), saturday: new Set(), sunday: new Set() }
    }
    if (tipoDia === '1') lineSchedules[lineNum].weekday.add(time)
    else if (tipoDia === '2') lineSchedules[lineNum].saturday.add(time)
    else if (tipoDia === '3') lineSchedules[lineNum].sunday.add(time)
  }

  for (const route of routes) {
    const s = lineSchedules[route.number] || {}
    fs.writeFileSync(
      path.join(OUTPUT, 'schedules', `${route.id}.json`),
      JSON.stringify({
        weekday:  summarize(s.weekday),
        saturday: summarize(s.saturday),
        sunday:   summarize(s.sunday),
      }),
    )
  }
  console.log('  ✓ Horarios guardados')

  /* ── Done ── */
  console.log('\n✅ Procesamiento completado')
  console.log(`   Líneas:   ${routes.length}`)
  console.log(`   Shapes:   ${totalShapes}`)
  console.log(`   Salida:   ${OUTPUT}`)
}

main().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(0)  // No fallar el build de Vercel
})
