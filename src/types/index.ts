export type PricingTier = 'basic' | 'intermediate' | 'premium'

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
  designer: Designer
  tags: string[]
  dimensions: string
  format: string[]
  deliveryTime: string
  maxRetouches: number
  rating: number
  reviewCount: number
  featured: boolean
  createdAt: string
}

export interface Designer {
  id: string
  name: string
  avatar: string
  specialty: string
  rating: number
  completedOrders: number
}

export interface OrderCustomization {
  photo?: File | null
  photoPreview?: string
  logo?: File | null
  logoPreview?: string
  customText?: string
  phoneNumber?: string
  socialLinks?: SocialLinks
  amount?: string
  eventDate?: string
  eventLocation?: string
  additionalNotes?: string
  colorPreference?: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  tiktok?: string
  whatsapp?: string
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
    deliveryTime: '1 heure',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
  },
  intermediate: {
    label: 'Intermédiaire',
    price: 3000,
    maxRetouches: 4,
    deliveryTime: '2 heures',
    color: 'from-primary-500 to-purple-600',
    bgColor: 'bg-primary-500/10',
    borderColor: 'border-primary-500/30',
    textColor: 'text-primary-400',
  },
  premium: {
    label: 'Premium',
    price: 5000,
    maxRetouches: 10,
    deliveryTime: '3 heures',
    color: 'from-accent-400 to-orange-500',
    bgColor: 'bg-accent-500/10',
    borderColor: 'border-accent-500/30',
    textColor: 'text-accent-400',
  },
} as const
