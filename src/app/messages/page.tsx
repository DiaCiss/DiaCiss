'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Send, Sparkles, Bot, CheckCheck } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import AppSidebar from '@/components/layout/AppSidebar'

export default function MessagesPage() {
  const { orders, messages, addMessage, markMessagesRead } = useAppStore()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id ?? null)
  const [newMessage, setNewMessage] = useState('')

  const selectedOrder = orders.find((o) => o.id === selectedOrderId)
  const orderMessages = messages.filter((m) => m.orderId === selectedOrderId)

  const handleSelect = (id: string) => {
    setSelectedOrderId(id)
    markMessagesRead(id)
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
    setTimeout(() => {
      addMessage({
        id: 'msg-auto-' + Date.now(),
        orderId: selectedOrderId,
        senderId: selectedOrder?.design.designer.id || 'des-001',
        senderType: 'designer',
        content: 'Merci pour votre message ! Je travaille activement sur votre design. Je vous envoie une preview très bientôt.',
        createdAt: new Date().toISOString(),
        read: false,
      })
    }, 1200)
    setNewMessage('')
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
        <div className="w-72 flex-shrink-0 border-r border-sand-200 bg-white flex flex-col">
          <div className="px-4 py-3 border-b border-sand-100">
            <h2 className="font-black text-sand-900 text-sm">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {orders.map((order) => {
              const unread = messages.filter((m) => m.orderId === order.id && !m.read && m.senderType !== 'client').length
              const lastMsg = messages.filter((m) => m.orderId === order.id).slice(-1)[0]
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
                      {unread > 0 && (
                        <span className="w-5 h-5 bg-primary-500 text-white text-[10px] font-black rounded-full flex items-center justify-center flex-shrink-0">
                          {unread}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-sand-400 truncate">{order.design.title}</div>
                    {lastMsg && <div className="text-xs text-sand-300 truncate mt-0.5">{lastMsg.content}</div>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Chat area */}
        {selectedOrder ? (
          <div className="flex-1 flex flex-col bg-sand-50 min-w-0">
            {/* Chat header */}
            <div className="px-5 py-3 bg-white border-b border-sand-200 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image src={selectedOrder.design.designer.avatar} alt={selectedOrder.design.designer.name} fill className="object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white" />
              </div>
              <div>
                <div className="font-bold text-sand-900 text-sm">{selectedOrder.design.designer.name}</div>
                <div className="text-xs text-green-500">En ligne · Designer</div>
              </div>
              <div className="ml-auto text-xs text-sand-400">#{selectedOrder.id}</div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {orderMessages.length === 0 && (
                <div className="text-center py-8 text-sand-400">
                  <Bot className="w-8 h-8 mx-auto mb-2 text-sand-300" />
                  <p className="text-sm">Démarrez la conversation</p>
                </div>
              )}

              {orderMessages.map((msg) => {
                const isClient = msg.senderType === 'client'
                const isSystem = msg.senderType === 'system'

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="bg-white border border-sand-200 rounded-2xl px-4 py-2.5 max-w-sm text-center shadow-sm">
                        <div className="flex items-center justify-center gap-1 text-primary-500 text-xs font-bold mb-1">
                          <Sparkles className="w-3 h-3" /> EasilyDesign
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
                          {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isClient && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Input */}
            <div className="px-5 py-3 bg-white border-t border-sand-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Écrivez un message..."
                  className="flex-1 px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm outline-none focus:border-primary-400 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="w-11 h-11 flex items-center justify-center btn-primary rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
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
