import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import { Clock, MapPin, AlertCircle, Radio, RefreshCw, ChevronDown } from 'lucide-react'
import { busLines, type BusLine, type BusStop } from '../data/stmRoutes'
import { getLiveBuses, busLng, type LiveBus } from '../services/stmApi'

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length === 0) return
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

async function fetchOSRMRoute(stops: BusStop[]): Promise<[number, number][] | null> {
  try {
    const coords = stops.map(s => `${s.lng},${s.lat}`).join(';')
    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const data = await res.json()
    const coords2d = data?.routes?.[0]?.geometry?.coordinates
    if (!Array.isArray(coords2d)) return null
    // OSRM returns [lng, lat], Leaflet needs [lat, lng]
    return (coords2d as [number, number][]).map(([lng, lat]) => [lat, lng])
  } catch {
    return null
  }
}

type DayType = 'weekday' | 'saturday' | 'sunday'

const REFRESH_INTERVAL_MS = 30_000

export default function STMRouteMap() {
  const [selectedLine, setSelectedLine] = useState(busLines[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dayType, setDayType] = useState<DayType>('weekday')
  const [liveBuses, setLiveBuses] = useState<LiveBus[]>([])
  const [liveStatus, setLiveStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [routeGeometry, setRouteGeometry] = useState<[number, number][]>(selectedLine.route)
  const [routeLoading, setRouteLoading] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const scheduleMap: Record<DayType, string[]> = {
    weekday: selectedLine.schedule.weekdayTimes,
    saturday: selectedLine.schedule.saturdayTimes,
    sunday: selectedLine.schedule.sundayTimes,
  }

  async function fetchLive(line: BusLine) {
    setLiveStatus('loading')
    try {
      const buses = await getLiveBuses(line.number)
      setLiveBuses(buses)
      setLastUpdate(new Date())
      setLiveStatus('ok')
    } catch {
      setLiveStatus('error')
      setLiveBuses([])
    }
  }

  useEffect(() => {
    setLiveBuses([])
    setLiveStatus('idle')
    fetchLive(selectedLine)

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => fetchLive(selectedLine), REFRESH_INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [selectedLine])

  // Fetch OSRM road geometry whenever the line changes
  useEffect(() => {
    setRouteGeometry(selectedLine.route) // show fallback immediately
    setRouteLoading(true)
    fetchOSRMRoute(selectedLine.stops).then(geometry => {
      if (geometry) setRouteGeometry(geometry)
      setRouteLoading(false)
    })
  }, [selectedLine])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function selectLine(line: BusLine) {
    setSelectedLine(line)
    setIsDropdownOpen(false)
  }

  return (
    <div>
      {/* Line selector – dropdown */}
      <div className="relative mb-4" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(v => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border-2 rounded-2xl shadow-sm transition-all hover:border-slate-300 focus:outline-none"
          style={{ borderColor: selectedLine.color }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: selectedLine.color }}
            >
              {selectedLine.number}
            </span>
            <span className="text-slate-700 font-medium text-sm truncate">{selectedLine.name}</span>
          </div>
          <ChevronDown
            className="w-4 h-4 text-slate-400 shrink-0 transition-transform"
            style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="max-h-72 overflow-y-auto py-1">
              {busLines.map(line => (
                <button
                  key={line.id}
                  onClick={() => selectLine(line)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50 ${
                    selectedLine.id === line.id ? 'bg-slate-50' : ''
                  }`}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.number}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{line.name}</p>
                    <p className="text-xs text-slate-400">{line.from} ↔ {line.to}</p>
                  </div>
                  {selectedLine.id === line.id && (
                    <span className="ml-auto text-xs font-bold" style={{ color: line.color }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Line summary + live indicator */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: selectedLine.color }} />
          <span className="font-semibold text-uy-blue">{selectedLine.name}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{selectedLine.from} ↔ {selectedLine.to}</span>
          {routeLoading && (
            <span className="flex items-center gap-1 text-xs text-slate-400 ml-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Cargando ruta…
            </span>
          )}
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-1.5 text-xs">
          {liveStatus === 'loading' && (
            <span className="flex items-center gap-1 text-slate-400">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Actualizando…
            </span>
          )}
          {liveStatus === 'ok' && liveBuses.length > 0 && (
            <span className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
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
            <span className="text-slate-400 text-xs">Sin buses activos ahora</span>
          )}
          {liveStatus === 'error' && (
            <span className="flex items-center gap-1 text-amber-600 text-xs">
              <AlertCircle className="w-3 h-3" />
              Sin datos en tiempo real
            </span>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm" style={{ height: 380 }}>
        <MapContainer
          center={[-34.9011, -56.1645]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <FitBounds positions={routeGeometry} />

          {/* Route polyline – follows actual streets via OSRM */}
          <Polyline
            positions={routeGeometry}
            color={selectedLine.color}
            weight={5}
            opacity={0.85}
          />

          {/* Static stops */}
          {selectedLine.stops.map((stop, i) => (
            <CircleMarker
              key={stop.id}
              center={[stop.lat, stop.lng]}
              radius={i === 0 || i === selectedLine.stops.length - 1 ? 9 : 6}
              color={selectedLine.color}
              fillColor="white"
              fillOpacity={1}
              weight={2.5}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{stop.name}</p>
                  <p className="text-slate-500 text-xs">Parada {i + 1}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Live bus markers */}
          {liveBuses.map((bus, i) => {
            const lng = busLng(bus)
            if (!bus.lat || !lng) return null
            return (
              <CircleMarker
                key={bus.busId ?? bus.id ?? i}
                center={[bus.lat, lng]}
                radius={8}
                color="white"
                fillColor={selectedLine.color}
                fillOpacity={0.95}
                weight={2}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold text-green-700">🚌 Bus en ruta</p>
                    <p className="text-slate-500 text-xs">Línea {bus.lineCode ?? bus.line ?? selectedLine.number}</p>
                    {bus.speed !== undefined && (
                      <p className="text-slate-500 text-xs">Velocidad: {bus.speed} km/h</p>
                    )}
                    {lastUpdate && (
                      <p className="text-slate-400 text-xs mt-1">
                        Actualizado: {lastUpdate.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </p>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      </div>

      {/* Stops + schedule info */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h4 className="font-bold text-uy-blue mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Paradas ({selectedLine.stops.length})
          </h4>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {selectedLine.stops.map((stop, i) => (
              <div key={stop.id} className="flex items-center gap-2.5 text-sm text-slate-600">
                <div
                  className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold shrink-0"
                  style={{ backgroundColor: selectedLine.color }}
                >
                  {i + 1}
                </div>
                {stop.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h4 className="font-bold text-uy-blue mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Frecuencia y servicio
          </h4>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Frecuencia</span>
              <span className="font-medium text-slate-700 text-right text-xs max-w-40">{selectedLine.schedule.frequency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Primer servicio</span>
              <span className="font-medium text-slate-700 font-mono">{selectedLine.schedule.firstBus}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Último servicio</span>
              <span className="font-medium text-slate-700 font-mono">{selectedLine.schedule.lastBus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule times */}
      <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-uy-blue flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Horarios de salida
          </h4>
          <div className="flex gap-1">
            {(['weekday', 'saturday', 'sunday'] as DayType[]).map(d => (
              <button
                key={d}
                onClick={() => setDayType(d)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                  dayType === d
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                style={dayType === d ? { backgroundColor: selectedLine.color } : {}}
              >
                {d === 'weekday' ? 'L–V' : d === 'saturday' ? 'Sáb' : 'Dom'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {scheduleMap[dayType].map(time => (
            <span
              key={time}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-lg font-mono"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-3 flex items-start gap-2 text-xs text-slate-400 bg-slate-50 rounded-xl p-3 border border-slate-100">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          El trazado de rutas sigue calles reales (OSRM/OpenStreetMap). Las posiciones en tiempo real
          se actualizan cada 30 segundos desde la API oficial de STM Montevideo.
          Los horarios son orientativos; para más información consultá la app oficial de STM.
        </span>
      </div>
    </div>
  )
}
