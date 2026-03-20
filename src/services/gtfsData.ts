/**
 * Servicio frontend para cargar datos GTFS pre-procesados.
 * Los archivos JSON son generados por scripts/process-gtfs.mjs y se sirven
 * como estáticos desde /data/gtfs/.
 */

export interface GTFSRoute {
  id:       string
  number:   string
  name:     string
  color:    string
  type:     number
  agency:   string
  shapeIds: Record<string, string>  // direction_id → shape_id
}

export interface GTFSStop {
  id:   string
  name: string
  lat:  number
  lng:  number
  code: string
  seq:  number
}

export interface GTFSScheduleDay {
  times: string[]
  first: string
  last:  string
  freq:  string
}

export interface GTFSSchedule {
  weekday:  GTFSScheduleDay
  saturday: GTFSScheduleDay
  sunday:   GTFSScheduleDay
}

const BASE = '/data/gtfs'

/* ── In-memory cache ─────────────────────────────────────── */
let routesCache: GTFSRoute[] | null = null
const shapeCache    = new Map<string, [number, number][]>()
const stopsCache    = new Map<string, Record<string, GTFSStop[]>>()
const scheduleCache = new Map<string, GTFSSchedule>()

export async function getRoutes(): Promise<GTFSRoute[]> {
  if (routesCache) return routesCache
  const res = await fetch(`${BASE}/routes.json`)
  if (!res.ok) throw new Error(`GTFS routes no disponibles (${res.status}) — ejecutá npm run gtfs`)
  routesCache = await res.json() as GTFSRoute[]
  return routesCache
}

export async function getShape(shapeId: string): Promise<[number, number][]> {
  if (shapeCache.has(shapeId)) return shapeCache.get(shapeId)!
  const res = await fetch(`${BASE}/shapes/${encodeURIComponent(shapeId)}.json`)
  if (!res.ok) return []
  const data = await res.json() as [number, number][]
  shapeCache.set(shapeId, data)
  return data
}

export async function getStops(routeId: string): Promise<Record<string, GTFSStop[]>> {
  if (stopsCache.has(routeId)) return stopsCache.get(routeId)!
  const res = await fetch(`${BASE}/stops/${encodeURIComponent(routeId)}.json`)
  if (!res.ok) return {}
  const data = await res.json() as Record<string, GTFSStop[]>
  stopsCache.set(routeId, data)
  return data
}

export async function getSchedule(routeId: string): Promise<GTFSSchedule | null> {
  if (scheduleCache.has(routeId)) return scheduleCache.get(routeId)!
  const res = await fetch(`${BASE}/schedules/${encodeURIComponent(routeId)}.json`)
  if (!res.ok) return null
  const data = await res.json() as GTFSSchedule
  scheduleCache.set(routeId, data)
  return data
}
