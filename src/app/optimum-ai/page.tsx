import Background from '@/components/optimum/Background'
import CustomCursor from '@/components/optimum/CustomCursor'
import OptimumNav from '@/components/optimum/OptimumNav'
import Hero from '@/components/optimum/Hero'
import Features from '@/components/optimum/Features'
import Services from '@/components/optimum/Services'
import Stats from '@/components/optimum/Stats'
import CTA from '@/components/optimum/CTA'
import OptimumFooter from '@/components/optimum/OptimumFooter'

export default function OptimumAIPage() {
  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#ff5757] focus:px-5 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <Background />
      <CustomCursor />
      <OptimumNav />

      <main>
        <Hero />
        <Features />
        <Services />
        <Stats />
        <CTA />
      </main>

      <OptimumFooter />
    </>
  )
}
