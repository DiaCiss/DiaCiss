'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Zap, Shield, Clock } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Designs disponibles' },
  { value: '20', label: 'Catégories' },
  { value: '1h', label: 'Livraison max' },
  { value: '4.9★', label: 'Note moyenne' },
]

const floatingCards = [
  { title: 'Mariage', price: '1 000 FCFA', emoji: '💍', x: '-left-4', y: 'top-16', delay: 0 },
  { title: 'Concert', price: '3 000 FCFA', emoji: '🎵', x: '-right-4', y: 'top-8', delay: 0.4 },
  { title: 'Graduation', price: '5 000 FCFA', emoji: '🎓', x: '-right-8', y: 'bottom-16', delay: 0.8 },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-600/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/8 blur-3xl"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-primary-500/30 text-sm text-primary-300 font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Designers en ligne · Livraison en 1h
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              Des designs{' '}
              <span className="gradient-text">créatifs</span>
              <br />
              livrés en{' '}
              <span className="gradient-text-gold">1 heure</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Commandez votre design personnalisé parmi 500+ modèles. Nos designers professionnels s&apos;adaptent à vos besoins pour mariage, concerts, restaurants et bien plus.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="/categories"
                className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1"
              >
                Parcourir les designs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/comment-ca-marche"
                className="flex items-center gap-2 px-6 py-3.5 glass border border-white/10 hover:border-white/20 text-white font-semibold rounded-2xl transition-all"
              >
                Comment ça marche ?
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { icon: Zap, text: 'Livraison express' },
                { icon: Shield, text: 'Paiement sécurisé' },
                { icon: Star, text: 'Qualité garantie' },
                { icon: Clock, text: '2 retouches offertes' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon className="w-3.5 h-3.5 text-primary-400" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – Visual mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central mockup */}
              <div className="absolute inset-8 glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary-900/60 to-dark-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎨</div>
                    <div className="text-xl font-bold text-white mb-2">Votre design</div>
                    <div className="text-sm text-gray-400">Personnalisé & livré</div>
                    <div className="mt-4 flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent-400 fill-accent-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mini cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + card.delay, duration: 0.5 }}
                  className={`absolute ${card.x} ${card.y} glass rounded-xl p-3 border border-white/10 shadow-xl w-36`}
                  style={{ animation: `float ${5 + i}s ease-in-out infinite ${card.delay}s` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{card.emoji}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{card.title}</div>
                      <div className="text-xs text-primary-400 font-semibold">{card.price}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-accent-400 to-orange-500 rounded-2xl opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full opacity-20 blur-xl" />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 border border-white/5 text-center">
              <div className="text-2xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
