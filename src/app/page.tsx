import { getAllCategories, getAllDesigns } from '@/lib/data'
import HeroSection from '@/components/home/HeroSection'
import HomeCatalog from '@/components/home/HomeCatalog'
import HowItWorks from '@/components/home/HowItWorks'
import type { Design } from '@/types'

export default function HomePage() {
  const categories = getAllCategories()
  const allDesigns = getAllDesigns()

  // Regrouper les designs par catégorie
  const designsByCategory = allDesigns.reduce<Record<string, Design[]>>((acc, design) => {
    if (!acc[design.categorySlug]) acc[design.categorySlug] = []
    acc[design.categorySlug].push(design)
    return acc
  }, {})

  return (
    <>
      <HeroSection />
      <HomeCatalog categories={categories} designsByCategory={designsByCategory} />
      <HowItWorks />
    </>
  )
}
