import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'DiaCiss — Marketplace de Designs Créatifs',
  description:
    'Commandez des designs personnalisés de qualité pour tous vos événements et projets. Livraison en 1h par nos designers professionnels.',
  keywords: 'design, graphisme, flyer, affiche, mariage, restaurant, réseaux sociaux, Afrique',
  openGraph: {
    title: 'DiaCiss — Marketplace de Designs Créatifs',
    description: 'Designs personnalisés livrés en 1 heure par des professionnels',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased">
        <div className="relative min-h-screen flex flex-col">
          {/* Background ambient glow */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-32 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary-800/15 rounded-full blur-3xl" />
          </div>

          <Navbar />

          <main className="flex-1 relative z-10">
            {children}
          </main>

          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 15, 25, 0.95)',
              color: '#fff',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}
