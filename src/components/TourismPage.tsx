import { Camera, Clock, Tag, MapPin, Lightbulb } from 'lucide-react'
import { touristPlaces } from '../data/touristPlaces'

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  historia:    { label: 'Historia',    color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-100' },
  naturaleza:  { label: 'Naturaleza',  color: 'text-green-700',  bg: 'bg-green-50 border-green-100' },
  gastronomia: { label: 'Gastronomía', color: 'text-rose-700',   bg: 'bg-rose-50 border-rose-100' },
  cultura:     { label: 'Cultura',     color: 'text-purple-700', bg: 'bg-purple-50 border-purple-100' },
  deporte:     { label: 'Deporte',     color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-100' },
}

const categoryEmojis: Record<string, string> = {
  historia:    '🏛️',
  naturaleza:  '🌿',
  gastronomia: '🍖',
  cultura:     '🎭',
  deporte:     '⚽',
}

export default function TourismPage() {
  const categories = Array.from(new Set(touristPlaces.map((p) => p.category)))

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8 text-white"
        style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-md">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-red-200 text-sm font-medium uppercase tracking-wider">Turismo y cultura</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold">Conocé Montevideo</h1>
            </div>
          </div>
          <p className="text-red-100 text-lg max-w-2xl leading-relaxed mt-2">
            Más allá del trabajo o el estudio, Montevideo tiene una riqueza cultural, histórica y gastronómica
            que vale la pena descubrir desde el primer día.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <span key={cat} className="bg-white/20 backdrop-blur text-white text-sm px-3 py-1.5 rounded-full">
                {categoryEmojis[cat]} {categoryConfig[cat]?.label ?? cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {touristPlaces.map((place) => {
            const cat = categoryConfig[place.category]
            return (
              <div
                key={place.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Card header with category color */}
                <div
                  className="h-3 w-full"
                  style={{
                    background: place.category === 'historia'    ? '#f59e0b' :
                                place.category === 'naturaleza'  ? '#22c55e' :
                                place.category === 'gastronomia' ? '#ef4444' :
                                place.category === 'cultura'     ? '#a855f7' :
                                '#3b82f6'
                  }}
                />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{categoryEmojis[place.category]}</span>
                      <div>
                        <h3 className="font-bold text-uy-blue text-lg leading-tight">{place.name}</h3>
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border mt-1 ${cat?.bg ?? ''} ${cat?.color ?? ''}`}>
                          {cat?.label ?? place.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{place.fullDescription}</p>

                  {/* Meta info */}
                  <div className="space-y-2 mb-4">
                    {place.hours && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {place.hours}
                      </div>
                    )}
                    {place.price && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {place.price}
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-amber-700 text-xs leading-relaxed">{place.tips}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer banner */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)' }}>
          <div className="p-8 text-white text-center">
            <MapPin className="w-10 h-10 text-uy-yellow mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Montevideo te está esperando</h3>
            <p className="text-blue-200 max-w-xl mx-auto text-sm leading-relaxed">
              La rambla al atardecer, el mate en cualquier plaza, el Mercado del Puerto los sábados,
              los domingos en Tristán Narvaja... Montevideo se vive y se disfruta de a poco.
              ¡Bienvenido a la capital!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
