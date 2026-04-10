import HowItWorks from '@/components/home/HowItWorks'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-sand-900 mb-3">
          Comment ça marche ?
        </h1>
        <p className="text-sand-400 mb-12">
          De votre idée à votre design final en moins d&apos;une heure
        </p>
      </div>
      <HowItWorks />
    </div>
  )
}
