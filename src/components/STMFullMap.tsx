import { useState, useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import {
  Search, Clock, MapPin, AlertCircle, Radio,
  RefreshCw, X, ChevronDown, ChevronUp,
} from 'lucide-react'
import {
  getRoutes, getShape, getStops, getSchedule,
  type GTFSRoute, type GTFSStop, type GTFSSchedule,
} from '../services/gtfsData'
import { getLiveBuses, type LiveBus } from '../services/stmApi'

/* ── Map helpers ───────────────────────────────────────────── */
function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length < 2) return
    const lats = positions.map(([lat]) => lat)
    const lngs = positions.map(([, lng]) => lng)
    const bounds: LatLngBoundsExpression = [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ]
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map, positions])
  return null
}

/* ── Constants ─────────────────────────────────────────────── */
const MVD_CENTER: [number, number] = [-34.9011, -56.1645]
const REFRESH_MS = 30_000
type DayType = 'weekday' | 'saturday' | 'sunday'

/* ══════════════════════════════════════════════════════════════
   Component
══════════════════════════════════════════════════════════════ */
export default function STMFullMap() {
  /* ── Data state ── */
  const [routes, setRoutes]       = useState<GTFSRoute[]>([])
  const [gtfsReady, setGtfsReady] = useState<boolean | null>(null)  // null = loading

  /* ── Selection state ── */
  const [selectedRoute, setSelectedRoute] = useState<GTFSRoute | null>(null)
  const [activeDir, setActiveDir]         = useState<'0' | '1'>('0')

  /* ── UI state ── */
  const [search, setSearch]         = useState('')
  const [isListOpen, setIsListOpen] = useState(false)
  const [showStops, setShowStops]   = useState(true)

  /* ── Route data ── */
  const [shape, setShape]       = useState<[number, number][]>([])
  const [stops, setStops]       = useState<GTFSStop[]>([])
  const [schedule, setSchedule] = useState<GTFSSchedule | null>(null)
  const [dayType, setDayType]   = useState<DayType>('weekday')
  const [loadingRoute, setLoadingRoute] = useState(false)

  /* ── Live buses ── */
  const [liveBuses, setLiveBuses] = useState<LiveBus[]>([])
  const [liveStatus, setLiveStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const wrapperRef  = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* ── Load routes on mount ── */
  useEffect(() => {
    getRoutes()
      .then(data => { setRoutes(data); setGtfsReady(data.length > 0) })
      .catch(() => setGtfsReady(false))
  }, [])

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsListOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ── Load shape + stops + schedule when route/dir changes ── */
  useEffect(() => {
    if (!selectedRoute) return
    setLoadingRoute(true)
    setShape([])
    setStops([])

    const shapeId = selectedRoute.shapeIds?.[activeDir] ?? selectedRoute.shapeIds?.['0']
    Promise.all([
      shapeId ? getShape(shapeId) : Promise.resolve<[number, number][]>([]),
      getStops(selectedRoute.id),
      getSchedule(selectedRoute.id),
    ]).then(([newShape, allStops, sched]) => {
      setShape(newShape)
      setStops(allStops[activeDir] ?? allStops['0'] ?? [])
      setSchedule(sched)
      setLoadingRoute(false)
    }).catch(() => setLoadingRoute(false))
  }, [selectedRoute, activeDir])

  /* ── Live bus polling ── */
  async function fetchLive(route: GTFSRoute) {
    setLiveStatus('loading')
    try {
      const buses = await getLiveBuses(route.number)
      setLiveBuses(buses)
      setLastUpdate(new Date())
      setLiveStatus('ok')
    } catch {
      setLiveStatus('error')
      setLiveBuses([])
    }
  }

  useEffect(() => {
    if (!selectedRoute) return
    setLiveBuses([])
    setLiveStatus('idle')
    fetchLive(selectedRoute)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => fetchLive(selectedRoute), REFRESH_MS)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [selectedRoute])

  /* ── Helpers ── */
  function selectRoute(route: GTFSRoute) {
    setSelectedRoute(route)
    setActiveDir('0')
    setIsListOpen(false)
    setSearch(route.number + ' – ' + route.name)
  }

  function clearRoute() {
    setSelectedRoute(null)
    setSearch('')
    setShape([])
    setStops([])
    setLiveBuses([])
    setLiveStatus('idle')
  }

  const hasDir1 = !!selectedRoute?.shapeIds?.['1']

  const filteredRoutes = useMemo(() => {
    const q = search.trim().toLowerCase()
    // Don't filter when the search reflects the selected route label
    const isSelectedLabel = selectedRoute &&
      search === selectedRoute.number + ' – ' + selectedRoute.name
    if (!q || isSelectedLabel) return routes.slice(0, 120)
    return routes.filter(r =>
      r.number.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.agency.toLowerCase().includes(q),
    ).slice(0, 60)
  }, [routes, search, selectedRoute])

  const schedDay = schedule?.[dayType]
  const routeColor = selectedRoute?.color ?? '#0284c7'

  /* ══════════════════════════════════════════════════════════
     Render
  ══════════════════════════════════════════════════════════ */
  return (
    <div className="flex flex-col gap-4">

      {/* ── Search / line selector ─────────────────────────── */}
      <div className="relative" ref={wrapperRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setIsListOpen(true) }}
            onFocus={() => setIsListOpen(true)}
            placeholder={
              gtfsReady === null
                ? 'Cargando líneas…'
                : gtfsReady
                  ? `Buscá número o nombre de línea (${routes.length} disponibles)`
                  : 'GTFS no procesado — ejecutá npm run gtfs'
            }
            disabled={gtfsReady === false}
            className="w-full pl-9 pr-10 py-3 border-2 border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-uy-blue bg-white transition-colors disabled:opacity-50"
          />
          {search ? (
            <button
              onClick={clearRoute}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          )}
        </div>

        {/* Dropdown list */}
        {isListOpen && filteredRoutes.length > 0 && (
          <div className="absolute z-[1000] mt-1 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
            {!search.trim() && (
              <p className="text-xs text-slate-400 px-4 pt-2.5 pb-1">
                Mostrando las primeras {Math.min(routes.length, 120)} líneas — buscá para filtrar
              </p>
            )}
            <div className="max-h-72 overflow-y-auto py-1">
              {filteredRoutes.map(route => (
                <button
                  key={route.id}
                  onClick={() => selectRoute(route)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50 ${
                    selectedRoute?.id === route.id ? 'bg-slate-50' : ''
                  }`}
                >
                  <span
                    className="w-10 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700 truncate">{route.name}</p>
                    {route.agency && (
                      <p className="text-xs text-slate-400 truncate">{route.agency}</p>
                    )}
                  </div>
                  {selectedRoute?.id === route.id && (
                    <span className="text-xs font-bold shrink-0" style={{ color: route.color }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Selected route header ──────────────────────────── */}
      {selectedRoute && (
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="px-3 py-1 rounded-xl text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: routeColor }}
            >
              {selectedRoute.number}
            </span>
            <span className="text-slate-700 font-medium text-sm truncate">{selectedRoute.name}</span>
            {loadingRoute && <RefreshCw className="w-4 h-4 text-slate-400 animate-spin shrink-0" />}
          </div>

          {/* Direction toggle */}
          {hasDir1 && (
            <div className="flex rounded-xl overflow-hidden border border-slate-200 text-xs font-medium shrink-0">
              {(['0', '1'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDir(d)}
                  className={`px-4 py-1.5 transition-colors ${
                    activeDir === d ? 'text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                  style={activeDir === d ? { backgroundColor: routeColor } : {}}
                >
                  {d === '0' ? 'Ida' : 'Vuelta'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Live status bar ────────────────────────────────── */}
      {selectedRoute && (
        <div className="flex items-center gap-2 text-xs h-6">
          {liveStatus === 'loading' && (
            <span className="flex items-center gap-1 text-slate-400">
              <RefreshCw className="w-3 h-3 animate-spin" /> Actualizando posiciones…
            </span>
          )}
          {liveStatus === 'ok' && liveBuses.length > 0 && (
            <span className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
              <Radio className="w-3 h-3" />
              {liveBuses.length} bus{liveBuses.length !== 1 ? 'es' : ''} en ruta
              {lastUpdate && (
                <span className="text-green-500 ml-1">
                  · {lastUpdate.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </span>
          )}
          {liveStatus === 'ok' && liveBuses.length === 0 && (
            <span className="text-slate-400">Sin buses activos ahora mismo</span>
          )}
          {liveStatus === 'error' && (
            <span className="flex items-center gap-1 text-amber-600">
              <AlertCircle className="w-3 h-3" /> Sin datos en tiempo real
            </span>
          )}
        </div>
      )}

      {/* ── Map ───────────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
        style={{ height: 460 }}
      >
        <MapContainer
          center={MVD_CENTER}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Route polyline from GTFS shape */}
          {shape.length > 1 && (
            <>
              <FitBounds positions={shape} />
              <Polyline positions={shape} color={routeColor} weight={5} opacity={0.9} />
            </>
          )}

          {/* Stop markers */}
          {stops.map((stop, i) => {
            const isTerminal = i === 0 || i === stops.length - 1
            return (
              <CircleMarker
                key={stop.id ?? i}
                center={[stop.lat, stop.lng]}
                radius={isTerminal ? 9 : 5}
                color={routeColor}
                fillColor="white"
                fillOpacity={1}
                weight={isTerminal ? 3 : 2}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{stop.name}</p>
                    <p className="text-slate-500 text-xs">
                      {isTerminal ? (i === 0 ? 'Terminal origen' : 'Terminal destino') : `Parada ${i + 1}`}
                    </p>
                    {stop.code && stop.code !== stop.id && (
                      <p className="text-slate-400 text-xs">Código: {stop.code}</p>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}

          {/* Live bus markers */}
          {liveBuses.map((bus, i) => (
            <CircleMarker
              key={bus.busId ?? i}
              center={[bus.lat, bus.lng]}
              radius={9}
              color="white"
              fillColor={routeColor}
              fillOpacity={0.95}
              weight={2.5}
            >
              <Popup>
                <div className="text-sm space-y-0.5">
                  <p className="font-semibold text-green-700">🚌 Bus en ruta</p>
                  <p className="text-slate-500 text-xs">Línea {bus.line ?? selectedRoute?.number}</p>
                  {bus.origin && <p className="text-slate-500 text-xs">Desde: {bus.origin}</p>}
                  {bus.destination && <p className="text-slate-500 text-xs">Hacia: {bus.destination}</p>}
                  {bus.subline && <p className="text-slate-500 text-xs">Ramal: {bus.subline}</p>}
                  {bus.speed !== undefined && (
                    <p className="text-slate-500 text-xs">Velocidad: {bus.speed} km/h</p>
                  )}
                  {lastUpdate && (
                    <p className="text-slate-400 text-xs mt-1">
                      Actualizado: {lastUpdate.toLocaleTimeString('es-UY', {
                        hour: '2-digit', minute: '2-digit', second: '2-digit',
                      })}
                    </p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* ── Info panels ────────────────────────────────────── */}
      {selectedRoute && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Stops panel */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <button
              className="w-full flex items-center justify-between mb-3"
              onClick={() => setShowStops(v => !v)}
            >
              <h4 className="font-bold text-uy-blue flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Paradas
                <span className="text-xs font-normal text-slate-400">({stops.length})</span>
              </h4>
              {showStops
                ? <ChevronUp className="w-4 h-4 text-slate-400" />
                : <ChevronDown className="w-4 h-4 text-slate-400" />
              }
            </button>

            {showStops && (
              stops.length === 0
                ? <p className="text-slate-400 text-sm">{loadingRoute ? 'Cargando paradas…' : 'Sin datos de paradas'}</p>
                : (
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {stops.map((stop, i) => (
                      <div key={stop.id ?? i} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div
                          className="w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold shrink-0"
                          style={{ backgroundColor: routeColor }}
                        >
                          {i + 1}
                        </div>
                        <span className="truncate">{stop.name}</span>
                      </div>
                    ))}
                  </div>
                )
            )}
          </div>

          {/* Schedule panel */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-uy-blue flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horarios
              </h4>
              <div className="flex gap-1">
                {(['weekday', 'saturday', 'sunday'] as DayType[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setDayType(d)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                      dayType === d ? 'text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                    style={dayType === d ? { backgroundColor: routeColor } : {}}
                  >
                    {d === 'weekday' ? 'L–V' : d === 'saturday' ? 'Sáb' : 'Dom'}
                  </button>
                ))}
              </div>
            </div>

            {schedule === null ? (
              <p className="text-slate-400 text-sm">{loadingRoute ? 'Cargando horarios…' : 'Sin datos de horario'}</p>
            ) : !schedDay?.first ? (
              <p className="text-slate-400 text-sm">Sin servicio este día</p>
            ) : (
              <>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Primer servicio</span>
                    <span className="font-mono font-semibold text-slate-700">{schedDay.first}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Último servicio</span>
                    <span className="font-mono font-semibold text-slate-700">{schedDay.last}</span>
                  </div>
                  {schedDay.freq && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Frecuencia</span>
                      <span className="font-medium text-slate-700 text-right text-xs max-w-36">{schedDay.freq}</span>
                    </div>
                  )}
                </div>
                {schedDay.times.length > 0 && (
                  <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
                    {schedDay.times.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-lg font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── GTFS not available warning ─────────────────────── */}
      {gtfsReady === false && (
        <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-xl p-3 border border-amber-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            Los datos de rutas GTFS no están disponibles todavía.
            Ejecutá <code className="bg-amber-100 px-1 rounded font-mono">npm run gtfs</code> para
            procesar el archivo <code className="bg-amber-100 px-1 rounded font-mono">google_transit.zip</code> y
            activar todas las líneas, trazados y horarios.
          </span>
        </div>
      )}

      {/* ── Disclaimer ─────────────────────────────────────── */}
      {selectedRoute && (
        <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            Trazado y paradas desde el GTFS oficial STM Montevideo.
            Posiciones en tiempo real actualizadas cada 30 segundos desde la API STM.
            Horarios orientativos — consultá la app STM para info en tiempo real de paradas.
          </span>
        </div>
      )}
    </div>
  )
}
