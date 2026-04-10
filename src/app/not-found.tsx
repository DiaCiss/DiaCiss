import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center max-w-sm px-4">
        <div className="text-8xl font-black text-primary-500 mb-2">404</div>
        <h2 className="text-2xl font-black text-sand-900 mb-3">Page introuvable</h2>
        <p className="text-sand-400 mb-8">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 btn-primary rounded-xl text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
