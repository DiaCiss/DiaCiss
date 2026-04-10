'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    n: '1',
    title: 'Choisissez votre service',
    desc: 'Sélectionnez parmi nos 20 catégories de design ce qu\'il vous faut.',
  },
  {
    n: '2',
    title: 'Commandez & Collaborez',
    desc: 'Payez en toute sécurité et discutez en direct avec votre designer.',
  },
  {
    n: '3',
    title: 'Recevez vos fichiers',
    desc: 'Téléchargez vos visuels en haute définition, prêts à l\'emploi.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 section-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Prêt à transformer votre image ?
            </h2>
            <p className="text-orange-100 mb-6 leading-relaxed">
              Un processus simple, rapide et pensé pour les entrepreneurs africains.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-500 font-bold rounded-xl hover:bg-orange-50 transition-colors"
            >
              Démarrer ma première commande
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right — Steps */}
          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex items-start gap-4 bg-white/10 rounded-2xl p-4"
              >
                <div className="w-9 h-9 rounded-xl bg-white text-primary-500 font-black text-base flex items-center justify-center flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5">{step.title}</div>
                  <div className="text-sm text-orange-100 leading-relaxed">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
