import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, Message } from '@/types'

interface AppState {
  orders: Order[]
  messages: Message[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  addMessage: (message: Message) => void
  markMessagesRead: (orderId: string) => void
  getUnreadCount: () => number
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      orders: [],
      messages: [],

      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),

      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })),

      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      markMessagesRead: (orderId) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.orderId === orderId ? { ...m, read: true } : m
          ),
        })),

      getUnreadCount: () => {
        const { messages } = get()
        return messages.filter((m) => !m.read && m.senderType !== 'client').length
      },
    }),
    {
      name: 'diaciss-store',
    }
  )
)
