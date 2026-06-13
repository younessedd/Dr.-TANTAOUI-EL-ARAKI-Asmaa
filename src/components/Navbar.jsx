import React, { useEffect, useState } from 'react'
import doctor from '../data/doctorData'

export default function Navbar({ onToggleTheme, theme }) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastY, setLastY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (y > lastY && y > 60) {
        // scrolling down
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastY(y)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  return (
    <header
      className={`w-full z-40 transition-transform duration-300 bg-[var(--header-bg)] border-b border-gray-300 dark:border-gray-700 ${isVisible ? 'translate-y-0' : '-translate-y-full'} fixed top-0 left-0`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold">{doctor.name}</span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-[var(--muted)] items-center">
          <a href="#about" className="hover:text-[var(--text)]">About</a>
          <a href="#work" className="hover:text-[var(--text)]">Work</a>
          <a href="#reviews" className="hover:text-[var(--text)]">Reviews</a>
          <a href="#contact" className="hover:text-[var(--text)]">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md bg-transparent border border-gray-200 dark:border-gray-700"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 ml-2"
            onClick={() => setMobileOpen(open => !open)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-[var(--card)] border-t border-gray-100 dark:border-gray-800 transition-max-h duration-300 overflow-hidden ${mobileOpen ? 'max-h-40' : 'max-h-0'}`}>
        <div className="px-4 py-3 flex flex-col gap-2 text-[var(--muted)]">
          <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
          <a href="#work" onClick={() => setMobileOpen(false)}>Work</a>
          <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
  )
}
