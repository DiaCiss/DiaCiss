'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Plus } from 'lucide-react'
import type { Category, Design, PricingTier } from '@/types'
import { PRICING_TIERS } from '@/types'
import { formatPrice } from '@/lib/utils'
import DesignCard from '@/components/ui/DesignCard'

interface Props {
  category: Category
  designs: Design[]
}

type Filter = 'all' | PricingTier

export default function CategoryPageClient({ category, designs }: Props) {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? designs : designs.filter((d) => d.tier === filter)

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'ALL DESIGNS' },
    { key: 'basic', label: `BASIQUE (${formatPrice(PRICING_TIERS.basic.price)})` },
    { key: 'intermediate', label: `INTERMÉDIAIRE (${formatPrice(PRICING_TIERS.intermediate.price)})` },
    { key: 'premium', label: `PREMIUM (${formatPrice(PRICING_TIERS.premium.price)})` },
  ]

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 sidebar sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-6 px-4">
        <div className="mb-6">
          <div className="text-xs font-black uppercase tracking-widest text-sand-400 mb-1">
            {category.name}
          </div>
          <div className="text-xs text-sand-400 uppercase tracking-widest">Creative Assets</div>
        </div>

        <nav className="space-y-1 flex-1">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-left transition-all ${
                filter === key
                  ? 'bg-primary-50 text-primary-500 border-l-2 border-primary-500'
                  : 'text-sand-600 hover:bg-sand-100 hover:text-sand-900'
              }`}
            >
              <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                filter === key ? 'border-primary-500 bg-primary-500' : 'border-sand-300'
              }`}>
                {filter === key && <span className="w-2 h-2 bg-white rounded-sm" />}
              </span>
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          <button className="w-full px-4 py-3 btn-primary rounded-xl text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Post a Request
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 py-6 px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-sand-400 mb-6">
          <Link href="/" className="hover:text-sand-700">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/categories" className="hover:text-sand-700">Catégories</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-sand-700 font-semibold">{category.name}</span>
        </div>

        {/* Category header card */}
        <div className="rounded-2xl p-6 mb-8 flex items-center justify-between" style={{ background: '#FAF0E8' }}>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-sand-900 mb-1">{category.name}</h1>
            <p className="text-sand-500 text-sm max-w-md">{category.description}</p>
          </div>
          <div className="text-5xl opacity-60 hidden sm:block">{category.icon}</div>
        </div>

        {/* Mobile filters */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 mb-6">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === key
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-sand-200 text-sand-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filtered.map((design, i) => (
                <DesignCard key={design.id} design={design} index={i} />
              ))}

              {/* Design sur-mesure CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: filtered.length * 0.06 }}
              >
                <div className="card border-dashed border-2 border-sand-200 flex flex-col items-center justify-center p-8 text-center min-h-[200px] hover:border-primary-300 transition-all group cursor-pointer">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
                    <Plus className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="font-black text-sand-900 mb-1">Design Sur-Mesure</div>
                  <p className="text-xs text-sand-400 mb-4">
                    Vous ne trouvez pas votre bonheur ? Demandez un design personnalisé à nos experts.
                  </p>
                  <button className="px-4 py-2 btn-primary rounded-xl text-xs">
                    Lancer une demande
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <p className="text-sand-400 mb-4">Aucun design dans ce niveau pour cette catégorie.</p>
              <button
                onClick={() => setFilter('all')}
                className="text-primary-500 text-sm font-semibold hover:text-primary-600"
              >
                Voir tous les designs
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
