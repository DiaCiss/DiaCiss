'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[520px]">

          {/* Left — Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold uppercase tracking-widest text-sand-500 mb-4"
            >
              Marketplace Créative Africaine
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-sand-900 mb-6"
            >
              Votre design pro
              <br />
              en{' '}
              <em className="not-italic text-primary-500">
                moins d&apos;une heure.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sand-500 text-base leading-relaxed mb-8 max-w-md"
            >
              Accédez aux meilleurs talents du continent pour vos logos, menus de restaurants et visuels réseaux sociaux. Rapide, local et percutant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/categories"
                className="px-6 py-3 btn-primary rounded-xl text-sm flex items-center gap-2 group"
              >
                Lancer un projet
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/comment-ca-marche"
                className="px-6 py-3 btn-ghost rounded-xl text-sm flex items-center gap-2"
              >
                Comment ça marche →
              </Link>
            </motion.div>
          </div>

          {/* Right — Dark card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:flex justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Main dark card */}
              <div className="bg-sand-900 rounded-3xl p-8 text-white overflow-hidden relative">
                {/* African map pattern decoration */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="400" height="400" fill="url(#dots)" />
                    {/* Stylized Africa shape */}
                    <path
                      d="M180 60 C220 50 280 70 300 120 C320 160 310 200 290 240 C270 280 240 310 200 320 C160 330 130 300 120 260 C110 220 120 180 140 150 C155 125 160 75 180 60Z"
                      fill="none"
                      stroke="#E8501E"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="text-xs font-semibold text-sand-400 uppercase tracking-widest mb-2">
                    Design en cours
                  </div>
                  <div className="text-xl font-black mb-1">Identité Visuelle</div>
                  <div className="text-primary-400 font-bold text-sm mb-6">&quot;L&apos;Artisane&quot;</div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-xs font-bold">A</div>
                    <div>
                      <div className="text-xs font-semibold">Aminata Diallo</div>
                      <div className="text-xs text-sand-400">Designer · En ligne</div>
                    </div>
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>

                  <div className="bg-sand-800 rounded-xl p-3">
                    <div className="text-xs text-sand-400 mb-1">Progression</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-sand-700 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-primary-500 rounded-full" />
                      </div>
                      <span className="text-xs font-bold text-primary-400">67%</span>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-xs text-sand-400">Livré en</div>
                    <div className="text-2xl font-black text-white">45 <span className="text-sm font-normal text-sand-400">minutes</span></div>
                  </div>
                </div>
              </div>

              {/* Floating tag */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-card px-4 py-2.5 border border-sand-200"
              >
                <div className="text-xs text-sand-500">Livré en 45 min par</div>
                <div className="text-sm font-bold text-sand-900">Aminata Diallo</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
