import type { Metadata, Viewport } from 'next'
import './optimum.css'
import { displayFont, subFont, bodyFont } from './fonts'

export const metadata: Metadata = {
  title: 'Optimum AI — Apprenez. Créez. Monétisez.',
  description:
    "Optimum AI est l'agence IA qui forme, automatise et développe des solutions digitales premium propulsées par l'intelligence artificielle. Formation, automatisation et Web Coding assisté par IA.",
  keywords:
    'agence IA, formation IA, automatisation, web coding, intelligence artificielle, prompt engineering, agents IA, solutions digitales',
  openGraph: {
    title: 'Optimum AI — Apprenez. Créez. Monétisez.',
    description:
      "L'agence IA qui vous apprend, construit avec vous et vous aide à monétiser.",
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1d1f21',
}

export default function OptimumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`optimum-root ${displayFont.variable} ${subFont.variable} ${bodyFont.variable}`}
    >
      {children}
    </div>
  )
}
