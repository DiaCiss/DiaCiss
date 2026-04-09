import HowItWorks from '@/components/home/HowItWorks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comment ça marche — DiaCiss',
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-20">
      <HowItWorks />
    </div>
  )
}
