'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, Zap, RefreshCw, Crown, Filter } from 'lucide-react'
import type { Category, Design, PricingTier } from '@/types'
import { PRICING_TIERS } from '@/types'
import { formatPrice } from '@/lib/utils'
import DesignCard from '@/components/ui/DesignCard'

interface Props {
  category: Category
  designs: Design[]
}

const tierIcons = { basic: Zap, intermediate: RefreshCw, premium: Crown }

export default function CategoryPageClient({ category, designs }: Props) {
  const [selectedTier, setSelectedTier] = useState<PricingTier | 'all'>('all')

  const filtered = selectedTier === 'all'
    ? designs
    : designs.filter((d) => d.tier === selectedTier)

  const tiers: (PricingTier | 'all')[] = ['all', 'basic', 'intermediate', 'premium']

  return (
    <div className="min-h-screen pt-20">
      {/* Hero banner */}
      <div className={`relative py-16 overflow-hidden bg-gradient-to-br ${category.gradient} bg-opacity-10`}>
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 opacity-15 bg-gradient-to-br ${category.gradient}`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Toutes les catégories
          </Link>

          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-3xl shadow-2xl`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">{category.name}</h1>
              <p className="text-gray-400 mt-1 max-w-lg">{category.description}</p>
              <div className="mt-2 text-sm text-gray-500">{category.designCount} designs disponibles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pricing tiers explanation */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary-400" />
            Choisissez votre niveau
          </h2>
          <p className="text-sm text-gray-400 mb-6">Filtrez les designs par niveau de qualité et budget</p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* All */}
            <button
              onClick={() => setSelectedTier('all')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                selectedTier === 'all'
                  ? 'bg-white/10 border-white/30'
                  : 'glass border-white/10 hover:border-white/20'
              }`}
            >
              <div className="font-bold text-white mb-1">Tous les niveaux</div>
              <div className="text-xs text-gray-400">1 000 – 5 000 FCFA</div>
              <div className="mt-2 text-xs text-gray-500">{designs.length} designs</div>
            </button>

            {/* Tier buttons */}
            {(['basic', 'intermediate', 'premium'] as PricingTier[]).map((tier) => {
              const config = PRICING_TIERS[tier]
              const Icon = tierIcons[tier]
              const count = designs.filter((d) => d.tier === tier).length

              return (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left group ${
                    selectedTier === tier
                      ? `${config.bgColor} ${config.borderColor}`
                      : 'glass border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-lg font-black ${selectedTier === tier ? config.textColor : 'text-white'}`}>
                      {formatPrice(config.price)}
                    </span>
                  </div>
                  <div className={`font-bold text-sm ${selectedTier === tier ? config.textColor : 'text-white'}`}>
                    {config.label}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {config.maxRetouches} retouches · {config.deliveryTime}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{count} designs</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Designs grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">
              {filtered.length} design{filtered.length > 1 ? 's' : ''}
              {selectedTier !== 'all' && ` · Niveau ${PRICING_TIERS[selectedTier as PricingTier].label}`}
            </h3>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={selectedTier}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((design, i) => (
                  <DesignCard key={design.id} design={design} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-4xl mb-4">🎨</div>
                <p className="text-gray-400">Aucun design disponible pour ce niveau dans cette catégorie.</p>
                <button
                  onClick={() => setSelectedTier('all')}
                  className="mt-4 text-primary-400 hover:text-primary-300 text-sm font-semibold"
                >
                  Voir tous les niveaux
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
