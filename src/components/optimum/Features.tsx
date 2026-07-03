'use client'

import { motion } from 'framer-motion'
import { Reveal, ReadingGlassCard, staggerContainer, staggerItem } from './primitives'

const ICON = 'none'

function Icon({ path }: { path: React.ReactNode }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill={ICON}
      stroke="#ff5757"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {path}
    </svg>
  )
}

const FEATURES = [
  {
    title: 'Intelligence appliquée',
    desc: "Des modèles IA au service de vos objectifs concrets — pas de hype, du résultat mesurable.",
    icon: <><path d="M12 3a4 4 0 0 0-4 4c-1.7.7-3 2.5-3 4.5 0 1.4.6 2.6 1.5 3.4A4 4 0 0 0 9 21h6a4 4 0 0 0 2.5-6.1c.9-.8 1.5-2 1.5-3.4 0-2-1.3-3.8-3-4.5a4 4 0 0 0-4-4Z" /><path d="M12 8v8M9 12h6" /></>,
  },
  {
    title: 'Automatisation sans friction',
    desc: 'Workflows, agents et intégrations qui tournent 24/7 et libèrent vos équipes des tâches répétitives.',
    icon: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3.2" /></>,
  },
  {
    title: 'Web Coding assisté',
    desc: 'Des interfaces premium livrées à la vitesse de l’IA, sans jamais sacrifier la qualité du code.',
    icon: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" /></>,
  },
  {
    title: 'Design haut de gamme',
    desc: 'Une identité qui respire le premium : lumière, profondeur, micro-interactions soignées.',
    icon: <><path d="M12 3 3 9l9 6 9-6-9-6Z" /><path d="m3 15 9 6 9-6" /></>,
  },
  {
    title: 'Formation continue',
    desc: 'Des parcours structurés, du prompt engineering au déploiement produit, pour monter en compétence vite.',
    icon: <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></>,
  },
  {
    title: 'Performance & confiance',
    desc: 'Sécurité, fiabilité et transparence à chaque étape. Vos données et vos résultats, protégés.',
    icon: <><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  },
]

export default function Features() {
  return (
    <section id="ressources" className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="opt-eyebrow">Pourquoi Optimum AI</p>
        <h2 className="opt-display mt-4 text-[clamp(2.4rem,6vw,4rem)] text-white">
          Un socle <span className="opt-chroma">intelligent</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/60">
          Six piliers qui font passer votre organisation de curieuse de l’IA à
          pilotée par l’IA.
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((f) => (
          <motion.div key={f.title} variants={staggerItem}>
            <ReadingGlassCard className="group h-full p-7">
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#ff5757]/40 group-hover:shadow-[0_0_24px_rgba(255,87,87,0.25)]">
                <Icon path={f.icon} />
              </div>
              <h3 className="opt-sub text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">
                {f.desc}
              </p>
            </ReadingGlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
