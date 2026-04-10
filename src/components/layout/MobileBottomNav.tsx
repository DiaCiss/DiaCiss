'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, ShoppingBag, MessageSquare } from 'lucide-react'
import { useAppStore } from '@/lib/store'

const items = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/categories', icon: LayoutGrid, label: 'Catégories' },
  { href: '/commandes', icon: ShoppingBag, label: 'Commandes' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { orders, getUnreadCount } = useAppStore()
  const unread = getUnreadCount()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand-200 safe-area-inset-bottom">
      <div className="grid grid-cols-4">
        {items.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          const hasNotif = (href === '/commandes' && orders.length > 0) || (href === '/messages' && unread > 0)

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center py-2.5 gap-1 relative transition-colors ${
                isActive ? 'text-primary-500' : 'text-sand-400 hover:text-sand-700'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {hasNotif && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-white" />
                )}
              </div>
              <span className="text-[10px] font-semibold">{label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary-500 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
