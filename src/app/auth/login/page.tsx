'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/commandes'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    setLoading(false)

    if (error) {
      toast.error(
        error.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect'
          : 'Connexion échouée. Vérifiez vos identifiants.'
      )
    } else {
      toast.success('Connexion réussie !')
      router.push(redirectTo)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-black">
              <span className="text-primary-500">Isali</span>
              <span className="text-sand-900">Design</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-sand-900 mb-1">Bon retour !</h1>
          <p className="text-sand-400 text-sm">Connectez-vous pour accéder à vos commandes</p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            <div>
              <label className="block text-xs font-semibold text-sand-700 uppercase tracking-wide mb-1.5">
                Adresse email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-sand-200 rounded-xl text-[#1A1A1A] font-medium placeholder-sand-300 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sand-700 uppercase tracking-wide mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 bg-white border-2 border-sand-200 rounded-xl text-[#1A1A1A] font-medium placeholder-sand-300 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sand-400 hover:text-sand-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 btn-primary rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 text-base mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Se connecter <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-sand-400 mt-6">
            Pas encore de compte ?{' '}
            <Link href="/auth/register" className="text-primary-500 font-semibold hover:text-primary-600">
              S&apos;inscrire gratuitement
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
