'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { PRICING_TIERS } from '@/types'
import { formatPrice } from '@/lib/utils'
import { ShoppingBag, Clock, CheckCircle, CreditCard, AlertCircle, RefreshCw, MessageSquare, ChevronRight } from 'lucide-react'

const statusConfig = {
  pending: { label: 'En attente', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  in_progress: { label: 'En cours', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  delivered: { label: 'Livré', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  paid: { label: 'Payé', icon: CreditCard, color: 'text-primary-400', bg: 'bg-primary-400/10', border: 'border-primary-400/30' },
  completed: { label: 'Terminé', icon: CheckCircle, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30' },
  revision_requested: { label: 'Retouche demandée', icon: RefreshCw, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' },
}

export default function CommandesPage() {
  const { orders, updateOrderStatus } = useAppStore()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Aucune commande</h2>
          <p className="text-gray-400 mb-6">Vous n&apos;avez pas encore passé de commande. Explorez nos designs et commandez votre premier visuel !</p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-2xl"
          >
            Parcourir les designs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-1">Mes Commandes</h1>
          <p className="text-gray-400">{orders.length} commande{orders.length > 1 ? 's' : ''}</p>
        </div>

        <div className="space-y-4">
          {orders.map((order, i) => {
            const statusInfo = statusConfig[order.status]
            const StatusIcon = statusInfo.icon
            const tier = PRICING_TIERS[order.tier]

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-2xl border border-white/5 overflow-hidden"
              >
                <div className="p-5 flex items-start gap-4">
                  {/* Design thumb */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={order.design.imageUrl}
                      alt={order.design.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-white text-sm">{order.design.title}</h3>
                        <p className="text-xs text-gray-500">#{order.id}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusInfo.bg} ${statusInfo.color} border ${statusInfo.border} flex-shrink-0`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className={`${tier.textColor}`}>{tier.label}</span>
                      <span>{formatPrice(order.price)}</span>
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        {order.retouchesUsed}/{order.maxRetouches} retouches
                      </span>
                    </div>

                    {/* Progress bar */}
                    {order.retouchesUsed > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Retouches utilisées</span>
                          <span>{order.retouchesUsed}/{order.maxRetouches}</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${tier.color} rounded-full`}
                            style={{ width: `${(order.retouchesUsed / order.maxRetouches) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/messages"
                        className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-white/10 hover:border-white/20 text-xs text-gray-300 hover:text-white transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Messages
                      </Link>

                      {order.status === 'delivered' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'paid')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-xs text-white font-semibold transition-all hover:opacity-90"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Payer maintenant
                          </button>
                          {order.retouchesUsed < order.maxRetouches && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'revision_requested')}
                              className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-orange-500/30 text-xs text-orange-400 hover:bg-orange-500/10 transition-all"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              Demander une retouche
                            </button>
                          )}
                        </>
                      )}

                      {order.status === 'in_progress' && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-400">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          Votre designer travaille dessus...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment methods */}
                {order.status === 'delivered' && (
                  <div className="border-t border-white/5 px-5 py-4 bg-green-400/5">
                    <p className="text-xs text-gray-400 mb-3 font-medium">Choisissez votre mode de paiement :</p>
                    <div className="flex flex-wrap gap-2">
                      {['Orange Money', 'Wave', 'Free Money'].map((method) => (
                        <button
                          key={method}
                          onClick={() => updateOrderStatus(order.id, 'paid')}
                          className="px-4 py-2 glass rounded-xl border border-white/10 hover:border-green-500/30 text-xs text-white font-semibold hover:bg-green-500/10 transition-all"
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
