'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'

/**
 * Wraps the marketplace chrome (Navbar / Footer / MobileBottomNav).
 * Standalone landing routes (e.g. the Optimum AI page) opt out of this
 * chrome so they can render full-bleed with their own header/footer.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBare = pathname?.startsWith('/optimum-ai')

  if (isBare) {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
