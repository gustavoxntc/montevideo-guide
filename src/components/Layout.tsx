import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { MapPin, GraduationCap, Briefcase, Bus, Camera, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Inicio', icon: MapPin, exact: true },
  { to: '/estudiar', label: 'Estudiar', icon: GraduationCap, exact: false },
  { to: '/trabajar', label: 'Trabajar', icon: Briefcase, exact: false },
  { to: '/moverse', label: 'Moverse', icon: Bus, exact: false },
  { to: '/turismo', label: 'Turismo', icon: Camera, exact: false },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-uy-blue shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-uy-yellow rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-uy-blue" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
                Vivir en <span className="text-uy-yellow">Montevideo</span>
              </span>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon, exact }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-uy-yellow text-uy-blue shadow-md'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-uy-blue border-t border-blue-700 pb-3 px-4">
            {navItems.map(({ to, label, icon: Icon, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium my-0.5 transition-all ${
                    isActive
                      ? 'bg-uy-yellow text-uy-blue'
                      : 'text-blue-100 hover:bg-white/10'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <div className="page-content">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-uy-blue text-blue-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-uy-yellow rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-uy-blue" />
              </div>
              <span className="font-semibold text-white">Vivir en Montevideo</span>
            </div>
            <p className="text-sm text-center">
              Guía para personas del interior del Uruguay que se mudan a Montevideo
            </p>
            <div className="flex gap-4 text-sm">
              {navItems.slice(1).map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={`hover:text-white transition-colors ${
                    location.pathname === to ? 'text-uy-yellow' : ''
                  }`}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-blue-700 text-center text-xs text-blue-400">
            Información orientativa. Verificar datos actualizados en fuentes oficiales.
          </div>
        </div>
      </footer>
    </div>
  )
}
