import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDesignById } from '@/lib/data'
import { PRICING_TIERS } from '@/types'
import type { TablesInsert } from '@/types/database'

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

  const tierKey = tier as keyof typeof PRICING_TIERS
  const tierConfig = PRICING_TIERS[tierKey] ?? PRICING_TIERS.basic
  const deliveryHours = tierConfig.deliveryTime.startsWith('1 ') ? 1
    : parseInt(tierConfig.deliveryTime) || 2
  const deliveryDeadline = new Date(Date.now() + deliveryHours * 3600 * 1000).toISOString()

  const insertData: TablesInsert<'orders'> = {
    design_id: designId,
    client_id: user.id,
    tier: tierKey,
    price: design.price,
    max_retouches: design.maxRetouches,
    customization: customization ?? null,
    delivery_deadline: deliveryDeadline,
    status: 'in_progress',
  }

  const { data: order, error } = await supabase
    .from('orders')
    .insert(insertData)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Message système automatique
  await supabase.from('messages').insert({
    order_id: order.id,
    sender_type: 'system',
    content: `Commande #${order.id} reçue ! Notre équipe commence maintenant. Livraison prévue dans ~${deliveryHours} heure${deliveryHours > 1 ? 's' : ''}.`,
    read: false,
  })

  return NextResponse.json({ order }, { status: 201 })
}
