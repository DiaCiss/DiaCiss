import { PRICING_TIERS, type PricingTier } from '@/types'
import { formatPrice } from '@/lib/utils'
import { RefreshCw, Clock, Zap } from 'lucide-react'

interface PricingBadgeProps {
  tier: PricingTier
  size?: 'sm' | 'md' | 'lg'
}

export default function PricingBadge({ tier, size = 'md' }: PricingBadgeProps) {
  const config = PRICING_TIERS[tier]

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <div className={`inline-flex items-center gap-2 ${sizeClasses[size]} rounded-xl ${config.bgColor} ${config.textColor} border ${config.borderColor} font-semibold`}>
      <span>{config.label}</span>
      <span className="font-black">{formatPrice(config.price)}</span>
    </div>
  )
}

interface PricingCardProps {
  tier: PricingTier
  selected?: boolean
  onClick?: () => void
}

export function PricingCard({ tier, selected, onClick }: PricingCardProps) {
  const config = PRICING_TIERS[tier]
  const icons = { basic: Zap, intermediate: RefreshCw, premium: Clock }
  const Icon = icons[tier]

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${
        selected
          ? `${config.bgColor} ${config.borderColor} shadow-lg`
          : 'glass border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-md`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className={`text-2xl font-black ${selected ? config.textColor : 'text-white'}`}>
          {formatPrice(config.price)}
        </div>
      </div>

      <div className={`font-bold text-base mb-1 ${selected ? config.textColor : 'text-white'}`}>
        Niveau {config.label}
      </div>

      <div className="space-y-1.5 mt-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          Livraison en {config.deliveryTime}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
          {config.maxRetouches} retouches incluses
        </div>
      </div>
    </button>
  )
}
