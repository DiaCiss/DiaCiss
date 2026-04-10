import { PRICING_TIERS, type PricingTier } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Clock, RefreshCw, FileText } from 'lucide-react'

interface TierCardProps {
  tier: PricingTier
  selected?: boolean
  onClick?: () => void
  highlight?: boolean
}

export function TierCard({ tier, selected, onClick, highlight }: TierCardProps) {
  const config = PRICING_TIERS[tier]

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl p-4 border-2 cursor-pointer transition-all ${
        highlight
          ? 'bg-primary-500 border-primary-500 text-white'
          : selected
          ? 'border-primary-500 bg-primary-50'
          : 'border-sand-200 bg-white hover:border-primary-200'
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-sand-900 text-white text-xs font-bold rounded-full whitespace-nowrap">
          MEILLEUR CHOIX
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className={`font-bold text-base ${highlight ? 'text-white' : 'text-sand-900'}`}>
          {config.label}
        </div>
        <div className={`font-black text-xl ${highlight ? 'text-white' : 'text-primary-500'}`}>
          {formatPrice(config.price)}
        </div>
      </div>

      <div className={`space-y-1.5 text-sm ${highlight ? 'text-orange-100' : 'text-sand-500'}`}>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          {config.deliveryTime}
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
          {config.maxRetouches} révision{config.maxRetouches > 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 flex-shrink-0" />
          JPG
        </div>
      </div>
    </div>
  )
}

export default function PricingBadge({ tier }: { tier: PricingTier }) {
  const config = PRICING_TIERS[tier]
  const cls =
    tier === 'exclusive' || tier === 'premium' ? 'badge-premium' :
    tier === 'standard' ? 'badge-inter' : 'badge-basic'

  return (
    <span className={`badge ${cls}`}>
      {config.label} · {formatPrice(config.price)}
    </span>
  )
}
