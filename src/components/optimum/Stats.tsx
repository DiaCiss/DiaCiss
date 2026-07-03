'use client'

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from './primitives'

const STATS = [
  { value: 2400, suffix: '+', label: 'Apprenants formés' },
  { value: 150, suffix: '+', label: 'Automatisations livrées' },
  { value: 98, suffix: '%', label: 'Clients satisfaits' },
  { value: 40, suffix: 'k h', label: 'Heures économisées / an' },
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, reduce])

  return (
    <span ref={ref}>
      {Math.round(val).toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="apropos" className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
      <Reveal>
        <div className="opt-glass relative overflow-hidden rounded-[40px] px-6 py-14 md:px-14">
          {/* inner bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,87,87,0.28), transparent 70%)' }}
          />
          <div className="relative mb-10 text-center">
            <p className="opt-eyebrow">En chiffres</p>
            <h2 className="opt-display mt-4 text-[clamp(2rem,5vw,3.2rem)] text-white">
              L’impact <span className="opt-chroma">Optimum</span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15%' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="relative grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { type: 'spring', stiffness: 120, damping: 18 },
                  },
                }}
                className="text-center"
              >
                <div className="opt-display text-[clamp(2.6rem,6vw,4rem)] leading-none opt-chroma">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="opt-sub mt-3 text-sm text-white/60">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  )
}
