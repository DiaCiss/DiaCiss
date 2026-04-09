'use client'

import { motion } from 'framer-motion'
import { getAllCategories } from '@/lib/data'
import CategoryCard from '@/components/ui/CategoryCard'
import { Grid, Search } from 'lucide-react'
import { useState } from 'react'

export default function CategoriesPage() {
  const categories = getAllCategories()
  const [search, setSearch] = useState('')

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-primary-500/30 text-sm text-primary-300 font-medium mb-4"
          >
            <Grid className="w-4 h-4" />
            20 catégories disponibles
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Toutes les <span className="gradient-text">catégories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg mx-auto mb-8"
          >
            Choisissez une catégorie pour découvrir nos designs et réserver votre création personnalisée
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 glass rounded-2xl border border-white/10 focus:border-primary-500/50 text-white placeholder:text-gray-500 text-sm outline-none transition-all"
            />
          </motion.div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Aucune catégorie trouvée pour &quot;{search}&quot;
          </div>
        )}
      </div>
    </div>
  )
}
