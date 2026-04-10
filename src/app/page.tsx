import { getAllCategories, getFeaturedDesigns } from '@/lib/data'
import HeroSection from '@/components/home/HeroSection'
import CategorySection from '@/components/home/CategorySection'
import FeaturedDesigns from '@/components/home/FeaturedDesigns'
import HowItWorks from '@/components/home/HowItWorks'
import DesignersSpotlight from '@/components/home/DesignersSpotlight'

export default function HomePage() {
  const categories = getAllCategories()
  const featuredDesigns = getFeaturedDesigns()

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <FeaturedDesigns designs={featuredDesigns} />
      <DesignersSpotlight />
      <HowItWorks />
    </>
  )
}
