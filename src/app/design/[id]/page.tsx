import { notFound } from 'next/navigation'
import { getDesignById } from '@/lib/data'
import DesignDetailClient from './DesignDetailClient'

interface PageProps {
  params: { id: string }
}

export default function DesignDetailPage({ params }: PageProps) {
  const design = getDesignById(params.id)
  if (!design) notFound()

  return <DesignDetailClient design={design} />
}

export async function generateStaticParams() {
  const { getAllDesigns } = await import('@/lib/data')
  return getAllDesigns().map((d) => ({ id: d.id }))
}
