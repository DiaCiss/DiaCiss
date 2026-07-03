'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'

/**
 * Layered ambient background for the whole page.
 *  1. Dark radial base       6. Discreet grid (mouse-reactive shift)
 *  2. Mesh gradient blobs     7. Luminous sweeping lines
 *  3. Noise texture           8. Ripple / bloom via blurred orbs
 *  4. Smoke (soft drifting)   9. Light bloom
 *  5. Floating particles     10. Very light chromatic edge
 * All layers are GPU-friendly (transform / opacity / filter only).
 */
export default function Background() {
  const reduce = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)

  // Layer 6 — grid shift follows the cursor with tiny amplitude.
  useEffect(() => {
    if (reduce) return
    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 26
      ty = (e.clientY / window.innerHeight - 0.5) * 26
    }
    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1 + (i % 3),
        delay: (i % 10) * 0.7,
        dur: 9 + (i % 7),
      })),
    []
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1 — dark radial base + charcoal layering */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% -10%, #26282b 0%, #1d1f21 42%, #161719 70%, #111111 100%)',
        }}
      />

      {/* 2 — mesh gradient blobs (very discreet) */}
      <div className="absolute inset-0 opacity-[0.55]">
        <motion.div
          className="absolute -left-[10%] top-[6%] h-[46vw] w-[46vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,87,87,0.28), transparent 62%)',
            filter: 'blur(60px)',
          }}
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-8%] top-[24%] h-[40vw] w-[40vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(255,138,138,0.18), transparent 60%)',
            filter: 'blur(70px)',
          }}
          animate={reduce ? undefined : { x: [0, -36, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[30%] bottom-[-14%] h-[42vw] w-[42vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(120,90,255,0.10), transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -22, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* 6 — discreet grid (shifts slightly with the cursor) */}
      <div ref={gridRef} className="absolute inset-[-4%] opt-grid opacity-70" />

      {/* 7 — luminous sweeping lines */}
      {!reduce && (
        <>
          <motion.div
            className="absolute left-0 top-[32%] h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,138,138,0.5), transparent)',
            }}
            animate={{ opacity: [0, 0.8, 0], x: ['-30%', '30%', '-30%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 top-[68%] h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
            }}
            animate={{ opacity: [0, 0.6, 0], x: ['20%', '-20%', '20%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </>
      )}

      {/* 4/8/9 — smoke + light bloom orbs */}
      <div className="absolute inset-0 opacity-70">
        <div
          className="absolute left-1/2 top-[12%] h-[38vw] w-[70vw] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* 5 — floating particles */}
      {!reduce && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-white/40"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                boxShadow: '0 0 6px rgba(255,255,255,0.5)',
              }}
              animate={{ y: [0, -26, 0], opacity: [0, 0.9, 0] }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* 3 — noise texture */}
      <div className="absolute inset-0 opt-noise" />

      {/* 10 — very light chromatic edge + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />
    </div>
  )
}
