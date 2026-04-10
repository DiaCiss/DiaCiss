export type PricingTier = 'basic' | 'standard' | 'premium' | 'exclusive'

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  color: string
  gradient: string
  designCount: number
}

export interface Design {
  id: string
  title: string
  categorySlug: string
  tier: PricingTier
  price: number
  imageUrl: string
  previewImages: string[]
  tags: string[]
  dimensions: string
  deliveryTime: string
  maxRetouches: number
  rating: number
  reviewCount: number
  featured: boolean
  isExclusive: boolean
  createdAt: string
}

export interface OrderCustomization {
  // Identité
  mainName?: string        // Nom principal (marque, événement, personne)
  secondaryName?: string   // Nom secondaire (sous-titre, partenaire)
  tagline?: string         // Slogan / tagline
  // Textes
  mainText?: string        // Texte principal / accroche
  secondaryText?: string   // Texte secondaire / description
  priceDisplay?: string    // Prix à afficher sur le design
  // Contact
  phoneNumber?: string
  email?: string
  address?: string         // Adresse / quartier
  city?: string
  // Événement
  eventDate?: string
  eventStartTime?: string  // Heure de début
  eventEndTime?: string    // Heure de fin
  eventVenue?: string      // Lieu / salle
  // Médias
  photo?: File | null
  photoPreview?: string
  // Style
  designLanguage?: string  // Langue du design
  colorPreference?: string // Couleur(s) choisie(s)
  ambiance?: string        // Moderne, Traditionnel, Luxe, Festif, Sobre
  // Réseaux sociaux
  socialLinks?: SocialLinks
  // Note libre
  designerNote?: string    // Instructions libres au designer
}

export interface SocialLinks {
  instagram?: string
  facebook?: string
  tiktok?: string
  whatsapp?: string
  youtube?: string
  twitter?: string
  website?: string
}

export interface Order {
  id: string
  designId: string
  design: Design
  customization: OrderCustomization
  status: OrderStatus
  tier: PricingTier
  price: number
  retouchesUsed: number
  maxRetouches: number
  createdAt: string
  deliveryDeadline: string
  paidAt?: string
  deliveredAt?: string
}

export type OrderStatus =
  | 'pending'
  | 'in_progress'
  | 'delivered'
  | 'paid'
  | 'completed'
  | 'revision_requested'

export interface Message {
  id: string
  orderId: string
  senderId: string
  senderType: 'client' | 'designer' | 'system'
  content: string
  attachments?: MessageAttachment[]
  createdAt: string
  read: boolean
}

export interface MessageAttachment {
  id: string
  url: string
  type: 'image' | 'file'
  name: string
}

export const PRICING_TIERS = {
  basic: {
    label: 'Basique',
    price: 1000,
    maxRetouches: 2,
    deliveryTime: '3 heures',
    format: 'JPG',
    description: 'Idéal pour un besoin simple et rapide',
    isExclusive: false,
  },
  standard: {
    label: 'Standard',
    price: 3000,
    maxRetouches: 4,
    deliveryTime: '2 heures',
    format: 'JPG',
    description: 'Le meilleur rapport qualité-prix',
    isExclusive: false,
  },
  premium: {
    label: 'Premium',
    price: 5000,
    maxRetouches: 7,
    deliveryTime: '1 heure',
    format: 'JPG',
    description: 'Livraison prioritaire et plus de retouches',
    isExclusive: false,
  },
  exclusive: {
    label: 'Exclusif',
    price: 10000,
    maxRetouches: 5,
    deliveryTime: '1 heure',
    format: 'JPG',
    description: 'Ce design vous appartient — retiré après votre commande',
    isExclusive: true,
  },
} as const

export function formatPrice(amount: number): string {
  return amount.toLocaleString('fr-FR') + ' FCFA'
}
