import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { TablesUpdate } from '@/types/database'

// PATCH /api/orders/[id] — mettre à jour le statut d'une commande
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const body = await request.json()
  const { status } = body as { status: TablesUpdate<'orders'>['status'] }

  const updateData: TablesUpdate<'orders'> = { status }

  if (status === 'paid') updateData.paid_at = new Date().toISOString()
  if (status === 'delivered') updateData.delivered_at = new Date().toISOString()

  if (status === 'revision_requested') {
    const { data: order } = await supabase
      .from('orders')
      .select('retouches_used')
      .eq('id', params.id)
      .eq('client_id', user.id)
      .single()

    if (order) updateData.retouches_used = order.retouches_used + 1
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', params.id)
    .eq('client_id', user.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ order: data })
}
