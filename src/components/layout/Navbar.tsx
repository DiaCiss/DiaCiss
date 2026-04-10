'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, MessageSquare, Search, Bell } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { orders, getUnreadCount } = useAppStore()
  const unreadCount = getUnreadCount()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/categories', label: 'Browse' },
    { href: '/designers', label: 'Designers' },
    { href: '/comment-ca-marche', label: 'Learn' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white border-b border-sand-200 shadow-sm' : 'bg-sand-50'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-black tracking-tight text-primary-500">
              Easily<span className="text-sand-900">Design</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-sand-700 hover:text-sand-900 rounded-lg hover:bg-sand-100 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center justify-center w-9 h-9 text-sand-500 hover:text-sand-900 hover:bg-sand-100 rounded-lg transition-all">
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/messages"
              className="relative flex items-center justify-center w-9 h-9 text-sand-500 hover:text-sand-900 hover:bg-sand-100 rounded-lg transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-sand-50" />
              )}
            </Link>

            <Link
              href="/commandes"
              className="relative flex items-center justify-center w-9 h-9 text-sand-500 hover:text-sand-900 hover:bg-sand-100 rounded-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              {orders.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-sand-50" />
              )}
            </Link>

            <Link
              href="/commandes"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sand-600 hover:text-sand-900 text-sm font-medium rounded-lg hover:bg-sand-100 transition-all"
            >
              Log In
            </Link>

            <Link
              href="/categories"
              className="hidden md:flex items-center px-5 py-2 btn-primary text-sm rounded-xl"
            >
              Get Started
            </Link>

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 text-sand-500 hover:text-sand-900 hover:bg-sand-100 rounded-lg"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-sand-200"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-sand-700 hover:text-sand-900 hover:bg-sand-100 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/categories"
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-3 mt-2 btn-primary text-sm text-center rounded-xl"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
