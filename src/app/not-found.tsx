import Link from 'next/link'
import { ChevronLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <div className="w-16 h-16 glass rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-primary-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Page introuvable</h2>
        <p className="text-gray-400 mb-8">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-2xl"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
