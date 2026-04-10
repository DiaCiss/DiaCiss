'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Send, Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  'Flyer mariage traditionnel',
  'Logo restaurant africain',
  'Affiche graduation',
  'Post réseaux sociaux',
  'Invitation anniversaire',
]

const KEYWORD_MAP: Record<string, string> = {
  mariage: 'mariage',
  wedding: 'mariage',
  restaurant: 'restauration',
  menu: 'restauration',
  food: 'restauration',
  graduation: 'graduation',
  diplôme: 'graduation',
  thèse: 'graduation',
  soutenance: 'graduation',
  anniversaire: 'anniversaire',
  birthday: 'anniversaire',
  festival: 'festival',
  concert: 'concert-musique',
  musique: 'concert-musique',
  'réseaux sociaux': 'reseaux-sociaux',
  instagram: 'reseaux-sociaux',
  facebook: 'reseaux-sociaux',
  post: 'reseaux-sociaux',
  banque: 'banque-finance',
  finance: 'banque-finance',
  baptême: 'bapteme-naissance',
  naissance: 'bapteme-naissance',
}

function findCategory(text: string): string {
  const lower = text.toLowerCase()
  for (const [key, slug] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(key)) return slug
  }
  return ''
}

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (text: string) => {
    const q = text || query
    if (!q.trim()) return
    const slug = findCategory(q)
    if (slug) {
      router.push(`/categorie/${slug}`)
    } else {
      router.push(`/categories`)
    }
  }

  return (
    <section className="pt-24 pb-10 bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-full mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary-500" />
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">Marketplace Créative Africaine</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-sand-900 mb-8"
        >
          Votre design pro<br />
          en{' '}
          <em className="not-italic text-primary-500">moins d&apos;une heure.</em>
        </motion.h1>

        {/* Chat-style search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="relative mb-4"
        >
          <div className="flex items-center gap-3 bg-white border-2 border-sand-200 rounded-2xl px-5 py-4 shadow-sm focus-within:border-primary-400 transition-all">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch('')}
              placeholder="Décrivez votre projet… ex: flyer mariage, logo restaurant, post Instagram"
              className="flex-1 bg-transparent text-sand-900 placeholder:text-sand-400 text-sm sm:text-base outline-none"
            />
            <button
              onClick={() => handleSearch('')}
              className="w-10 h-10 sm:w-11 sm:h-11 btn-primary rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Suggestions rapides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="px-3 py-1.5 text-xs font-semibold text-sand-600 bg-white border border-sand-200 rounded-full hover:border-primary-300 hover:text-primary-600 transition-all"
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <Link
            href="/categories"
            className="px-6 py-3 btn-primary rounded-xl text-sm flex items-center gap-2 group"
          >
            Lancer un projet
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/comment-ca-marche"
            className="px-6 py-3 btn-ghost rounded-xl text-sm"
          >
            Comment ça marche →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
