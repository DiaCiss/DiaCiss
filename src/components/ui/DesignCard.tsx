'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import type { Design } from '@/types'
import { formatPrice } from '@/lib/utils'

interface DesignCardProps {
  design: Design
  index?: number
}

const tierLabel: Record<string, string> = {
  basic: 'BASIQUE',
  standard: 'STANDARD',
  premium: 'PREMIUM',
  exclusive: 'EXCLUSIF',
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
                design.tier === 'exclusive' ? 'badge-premium' :
                design.tier === 'premium' ? 'badge-premium' :
                design.tier === 'standard' ? 'badge-inter' : 'badge-basic'
              }`}>
                {tierLabel[design.tier]}
              </span>
            </div>
            {design.isExclusive && (
              <div className="absolute bottom-0 inset-x-0 bg-amber-500/90 text-white text-[10px] font-bold text-center py-1">
                EXCLUSIF — 1 seul acheteur
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-sand-900 text-sm leading-tight line-clamp-2 group-hover:text-primary-500 transition-colors">
                {design.title}
              </h3>
              <span className="text-primary-500 font-black text-sm whitespace-nowrap">
                {formatPrice(design.price)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-sand-100">
              <span className="flex items-center gap-1 text-xs text-sand-400">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {design.rating} · {design.reviewCount} avis
              </span>
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
