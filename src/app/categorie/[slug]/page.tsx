import { notFound } from 'next/navigation'
import { getCategoryBySlug, getDesignsByCategory } from '@/lib/data'
import CategoryPageClient from './CategoryPageClient'

interface PageProps {
  params: { slug: string }
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()

  const designs = getDesignsByCategory(params.slug)

  return <CategoryPageClient category={category} designs={designs} />
}

export async function generateStaticParams() {
  const { getAllCategories } = await import('@/lib/data')
  return getAllCategories().map((c) => ({ slug: c.slug }))
}
