/**
 * Cliente para el proxy STM (/api/stm).
 * La API real devuelve la posición en location.coordinates: [lng, lat] (GeoJSON).
 */

export interface LiveBus {
  lat: number
  lng: number
  line?: string
  busId?: string
  speed?: number
  timestamp?: string
  origin?: string
  destination?: string
  subline?: string
}

/** Formato crudo que devuelve la API STM */
interface RawSTMBus {
  busId?: number | string
  line?: string
  lineVariantId?: number
  location?: {
    type: 'Point'
    coordinates: [number, number]  // [lng, lat]
  }
  speed?: number
  timestamp?: string
  origin?: string
  destination?: string
  subline?: string
  company?: string
  /** Algunos endpoints alternativos usan lat/lon directo */
  lat?: number
  lon?: number
  lng?: number
}

async function stmFetch(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  const url = new URL('/api/stm', window.location.origin)
  url.searchParams.set('endpoint', endpoint)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`STM proxy error ${res.status}`)
  return res.json()
}

function normalizebus(b: RawSTMBus): LiveBus | null {
  // Coordenadas del formato GeoJSON: coordinates[0]=lng, coordinates[1]=lat
  const lat = b.location?.coordinates?.[1] ?? b.lat ?? 0
  const lng = b.location?.coordinates?.[0] ?? b.lng ?? b.lon ?? 0
  if (!lat || !lng) return null
  return {
    lat,
    lng,
    line:        b.line,
    busId:       String(b.busId ?? ''),
    speed:       b.speed,
    timestamp:   b.timestamp,
    origin:      b.origin,
    destination: b.destination,
    subline:     b.subline,
  }
}

/** Posiciones en tiempo real para una o varias líneas (ej: "121" o "121,103") */
export async function getLiveBuses(lines: string): Promise<LiveBus[]> {
  const data = await stmFetch('buses', { lines })
  const raw: RawSTMBus[] = Array.isArray(data)
    ? (data as RawSTMBus[])
    : Array.isArray((data as Record<string, unknown>).data)
      ? ((data as Record<string, unknown>).data as RawSTMBus[])
      : []

  return raw.map(normalizebus).filter((b): b is LiveBus => b !== null)
}

/** Próximos buses en una parada */
export async function getUpcomingBuses(stopId: string): Promise<unknown> {
  return stmFetch(`buses/busstops/${stopId}/upcomingbuses`)
}
