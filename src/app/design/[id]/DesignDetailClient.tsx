'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  ChevronRight, CheckCircle, Clock, RefreshCw,
  ImageIcon, ChevronDown, Lock, Sparkles, ArrowLeft
} from 'lucide-react'
import type { Design, OrderCustomization } from '@/types'
import { PRICING_TIERS, formatPrice } from '@/types'
import { getAllDesigns } from '@/lib/data'

interface Props { design: Design }

const TIER_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  basic:     { label: 'Basique',   color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200' },
  standard:  { label: 'Standard',  color: 'text-sand-700',   bg: 'bg-sand-50 border-sand-200' },
  premium:   { label: 'Premium',   color: 'text-primary-700', bg: 'bg-primary-50 border-primary-200' },
  exclusive: { label: 'EXCLUSIF',  color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-300' },
}

const AMBIANCE_OPTIONS = ['Moderne', 'Traditionnel', 'Luxe', 'Festif', 'Sobre', 'Coloré']
const COLORS = ['#E8501E', '#1A1A1A', '#3B5BDB', '#2E7D32', '#F59E0B', '#7C3AED', '#DB2777']
const LANGUAGES = ['Français', 'Anglais', 'Wolof', 'Bambara', 'Haoussa', 'Arabe']

// Accordion section component
function Section({
  icon, title, defaultOpen = false, children
}: { icon: string; title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-sand-200 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-sand-50 transition-colors"
      >
        <span className="flex items-center gap-2.5 font-semibold text-sand-900 text-sm">
          <span className="text-lg">{icon}</span>
          {title}
        </span>
        <ChevronDown className={`w-4 h-4 text-sand-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-white border-t border-sand-100 space-y-3">
          {children}
        </div>
      )}
    </div>
  )
}

export default function DesignDetailClient({ design }: Props) {
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedColor, setSelectedColor] = useState('')
  const [customization, setCustomization] = useState<OrderCustomization>({})

  const tier = PRICING_TIERS[design.tier]
  const badge = TIER_BADGE[design.tier]
  const allImages = [design.imageUrl, ...design.previewImages].filter(Boolean)

  const similarDesigns = getAllDesigns().filter(
    (d) => d.categorySlug === design.categorySlug && d.id !== design.id
  ).slice(0, 4)

  const set = (field: keyof OrderCustomization) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setCustomization((p) => ({ ...p, [field]: e.target.value }))

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCustomization((p) => ({ ...p, photo: file, photoPreview: reader.result as string }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      let photoUrl: string | null = null
      if (customization.photo) {
        const fd = new FormData()
        fd.append('file', customization.photo)
        fd.append('type', 'photo')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        if (res.ok) photoUrl = (await res.json()).url
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          designId: design.id,
          tier: design.tier,
          customization: { ...customization, colorPreference: selectedColor || customization.colorPreference, photoUrl },
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        if (res.status === 401) {
          toast.error('Connectez-vous pour passer une commande')
          router.push('/auth/login?redirectTo=/design/' + design.id)
          return
        }
        toast.error(err.error || 'Erreur lors de la commande')
        return
      }

      setSubmitted(true)
      toast.success('Commande envoyée ! Notre équipe s\'en occupe.')
      setTimeout(() => router.push('/commandes'), 2000)
    } catch {
      toast.error('Erreur réseau, réessayez')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm px-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-sand-900 mb-2">Commande envoyée !</h2>
          <p className="text-sand-500 mb-1">Notre équipe travaille sur votre design.</p>
          <p className="text-primary-500 font-semibold">Livraison en {tier.deliveryTime}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-sand-50">
      {!showForm ? (
        /* ── PAGE DÉTAIL ── */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-sand-400 mb-5">
            <Link href="/" className="hover:text-sand-700">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/categorie/${design.categorySlug}`} className="hover:text-sand-700 capitalize">
              {design.categorySlug.replace(/-/g, ' ')}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-sand-700 font-semibold truncate max-w-[160px]">{design.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Left — Images */}
            <div>
              {/* Exclusive banner */}
              {design.isExclusive && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
                  <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <p className="text-xs font-semibold text-amber-800">
                    Ce design vous appartient — retiré de la plateforme dès votre commande. <strong>Vous serez le seul à l&apos;avoir.</strong>
                  </p>
                </div>
              )}

              {/* Main image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-100 mb-3">
                <AnimatePresence mode="wait">
                  <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    <Image src={allImages[activeImage]} alt={design.title} fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 mb-6">
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-primary-500' : 'border-sand-200 opacity-60'}`}>
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Similar designs */}
              {similarDesigns.length > 0 && (
                <div>
                  <h3 className="text-base font-black text-sand-900 mb-3">Designs similaires</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {similarDesigns.map((d) => (
                      <Link key={d.id} href={`/design/${d.id}`}>
                        <div className="card overflow-hidden group">
                          <div className="relative aspect-square bg-sand-100 overflow-hidden">
                            <Image src={d.imageUrl} alt={d.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            {d.isExclusive && (
                              <div className="absolute top-1.5 left-1.5 bg-amber-400 text-amber-900 text-[9px] font-black px-1.5 py-0.5 rounded-full">EXCLU</div>
                            )}
                          </div>
                          <div className="p-2">
                            <div className="text-xs font-bold text-sand-900 line-clamp-1">{d.title}</div>
                            <div className="text-primary-500 font-black text-xs mt-0.5">{formatPrice(d.price)}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Info + CTA */}
            <div className="lg:sticky lg:top-20 h-fit space-y-4">
              {/* Title + badge */}
              <div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold mb-2 ${badge.bg} ${badge.color}`}>
                  {design.isExclusive && <Lock className="w-3 h-3" />}
                  {badge.label}
                </div>
                <h1 className="text-xl font-black text-sand-900">{design.title}</h1>
              </div>

              {/* Price card */}
              <div className={`rounded-2xl p-4 border-2 ${design.isExclusive ? 'bg-amber-50 border-amber-300' : 'bg-white border-sand-200'}`}>
                <div className="text-3xl font-black text-primary-500 mb-3">{formatPrice(design.price)}</div>
                <div className="space-y-2 text-sm text-sand-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    Livraison en <strong className="text-sand-900">{tier.deliveryTime}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    <strong className="text-sand-900">{tier.maxRetouches} retouches</strong> incluses
                  </div>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    Livré en <strong className="text-sand-900">JPG</strong>
                  </div>
                  {design.isExclusive && (
                    <div className="flex items-center gap-2 mt-1 pt-2 border-t border-amber-200">
                      <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-amber-700 font-semibold text-xs">Design unique — retiré après votre achat</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowForm(true)}
                className={`w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 ${design.isExclusive ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'btn-primary'}`}
              >
                {design.isExclusive ? <Lock className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                Réserver ce design
              </motion.button>
              <p className="text-center text-xs text-sand-400">Paiement après réception · Orange Money · Wave</p>
            </div>
          </div>
        </div>
      ) : (
        /* ── BRIEF CARD — Single page form ── */
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-full border border-sand-200 flex items-center justify-center hover:bg-sand-100 transition-colors">
              <ArrowLeft className="w-4 h-4 text-sand-600" />
            </button>
            <div>
              <h2 className="text-xl font-black text-sand-900">Votre brief design</h2>
              <p className="text-xs text-sand-400">Tous les champs sont optionnels — remplissez ce qui vous concerne</p>
            </div>
          </div>

          {/* Preview pill */}
          <div className="flex items-center gap-3 bg-white border border-sand-200 rounded-2xl p-3 mb-5">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={design.imageUrl} alt={design.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sand-900 text-sm truncate">{design.title}</div>
              <div className="text-xs text-sand-400 capitalize">{design.categorySlug.replace(/-/g, ' ')}</div>
            </div>
            <div className="text-primary-500 font-black text-lg flex-shrink-0">{formatPrice(design.price)}</div>
          </div>

          {/* Accordion sections */}
          <div className="space-y-3">

            {/* 1. Identité — open by default */}
            <Section icon="🏷️" title="Identité" defaultOpen>
              <input className="input text-sm" placeholder="Nom principal (marque, événement, personne...)" value={customization.mainName || ''} onChange={set('mainName')} />
              <input className="input text-sm" placeholder="Nom secondaire (sous-titre, nom du partenaire...)" value={customization.secondaryName || ''} onChange={set('secondaryName')} />
              <input className="input text-sm" placeholder="Slogan / tagline" value={customization.tagline || ''} onChange={set('tagline')} />
            </Section>

            {/* 2. Textes — open by default */}
            <Section icon="📝" title="Textes" defaultOpen>
              <textarea rows={2} className="input text-sm resize-none" placeholder="Texte principal / accroche centrale" value={customization.mainText || ''} onChange={set('mainText')} />
              <textarea rows={2} className="input text-sm resize-none" placeholder="Texte secondaire / description / programme" value={customization.secondaryText || ''} onChange={set('secondaryText')} />
              <input className="input text-sm" placeholder="Prix à afficher sur le design (ex: 5 000 FCFA)" value={customization.priceDisplay || ''} onChange={set('priceDisplay')} />
            </Section>

            {/* 3. Contact */}
            <Section icon="📞" title="Contact">
              <div className="grid grid-cols-2 gap-2">
                <input className="input text-sm" placeholder="Téléphone" value={customization.phoneNumber || ''} onChange={set('phoneNumber')} />
                <input className="input text-sm" placeholder="Email" value={customization.email || ''} onChange={set('email')} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input className="input text-sm" placeholder="Quartier / Adresse" value={customization.address || ''} onChange={set('address')} />
                <input className="input text-sm" placeholder="Ville" value={customization.city || ''} onChange={set('city')} />
              </div>
            </Section>

            {/* 4. Événement */}
            <Section icon="📅" title="Date & Événement">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-sand-400 uppercase tracking-wide mb-1 block">Date</label>
                  <input type="date" className="input text-sm" value={customization.eventDate || ''} onChange={set('eventDate')} />
                </div>
                <input className="input text-sm" placeholder="Lieu / Salle" value={customization.eventVenue || ''} onChange={set('eventVenue')} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-sand-400 uppercase tracking-wide mb-1 block">Heure de début</label>
                  <input type="time" className="input text-sm" value={customization.eventStartTime || ''} onChange={set('eventStartTime')} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-sand-400 uppercase tracking-wide mb-1 block">Heure de fin</label>
                  <input type="time" className="input text-sm" value={customization.eventEndTime || ''} onChange={set('eventEndTime')} />
                </div>
              </div>
            </Section>

            {/* 5. Photo */}
            <Section icon="🖼️" title="Photo personnelle">
              <input type="file" accept="image/*" id="photo-up" className="hidden" onChange={handleUpload} />
              <label htmlFor="photo-up" className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-sand-200 rounded-xl cursor-pointer hover:border-primary-300 transition-colors bg-sand-50">
                {customization.photoPreview ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image src={customization.photoPreview} alt="" fill className="object-cover" />
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-6 h-6 text-sand-300 mb-2" />
                    <span className="text-sm font-semibold text-sand-500">Ajouter une photo</span>
                    <span className="text-xs text-sand-400">Portrait, produit, lieu... (max 10MB)</span>
                  </>
                )}
              </label>
            </Section>

            {/* 6. Style */}
            <Section icon="🎨" title="Style & Couleurs">
              {/* Langue */}
              <div>
                <label className="text-[10px] font-semibold text-sand-400 uppercase tracking-wide mb-1.5 block">Langue du design</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button key={lang} type="button"
                      onClick={() => setCustomization((p) => ({ ...p, designLanguage: lang }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${customization.designLanguage === lang ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-sand-200 text-sand-600 hover:border-primary-300'}`}
                    >{lang}</button>
                  ))}
                </div>
              </div>
              {/* Couleurs */}
              <div>
                <label className="text-[10px] font-semibold text-sand-400 uppercase tracking-wide mb-1.5 block">Couleur principale</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLORS.map((c) => (
                    <button key={c} type="button" onClick={() => setSelectedColor(selectedColor === c ? '' : c)}
                      style={{ background: c }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c ? 'border-sand-900 scale-110 shadow-md' : 'border-white shadow'}`}
                    />
                  ))}
                </div>
              </div>
              {/* Ambiance */}
              <div>
                <label className="text-[10px] font-semibold text-sand-400 uppercase tracking-wide mb-1.5 block">Ambiance</label>
                <div className="flex flex-wrap gap-2">
                  {AMBIANCE_OPTIONS.map((a) => (
                    <button key={a} type="button"
                      onClick={() => setCustomization((p) => ({ ...p, ambiance: a }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${customization.ambiance === a ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-sand-200 text-sand-600 hover:border-primary-300'}`}
                    >{a}</button>
                  ))}
                </div>
              </div>
            </Section>

            {/* 7. Réseaux sociaux */}
            <Section icon="📱" title="Réseaux sociaux">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'instagram', ph: '@ Instagram' },
                  { key: 'facebook',  ph: 'Facebook Page' },
                  { key: 'tiktok',    ph: '@ TikTok' },
                  { key: 'whatsapp',  ph: 'WhatsApp' },
                  { key: 'youtube',   ph: 'YouTube' },
                  { key: 'website',   ph: 'Site web' },
                ].map(({ key, ph }) => (
                  <input key={key} className="input text-sm" placeholder={ph}
                    value={customization.socialLinks?.[key as keyof typeof customization.socialLinks] || ''}
                    onChange={(e) => setCustomization((p) => ({ ...p, socialLinks: { ...p.socialLinks, [key]: e.target.value } }))}
                  />
                ))}
              </div>
            </Section>

            {/* 8. Note au designer */}
            <Section icon="💬" title="Note à notre équipe">
              <textarea rows={4} className="input text-sm resize-none"
                placeholder="Toute instruction spécifique : police souhaitée, éléments à inclure ou éviter, références visuelles, format particulier..."
                value={customization.designerNote || ''}
                onChange={set('designerNote')}
              />
            </Section>
          </div>

          {/* Sticky bottom bar */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-sand-200 px-4 py-3 -mx-4 mt-6 flex items-center justify-between gap-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-sand-500 hover:text-sand-800 transition-colors">
              Annuler
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-sand-400">Total</div>
                <div className="text-lg font-black text-primary-500">{formatPrice(design.price)}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-3 btn-primary rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Commander <ChevronRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
