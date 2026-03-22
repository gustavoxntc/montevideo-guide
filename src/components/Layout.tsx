import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { to: '/estudiar', label: 'Estudiar' },
  { to: '/trabajar', label: 'Trabajar' },
  { to: '/turismo', label: '¿Qué hacer?' },
  { to: '/moverse', label: 'Moverme' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname])

  const navBg = isHome
    ? scrolled
      ? 'bg-white/15 backdrop-blur-lg border-b border-white/20'
      : 'bg-transparent'
    : 'bg-ori-dark'

  return (
    <div className="min-h-screen bg-ori-off-white flex flex-col">

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-16">

          {/* Logo */}
          <NavLink
            to="/"
            className="font-playfair text-2xl font-black text-white tracking-tight leading-none"
          >
            Oriundos
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative text-sm font-medium uppercase tracking-[0.08em] transition-colors group ${
                    isActive ? 'text-ori-celeste' : 'text-white hover:text-ori-celeste'
                  }`
                }
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-0.5 bg-ori-amarillo w-0 group-hover:w-full transition-all duration-300" />
              </NavLink>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-ori-dark/95 backdrop-blur-lg border-t border-white/10 px-6 pb-4">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block py-3 text-sm font-medium uppercase tracking-widest border-b border-white/5 last:border-0 ${
                    isActive ? 'text-ori-celeste' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Page content — inner pages need top padding for fixed navbar */}
      <main className={`flex-1 ${!isHome ? 'pt-16' : ''}`}>
        <div className="page-content">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-ori-dark text-white/45 text-center py-8 px-4 text-sm tracking-wide">
        <p>
          © 2025 <strong className="text-ori-celeste">Oriundos</strong>
          {' '}· Del interior a Montevideo · Hecho con ❤️ desde Uruguay
        </p>
      </footer>
    </div>
  )
}
