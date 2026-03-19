import { X, ExternalLink, Phone, MapPin, BookOpen, Briefcase } from 'lucide-react'
import { University } from '../data/universities'
import { WorkZone } from '../data/workplaces'

type ModalData = University | WorkZone | null

interface DetailModalProps {
  data: ModalData
  type: 'university' | 'work' | null
  onClose: () => void
}

function isUniversity(data: ModalData): data is University {
  return data !== null && 'careers' in data && 'type' in data
}

function isWorkZone(data: ModalData): data is WorkZone {
  return data !== null && 'sectors' in data && 'tips' in data
}

export default function DetailModal({ data, type, onClose }: DetailModalProps) {
  if (!data) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 rounded-t-2xl text-white relative overflow-hidden"
          style={{
            background: type === 'university'
              ? 'linear-gradient(135deg, #1e3a5f, #1e40af)'
              : 'linear-gradient(135deg, #166534, #16a34a)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 pr-10">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              {type === 'university'
                ? <BookOpen className="w-5 h-5" />
                : <Briefcase className="w-5 h-5" />
              }
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">{data.name}</h2>
              {isUniversity(data) && (
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                  data.type === 'public'
                    ? 'bg-uy-yellow/80 text-uy-blue'
                    : 'bg-white/20 text-white'
                }`}>
                  {data.type === 'public' ? 'Pública · Gratuita' : 'Privada'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <p className="text-slate-600 leading-relaxed">{data.fullDescription}</p>

          {/* Address */}
          <div className="flex items-start gap-2.5 text-sm">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <span className="text-slate-600">{data.address}</span>
          </div>

          {/* University: Careers */}
          {isUniversity(data) && (
            <div>
              <h3 className="font-semibold text-uy-blue mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Carreras disponibles
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.careers.map((career) => (
                  <span
                    key={career}
                    className="bg-blue-50 text-uy-blue text-xs px-2.5 py-1 rounded-full border border-blue-100 font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work Zone: Sectors */}
          {isWorkZone(data) && (
            <div>
              <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Sectores principales
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.sectors.map((sector) => (
                  <span
                    key={sector}
                    className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full border border-green-100 font-medium"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work Zone: Tips */}
          {isWorkZone(data) && data.tips && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="font-semibold text-amber-800 mb-1.5 text-sm">Consejos</h3>
              <p className="text-amber-700 text-sm leading-relaxed">{data.tips}</p>
            </div>
          )}

          {/* Contact (university) */}
          {isUniversity(data) && data.contact && (
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-600">{data.contact}</span>
            </div>
          )}

          {/* Website */}
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-uy-sky text-sm font-medium hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Visitar sitio web oficial
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
