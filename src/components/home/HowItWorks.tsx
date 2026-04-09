'use client'

import { motion } from 'framer-motion'
import { Search, PenTool, CreditCard, Download } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Choisissez votre design',
    description: 'Parcourez nos catégories et choisissez le modèle qui correspond à vos besoins parmi nos 3 niveaux de qualité.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Personnalisez',
    description: 'Ajoutez votre photo, logo, texte, numéro, liens réseaux sociaux et tous vos détails personnels.',
    color: 'from-primary-500 to-purple-600',
  },
  {
    step: '03',
    icon: CreditCard,
    title: 'Payez à la livraison',
    description: 'Recevez votre design en 1h. Vérifiez-le puis payez via Orange Money, Wave ou Free Money.',
    color: 'from-accent-400 to-orange-500',
  },
  {
    step: '04',
    icon: Download,
    title: 'Téléchargez',
    description: 'Téléchargez votre design en haute résolution et demandez jusqu\'à 10 retouches selon votre forfait.',
    color: 'from-green-500 to-emerald-600',
  },
]

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2"
          >
            Simple & Rapide
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black text-white mb-4"
          >
            Comment ça marche ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg mx-auto"
          >
            De la commande à la livraison en moins d&apos;une heure. Un processus simple et transparent.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%-12px)] w-6 h-0.5 bg-gradient-to-r from-white/20 to-white/5 z-10" />
              )}

              <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all h-full">
                {/* Step number */}
                <div className="text-xs font-black text-gray-600 mb-4">{step.step}</div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
