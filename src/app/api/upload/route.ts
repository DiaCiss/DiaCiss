import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/upload — upload d'un fichier vers Supabase Storage
export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File
  const type = formData.get('type') as string // 'photo' | 'logo'

  if (!file) return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })

  // Limite : 10MB
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Fichier trop volumineux (max 10MB)' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const path = `${user.id}/${type}-${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from('order-files')
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage
    .from('order-files')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl, path: data.path })
}
