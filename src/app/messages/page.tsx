'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useAppStore } from '@/lib/store'
import { MessageSquare, Send, Sparkles, Bot } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function MessagesPage() {
  const { orders, messages, addMessage, markMessagesRead } = useAppStore()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    orders[0]?.id ?? null
  )
  const [newMessage, setNewMessage] = useState('')

  const orderMessages = messages.filter((m) => m.orderId === selectedOrderId)
  const selectedOrder = orders.find((o) => o.id === selectedOrderId)

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId)
    markMessagesRead(orderId)
  }

  const handleSend = () => {
    if (!newMessage.trim() || !selectedOrderId) return

    addMessage({
      id: 'msg-' + Date.now(),
      orderId: selectedOrderId,
      senderId: 'client',
      senderType: 'client',
      content: newMessage.trim(),
      createdAt: new Date().toISOString(),
      read: true,
    })

    // Auto-reply simulation
    setTimeout(() => {
      addMessage({
        id: 'msg-auto-' + Date.now(),
        orderId: selectedOrderId,
        senderId: selectedOrder?.design.designer.id || 'des-001',
        senderType: 'designer',
        content: 'Merci pour votre message ! Je prends note et je travaille sur votre design. Votre création sera prête très bientôt.',
        createdAt: new Date().toISOString(),
        read: false,
      })
    }, 1500)

    setNewMessage('')
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Aucun message</h2>
          <p className="text-gray-400">Passez votre première commande pour pouvoir échanger avec vos designers.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-80px)] flex flex-col">
        <div className="py-4 border-b border-white/5">
          <h1 className="text-xl font-black text-white">Messages</h1>
        </div>

        <div className="flex-1 flex gap-0 min-h-0">
          {/* Sidebar – conversations */}
          <div className="w-72 border-r border-white/5 flex flex-col flex-shrink-0">
            <div className="flex-1 overflow-y-auto py-2">
              {orders.map((order) => {
                const unread = messages.filter(
                  (m) => m.orderId === order.id && !m.read && m.senderType !== 'client'
                ).length
                const lastMsg = messages.filter((m) => m.orderId === order.id).slice(-1)[0]

                return (
                  <button
                    key={order.id}
                    onClick={() => handleSelectOrder(order.id)}
                    className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-all text-left ${
                      selectedOrderId === order.id ? 'bg-primary-500/10 border-r-2 border-primary-500' : ''
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={order.design.designer.avatar}
                        alt={order.design.designer.name}
                        fill
                        className="object-cover"
                      />
                      {unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white">{unread}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{order.design.designer.name}</div>
                      <div className="text-xs text-gray-500 truncate">{order.design.title}</div>
                      {lastMsg && (
                        <div className="text-xs text-gray-600 truncate mt-0.5">{lastMsg.content}</div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            {selectedOrder ? (
              <>
                {/* Chat header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={selectedOrder.design.designer.avatar}
                      alt={selectedOrder.design.designer.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-dark-950" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{selectedOrder.design.designer.name}</div>
                    <div className="text-xs text-green-400">En ligne · Designer</div>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">Commande #{selectedOrder.id}</div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {orderMessages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">Démarrez la conversation avec votre designer</p>
                    </div>
                  )}

                  {orderMessages.map((msg) => {
                    const isClient = msg.senderType === 'client'
                    const isSystem = msg.senderType === 'system'

                    if (isSystem) {
                      return (
                        <div key={msg.id} className="flex justify-center">
                          <div className="glass rounded-2xl px-4 py-3 border border-primary-500/20 max-w-sm text-center">
                            <div className="flex items-center gap-2 justify-center text-primary-400 text-xs font-semibold mb-1">
                              <Sparkles className="w-3 h-3" />
                              Système DiaCiss
                            </div>
                            <p className="text-sm text-gray-300">{msg.content}</p>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-end gap-2 ${isClient ? 'flex-row-reverse' : ''}`}
                      >
                        {!isClient && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={selectedOrder.design.designer.avatar}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                            isClient
                              ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-br-md'
                              : 'glass border border-white/10 text-gray-200 rounded-bl-md'
                          }`}
                        >
                          {msg.content}
                          <div className={`text-[10px] mt-1 ${isClient ? 'text-primary-200' : 'text-gray-500'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Input */}
                <div className="px-6 py-4 border-t border-white/5">
                  {selectedOrder.status === 'delivered' && (
                    <div className="mb-3 px-3 py-2 glass rounded-xl border border-green-500/20 text-xs text-green-400 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Votre design est prêt ! Consultez votre commande pour payer et télécharger.
                    </div>
                  )}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Écrivez un message..."
                      className="flex-1 px-4 py-3 glass rounded-2xl border border-white/10 focus:border-primary-500/50 text-white placeholder:text-gray-600 text-sm outline-none transition-all"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl transition-all shadow-lg shadow-primary-500/25"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Sélectionnez une conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
