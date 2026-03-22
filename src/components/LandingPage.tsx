import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.12 }
    )
    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function LandingPage() {
  useScrollReveal()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const btn = e.currentTarget.querySelector<HTMLButtonElement>('.btn-submit')!
    btn.textContent = '¡Enviado! ✓'
    btn.style.background = '#2d7a4f'
    setTimeout(() => {
      btn.textContent = 'Enviar mensaje →'
      btn.style.background = ''
      ;(e.target as HTMLFormElement).reset()
    }, 3000)
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
        <div className="hero-bg" />

        {/* Diagonal clip into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 bg-ori-off-white z-[2]"
          style={{ clipPath: 'polygon(0 60%, 100% 0%, 100% 100%, 0 100%)' }}
        />

        <div className="relative z-[3] text-center px-8">
          <span className="animate-hero-d1 inline-block bg-ori-amarillo text-ori-dark text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
            🧉 Tu guía en la capital
          </span>

          <h1
            className="animate-hero-d2 font-playfair font-black text-white leading-[0.95] tracking-tight mb-4"
            style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: '#3ab5d4' }}
          >
            <em className="not-italic" style={{ fontStyle: 'italic'}}>O</em>riundos
          </h1>

          <p
            className="animate-hero-d3 text-white/75 font-light uppercase mb-10"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', letterSpacing: '0.15em' }}
          >
            Del interior a Montevideo
          </p>

          <a
            href="#quienes"
            className="animate-hero-d4 inline-flex items-center gap-2 bg-ori-celeste text-ori-dark font-bold text-sm tracking-wide px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-ori-amarillo hover:-translate-y-0.5"
          >
            Conocé más
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M8 3v10M3 8l5 5 5-5" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ────────────────────────────── */}
      <section id="quienes" className="py-24 px-8 bg-ori-off-white">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className="reveal">
            <p className="section-label">Nuestra historia</p>
            <h2 className="section-title">¿Qué es <em>Oriundos</em>?</h2>
            <div className="divider" />
            <p className="text-[1.05rem] leading-[1.8] text-[#4a3820] mb-4">
              Oriundos nació de la experiencia de llegar a Montevideo sin saber bien por dónde empezar.
              Somos una guía creada por y para quienes vienen del interior del Uruguay a vivir, estudiar
              o trabajar en la capital.
            </p>
            <p className="text-[1.05rem] leading-[1.8] text-[#4a3820]">
              Reunimos todo lo que necesitás saber: desde cómo moverse en la ciudad hasta dónde estudiar,
              trabajar y qué hacer en tu tiempo libre.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="team-card reveal reveal-delay-1">
              <div
                className="team-card-photo"
                style={{ background: 'linear-gradient(135deg, #71D8EE, #3ab5d4)' }}
              >
                J
              </div>
              <div className="p-5">
                <div className="font-playfair font-bold text-lg text-ori-dark mb-1">Josefina Brum</div>
                <div className="text-xs text-ori-marron leading-relaxed">
                  Oriunda de Montevideo. <br></br>Experta en Marketing y Comunicación. Apasionada por conectar con las personas y contar historias. Quiero que tu bajada en la capital se sienta más como llegar a casa.
                </div>
              </div>
            </div>

            <div className="team-card reveal reveal-delay-2">
              <div
                className="team-card-photo"
                style={{ background: 'linear-gradient(135deg, #b08a50, #886739)' }}
              >
                G
              </div>
              <div className="p-5">
                <div className="font-playfair font-bold text-lg text-ori-dark mb-1">Gustavo De Abreu</div>
                <div className="text-xs text-ori-marron leading-relaxed">
                  Oriundo de Salto. <br></br>Se mudó a la capital para comenzar su carrera en tecnología.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPÓSITO ────────────────────────────────── */}
      <section id="proposito" className="py-24 px-8 bg-ori-dark relative overflow-hidden">
        {/* Decorative glows */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(113,216,238,0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,190,4,0.1) 0%, transparent 70%)' }}
        />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="reveal">
            <p className="section-label" style={{ color: '#71D8EE' }}>Lo que nos mueve</p>
            <h2 className="section-title" style={{ color: '#fff' }}>Nuestro propósito</h2>
            <div className="divider" />
            <p className="max-w-[560px] leading-[1.8] text-[1.05rem]" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Queremos que llegar a Montevideo no sea abrumador. Que cada persona que viene del interior
              encuentre su lugar, su comunidad y sus oportunidades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: '🎓',
                title: 'Estudiar',
                desc: 'Guías sobre universidades, institutos terciarios, becas y cómo inscribirse en la UDELAR desde el interior.',
                accent: '#FFBE04',
                to: '/estudiar',
              },
              {
                icon: '💼',
                title: 'Trabajar',
                desc: 'Recursos para conseguir empleo, armar tu CV, y entender el mercado laboral montevideano.',
                accent: '#71D8EE',
                to: '/trabajar',
              },
              {
                icon: '🚌',
                title: 'Moverse',
                desc: 'Todo sobre el transporte público, STM, bicicletas y cómo orientarse en la ciudad.',
                accent: '#b08a50',
                to: '/moverse',
              },
            ].map(({ icon, title, desc, accent, to }, i) => (
              <Link
                key={to}
                to={to}
                className={`prop-card reveal reveal-delay-${i + 1} block`}
              >
                <div className="prop-accent" style={{ background: accent }} />
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-playfair font-bold text-lg mb-2" style={{ color: '#fff' }}>{title}</h3>
                <p className="text-sm leading-[1.7]" style={{ color: 'rgba(255,255,255,0.55)' }}>{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ─────────────────────────────────── */}
      <section id="contacto" className="py-24 px-8 bg-ori-off-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="contacto-inner reveal">

            <div className="relative z-10">
              <p className="section-label" style={{ color: 'rgba(0,0,0,0.5)' }}>Escribinos</p>
              <h2
                className="font-playfair font-black text-ori-dark leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
              >
                Contactanos
              </h2>
              <p className="text-base leading-[1.7] mt-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
                ¿Tenés una consulta, sugerencia o querés sumarte al proyecto?
                Mandanos un mensaje y te respondemos a la brevedad.
              </p>
            </div>

            <form className="contacto-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" placeholder="Tu nombre" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="tu@email.com" required />
                </div>
              </div>

              <div className="form-group">
                <label>Departamento de origen</label>
                <select>
                  <option value="">Seleccioná tu departamento</option>
                  {[
                    'Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores',
                    'Florida','Lavalleja','Maldonado','Paysandú','Río Negro','Rivera',
                    'Rocha','Salto','San José','Soriano','Tacuarembó','Treinta y Tres',
                  ].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Mensaje</label>
                <textarea placeholder="¿En qué podemos ayudarte?" />
              </div>

              <button type="submit" className="btn-submit">Enviar mensaje →</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
