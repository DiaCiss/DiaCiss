'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
    >
      <Link href={`/categorie/${category.slug}`}>
        <div className="card p-4 cursor-pointer group hover:border-primary-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">{category.icon}</div>
            <div className="font-bold text-sm text-sand-900 group-hover:text-primary-500 transition-colors leading-tight">
              {category.name}
            </div>
          </div>
          <p className="text-xs text-sand-400 line-clamp-2 mb-3 leading-relaxed">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-sand-400">{category.designCount} designs</span>
            <ArrowRight className="w-3.5 h-3.5 text-sand-300 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
