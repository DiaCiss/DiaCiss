'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart } from 'lucide-react'
import type { Design } from '@/types'
import { formatPrice } from '@/lib/utils'

interface FeaturedDesignsProps {
  designs: Design[]
}

const tierLabel: Record<string, string> = {
  basic: 'BASIQUE',
  intermediate: 'INTERMÉDIAIRE',
  premium: 'PREMIUM',
}

export default function FeaturedDesigns({ designs }: FeaturedDesignsProps) {
  return (
    <section className="py-16 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-sand-400 mb-1"
            >
              Ce que les marques africaines adorent en ce moment
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black text-sand-900"
            >
              Designs Populaires
            </motion.h2>
          </div>
          <Link
            href="/categories"
            className="hidden md:flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 font-semibold group"
          >
            Tout voir <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.slice(0, 6).map((design, i) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/design/${design.id}`}>
                <div className="card group overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-sand-100">
                    <Image
                      src={design.imageUrl}
                      alt={design.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`badge ${
                        design.tier === 'premium' ? 'badge-premium' :
                        design.tier === 'intermediate' ? 'badge-inter' : 'badge-basic'
                      }`}>
                        {tierLabel[design.tier]}
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-sand-400 hover:text-primary-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sand-900 text-sm leading-tight line-clamp-2 group-hover:text-primary-500 transition-colors">
                        {design.title}
                      </h3>
                      <span className="text-primary-500 font-black text-sm whitespace-nowrap">
                        {formatPrice(design.price)}
                      </span>
                    </div>

                    <p className="text-xs text-sand-400 mb-3 flex items-center gap-1">
                      <span className="w-4 h-4 bg-sand-200 rounded-full inline-flex items-center justify-center text-[10px]">D</span>
                      Designer : {design.designer.name}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sand-400">
                        ★ {design.rating} · {design.reviewCount} avis
                      </span>
                      <span className="text-xs font-semibold text-sand-600 hover:text-primary-500 flex items-center gap-0.5 group-hover:text-primary-500 transition-colors">
                        Voir le détail <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
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
