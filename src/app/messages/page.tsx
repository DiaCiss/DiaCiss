'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Send, Sparkles, Bot, CheckCheck } from 'lucide-react'
import AppSidebar from '@/components/layout/AppSidebar'
import { getDesignById } from '@/lib/data'
import type { Design } from '@/types'
import type { Database } from '@/types/database'
import { createClient } from '@/lib/supabase/client'

type OrderRow = Database['public']['Tables']['orders']['Row']
type MessageRow = Database['public']['Tables']['messages']['Row']
type EnrichedOrder = OrderRow & { design: Design }

function enrichOrder(row: OrderRow): EnrichedOrder | null {
  const design = getDesignById(row.design_id)
  return design ? { ...row, design } : null
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const defaultOrderId = searchParams.get('orderId')

  const [orders, setOrders] = useState<EnrichedOrder[]>([])
  const [messages, setMessages] = useState<MessageRow[]>([])
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(defaultOrderId)
  const [newMessage, setNewMessage] = useState('')
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders')
        if (!res.ok) return
        const { orders: rows } = await res.json() as { orders: OrderRow[] }
        const enriched = rows.map(enrichOrder).filter(Boolean) as EnrichedOrder[]
        setOrders(enriched)
        // Auto-select first order if none selected
        if (!selectedOrderId && enriched.length > 0) {
          setSelectedOrderId(enriched[0].id)
        }
      } finally {
        setLoadingOrders(false)
      }
    }
    fetchOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch messages and subscribe to Realtime when order is selected
  useEffect(() => {
    if (!selectedOrderId) return

    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?orderId=${selectedOrderId}`)
      if (res.ok) {
        const { messages: data } = await res.json() as { messages: MessageRow[] }
        setMessages(data)
      }
    }
    fetchMessages()

    // Subscribe to new messages via Realtime
    const supabase = createClient()
    const channel = supabase
      .channel(`messages-${selectedOrderId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `order_id=eq.${selectedOrderId}`,
        },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.find((m) => m.id === (payload.new as MessageRow).id)) return prev
            return [...prev, payload.new as MessageRow]
          })
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [selectedOrderId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSelect = (id: string) => {
    setSelectedOrderId(id)
    setMessages([])
  }

  const handleSend = useCallback(async () => {
    if (!newMessage.trim() || !selectedOrderId || sendingMessage) return
    const text = newMessage.trim()
    setNewMessage('')
    setSendingMessage(true)
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: selectedOrderId, content: text }),
      })
    } finally {
      setSendingMessage(false)
    }
  }, [newMessage, selectedOrderId, sendingMessage])

  const selectedOrder = orders.find((o) => o.id === selectedOrderId)

  if (loadingOrders) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <Bot className="w-12 h-12 text-sand-300 mx-auto mb-4" />
          <h2 className="text-xl font-black text-sand-900 mb-2">Aucun message</h2>
          <p className="text-sand-400 mb-4">Passez votre première commande pour échanger avec vos designers.</p>
          <Link href="/categories" className="px-5 py-2.5 btn-primary rounded-xl text-sm inline-block">Lancer un projet</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 flex">
      <AppSidebar />

      <div className="flex-1 flex min-w-0 h-[calc(100vh-64px)]">
        {/* Conversation list */}
        <div className={`border-r border-sand-200 bg-white flex flex-col flex-shrink-0 ${selectedOrderId ? 'hidden lg:flex lg:w-72' : 'flex w-full lg:w-72'}`}>
          <div className="px-4 py-3 border-b border-sand-100">
            <h2 className="font-black text-sand-900 text-sm">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {orders.map((order) => {
              const isActive = selectedOrderId === order.id
              return (
                <button
                  key={order.id}
                  onClick={() => handleSelect(order.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-sand-100 transition-all ${
                    isActive ? 'bg-primary-50 border-r-2 border-r-primary-500' : 'hover:bg-sand-50'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={order.design.designer.avatar} alt={order.design.designer.name} fill className="object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold truncate ${isActive ? 'text-primary-600' : 'text-sand-900'}`}>
                        {order.design.designer.name}
                      </span>
                    </div>
                    <div className="text-xs text-sand-400 truncate">{order.design.title}</div>
                    <div className="text-[10px] text-sand-300 truncate mt-0.5">
                      #{order.id.slice(0, 8)}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Chat area */}
        {selectedOrder ? (
          <div className="flex-1 flex flex-col bg-sand-50 min-w-0 w-full lg:w-auto">
            {/* Chat header */}
            <div className="px-5 py-3 bg-white border-b border-sand-200 flex items-center gap-3">
              <button
                onClick={() => setSelectedOrderId(null)}
                className="lg:hidden text-xs text-primary-500 font-semibold mr-1"
              >
                ← Retour
              </button>
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image src={selectedOrder.design.designer.avatar} alt={selectedOrder.design.designer.name} fill className="object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white" />
              </div>
              <div>
                <div className="font-bold text-sand-900 text-sm">{selectedOrder.design.designer.name}</div>
                <div className="text-xs text-green-500">En ligne · Designer</div>
              </div>
              <div className="ml-auto text-xs text-sand-400 hidden sm:block">#{selectedOrder.id.slice(0, 8)}</div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8 text-sand-400">
                  <Bot className="w-8 h-8 mx-auto mb-2 text-sand-300" />
                  <p className="text-sm">Démarrez la conversation</p>
                </div>
              )}

              {messages.map((msg) => {
                const isClient = msg.sender_type === 'client'
                const isSystem = msg.sender_type === 'system'

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="bg-white border border-sand-200 rounded-2xl px-4 py-2.5 max-w-sm text-center shadow-sm">
                        <div className="flex items-center justify-center gap-1 text-primary-500 text-xs font-bold mb-1">
                          <Sparkles className="w-3 h-3" /> IsaliDesign
                        </div>
                        <p className="text-xs text-sand-600">{msg.content}</p>
                      </div>
                    </div>
                  )
                }

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end gap-2 ${isClient ? 'flex-row-reverse' : ''}`}
                  >
                    {!isClient && (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={selectedOrder.design.designer.avatar} alt="" fill className="object-cover" />
                      </div>
                    )}
                    <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                      isClient
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-white text-sand-800 border border-sand-200 rounded-bl-md'
                    }`}>
                      {msg.content}
                      <div className={`flex items-center justify-end gap-1 mt-1 ${isClient ? 'text-orange-200' : 'text-sand-300'}`}>
                        <span className="text-[10px]">
                          {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isClient && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-3 bg-white border-t border-sand-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Écrivez un message..."
                  className="flex-1 px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm outline-none focus:border-primary-400 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sendingMessage}
                  className="w-11 h-11 flex items-center justify-center btn-primary rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {sendingMessage ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sand-400">
            <div className="text-center">
              <Bot className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Sélectionnez une conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
