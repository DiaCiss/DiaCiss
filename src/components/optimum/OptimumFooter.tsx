'use client'

import { Reveal } from './primitives'

const COLS = [
  {
    title: 'Services',
    links: ['Formations IA', 'Automatisation', 'Solutions digitales', 'Web Coding IA'],
  },
  {
    title: 'Ressources',
    links: ['Blog', 'Guides', 'Études de cas', 'Documentation'],
  },
  {
    title: 'Entreprise',
    links: ['À propos', 'Carrières', 'Contact', 'Partenaires'],
  },
]

export default function OptimumFooter() {
  return (
    <footer id="formations" className="relative mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10">
      <Reveal>
        <div className="opt-glass rounded-[36px] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* brand */}
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[#ff8a8a] to-[#ff3d3d] text-white shadow-[0_6px_20px_rgba(255,87,87,0.5)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3.2" fill="#fff" />
                  </svg>
                </span>
                <span className="opt-sub text-lg font-extrabold text-white">
                  Optimum<span className="opt-chroma"> AI</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/55">
                L’agence IA qui vous apprend, construit avec vous et vous aide à
                monétiser. Apprenez. Créez. Monétisez.
              </p>
              <div className="mt-5 flex gap-3">
                {['in', 'X', 'YT'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    aria-label={s}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-[#ff5757]/40 hover:text-white hover:shadow-[0_0_20px_rgba(255,87,87,0.3)]"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {COLS.map((c) => (
              <div key={c.title}>
                <h4 className="opt-sub text-sm font-bold uppercase tracking-wider text-white/80">
                  {c.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[15px] text-white/55 transition-colors hover:text-[#ff8a8a]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row">
            <p>© {new Date().getFullYear()} Optimum AI. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white/80">Confidentialité</a>
              <a href="#" className="transition-colors hover:text-white/80">Conditions</a>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
