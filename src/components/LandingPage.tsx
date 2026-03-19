import { Link } from 'react-router-dom'
import { GraduationCap, Briefcase, Bus, Camera, ArrowRight, MapPin, Star, Users, Building } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 40%, #1d4ed8 60%, #0369a1 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
          <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #ffffff, transparent)' }} />
        </div>

        {/* Wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20"
          style={{
            background: 'repeating-linear-gradient(90deg, #3b82f6 0px, #3b82f6 2px, transparent 2px, transparent 40px)',
          }} />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
            <MapPin className="w-4 h-4 text-uy-yellow" />
            Uruguay &rsaquo; Montevideo
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tu guía para
            <br />
            <span className="text-uy-yellow">vivir en Montevideo</span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Venís del interior del Uruguay a estudiar o a trabajar. Acá encontrás toda la información
            que necesitás para instalarte y conocer la capital.
          </p>

          {/* Main CTA Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <Link
              to="/estudiar"
              className="group flex flex-col items-center gap-4 bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-b-4 border-uy-yellow"
            >
              <div className="w-16 h-16 bg-uy-blue rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-uy-blue mb-1">Vengo a Estudiar</h2>
                <p className="text-slate-500 text-sm">Universidades, institutos y centros de formación en Montevideo</p>
              </div>
              <div className="flex items-center gap-1 text-uy-sky text-sm font-semibold group-hover:gap-2 transition-all">
                Ver opciones <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              to="/trabajar"
              className="group flex flex-col items-center gap-4 bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-b-4 border-green-500"
            >
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-uy-blue mb-1">Vengo a Trabajar</h2>
                <p className="text-slate-500 text-sm">Zonas de empleo, parques empresariales y centros de trabajo</p>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold group-hover:gap-2 transition-all">
                Ver zonas <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, value: '8+', label: 'Universidades', color: 'text-uy-sky' },
              { icon: Building, value: '7+', label: 'Zonas de Empleo', color: 'text-green-600' },
              { icon: Users, value: '1.3M', label: 'Habitantes', color: 'text-purple-600' },
              { icon: Star, value: '8+', label: 'Lugares Turísticos', color: 'text-uy-yellow' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon className={`w-6 h-6 ${color} mb-2`} />
                <span className="text-2xl font-bold text-uy-blue">{value}</span>
                <span className="text-sm text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-uy-blue mb-3">¿Qué querés saber?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Toda la información que necesitás para moverte, estudiar, trabajar y disfrutar Montevideo
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              to: '/estudiar',
              icon: GraduationCap,
              title: 'Estudiar',
              desc: 'Mapa interactivo con universidades públicas y privadas, carreras y contactos.',
              color: 'bg-blue-50',
              iconBg: 'bg-uy-blue',
              border: 'border-uy-sky',
            },
            {
              to: '/trabajar',
              icon: Briefcase,
              title: 'Trabajar',
              desc: 'Zonas francas, parques empresariales y centros de empleo en el mapa.',
              color: 'bg-green-50',
              iconBg: 'bg-green-600',
              border: 'border-green-500',
            },
            {
              to: '/moverse',
              icon: Bus,
              title: 'Moverse',
              desc: 'Tarjeta STM, apps de transporte, scooters y bicicletas públicas.',
              color: 'bg-amber-50',
              iconBg: 'bg-amber-500',
              border: 'border-amber-400',
            },
            {
              to: '/turismo',
              icon: Camera,
              title: 'Turismo',
              desc: 'Los mejores lugares para conocer y disfrutar la capital uruguaya.',
              color: 'bg-rose-50',
              iconBg: 'bg-rose-500',
              border: 'border-rose-400',
            },
          ].map(({ to, icon: Icon, title, desc, color, iconBg, border }) => (
            <Link
              key={to}
              to={to}
              className={`group flex flex-col gap-4 p-6 rounded-2xl ${color} border-l-4 ${border} hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-uy-blue mb-1 text-lg">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-uy-sky mt-auto group-hover:gap-2 transition-all">
                Explorar <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Bienvenido a la capital</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Montevideo es una ciudad acogedora, segura y con excelente calidad de vida.
            Con una población de más de 1,3 millones de habitantes, concentra el 40% de la
            población del país y ofrece las mejores oportunidades educativas y laborales del Uruguay.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { emoji: '🎓', title: 'Educación gratuita', desc: 'La UdelaR ofrece carreras universitarias completamente gratuitas y de calidad internacional.' },
              { emoji: '💼', title: 'Oportunidades laborales', desc: 'Empresas multinacionales, zonas francas y el sector tecnológico en constante crecimiento.' },
              { emoji: '🌊', title: 'Calidad de vida', desc: '22km de rambla, parques, cultura, gastronomía y una ciudad que invita a caminarla.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white/10 backdrop-blur rounded-xl p-6 text-left">
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
