'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Star } from 'lucide-react'
import designersData from '@/data/designers.json'

export default function DesignersPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-sand-900 mb-3"
          >
            Nos Designers
          </motion.h1>
          <p className="text-sand-400">Des professionnels vérifiés prêts à donner vie à vos idées</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {designersData.map((designer, i) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-5"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={designer.avatar} alt={designer.name} fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-black text-sand-900">{designer.name}</div>
                  <div className="text-xs text-sand-400">{designer.specialty}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
                    <span className="text-sm font-bold text-sand-900">{designer.rating}</span>
                    <span className="text-xs text-sand-400">/ 5.0</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-sand-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-primary-500">{designer.completedOrders}</div>
                  <div className="text-xs text-sand-400">Commandes</div>
                </div>
                <div className="bg-sand-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-sand-900">{designer.rating}</div>
                  <div className="text-xs text-sand-400">Note moyenne</div>
                </div>
              </div>

              <button className="w-full py-2 border border-sand-200 rounded-xl text-xs font-semibold text-sand-600 hover:border-primary-400 hover:text-primary-500 transition-all">
                Voir le portfolio
              </button>

              <div className="flex items-center gap-1.5 mt-3 text-xs text-green-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Disponible maintenant
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
