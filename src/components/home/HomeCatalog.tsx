'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Star } from 'lucide-react'
import type { Design, Category } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  categories: Category[]
  designsByCategory: Record<string, Design[]>
}

const FILTER_ALL = 'tous'

const CATEGORY_ICONS: Record<string, string> = {
  'restauration': '🍽️',
  'reseaux-sociaux': '📱',
  'mariage': '💍',
  'graduation': '🎓',
  'anniversaire': '🎂',
  'festival': '🎪',
  'concert-musique': '🎵',
  'banque-finance': '💳',
  'bapteme-naissance': '👶',
  'conference': '🎤',
  'sport': '⚽',
  'business-cards': '💼',
  'youtube-podcast': '🎙️',
  'mode-fashion': '👗',
  'immobilier': '🏠',
  'sante': '🏥',
  'ong': '🤝',
  'tourisme': '✈️',
  'formation': '📚',
  'promotion': '🏷️',
}

export default function HomeCatalog({ categories, designsByCategory }: Props) {
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL)

  // Seulement les catégories qui ont des designs
  const activeCats = categories.filter((c) => (designsByCategory[c.slug] || []).length > 0)

  const displayCats = activeFilter === FILTER_ALL
    ? activeCats
    : activeCats.filter((c) => c.slug === activeFilter)

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Filtres rapides ── */}
        <div className="sticky top-16 z-30 bg-sand-50 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-sand-100">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveFilter(FILTER_ALL)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === FILTER_ALL
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-sand-200 text-sand-600 hover:border-primary-300'
              }`}
            >
              Tous
            </button>
            {activeCats.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === cat.slug
                    ? 'bg-primary-500 text-white'
                    : 'bg-white border border-sand-200 text-sand-600 hover:border-primary-300'
                }`}
              >
                <span>{CATEGORY_ICONS[cat.slug] || '🎨'}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Designs par catégorie ── */}
        <div className="mt-8 space-y-10">
          {displayCats.map((cat, catIdx) => {
            const designs = designsByCategory[cat.slug] || []
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.05 }}
              >
                {/* Category header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{CATEGORY_ICONS[cat.slug] || '🎨'}</span>
                    <div>
                      <h2 className="text-lg font-black text-sand-900">{cat.name}</h2>
                      <p className="text-xs text-sand-400">{designs.length} design{designs.length > 1 ? 's' : ''} disponible{designs.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Voir tout <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Horizontal scroll row */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:-mx-0 sm:px-0">
                  {designs.map((design, i) => (
                    <DesignCard key={design.id} design={design} index={i} />
                  ))}

                  {/* See all card */}
                  <Link href={`/categorie/${cat.slug}`} className="flex-shrink-0">
                    <div className="w-40 sm:w-48 h-full min-h-[220px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-sand-200 hover:border-primary-300 transition-all group bg-white">
                      <div className="w-10 h-10 rounded-full bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center mb-2 transition-colors">
                        <ChevronRight className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs font-bold text-sand-500 group-hover:text-primary-500 transition-colors text-center px-3">
                        Voir tous les designs
                      </span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DesignCard({ design, index }: { design: Design; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex-shrink-0 w-40 sm:w-48"
    >
      <Link href={`/design/${design.id}`}>
        <div className="card overflow-hidden group hover:shadow-md transition-all">
          {/* Image */}
          <div className="relative w-full aspect-square bg-sand-100 overflow-hidden">
            <Image
              src={design.imageUrl}
              alt={design.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full px-3 py-1 text-xs font-bold text-primary-500 shadow">
                Réserver →
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-xs font-bold text-sand-900 line-clamp-1 mb-1">{design.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-primary-500 font-black text-sm">{formatPrice(design.price)}</span>
              <span className="flex items-center gap-0.5 text-[10px] text-sand-400">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {design.rating}
              </span>
            </div>
            <p className="text-[10px] text-sand-400 mt-1 truncate">par {design.designer.name}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
