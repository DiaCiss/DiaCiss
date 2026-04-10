'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types'

interface CategorySectionProps {
  categories: Category[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 bg-white border-t border-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-sand-400 mb-1"
            >
              20 spécialités pour répondre à tous vos besoins business
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black text-sand-900"
            >
              Explorez par catégorie
            </motion.h2>
          </div>
          <Link
            href="/categories"
            className="hidden md:flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 font-semibold group"
          >
            Tout voir <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Featured first category — larger */}
          {categories.slice(0, 1).map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 row-span-1"
            >
              <Link href={`/categorie/${cat.slug}`}>
                <div className="card h-full p-5 flex items-start gap-4 hover:border-primary-200 group">
                  <div className="text-3xl mt-0.5">{cat.icon}</div>
                  <div>
                    <div className="font-bold text-sand-900 group-hover:text-primary-500 transition-colors">{cat.name}</div>
                    <div className="text-xs text-sand-400 mt-0.5 line-clamp-2">{cat.description}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Rest — small */}
          {categories.slice(1, 13).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/categorie/${cat.slug}`}>
                <div className="card p-4 flex items-center gap-3 hover:border-primary-200 group cursor-pointer">
                  <div className="text-xl flex-shrink-0">{cat.icon}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-sand-900 group-hover:text-primary-500 transition-colors truncate">{cat.name}</div>
                    <div className="text-xs text-sand-400">{cat.designCount} designs</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
