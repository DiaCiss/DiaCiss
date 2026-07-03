import { Anton, Manrope, Inter } from 'next/font/google'

/**
 * Display face — heavy, condensed, high-impact. Used for the giant hero
 * words and section titles. We apply a synthetic italic + tight tracking
 * in CSS to land the "ExtraBold Italic Condensed" look from the brief.
 */
export const displayFont = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

/** Subtitle / eyebrow face — geometric, modern, confident. */
export const subFont = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sub',
})

/** Body face — maximally legible. */
export const bodyFont = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})
