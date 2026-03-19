import { Bus, Smartphone, CreditCard, MapPin, Info, CheckCircle } from 'lucide-react'
import { mobilityApps, stmInfo } from '../data/mobility'

const typeLabels: Record<string, string> = {
  remise: 'Remise / Auto',
  taxi: 'Taxi',
  scooter: 'Scooter',
  bike: 'Bicicleta',
  bus: 'Ómnibus',
}

const typeColors: Record<string, string> = {
  remise: 'bg-violet-50 text-violet-700 border-violet-100',
  taxi: 'bg-amber-50 text-amber-700 border-amber-100',
  scooter: 'bg-sky-50 text-sky-700 border-sky-100',
  bike: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  bus: 'bg-blue-50 text-blue-700 border-blue-100',
}

export default function MobilityPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8 text-white"
        style={{ background: 'linear-gradient(135deg, #92400e 0%, #f59e0b 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-md">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-amber-200 text-sm font-medium uppercase tracking-wider">Transporte y movilidad</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold">Moverse en Montevideo</h1>
            </div>
          </div>
          <p className="text-amber-100 text-lg max-w-2xl leading-relaxed mt-2">
            Todo lo que necesitás saber para moverte por la ciudad: desde el transporte público hasta las apps de movilidad más usadas.
          </p>
        </div>
      </section>

      {/* STM Card Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-uy-blue rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-uy-blue">Tarjeta STM</h2>
            <p className="text-slate-500 text-sm">El pase para el transporte público de Montevideo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main info */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <p className="text-slate-600 leading-relaxed mb-5">{stmInfo.description}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-100">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">Tarjeta gratuita</p>
                  <p className="text-green-700 text-xs">{stmInfo.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3 border border-blue-100">
                <Bus className="w-5 h-5 text-uy-sky shrink-0" />
                <div>
                  <p className="font-semibold text-uy-blue text-sm">Precio del boleto</p>
                  <p className="text-blue-600 text-xs">{stmInfo.busPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to get */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-uy-blue mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Cómo obtener la tarjeta
            </h3>
            <ol className="space-y-2.5">
              {stmInfo.howToGet.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="w-5 h-5 bg-uy-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Reload points + Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-uy-blue mb-4">Dónde cargar saldo</h3>
            <ul className="space-y-2">
              {stmInfo.reloadPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-uy-sky rounded-full shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" /> Consejos útiles
            </h3>
            <ul className="space-y-2">
              {stmInfo.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="text-amber-500 font-bold mt-0.5 shrink-0">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App info */}
        <div className="mt-6 bg-uy-blue rounded-2xl p-5 text-white flex items-start gap-4">
          <Smartphone className="w-6 h-6 text-uy-yellow shrink-0 mt-0.5" />
          <div>
            <p className="font-bold mb-1">App STM</p>
            <p className="text-blue-200 text-sm leading-relaxed">{stmInfo.appInfo}</p>
          </div>
        </div>
      </section>

      {/* Mobility Apps */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-uy-blue">Apps de Movilidad</h2>
            <p className="text-slate-500 text-sm">Alternativas al transporte público para moverte por Montevideo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mobilityApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* App header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm text-white font-bold text-lg"
                  style={{ backgroundColor: app.color }}
                >
                  {app.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-uy-blue">{app.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${typeColors[app.type] ?? 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                    {typeLabels[app.type] ?? app.type}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-4">{app.description}</p>

              <div className="space-y-1.5 mb-4">
                {app.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 border-t border-slate-50 pt-3">
                <MapPin className="w-3.5 h-3.5" />
                {app.availability}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick tips footer */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-slate-800 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-4">Resumen rápido de movilidad</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <Bus className="w-5 h-5 text-uy-yellow mb-2" />
              <p className="font-semibold text-sm">Ómnibus (STM)</p>
              <p className="text-slate-300 text-xs mt-1">La opción más económica. ~$43 pesos con tarjeta. 180 líneas cubren toda la ciudad.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Smartphone className="w-5 h-5 text-uy-yellow mb-2" />
              <p className="font-semibold text-sm">Apps (Uber/Cabify)</p>
              <p className="text-slate-300 text-xs mt-1">Rápido y cómodo. Precio estimado antes de viajar. Ideal para horarios nocturnos.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <CreditCard className="w-5 h-5 text-uy-yellow mb-2" />
              <p className="font-semibold text-sm">Bicicleta (STM Bici)</p>
              <p className="text-slate-300 text-xs mt-1">Los primeros 30 minutos son gratis. Ideal para la rambla y el centro.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
