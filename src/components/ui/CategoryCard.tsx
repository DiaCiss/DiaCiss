'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/categorie/${category.slug}`}>
        <div className="card-hover glass rounded-2xl p-5 border border-white/5 hover:border-white/15 cursor-pointer group relative overflow-hidden">
          {/* Background gradient glow */}
          <div
            className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br ${category.gradient}`}
          />

          <div className="relative z-10">
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl mb-3 shadow-lg group-hover:scale-110 transition-transform`}
            >
              {category.icon}
            </div>

            {/* Name */}
            <h3 className="font-bold text-white text-sm mb-1 group-hover:text-primary-300 transition-colors">
              {category.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {category.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{category.designCount} designs</span>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
