'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, RefreshCw, ChevronRight } from 'lucide-react'
import type { Design } from '@/types'
import { PRICING_TIERS } from '@/types'
import { formatPrice } from '@/lib/utils'

interface DesignCardProps {
  design: Design
  index?: number
}

export default function DesignCard({ design, index = 0 }: DesignCardProps) {
  const tier = PRICING_TIERS[design.tier]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="card-hover group"
    >
      <Link href={`/design/${design.id}`} className="block">
        <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={design.imageUrl}
              alt={design.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Tier badge */}
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold ${tier.bgColor} ${tier.textColor} border ${tier.borderColor} backdrop-blur-sm`}>
              {tier.label}
            </div>
            {/* Price badge */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-black text-white bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg backdrop-blur-sm">
              {formatPrice(design.price)}
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="flex items-center gap-1 text-white text-sm font-semibold bg-primary-600/90 px-4 py-2 rounded-full">
                Voir les détails <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1 group-hover:text-primary-300 transition-colors">
              {design.title}
            </h3>

            <div className="flex items-center gap-1 mb-3">
              {design.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
                  {design.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {design.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  {design.maxRetouches} retouches
                </span>
              </div>
            </div>

            {/* Designer */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={design.designer.avatar}
                  alt={design.designer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-gray-400">{design.designer.name}</span>
              <div className="ml-auto flex items-center gap-1">
                <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
                <span className="text-xs text-gray-400">{design.designer.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
