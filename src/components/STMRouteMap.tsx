import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import { Clock, MapPin, AlertCircle } from 'lucide-react'
import { busLines, type BusLine } from '../data/stmRoutes'

function FitBounds({ line }: { line: BusLine }) {
  const map = useMap()
  useEffect(() => {
    const lats = line.route.map(([lat]) => lat)
    const lngs = line.route.map(([, lng]) => lng)
    const bounds: LatLngBoundsExpression = [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ]
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map, line])
  return null
}

type DayType = 'weekday' | 'saturday' | 'sunday'

export default function STMRouteMap() {
  const [selectedLine, setSelectedLine] = useState(busLines[0])
  const [dayType, setDayType] = useState<DayType>('weekday')

  const scheduleMap: Record<DayType, string[]> = {
    weekday: selectedLine.schedule.weekdayTimes,
    saturday: selectedLine.schedule.saturdayTimes,
    sunday: selectedLine.schedule.sundayTimes,
  }

  return (
    <div>
      {/* Line selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {busLines.map(line => (
          <button
            key={line.id}
            onClick={() => setSelectedLine(line)}
            className={`px-4 py-2 rounded-full font-bold text-sm border-2 transition-all ${
              selectedLine.id === line.id
                ? 'text-white shadow-md scale-105'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
            style={selectedLine.id === line.id ? { backgroundColor: line.color, borderColor: line.color } : {}}
          >
            Línea {line.number}
          </button>
        ))}
      </div>

      {/* Line summary */}
      <div className="flex items-center gap-2 mb-3 text-sm">
        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: selectedLine.color }} />
        <span className="font-semibold text-uy-blue">{selectedLine.name}</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-500">{selectedLine.from} ↔ {selectedLine.to}</span>
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
          <FitBounds line={selectedLine} />
          <Polyline
            positions={selectedLine.route}
            color={selectedLine.color}
            weight={5}
            opacity={0.85}
          />
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
        <span>Los horarios son orientativos. Para información en tiempo real consultá la app oficial de STM o escaneá el QR de la parada.</span>
      </div>
    </div>
  )
}
