'use client'

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/* ------------------------------------------------------------------
   Reveal — blur + scale + fade in on scroll, then perfectly crisp.
------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: 'blur(14px)', y, scale: 0.98 }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   Stagger container + item for grids.
------------------------------------------------------------------ */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(12px)', scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 },
  },
}

/* ------------------------------------------------------------------
   Ripple — light propagation on click, "wave through glass".
   Wrap around any interactive element.
------------------------------------------------------------------ */
export function useRipple() {
  return (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2.2
    const span = document.createElement('span')
    span.className = 'opt-ripple'
    span.style.width = span.style.height = `${size}px`
    span.style.left = `${e.clientX - rect.left}px`
    span.style.top = `${e.clientY - rect.top}px`
    target.appendChild(span)
    span.addEventListener('animationend', () => span.remove())
  }
}

/* ------------------------------------------------------------------
   RippleButton — premium pill button with spring hover, glow & ripple.
------------------------------------------------------------------ */
export function RippleButton({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  href?: string
  onClick?: () => void
  ariaLabel?: string
}) {
  const ripple = useRipple()
  const reduce = useReducedMotion()
  const Tag = (href ? motion.a : motion.button) as any

  return (
    <Tag
      href={href}
      aria-label={ariaLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        ripple(e)
        onClick?.()
      }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`opt-btn opt-btn--${variant} ${className}`}
    >
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>
    </Tag>
  )
}

/* ------------------------------------------------------------------
   ReadingGlassCard — glass card whose blur "clears" under the cursor
   (reading-glass effect) with a subtle spring tilt & elevation.
------------------------------------------------------------------ */
export function ReadingGlassCard({
  children,
  className = '',
  reduced = false,
}: {
  children: ReactNode
  className?: string
  reduced?: boolean
}) {
  const reduce = useReducedMotion()

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--rg-x', `${x}%`)
    el.style.setProperty('--rg-y', `${y}%`)
    el.style.setProperty('--rg-active', '1')
  }

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rg-active', '0')
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className={`opt-read ${
        reduced ? 'opt-glass opt-glass--reduced' : 'opt-glass'
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
