'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import DesignCard from '@/components/ui/DesignCard'
import type { Design } from '@/types'

interface FeaturedDesignsProps {
  designs: Design[]
}

export default function FeaturedDesigns({ designs }: FeaturedDesignsProps) {
  return (
    <section className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-accent-400 text-sm font-semibold uppercase tracking-widest mb-2"
            >
              <Sparkles className="w-4 h-4" />
              Designs en vedette
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black text-white"
            >
              Les plus populaires
            </motion.h2>
          </div>
          <Link
            href="/categories"
            className="hidden md:flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-semibold transition-colors group"
          >
            Tout voir
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {designs.map((design, i) => (
            <DesignCard key={design.id} design={design} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 glass border border-primary-500/30 hover:border-primary-500/60 text-white font-semibold rounded-2xl transition-all hover:bg-primary-500/10 group"
          >
            Voir tous les designs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
