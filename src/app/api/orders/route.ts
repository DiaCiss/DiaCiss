import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDesignById } from '@/lib/data'

// GET /api/orders — liste des commandes de l'utilisateur connecté
export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ orders: data })
}

// POST /api/orders — créer une commande
export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const body = await request.json()
  const { designId, customization, tier } = body

  const design = getDesignById(designId)
  if (!design) return NextResponse.json({ error: 'Design introuvable' }, { status: 404 })

  const deliveryHours = { basic: 1, intermediate: 2, premium: 3 }[tier as string] ?? 1
  const deliveryDeadline = new Date(Date.now() + deliveryHours * 3600 * 1000).toISOString()

  const { data: order, error } = await supabase.from('orders').insert({
    design_id: designId,
    client_id: user.id,
    designer_id: design.designer.id,
    tier,
    price: design.price,
    max_retouches: design.maxRetouches,
    custom_text: customization.customText || null,
    phone_number: customization.phoneNumber || null,
    event_date: customization.eventDate || null,
    event_location: customization.eventLocation || null,
    additional_notes: customization.additionalNotes || null,
    color_preference: customization.colorPreference || null,
    amount: customization.amount || null,
    social_links: customization.socialLinks || null,
    photo_url: customization.photoUrl || null,
    logo_url: customization.logoUrl || null,
    delivery_deadline: deliveryDeadline,
    status: 'in_progress',
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Message système automatique
  await supabase.from('messages').insert({
    order_id: order.id,
    sender_type: 'system',
    content: `Commande #${order.id} reçue ! Votre designer ${design.designer.name} commence maintenant. Livraison prévue dans ~${deliveryHours} heure${deliveryHours > 1 ? 's' : ''}.`,
    read: false,
  })

  return NextResponse.json({ order }, { status: 201 })
}
