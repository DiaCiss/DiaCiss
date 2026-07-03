'use client'

import { motion } from 'framer-motion'
import { Reveal, ReadingGlassCard, staggerContainer, staggerItem, RippleButton } from './primitives'

const SERVICES = [
  {
    tag: '01',
    title: 'Formations IA',
    desc: 'Des parcours pratiques et certifiants : prompt engineering, agents autonomes, IA générative appliquée au business.',
    points: ['Cohortes en live', 'Projets réels', 'Mentorat individuel'],
    icon: (
      <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /><path d="M22 10v6" /></>
    ),
    featured: false,
  },
  {
    tag: '02',
    title: 'Automatisation',
    desc: 'Agents IA, workflows et intégrations sur-mesure qui connectent vos outils et exécutent vos processus sans intervention.',
    points: ['Agents sur-mesure', 'Intégrations API', 'Supervision 24/7'],
    icon: (
      <><circle cx="12" cy="12" r="3.2" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>
    ),
    featured: true,
  },
  {
    tag: '03',
    title: 'Solutions digitales',
    desc: 'Conception et développement de produits web premium, du MVP au SaaS complet, propulsés par l’IA.',
    points: ['Product design', 'Développement full-stack', 'Déploiement & scale'],
    icon: (
      <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8M12 18v3" /></>
    ),
    featured: false,
  },
  {
    tag: '04',
    title: 'Web Coding IA',
    desc: 'Interfaces et sites vitrines haut de gamme livrés à la vitesse de l’IA, avec un code propre et maintenable.',
    points: ['UI premium', 'Code maintenable', 'Performance 100/100'],
    icon: (
      <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" /></>
    ),
    featured: false,
  },
]

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff5757" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
      <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="opt-eyebrow">Nos services</p>
          <h2 className="opt-display mt-4 text-[clamp(2.4rem,6vw,4rem)] text-white">
            De l’idée au <span className="opt-chroma">produit</span>
          </h2>
        </div>
        <p className="max-w-sm text-[16px] leading-relaxed text-white/55">
          Une agence, quatre expertises complémentaires. Nous vous accompagnons
          à chaque étape de votre transformation par l’IA.
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="mt-14 grid gap-6 md:grid-cols-2"
      >
        {SERVICES.map((s) => (
          <motion.div key={s.tag} variants={staggerItem}>
            <ReadingGlassCard className="group relative h-full overflow-hidden p-8">
              {/* featured glow */}
              {s.featured && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-70 blur-2xl"
                  style={{ background: 'radial-gradient(circle, rgba(255,87,87,0.35), transparent 70%)' }}
                />
              )}
              <div className="relative flex items-start justify-between">
                <div className="inline-grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#ff5757]/40 group-hover:shadow-[0_0_28px_rgba(255,87,87,0.28)]">
                  <Icon>{s.icon}</Icon>
                </div>
                <span className="opt-display text-3xl italic text-white/10 transition-colors group-hover:text-[#ff5757]/40">
                  {s.tag}
                </span>
              </div>

              <h3 className="opt-sub mt-6 text-2xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-white/60">{s.desc}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 opt-sub"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </ReadingGlassCard>
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-12 flex justify-center" delay={0.1}>
        <RippleButton href="#contact" className="px-7 py-3.5 text-[15px]">
          Discuter de votre projet
        </RippleButton>
      </Reveal>
    </section>
  )
}
