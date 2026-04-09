'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, CheckCircle, Award } from 'lucide-react'
import designersData from '@/data/designers.json'

export default function DesignersPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-primary-500/30 text-sm text-primary-300 font-medium mb-4"
          >
            <Award className="w-4 h-4" />
            Nos talents créatifs
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Nos <span className="gradient-text">Designers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg mx-auto"
          >
            Des professionnels passionnés qui donnent vie à vos idées avec créativité et excellence
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designersData.map((designer, i) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-primary-500/20 transition-all card-hover"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                    <Image
                      src={designer.avatar}
                      alt={designer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-dark-950 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{designer.name}</h3>
                  <p className="text-xs text-gray-400">{designer.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
                    <span className="text-sm font-bold text-white">{designer.rating}</span>
                    <span className="text-xs text-gray-500">/ 5.0</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-3 border border-white/5 text-center">
                  <div className="text-xl font-black gradient-text">{designer.completedOrders}</div>
                  <div className="text-xs text-gray-500">Commandes</div>
                </div>
                <div className="glass rounded-xl p-3 border border-white/5 text-center">
                  <div className="text-xl font-black gradient-text-gold">{designer.rating}</div>
                  <div className="text-xs text-gray-500">Note moyenne</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Disponible maintenant
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
