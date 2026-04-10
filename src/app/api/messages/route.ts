import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { TablesUpdate } from '@/types/database'

// GET /api/messages?orderId=xxx
export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const orderId = request.nextUrl.searchParams.get('orderId')
  if (!orderId) return NextResponse.json({ error: 'orderId requis' }, { status: 400 })

  // Vérifie que la commande appartient à l'utilisateur
  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('id', orderId)
    .eq('client_id', user.id)
    .single()

  if (!order) return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Marque les messages non lus comme lus
  const readUpdate: TablesUpdate<'messages'> = { read: true }
  await supabase.from('messages').update(readUpdate)
    .eq('order_id', orderId)
    .neq('sender_type', 'client')

  return NextResponse.json({ messages: data })
}

// POST /api/messages — envoyer un message
export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { orderId, content } = await request.json()

  // Vérifie que la commande appartient à l'utilisateur
  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('id', orderId)
    .eq('client_id', user.id)
    .single()

  if (!order) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const { data: message, error } = await supabase.from('messages').insert({
    order_id: orderId,
    sender_id: user.id,
    sender_type: 'client',
    content,
    read: true,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Réponse automatique simulée du designer (à remplacer par un vrai websocket plus tard)
  setTimeout(async () => {
    const supa = createClient()
    await supa.from('messages').insert({
      order_id: orderId,
      sender_type: 'designer',
      content: 'Merci pour votre message ! Je travaille activement sur votre design. Je vous envoie une preview très bientôt. 🎨',
      read: false,
    })
  }, 2000)

  return NextResponse.json({ message }, { status: 201 })
}
