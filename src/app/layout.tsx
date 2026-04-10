import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'EasilyDesign — Votre design pro en moins d\'une heure',
  description:
    'La première marketplace africaine de designs créatifs personnalisés. Livraison en 1h par nos designers professionnels.',
  keywords: 'design, graphisme, flyer, affiche, mariage, restaurant, réseaux sociaux, Afrique',
  openGraph: {
    title: 'EasilyDesign — Votre design pro en moins d\'une heure',
    description: 'Designs personnalisés livrés en 1 heure par des professionnels africains',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-sand-50 text-sand-900">
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1A1A1A',
              border: '1px solid #E2DDD5',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
