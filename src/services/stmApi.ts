/**
 * Cliente para el proxy STM (/api/stm).
 * En desarrollo usa la URL relativa; en producción Vercel resuelve la función.
 */

export interface LiveBus {
  lat: number
  /** La API puede devolver "lon" o "lng" */
  lon?: number
  lng?: number
  lineCode?: string
  line?: string
  variant?: string
  speed?: number
  bearing?: number
  busId?: string
  id?: string
  /** Timestamp ISO o Unix ms */
  timestamp?: string | number
}

/** Normaliza el campo de longitud (lon vs lng) */
export function busLng(bus: LiveBus): number {
  return (bus.lng ?? bus.lon) as number
}

async function stmFetch(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  const url = new URL('/api/stm', window.location.origin)
  url.searchParams.set('endpoint', endpoint)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`STM proxy error ${res.status}`)
  return res.json()
}

/** Posiciones en tiempo real para una o varias líneas (ej: "121" o "121,103") */
export async function getLiveBuses(lines: string): Promise<LiveBus[]> {
  const data = await stmFetch('buses', { lines })
  // La API puede devolver un array directo o un objeto con campo "data"/"buses"
  if (Array.isArray(data)) return data as LiveBus[]
  const obj = data as Record<string, unknown>
  if (Array.isArray(obj.data)) return obj.data as LiveBus[]
  if (Array.isArray(obj.buses)) return obj.buses as LiveBus[]
  return []
}

/** Próximos buses en una parada */
export async function getUpcomingBuses(stopId: string): Promise<unknown> {
  return stmFetch(`buses/busstops/${stopId}/upcomingbuses`)
}
