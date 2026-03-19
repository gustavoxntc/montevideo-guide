import { useState } from 'react'
import { Briefcase, Building2, Globe, ArrowRight, Bus, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import InteractiveMap from './InteractiveMap'
import DetailModal from './DetailModal'
import { workZones } from '../data/workplaces'

const jobPortals = [
  { name: 'Bumeran Uruguay', url: 'https://www.bumeran.com.uy', desc: 'El portal de empleo más grande de Uruguay' },
  { name: 'Computrabajo', url: 'https://www.computrabajo.com.uy', desc: 'Ofertas de empleo en todos los rubros' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com', desc: 'Red profesional y empleo calificado' },
  { name: 'Empleate (Estado)', url: 'https://empleate.gub.uy', desc: 'Empleos en el sector público y el Estado' },
  { name: 'Buscojobs', url: 'https://www.buscojobs.com.uy', desc: 'Portal con ofertas de empresas nacionales e internacionales' },
  { name: 'Indeed Uruguay', url: 'https://uy.indeed.com', desc: 'Buscador global de empleo con foco local' },
]

export default function WorkPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selectedZone = selectedId
    ? workZones.find((w) => w.id === selectedId) ?? null
    : null

  const markers = workZones.map((w) => ({
    id: w.id,
    name: w.name,
    lat: w.lat,
    lng: w.lng,
    description: w.description,
    type: 'work' as const,
  }))

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8 text-white"
        style={{ background: 'linear-gradient(135deg, #14532d 0%, #16a34a 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-md">
              <Briefcase className="w-6 h-6 text-green-900" />
            </div>
            <div>
              <p className="text-green-300 text-sm font-medium uppercase tracking-wider">Guía laboral</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold">Venir a Trabajar a Montevideo</h1>
            </div>
          </div>
          <p className="text-green-100 text-lg max-w-2xl leading-relaxed mt-2">
            Explorá las principales zonas de empleo, parques empresariales y polos de trabajo en el mapa interactivo.
            Montevideo concentra el 60% del empleo formal del Uruguay.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <Building2 className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-2xl font-bold">{workZones.length}</p>
                <p className="text-green-200 text-xs">Zonas de empleo principales</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-green-200 text-xs">Empresas en Zonamerica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-uy-blue mb-1">Mapa de Zonas de Empleo</h2>
          <p className="text-slate-500 text-sm">
            Marcadores verdes = zonas de trabajo. Hacé clic para ver información y consejos.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <InteractiveMap
            markers={markers}
            onMarkerClick={(id) => setSelectedId(id)}
            markerType="work"
          />
        </div>
      </section>

      {/* Work Zone Cards */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-uy-blue mb-6">Principales Zonas Laborales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workZones.map((zone) => (
            <div
              key={zone.id}
              className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              onClick={() => setSelectedId(zone.id)}
            >
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-uy-blue text-base leading-tight mb-2">{zone.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{zone.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {zone.sectors.slice(0, 3).map((s) => (
                  <span key={s} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                    {s}
                  </span>
                ))}
                {zone.sectors.length > 3 && (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    +{zone.sectors.length - 3} más
                  </span>
                )}
              </div>
              <button className="flex items-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
                Ver detalles <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Job Portals */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-uy-blue mb-2">Portales de Empleo</h2>
        <p className="text-slate-500 text-sm mb-6">Donde buscar trabajo en Uruguay</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobPortals.map((portal) => (
            <a
              key={portal.name}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
            >
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-uy-blue text-sm group-hover:text-green-700 transition-colors">{portal.name}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{portal.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Tips Banner */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
          <h3 className="font-bold text-green-800 text-lg mb-3">Consejos para buscar trabajo en Montevideo</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">→</span>
              Actualizá tu perfil de <strong>LinkedIn</strong>: muchas empresas en Montevideo reclutan principalmente ahí.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">→</span>
              Visitá personalmente las agencias de RRHH en Pocitos: <strong>Manpower, Adecco, Kelly Services</strong>.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">→</span>
              El sector <strong>tecnológico</strong> tiene alta demanda: Zonamerica y Aguada Park son los mejores destinos.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">→</span>
              Inscribite en el <strong>INEFOP</strong> para cursos de capacitación gratuitos que mejoran tu empleabilidad.
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-green-200">
            <Link
              to="/moverse"
              className="inline-flex items-center gap-1.5 text-green-700 font-medium text-sm hover:underline"
            >
              <Bus className="w-4 h-4" />
              Ver cómo llegar a estas zonas en transporte público
            </Link>
          </div>
        </div>
      </section>

      <DetailModal
        data={selectedZone}
        type="work"
        onClose={() => setSelectedId(null)}
      />
    </div>
  )
}
