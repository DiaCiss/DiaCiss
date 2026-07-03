'use client'

import { motion, useReducedMotion } from 'framer-motion'
import RobotScene from './RobotScene'
import { RippleButton } from './primitives'

const WORDS = ['Apprenez.', 'Créez.', 'Monétisez.']

export default function Hero() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }
  const line = {
    hidden: { opacity: 0, y: 40, filter: 'blur(16px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 90, damping: 18 },
    },
  }

  return (
    <section
      id="accueil"
      className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center gap-10 px-6 pt-36 pb-16 md:px-10 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:pt-40"
    >
      {/* LEFT — copy */}
      <div className="relative z-10 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5757] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5757]" />
          </span>
          <span className="opt-sub text-xs font-medium tracking-wide text-white/70">
            Agence IA · Formation · Automatisation · Web Coding
          </span>
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="opt-display text-[clamp(3.4rem,9vw,6rem)]"
        >
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              variants={line}
              className={`block ${
                i === 2
                  ? 'opt-chroma opt-glitch'
                  : 'text-white'
              }`}
              data-text={w}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/65 lg:mx-0"
        >
          Optimum AI forme, automatise et développe des solutions digitales
          propulsées par l&apos;intelligence artificielle. Du premier prompt
          jusqu&apos;au produit monétisable — nous construisons votre avantage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
        >
          <RippleButton href="#formations" className="px-7 py-3.5 text-[15px]">
            Commencer maintenant
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </RippleButton>
          <RippleButton href="#services" variant="ghost" className="px-7 py-3.5 text-[15px]">
            Découvrir nos services
          </RippleButton>
        </motion.div>

        {/* mini trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/45 lg:justify-start"
        >
          {['+2 400 apprenants', '98% satisfaction', '150+ automatisations'].map((t) => (
            <span key={t} className="opt-sub text-sm">
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — robot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: reduce ? 0 : 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full"
      >
        <RobotScene />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/60"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
