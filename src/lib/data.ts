import categoriesData from '@/data/categories.json'
import designsData from '@/data/designs.json'
import type { Category, Design } from '@/types'

export function getAllCategories(): Category[] {
  return categoriesData as Category[]
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.slug === slug)
}

export function getAllDesigns(): Design[] {
  return designsData as Design[]
}

export function getDesignsByCategory(categorySlug: string): Design[] {
  return (designsData as Design[]).filter((d) => d.categorySlug === categorySlug)
}

export function getDesignById(id: string): Design | undefined {
  return (designsData as Design[]).find((d) => d.id === id)
}

export function getFeaturedDesigns(): Design[] {
  return (designsData as Design[]).filter((d) => d.featured)
}

export function getDesignsByTier(categorySlug: string, tier: string): Design[] {
  return (designsData as Design[]).filter(
    (d) => d.categorySlug === categorySlug && d.tier === tier
  )
}
