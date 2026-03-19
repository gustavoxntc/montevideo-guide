import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix Leaflet default icon issue with webpack/vite bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export type MarkerType = 'university' | 'work' | 'tourist'

export interface MapMarker {
  id: number
  name: string
  lat: number
  lng: number
  description: string
  type: MarkerType
}

interface InteractiveMapProps {
  markers: MapMarker[]
  onMarkerClick: (id: number) => void
  markerType: MarkerType
}

function createColoredIcon(color: string) {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path d="M16 2 C9.4 2 4 7.4 4 14 C4 22 16 40 16 40 C16 40 28 22 28 14 C28 7.4 22.6 2 16 2Z"
        fill="${color}" filter="url(#shadow)" />
      <circle cx="16" cy="14" r="6" fill="white" opacity="0.9"/>
    </svg>
  `
  return L.divIcon({
    html: svgIcon,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -44],
    className: '',
  })
}

const icons: Record<MarkerType, L.DivIcon> = {
  university: createColoredIcon('#1e40af'),
  work: createColoredIcon('#16a34a'),
  tourist: createColoredIcon('#dc2626'),
}

export default function InteractiveMap({ markers, onMarkerClick, markerType }: InteractiveMapProps) {
  useEffect(() => {
    // Re-create icons after mount to avoid SSR issues
  }, [])

  const center: [number, number] = [-34.9011, -56.1645]

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '500px', width: '100%', borderRadius: '16px', zIndex: 0 }}
      className="shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={icons[markerType]}
        >
          <Popup maxWidth={280}>
            <div className="py-1">
              <h3 className="font-bold text-uy-blue text-base leading-tight mb-1.5">{marker.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">{marker.description}</p>
              <button
                className="custom-popup-btn"
                onClick={() => onMarkerClick(marker.id)}
              >
                Ver más detalles
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
