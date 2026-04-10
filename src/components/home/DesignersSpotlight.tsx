'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import designersData from '@/data/designers.json'

export default function DesignersSpotlight() {
  return (
    <section className="py-16 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-sand-500 mb-1"
            >
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                Créatifs vérifiés
              </span>
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black text-white"
            >
              Les Designers du Moment
            </motion.h2>
          </div>
          <Link
            href="/designers"
            className="hidden md:flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 font-semibold group"
          >
            Voir tout <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {designersData.map((designer, i) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-sand-800 rounded-2xl p-5 hover:bg-sand-700 transition-colors group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={designer.avatar}
                      alt={designer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-sand-800 flex items-center justify-center">
                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{designer.name}</div>
                  <div className="text-xs text-sand-400">{designer.specialty}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-primary-400 text-xs">★</span>
                    <span className="text-xs font-bold text-white">{designer.rating}</span>
                    <span className="text-xs text-sand-500">({designer.completedOrders} avis)</span>
                  </div>
                </div>
              </div>

              <Link
                href="/designers"
                className="block w-full py-2 text-center text-xs font-semibold text-sand-300 border border-sand-600 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all"
              >
                Voir le portfolio
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
