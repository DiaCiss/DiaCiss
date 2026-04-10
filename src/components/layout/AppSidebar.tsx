'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, MessageSquare, Settings, LogOut, Plus } from 'lucide-react'
import { useAppStore } from '@/lib/store'

const navItems = [
  { href: '/commandes', icon: LayoutDashboard, label: 'DASHBOARD' },
  { href: '/commandes', icon: ShoppingBag, label: 'ORDERS', exact: true },
  { href: '/messages', icon: MessageSquare, label: 'MESSAGES' },
  { href: '#', icon: Settings, label: 'SETTINGS' },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { orders } = useAppStore()
  const activeOrders = orders.filter((o) => o.status === 'in_progress' || o.status === 'pending').length

  return (
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 sidebar sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-6 px-4">
      {/* Workspace */}
      <div className="flex items-center gap-3 mb-8 p-3 bg-sand-50 rounded-xl border border-sand-100">
        <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-4 h-4 text-primary-500" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-black text-sand-900 leading-tight">PROJECT WORKSPACE</div>
          <div className="text-xs text-sand-400">Managing {activeOrders} Active Order{activeOrders !== 1 ? 's' : ''}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-0.5 flex-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? 'bg-primary-50 text-primary-500'
                  : 'text-sand-500 hover:bg-sand-100 hover:text-sand-900'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* New Order */}
      <div className="mt-6 space-y-2">
        <Link href="/categories" className="flex items-center justify-center gap-2 w-full py-2.5 btn-primary rounded-xl text-xs">
          <Plus className="w-4 h-4" />
          New Order
        </Link>
        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-sand-400 hover:text-sand-700 transition-colors">
          <LogOut className="w-4 h-4" />
          LOGOUT
        </button>
      </div>
    </aside>
  )
}
