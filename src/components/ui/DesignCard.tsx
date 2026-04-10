'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import type { Design } from '@/types'
import { formatPrice } from '@/lib/utils'

interface DesignCardProps {
  design: Design
  index?: number
}

const tierLabel: Record<string, string> = {
  basic: 'BASIQUE',
  intermediate: 'INTERMÉDIAIRE',
  premium: 'PREMIUM',
}

export default function DesignCard({ design, index = 0 }: DesignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
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
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-bold text-sand-900 text-sm leading-tight line-clamp-2 group-hover:text-primary-500 transition-colors">
                {design.title}
              </h3>
              <span className="text-primary-500 font-black text-sm whitespace-nowrap">
                {formatPrice(design.price)}
              </span>
            </div>

            <p className="text-xs text-sand-400 mb-3 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-sand-200 inline-flex items-center justify-center text-[9px] font-bold text-sand-600">
                {design.designer.name[0]}
              </span>
              Designer : {design.designer.name}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-sand-100">
              <span className="text-xs text-sand-400">★ {design.rating} · {design.reviewCount} avis</span>
              <span className="text-xs font-semibold text-sand-600 group-hover:text-primary-500 flex items-center gap-0.5 transition-colors">
                Voir le détail <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
