import { Link } from 'react-router-dom'
import { Bus, ArrowLeft, MapPin } from 'lucide-react'
import STMFullMap from './STMFullMap'

export default function STMPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section
        className="py-10 px-4 sm:px-6 lg:px-8 text-white"
        style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0284c7 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <Link
            to="/moverse"
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Moverse
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-md">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sky-200 text-sm font-medium uppercase tracking-wider">Sistema de Transporte Metropolitano</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold">Líneas de Ómnibus</h1>
            </div>
          </div>
          <p className="text-blue-100 text-base max-w-2xl leading-relaxed">
            Todas las líneas urbanas y suburbanas — trazado exacto por calles, paradas con nombre,
            horarios reales y posiciones en tiempo real.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 mt-5">
            {[
              { label: 'Líneas disponibles', value: '146' },
              { label: 'Fuente de datos', value: 'STM oficial' },
              { label: 'Tiempo real', value: 'Cada 30 seg' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur rounded-xl px-4 py-2">
                <p className="text-xs text-blue-200">{label}</p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="w-4 h-4 text-uy-blue" />
          <p className="text-slate-500 text-sm">
            Buscá una línea por número o nombre para ver el recorrido, las paradas y los horarios.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <STMFullMap />
        </div>
      </section>
    </div>
  )
}
