import { useState } from 'react'
import { GraduationCap, Building, BookOpen, Bus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import InteractiveMap from './InteractiveMap'
import DetailModal from './DetailModal'
import { universities } from '../data/universities'

export default function StudyPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selectedUniversity = selectedId
    ? universities.find((u) => u.id === selectedId) ?? null
    : null

  const markers = universities.map((u) => ({
    id: u.id,
    name: u.name,
    lat: u.lat,
    lng: u.lng,
    description: u.description,
    type: 'university' as const,
  }))

  const publicCount = universities.filter((u) => u.type === 'public').length
  const privateCount = universities.filter((u) => u.type === 'private').length

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8 text-white"
        style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-uy-yellow rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-uy-blue" />
            </div>
            <div>
              <p className="text-blue-300 text-sm font-medium uppercase tracking-wider">Guía para estudiantes</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold">Venir a Estudiar a Montevideo</h1>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed mt-2">
            Encontrá todas las universidades, institutos y centros de formación de Montevideo en el mapa interactivo.
            Hacé clic sobre un marcador para ver información detallada.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <BookOpen className="w-5 h-5 text-uy-yellow" />
              <div>
                <p className="text-2xl font-bold">{publicCount}</p>
                <p className="text-blue-200 text-xs">Instituciones públicas (gratuitas)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <Building className="w-5 h-5 text-uy-yellow" />
              <div>
                <p className="text-2xl font-bold">{privateCount}</p>
                <p className="text-blue-200 text-xs">Universidades privadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-uy-blue mb-1">Mapa de Universidades</h2>
          <p className="text-slate-500 text-sm">
            Marcadores azules = universidades. Hacé clic para ver información y detalles.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <InteractiveMap
            markers={markers}
            onMarkerClick={(id) => setSelectedId(id)}
            markerType="university"
          />
        </div>
      </section>

      {/* University Cards */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-uy-blue mb-6">Todas las Instituciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {universities.map((uni) => (
            <div
              key={uni.id}
              className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              onClick={() => setSelectedId(uni.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-uy-blue rounded-xl flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  uni.type === 'public'
                    ? 'bg-blue-50 text-uy-blue border border-blue-100'
                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  {uni.type === 'public' ? 'Pública · Gratuita' : 'Privada'}
                </span>
              </div>
              <h3 className="font-bold text-uy-blue text-base leading-tight mb-2">{uni.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{uni.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {uni.careers.slice(0, 3).map((c) => (
                  <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {c}
                  </span>
                ))}
                {uni.careers.length > 3 && (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    +{uni.careers.length - 3} más
                  </span>
                )}
              </div>
              <button className="flex items-center gap-1 text-uy-sky text-sm font-medium group-hover:gap-2 transition-all">
                Ver detalles <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Banner */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-bold text-uy-blue text-lg mb-3">Consejos para estudiantes del interior</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-uy-sky font-bold mt-0.5">→</span>
              La <strong>UdelaR</strong> es completamente gratuita. Tenés que rendir el ingreso (CBC) o ingresar directamente según la facultad.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-uy-sky font-bold mt-0.5">→</span>
              La <strong>UTU</strong> ofrece carreras técnicas gratuitas con salida laboral rápida.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-uy-sky font-bold mt-0.5">→</span>
              Existen becas de <strong>BPS, BROU, y Fundabeca</strong> para estudiantes del interior que se mudan a la capital.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-uy-sky font-bold mt-0.5">→</span>
              Los estudiantes tienen tarifa especial en el <strong>transporte público STM</strong>.
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <Link
              to="/moverse"
              className="inline-flex items-center gap-1.5 text-uy-sky font-medium text-sm hover:underline"
            >
              <Bus className="w-4 h-4" />
              Ver cómo moverse en Montevideo
            </Link>
          </div>
        </div>
      </section>

      <DetailModal
        data={selectedUniversity}
        type="university"
        onClose={() => setSelectedId(null)}
      />
    </div>
  )
}
