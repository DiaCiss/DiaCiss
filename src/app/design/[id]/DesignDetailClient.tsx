'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  ChevronLeft, Star, Clock, RefreshCw, Download, Shield,
  CheckCircle, ChevronRight, Image as ImageIcon, Type,
  Phone, Globe, DollarSign, Calendar, MapPin, MessageSquare,
  Palette, Instagram, Facebook, Twitter
} from 'lucide-react'
import type { Design, OrderCustomization } from '@/types'
import { PRICING_TIERS } from '@/types'
import { formatPrice, generateOrderId, getDeliveryDeadline } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

interface Props {
  design: Design
}

export default function DesignDetailClient({ design }: Props) {
  const router = useRouter()
  const { addOrder, addMessage } = useAppStore()
  const [activeImage, setActiveImage] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [customization, setCustomization] = useState<OrderCustomization>({
    customText: '',
    phoneNumber: '',
    eventDate: '',
    eventLocation: '',
    additionalNotes: '',
    colorPreference: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      whatsapp: '',
      website: '',
    },
    amount: '',
  })

  const tier = PRICING_TIERS[design.tier]
  const allImages = [design.imageUrl, ...design.previewImages].filter(Boolean)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'logo') => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (type === 'photo') {
        setCustomization((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result as string,
        }))
      } else {
        setCustomization((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result as string,
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const orderId = generateOrderId()
    const order = {
      id: orderId,
      designId: design.id,
      design,
      customization,
      status: 'in_progress' as const,
      tier: design.tier,
      price: design.price,
      retouchesUsed: 0,
      maxRetouches: design.maxRetouches,
      createdAt: new Date().toISOString(),
      deliveryDeadline: getDeliveryDeadline(1),
    }

    addOrder(order)
    addMessage({
      id: 'msg-' + Date.now(),
      orderId,
      senderId: 'system',
      senderType: 'system',
      content: `Votre commande #${orderId} a été reçue ! Votre designer travaille dessus. Vous recevrez votre design dans environ 1 heure.`,
      createdAt: new Date().toISOString(),
      read: false,
    })

    setSubmitted(true)
    toast.success('Commande envoyée ! Votre design sera prêt en ~1 heure.')

    setTimeout(() => router.push('/commandes'), 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Commande envoyée !</h2>
          <p className="text-gray-400 mb-2">
            Votre designer a reçu votre demande et commence à travailler.
          </p>
          <p className="text-primary-400 font-semibold">
            Livraison prévue dans environ 1 heure
          </p>
          <div className="mt-6 text-sm text-gray-500">Redirection vers vos commandes...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/categorie/${design.categorySlug}`} className="hover:text-white transition-colors capitalize">
            {design.categorySlug.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-300">{design.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left – Images */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-white/10 mb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={allImages[activeImage]}
                    alt={design.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Tier badge overlay */}
              <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-xs font-bold ${tier.bgColor} ${tier.textColor} border ${tier.borderColor} backdrop-blur-sm`}>
                {tier.label}
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      i === activeImage ? 'border-primary-500' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right – Info */}
          <div>
            {/* Title & price */}
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{design.title}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(design.rating) ? 'text-accent-400 fill-accent-400' : 'text-gray-600'}`}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-1">{design.rating} ({design.reviewCount} avis)</span>
              </div>
            </div>

            {/* Price */}
            <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl ${tier.bgColor} ${tier.borderColor} border mb-6`}>
              <span className={`text-3xl font-black ${tier.textColor}`}>{formatPrice(design.price)}</span>
              <div className="text-xs text-gray-400">
                <div>Niveau {tier.label}</div>
                <div>{tier.maxRetouches} retouches</div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Clock, label: 'Livraison', value: design.deliveryTime },
                { icon: RefreshCw, label: 'Retouches', value: `${design.maxRetouches} max` },
                { icon: Download, label: 'Formats', value: design.format.join(', ') },
                { icon: Shield, label: 'Dimensions', value: design.dimensions },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-primary-400" />
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                  <div className="text-sm font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {design.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 glass rounded-full border border-white/10 text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Designer */}
            <div className="glass rounded-xl p-4 border border-white/5 mb-6 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image src={design.designer.avatar} alt={design.designer.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">{design.designer.name}</div>
                <div className="text-xs text-gray-400">{design.designer.specialty}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
                  <span className="text-sm font-bold text-white">{design.designer.rating}</span>
                </div>
                <div className="text-xs text-gray-500">{design.designer.completedOrders} commandes</div>
              </div>
            </div>

            {/* CTA */}
            {!showForm ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary-500/30 flex items-center justify-center gap-2 text-lg"
              >
                Réserver ce design
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <div className="text-sm text-green-400 font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Formulaire de personnalisation ouvert ci-dessous
              </div>
            )}
          </div>
        </div>

        {/* Reservation form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-16"
            >
              <div className="glass rounded-3xl border border-primary-500/20 overflow-hidden">
                {/* Form header */}
                <div className="bg-gradient-to-r from-primary-600/20 to-primary-800/20 border-b border-primary-500/20 px-8 py-6">
                  <h2 className="text-2xl font-black text-white mb-1">Personnalisez votre design</h2>
                  <p className="text-gray-400 text-sm">
                    Remplissez les informations que vous souhaitez intégrer dans votre design.
                    Tous les champs sont optionnels sauf ceux marqués d&apos;un *.
                  </p>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Photo upload */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-primary-400" />
                        Médias
                      </h3>

                      {/* Photo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Votre photo personnelle
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'photo')}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label
                            htmlFor="photo-upload"
                            className="flex flex-col items-center justify-center w-full h-32 glass rounded-2xl border-2 border-dashed border-white/20 hover:border-primary-500/50 cursor-pointer transition-all group"
                          >
                            {customization.photoPreview ? (
                              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image src={customization.photoPreview} alt="Photo" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-xs text-white">Changer</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <ImageIcon className="w-6 h-6 text-gray-500 mb-2" />
                                <span className="text-xs text-gray-500">Cliquez pour ajouter votre photo</span>
                                <span className="text-xs text-gray-600">JPG, PNG, WEBP</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Logo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Logo / Marque
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'logo')}
                            className="hidden"
                            id="logo-upload"
                          />
                          <label
                            htmlFor="logo-upload"
                            className="flex flex-col items-center justify-center w-full h-32 glass rounded-2xl border-2 border-dashed border-white/20 hover:border-primary-500/50 cursor-pointer transition-all group"
                          >
                            {customization.logoPreview ? (
                              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image src={customization.logoPreview} alt="Logo" fill className="object-contain p-4" />
                              </div>
                            ) : (
                              <>
                                <ImageIcon className="w-6 h-6 text-gray-500 mb-2" />
                                <span className="text-xs text-gray-500">Cliquez pour ajouter votre logo</span>
                                <span className="text-xs text-gray-600">PNG recommandé (fond transparent)</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Text fields */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Type className="w-5 h-5 text-primary-400" />
                        Textes & Informations
                      </h3>

                      <FormField
                        label="Texte principal / Titre"
                        icon={<Type className="w-4 h-4" />}
                        placeholder="Ex : Mariama & Moussa, Restaurant Le Palais..."
                        value={customization.customText || ''}
                        onChange={(v) => setCustomization((p) => ({ ...p, customText: v }))}
                      />

                      <FormField
                        label="Numéro de téléphone"
                        icon={<Phone className="w-4 h-4" />}
                        placeholder="+221 77 000 00 00"
                        value={customization.phoneNumber || ''}
                        onChange={(v) => setCustomization((p) => ({ ...p, phoneNumber: v }))}
                      />

                      <FormField
                        label="Montant / Prix / Frais"
                        icon={<DollarSign className="w-4 h-4" />}
                        placeholder="Ex : 5 000 FCFA, Entrée gratuite..."
                        value={customization.amount || ''}
                        onChange={(v) => setCustomization((p) => ({ ...p, amount: v }))}
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          label="Date de l'événement"
                          icon={<Calendar className="w-4 h-4" />}
                          placeholder="15 Août 2024"
                          value={customization.eventDate || ''}
                          onChange={(v) => setCustomization((p) => ({ ...p, eventDate: v }))}
                        />
                        <FormField
                          label="Lieu"
                          icon={<MapPin className="w-4 h-4" />}
                          placeholder="Dakar, Almadies..."
                          value={customization.eventLocation || ''}
                          onChange={(v) => setCustomization((p) => ({ ...p, eventLocation: v }))}
                        />
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary-400" />
                        Réseaux Sociaux & Web
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { key: 'instagram', icon: <Instagram className="w-4 h-4" />, label: 'Instagram', ph: '@moncompte' },
                          { key: 'facebook', icon: <Facebook className="w-4 h-4" />, label: 'Facebook', ph: 'facebook.com/page' },
                          { key: 'twitter', icon: <Twitter className="w-4 h-4" />, label: 'Twitter/X', ph: '@moncompte' },
                          { key: 'tiktok', icon: <span className="text-xs font-bold">TK</span>, label: 'TikTok', ph: '@moncompte' },
                          { key: 'whatsapp', icon: <Phone className="w-4 h-4" />, label: 'WhatsApp', ph: '+221 77 000 00 00' },
                          { key: 'website', icon: <Globe className="w-4 h-4" />, label: 'Site web', ph: 'www.monsite.com' },
                        ].map(({ key, icon, label, ph }) => (
                          <div key={key}>
                            <label className="block text-xs text-gray-400 mb-1 flex items-center gap-1">
                              <span className="text-primary-400">{icon}</span>
                              {label}
                            </label>
                            <input
                              type="text"
                              placeholder={ph}
                              value={customization.socialLinks?.[key as keyof typeof customization.socialLinks] || ''}
                              onChange={(e) =>
                                setCustomization((p) => ({
                                  ...p,
                                  socialLinks: { ...p.socialLinks, [key]: e.target.value },
                                }))
                              }
                              className="w-full px-3 py-2 glass rounded-xl border border-white/10 focus:border-primary-500/50 text-white placeholder:text-gray-600 text-xs outline-none transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Extra */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Palette className="w-5 h-5 text-primary-400" />
                        Préférences & Notes
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Préférence de couleurs</label>
                        <input
                          type="text"
                          placeholder="Ex : bleu et doré, couleurs de mon logo..."
                          value={customization.colorPreference || ''}
                          onChange={(e) => setCustomization((p) => ({ ...p, colorPreference: e.target.value }))}
                          className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-primary-500/50 text-white placeholder:text-gray-600 text-sm outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-primary-400" />
                          Instructions supplémentaires
                        </label>
                        <textarea
                          rows={5}
                          placeholder="Décrivez tout détail supplémentaire que vous souhaitez intégrer dans votre design : slogan, description, instructions spéciales..."
                          value={customization.additionalNotes || ''}
                          onChange={(e) => setCustomization((p) => ({ ...p, additionalNotes: e.target.value }))}
                          className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-primary-500/50 text-white placeholder:text-gray-600 text-sm outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary & submit */}
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="glass rounded-2xl p-4 border border-white/10 flex-1">
                        <div className="text-xs text-gray-500 mb-1">Total à payer</div>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-3xl font-black ${tier.textColor}`}>{formatPrice(design.price)}</span>
                          <span className="text-xs text-gray-500">· Paiement après réception</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Orange Money · Wave · Free Money
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowForm(false)}
                          className="px-6 py-3 glass border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-semibold rounded-xl transition-all text-sm"
                        >
                          Annuler
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSubmit}
                          className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl transition-all shadow-xl shadow-primary-500/30 flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Envoyer ma commande
                        </motion.button>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-gray-600 text-center">
                      Vous paierez uniquement après avoir reçu et approuvé votre design. Livraison sous ~1 heure.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FormField({
  label, icon, placeholder, value, onChange,
}: {
  label: string
  icon: React.ReactNode
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
        <span className="text-primary-400">{icon}</span>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-primary-500/50 text-white placeholder:text-gray-600 text-sm outline-none transition-all"
      />
    </div>
  )
}
