'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, RippleButton } from './primitives'

export default function CTA() {
  const reduce = useReducedMotion()
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[44px] border border-white/10 px-6 py-20 text-center md:px-16">
          {/* gradient wash */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 140% at 50% 0%, rgba(255,87,87,0.28), rgba(255,138,138,0.06) 40%, transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.5]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), transparent 30%)',
            }}
          />
          {/* floating orb */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,87,87,0.4), transparent 70%)', filter: 'blur(40px)' }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <div className="relative">
            <p className="opt-eyebrow">Prêt à décoller ?</p>
            <h2 className="opt-display mx-auto mt-5 max-w-3xl text-[clamp(2.6rem,7vw,5rem)] text-white">
              Transformez l’IA en <span className="opt-chroma">résultats</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/65">
              Réservez un appel de découverte gratuit. En 30 minutes, nous
              identifions vos meilleurs leviers IA et un plan d’action concret.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <RippleButton href="#contact" className="px-8 py-4 text-base">
                Réserver un appel gratuit
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </RippleButton>
              <RippleButton href="#formations" variant="ghost" className="px-8 py-4 text-base">
                Voir les formations
              </RippleButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
