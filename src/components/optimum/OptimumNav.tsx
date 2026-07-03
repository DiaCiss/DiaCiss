'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { RippleButton } from './primitives'

const LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Formations', href: '#formations' },
  { label: 'Services', href: '#services' },
  { label: 'Ressources', href: '#ressources' },
  { label: 'À propos', href: '#apropos' },
]

export default function OptimumNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
      className="fixed left-1/2 top-5 z-50 w-[90%] max-w-6xl"
    >
      <nav
        className="opt-glass flex h-[72px] items-center justify-between rounded-full px-6 md:px-10"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.09)'
            : 'rgba(255,255,255,0.06)',
          transition: 'background 0.3s ease',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
        }}
      >
        {/* Logo — very light glitch on hover */}
        <a href="#accueil" className="group relative inline-flex items-center gap-2" aria-label="Optimum AI — accueil">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[#ff8a8a] to-[#ff3d3d] text-white shadow-[0_6px_20px_rgba(255,87,87,0.5)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3.2" fill="#fff" />
            </svg>
          </span>
          <span className="opt-glitch text-lg font-extrabold tracking-tight opt-sub" data-text="Optimum AI">
            Optimum<span className="opt-chroma"> AI</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white opt-sub"
              >
                {l.label}
                <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#ff5757] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <RippleButton href="#contact" className="px-5 py-2.5 text-sm">
            Réserver un appel
          </RippleButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/5 lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className="absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300"
              style={{ top: open ? '7px' : '2px', transform: open ? 'rotate(45deg)' : 'none' }}
            />
            <span
              className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-white transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300"
              style={{ top: open ? '7px' : '12px', transform: open ? 'rotate(-45deg)' : 'none' }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="opt-glass mt-3 overflow-hidden rounded-3xl p-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white opt-sub"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-1">
              <RippleButton href="#contact" className="w-full py-3" onClick={() => setOpen(false)}>
                Réserver un appel
              </RippleButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
