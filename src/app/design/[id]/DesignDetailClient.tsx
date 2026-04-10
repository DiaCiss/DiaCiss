'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  ChevronRight, Star, MessageSquare, CheckCircle,
  Clock, RefreshCw, FileText, Image as ImageIcon,
  Type, Phone, Globe, DollarSign, Calendar, MapPin,
  Instagram, Facebook, Twitter, Palette, ArrowLeft
} from 'lucide-react'
import type { Design, OrderCustomization } from '@/types'
import { PRICING_TIERS, type PricingTier } from '@/types'
import { formatPrice, generateOrderId, getDeliveryDeadline } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { TierCard } from '@/components/ui/PricingBadge'
import { getAllDesigns } from '@/lib/data'

interface Props { design: Design }

const STEPS = ['Détails', 'Médias', 'Révision']

export default function DesignDetailClient({ design }: Props) {
  const router = useRouter()
  const { addOrder, addMessage } = useAppStore()
  const [activeImage, setActiveImage] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [customization, setCustomization] = useState<OrderCustomization>({
    customText: '',
    phoneNumber: '',
    eventDate: '',
    eventLocation: '',
    additionalNotes: '',
    colorPreference: '',
    amount: '',
    socialLinks: { facebook: '', instagram: '', twitter: '', tiktok: '', whatsapp: '', website: '' },
  })

  const otherDesigns = getAllDesigns().filter(
    (d) => d.designer.id === design.designer.id && d.id !== design.id
  ).slice(0, 3)

  const allImages = [design.imageUrl, ...design.previewImages].filter(Boolean)
  const tier = PRICING_TIERS[design.tier]

  const COLORS = ['#E8501E', '#1A1A1A', '#3B5BDB', '#2E7D32', '#F59E0B']
  const [selectedColor, setSelectedColor] = useState('')

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'logo') => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (type === 'photo') setCustomization((p) => ({ ...p, photo: file, photoPreview: reader.result as string }))
      else setCustomization((p) => ({ ...p, logo: file, logoPreview: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const orderId = generateOrderId()
    addOrder({
      id: orderId,
      designId: design.id,
      design,
      customization: { ...customization, colorPreference: selectedColor || customization.colorPreference },
      status: 'in_progress',
      tier: design.tier,
      price: design.price,
      retouchesUsed: 0,
      maxRetouches: design.maxRetouches,
      createdAt: new Date().toISOString(),
      deliveryDeadline: getDeliveryDeadline(1),
    })
    addMessage({
      id: 'msg-' + Date.now(),
      orderId,
      senderId: 'system',
      senderType: 'system',
      content: `Commande #${orderId} reçue ! Votre designer commence maintenant. Livraison prévue dans ~1 heure.`,
      createdAt: new Date().toISOString(),
      read: false,
    })
    setSubmitted(true)
    toast.success('Commande envoyée !')
    setTimeout(() => router.push('/commandes'), 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm px-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-sand-900 mb-2">Commande envoyée !</h2>
          <p className="text-sand-500 mb-1">Votre designer est en train de travailler sur votre visuel.</p>
          <p className="text-primary-500 font-semibold">Livraison dans ~1 heure</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-sand-50">
      {!showForm ? (
        /* ── DESIGN DETAIL ── */
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-sand-400 mb-6">
            <Link href="/" className="hover:text-sand-700">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/categorie/${design.categorySlug}`} className="hover:text-sand-700 capitalize">{design.categorySlug.replace(/-/g, ' ')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-sand-700 font-semibold">{design.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            {/* Left */}
            <div>
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

              {/* Other designs by same designer */}
              {otherDesigns.length > 0 && (
                <div>
                  <h3 className="text-lg font-black text-sand-900 mb-4">Autres designs par {design.designer.name}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {otherDesigns.map((d) => (
                      <Link key={d.id} href={`/design/${d.id}`}>
                        <div className="card overflow-hidden group">
                          <div className="relative aspect-square bg-sand-100 rounded-t-xl overflow-hidden">
                            <Image src={d.imageUrl} alt={d.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="p-2.5">
                            <div className="text-xs font-bold text-sand-900 line-clamp-1">{d.title}</div>
                            <div className="text-xs text-sand-400 mt-0.5">{d.categorySlug.replace(/-/g, ' ')}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — sticky info */}
            <div className="lg:sticky lg:top-20 h-fit space-y-4">
              <h1 className="text-2xl font-black text-sand-900">{design.title}</h1>

              {/* Designer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image src={design.designer.avatar} alt={design.designer.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-sand-900">{design.designer.name}</div>
                    <div className="flex items-center gap-1 text-xs text-sand-400">
                      <Star className="w-3 h-3 text-primary-400 fill-primary-400" />
                      {design.designer.rating} ({design.designer.completedOrders} Designs vendus)
                    </div>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full border border-sand-200 flex items-center justify-center text-sand-400 hover:text-primary-500 hover:border-primary-200 transition-all">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Tier cards */}
              <div className="space-y-3 pt-2">
                <TierCard tier="basic" />
                <TierCard tier="intermediate" />
                <TierCard tier="premium" highlight />
              </div>

              {/* Reserve button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowForm(true)}
                className="w-full py-4 btn-primary rounded-2xl text-base flex items-center justify-center gap-2"
              >
                Réserver ce design <ChevronRight className="w-5 h-5" />
              </motion.button>

              <div className="text-center text-xs text-sand-400">
                Paiement après réception · Orange Money · Wave
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── ORDER FORM ── */
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Step header */}
          <div className="flex items-center justify-center gap-0 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 ${i === step ? 'text-primary-500 font-bold' : i < step ? 'text-primary-400' : 'text-sand-400'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 ${i === step ? 'border-primary-500 bg-primary-500 text-white' : i < step ? 'border-primary-400 bg-primary-50 text-primary-500' : 'border-sand-300 text-sand-400'}`}>
                    {i + 1}
                  </div>
                  <span className="text-sm hidden sm:block">{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`w-12 h-0.5 ${i < step ? 'bg-primary-400' : 'bg-sand-200'}`} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
            {/* Sidebar preview */}
            <div className="space-y-4">
              <div className="card overflow-hidden">
                <div className="relative aspect-[3/4] bg-sand-100">
                  <Image src={design.imageUrl} alt={design.title} fill className="object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="text-xs font-semibold text-white">PREVIEW</div>
                    <div className="text-sm font-black text-white leading-tight">{design.title}</div>
                  </div>
                </div>
                <div className="p-3 flex items-center gap-2">
                  <div className="text-xs text-sand-400">Selected Design</div>
                  <div className="ml-auto text-primary-500">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <div className="text-xs font-bold text-sand-900">{design.categorySlug.replace(/-/g, ' ')}</div>
                </div>
              </div>

              {/* Tips */}
              <div className="card p-4 border-l-4 border-primary-500">
                <div className="text-xs font-bold text-primary-500 mb-2 flex items-center gap-1">
                  ● Personalization Tips
                </div>
                <p className="text-xs text-sand-500 leading-relaxed">
                  Pour un rendu optimal, assurez-vous que vos photos sont de haute résolution (min. 1920px) et que votre logo est sur fond transparent.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {step === 0 && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  {/* Informations de base */}
                  <div className="card p-5">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Type className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <div className="font-bold text-sand-900">Informations de Base</div>
                        <div className="text-xs text-sand-400">Les textes principaux de votre design</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Nom de l&apos;événement / Restaurant</label>
                        <input className="input" placeholder="ex: Le Petit Bistro" value={customization.customText || ''} onChange={(e) => setCustomization((p) => ({ ...p, customText: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Prix à afficher</label>
                        <input className="input" placeholder="ex: À partir de 3 000 FCFA" value={customization.amount || ''} onChange={(e) => setCustomization((p) => ({ ...p, amount: e.target.value }))} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Slogan / Texte principal</label>
                        <textarea rows={3} className="input resize-none" placeholder="Entrez le texte principal qui apparaîtra sur la couverture..." value={customization.additionalNotes || ''} onChange={(e) => setCustomization((p) => ({ ...p, additionalNotes: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  {/* Date & Lieu */}
                  <div className="card p-5">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-bold text-sand-900">Date &amp; Lieu</div>
                        <div className="text-xs text-sand-400">Quand et où se déroule l&apos;événement</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Date de l&apos;événement</label>
                        <input type="date" className="input" value={customization.eventDate || ''} onChange={(e) => setCustomization((p) => ({ ...p, eventDate: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Localisation</label>
                        <input className="input" placeholder="ex: Rue des Jardins, Abidjan" value={customization.eventLocation || ''} onChange={(e) => setCustomization((p) => ({ ...p, eventLocation: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  {/* Médias */}
                  <div className="card p-5">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-4 h-4 text-sand-600" />
                      </div>
                      <div>
                        <div className="font-bold text-sand-900">Médias</div>
                        <div className="text-xs text-sand-400">Téléchargez votre identité visuelle</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Logo */}
                      <div>
                        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Votre Logo</label>
                        <input type="file" accept="image/*" id="logo-up" className="hidden" onChange={(e) => handleUpload(e, 'logo')} />
                        <label htmlFor="logo-up" className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-sand-200 rounded-xl cursor-pointer hover:border-primary-300 transition-colors bg-sand-50 group">
                          {customization.logoPreview ? (
                            <div className="relative w-full h-full rounded-xl overflow-hidden"><Image src={customization.logoPreview} alt="" fill className="object-contain p-3" /></div>
                          ) : (
                            <>
                              <ImageIcon className="w-5 h-5 text-sand-300 mb-1.5" />
                              <span className="text-xs text-sand-400">Importer le logo</span>
                              <span className="text-xs text-sand-300">PNG ou SVG préféré</span>
                            </>
                          )}
                        </label>
                      </div>
                      {/* Photos */}
                      <div>
                        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Photos Personnelles</label>
                        <input type="file" accept="image/*" id="photo-up" className="hidden" onChange={(e) => handleUpload(e, 'photo')} />
                        <label htmlFor="photo-up" className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-sand-200 rounded-xl cursor-pointer hover:border-primary-300 transition-colors bg-sand-50">
                          {customization.photoPreview ? (
                            <div className="relative w-full h-full rounded-xl overflow-hidden"><Image src={customization.photoPreview} alt="" fill className="object-cover" /></div>
                          ) : (
                            <>
                              <ImageIcon className="w-5 h-5 text-sand-300 mb-1.5" />
                              <span className="text-xs text-sand-400">Ajouter des photos</span>
                              <span className="text-xs text-sand-300">Jusqu&apos;à 5 fichiers</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="card p-5">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-bold text-sand-900">Réseaux Sociaux</div>
                        <div className="text-xs text-sand-400">Liez vos comptes pour le design digital</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: 'instagram', icon: <Instagram className="w-4 h-4 text-pink-500" />, ph: 'Instagram Username' },
                        { key: 'facebook', icon: <Facebook className="w-4 h-4 text-blue-600" />, ph: 'Facebook Page' },
                        { key: 'tiktok', icon: <span className="text-xs font-black text-sand-700">TK</span>, ph: 'TikTok Link' },
                        { key: 'whatsapp', icon: <Phone className="w-4 h-4 text-green-500" />, ph: 'WhatsApp Number' },
                        { key: 'website', icon: <Globe className="w-4 h-4 text-sand-500" />, ph: 'Website URL' },
                        { key: 'twitter', icon: <Twitter className="w-4 h-4 text-sky-500" />, ph: '@Username' },
                      ].map(({ key, icon, ph }) => (
                        <div key={key} className="flex items-center gap-2 border border-sand-200 rounded-xl px-3 py-2">
                          <span className="flex-shrink-0">{icon}</span>
                          <input
                            className="flex-1 text-sm bg-transparent outline-none text-sand-900 placeholder:text-sand-300"
                            placeholder={ph}
                            value={customization.socialLinks?.[key as keyof typeof customization.socialLinks] || ''}
                            onChange={(e) => setCustomization((p) => ({ ...p, socialLinks: { ...p.socialLinks, [key]: e.target.value } }))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  {/* Style & Instructions */}
                  <div className="card p-5">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <div className="font-bold text-sand-900">Style &amp; Instructions</div>
                        <div className="text-xs text-sand-400">Personnalisez l&apos;ambiance visuelle</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-2">Palette de couleurs</label>
                      <div className="flex items-center gap-2">
                        {COLORS.map((c) => (
                          <button
                            key={c}
                            onClick={() => setSelectedColor(c)}
                            style={{ background: c }}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c ? 'border-sand-900 scale-110' : 'border-white shadow'}`}
                          />
                        ))}
                        <button
                          onClick={() => setSelectedColor('')}
                          className="w-8 h-8 rounded-full border-2 border-dashed border-sand-300 flex items-center justify-center text-sand-400 hover:border-primary-400 transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wide mb-1.5">Instructions supplémentaires</label>
                      <textarea
                        rows={5}
                        className="input resize-none"
                        placeholder="Détaillez ici toute demande spécifique, changement de police ou disposition particulière..."
                        value={customization.colorPreference || ''}
                        onChange={(e) => setCustomization((p) => ({ ...p, colorPreference: e.target.value }))}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => step === 0 ? setShowForm(false) : setStep(step - 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 btn-ghost rounded-xl text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {step === 0 ? 'Annuler' : 'Retour'}
                </button>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xs text-sand-400 text-right">Total à payer</div>
                    <div className="text-xl font-black text-primary-500">{formatPrice(design.price)}</div>
                  </div>
                  {step < STEPS.length - 1 ? (
                    <button onClick={() => setStep(step + 1)} className="px-6 py-3 btn-primary rounded-xl text-sm flex items-center gap-2">
                      Suivant <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="px-6 py-3 btn-primary rounded-xl text-sm flex items-center gap-2"
                    >
                      Confirmer la commande <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
