'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Plus, MessageSquare, Eye, Download, RefreshCw, CreditCard } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { PRICING_TIERS } from '@/types'
import { formatPrice } from '@/lib/utils'
import AppSidebar from '@/components/layout/AppSidebar'

type Tab = 'all' | 'active' | 'done'

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending:            { label: 'En attente',        color: 'text-yellow-700', bg: 'bg-yellow-100' },
  in_progress:        { label: 'En cours de design', color: 'text-blue-700',   bg: 'bg-blue-100'   },
  delivered:          { label: 'Prêt pour révision', color: 'text-purple-700', bg: 'bg-purple-100' },
  paid:               { label: 'Payé',               color: 'text-green-700',  bg: 'bg-green-100'  },
  completed:          { label: 'Livré',              color: 'text-sand-700',   bg: 'bg-sand-100'   },
  revision_requested: { label: 'Révision demandée',  color: 'text-orange-700', bg: 'bg-orange-100' },
}

const PROGRESS_STEPS = ['Commandé', 'En Design', 'Révision', 'Livré']

function progressIndex(status: string) {
  const map: Record<string, number> = {
    pending: 0, in_progress: 1, revision_requested: 2,
    delivered: 3, paid: 3, completed: 3,
  }
  return map[status] ?? 0
}

export default function CommandesPage() {
  const { orders, updateOrderStatus } = useAppStore()
  const [tab, setTab] = useState<Tab>('all')
  const [search, setSearch] = useState('')

  const filtered = orders.filter((o) => {
    const matchTab = tab === 'all' || (tab === 'active' && ['pending', 'in_progress', 'revision_requested', 'delivered'].includes(o.status)) || (tab === 'done' && ['paid', 'completed'].includes(o.status))
    const matchSearch = o.design.title.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const activeCount = orders.filter((o) => ['pending', 'in_progress', 'revision_requested', 'delivered'].includes(o.status)).length
  const doneCount = orders.filter((o) => ['paid', 'completed'].includes(o.status)).length

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-2xl font-black text-sand-900 mb-2">Aucune commande</h2>
          <p className="text-sand-400 mb-6">Lancez votre premier projet et recevez votre design en moins d&apos;une heure.</p>
          <Link href="/categories" className="inline-flex items-center gap-2 px-6 py-3 btn-primary rounded-xl text-sm">
            <Plus className="w-4 h-4" /> Nouvelle commande
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 flex">
      <AppSidebar />

      <div className="flex-1 min-w-0 py-8 px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-sand-900">Mes Commandes</h1>
            <p className="text-sm text-sand-400">Suivez l&apos;évolution de vos projets créatifs en temps réel.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une commande..."
                className="pl-9 pr-4 py-2 text-sm border border-sand-200 rounded-xl bg-white outline-none focus:border-primary-400 w-56"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 mb-6 border-b border-sand-200">
          {([
            { key: 'all' as Tab, label: `Toutes les commandes (${orders.length})` },
            { key: 'active' as Tab, label: `En cours (${activeCount})` },
            { key: 'done' as Tab, label: `Terminées (${doneCount})` },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-all ${
                tab === key ? 'border-primary-500 text-primary-500' : 'border-transparent text-sand-500 hover:text-sand-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((order, i) => {
            const s = statusConfig[order.status] || statusConfig.pending
            const prog = progressIndex(order.status)
            const tier = PRICING_TIERS[order.tier]

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-sand-100">
                    <Image src={order.design.imageUrl} alt={order.design.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="badge badge-premium text-[10px]">{order.design.categorySlug.replace(/-/g, ' ').toUpperCase()}</span>
                      <span className="text-xs text-sand-400">#{order.id}</span>
                      <span className={`badge text-[10px] ml-auto ${s.bg} ${s.color}`}>{s.label}</span>
                    </div>
                    <div className="font-black text-sand-900 mt-1 line-clamp-1">{order.design.title}</div>
                    <div className="text-xs text-sand-400">
                      Designer :{' '}
                      <span className="font-semibold text-primary-500">{order.design.designer.name}</span>
                    </div>
                    <div className="font-bold text-sand-900 mt-1">
                      {formatPrice(order.price)}
                      <span className="text-xs font-normal text-sand-400 ml-2">
                        Retouches restantes : {order.maxRetouches - order.retouchesUsed}/{order.maxRetouches}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    {PROGRESS_STEPS.map((s, idx) => (
                      <div key={s} className="flex flex-col items-center gap-1 flex-1">
                        <div className={`w-2 h-2 rounded-full ${idx <= prog ? 'bg-primary-500' : 'bg-sand-200'}`} />
                        {idx < PROGRESS_STEPS.length - 1 && (
                          <div className="sr-only" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="relative flex items-center">
                    {PROGRESS_STEPS.map((_, idx) => (
                      idx < PROGRESS_STEPS.length - 1 && (
                        <div key={idx} className={`flex-1 h-0.5 ${idx < prog ? 'bg-primary-500' : 'bg-sand-200'}`} />
                      )
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    {PROGRESS_STEPS.map((label, idx) => (
                      <span key={label} className={`text-[10px] ${idx <= prog ? 'text-primary-500 font-semibold' : 'text-sand-300'}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href="/messages" className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sand-600 border border-sand-200 rounded-lg hover:border-sand-300 transition-all">
                    <MessageSquare className="w-3.5 h-3.5" /> Ouvrir le chat
                  </Link>

                  {order.status === 'in_progress' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold btn-primary rounded-lg"
                    >
                      <Eye className="w-3.5 h-3.5" /> Voir le design
                    </button>
                  )}

                  {order.status === 'delivered' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'paid')}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold btn-primary rounded-lg"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Valider &amp; Télécharger
                      </button>
                    </>
                  )}

                  {order.status === 'paid' && (
                    <>
                      {order.retouchesUsed < order.maxRetouches && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'revision_requested')}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sand-600 border border-sand-200 rounded-lg hover:border-primary-300 transition-all"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Demander une retouche
                        </button>
                      )}
                      <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold btn-primary rounded-lg">
                        <Download className="w-3.5 h-3.5" /> Télécharger les sources
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* New project CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filtered.length * 0.06 }}
          >
            <Link href="/categories">
              <div className="card border-dashed border-2 border-sand-200 flex flex-col items-center justify-center p-8 text-center min-h-[200px] hover:border-primary-300 group transition-all">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
                  <Plus className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <div className="font-black text-sand-900 mb-1">Nouveau Projet ?</div>
                <p className="text-xs text-sand-400">Transformez vos idées en designs professionnels en quelques clics.</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
