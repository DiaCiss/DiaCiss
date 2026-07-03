'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Premium coral robot working on a laptop — built entirely from layered
 * SVG gradients (glossy PBR-ish shell, black visor, charcoal joints,
 * studio reflections). Animated with springs: it "breathes" (~3px / 5s),
 * tilts its head, blinks, and a studio sheen sweeps across the shell.
 * Zero external assets, resolution-independent, GPU-friendly.
 */
export default function RobotScene() {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)

  // Subtle parallax: the whole rig leans a few degrees toward the cursor.
  useEffect(() => {
    if (reduce) return
    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 10
      ty = (e.clientY / window.innerHeight - 0.5) * 8
    }
    const loop = () => {
      cx += (tx - cx) * 0.05
      cy += (ty - cy) * 0.05
      if (wrapRef.current) {
        wrapRef.current.style.transform = `perspective(1200px) rotateY(${cx}deg) rotateX(${-cy}deg)`
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

  const breathe = reduce
    ? {}
    : { y: [0, -3, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const } }

  const headTilt = reduce
    ? {}
    : {
        rotate: [-1.4, 1.4, -1.4],
        transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' as const },
      }

  const blink = reduce
    ? {}
    : {
        scaleY: [1, 1, 0.1, 1, 1],
        transition: {
          duration: 5,
          times: [0, 0.62, 0.66, 0.7, 1],
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }

  return (
    <div className="relative flex w-full items-center justify-center">
      {/* ground glow */}
      <div
        aria-hidden
        className="absolute bottom-[6%] left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,87,87,0.35), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div ref={wrapRef} className="w-full will-change-transform">
        <motion.div animate={breathe} className="w-full">
          <svg
            role="img"
            aria-label="Robot Optimum AI travaillant sur un ordinateur portable"
            viewBox="0 0 520 560"
            className="mx-auto w-full max-w-[520px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
          >
            <defs>
              {/* glossy coral shell */}
              <radialGradient id="shell" cx="38%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#ffb3b3" />
                <stop offset="30%" stopColor="#ff7a7a" />
                <stop offset="65%" stopColor="#ff5757" />
                <stop offset="100%" stopColor="#d93b3b" />
              </radialGradient>
              <radialGradient id="shellDark" cx="40%" cy="30%" r="85%">
                <stop offset="0%" stopColor="#ff8f8f" />
                <stop offset="55%" stopColor="#ef4d4d" />
                <stop offset="100%" stopColor="#b62e2e" />
              </radialGradient>
              {/* charcoal joints */}
              <linearGradient id="charcoal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a3d40" />
                <stop offset="100%" stopColor="#202224" />
              </linearGradient>
              {/* black glossy visor */}
              <radialGradient id="visor" cx="42%" cy="28%" r="80%">
                <stop offset="0%" stopColor="#2b2d30" />
                <stop offset="45%" stopColor="#151617" />
                <stop offset="100%" stopColor="#050506" />
              </radialGradient>
              {/* laptop metal */}
              <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a4d51" />
                <stop offset="100%" stopColor="#2a2c2e" />
              </linearGradient>
              <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff8a8a" />
                <stop offset="100%" stopColor="#ff5757" />
              </linearGradient>
              <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* ===== TORSO / SHOULDERS ===== */}
            <g>
              {/* shoulders */}
              <rect x="140" y="360" width="240" height="150" rx="60" fill="url(#shellDark)" />
              {/* chest plate */}
              <rect x="176" y="352" width="168" height="150" rx="52" fill="url(#shell)" />
              {/* chest core light */}
              <circle cx="260" cy="430" r="26" fill="url(#charcoal)" />
              <motion.circle
                cx="260"
                cy="430"
                r="12"
                fill="#ff5757"
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 10px #ff5757)' }}
              />
              {/* chest sheen */}
              <ellipse cx="220" cy="388" rx="44" ry="20" fill="#ffffff" opacity="0.28" filter="url(#soft)" />

              {/* shoulder joints */}
              <circle cx="158" cy="392" r="30" fill="url(#charcoal)" />
              <circle cx="362" cy="392" r="30" fill="url(#charcoal)" />

              {/* ARMS reaching down to the laptop */}
              <g>
                <rect x="110" y="404" width="60" height="120" rx="30" fill="url(#shellDark)" transform="rotate(16 140 460)" />
                <rect x="350" y="404" width="60" height="120" rx="30" fill="url(#shellDark)" transform="rotate(-16 380 460)" />
                {/* forearms / hands near keyboard */}
                <circle cx="182" cy="520" r="24" fill="url(#charcoal)" />
                <circle cx="338" cy="520" r="24" fill="url(#charcoal)" />
              </g>
            </g>

            {/* ===== NECK ===== */}
            <rect x="238" y="322" width="44" height="52" rx="18" fill="url(#charcoal)" />
            <rect x="238" y="322" width="44" height="16" rx="8" fill="#000" opacity="0.25" />

            {/* ===== HEAD (breathing + tilt + blink) ===== */}
            <motion.g
              animate={headTilt}
              style={{ originX: '260px', originY: '250px', transformBox: 'fill-box' } as any}
            >
              {/* head shell */}
              <rect x="176" y="150" width="168" height="180" rx="60" fill="url(#shell)" />
              {/* top rim highlight */}
              <rect x="196" y="158" width="128" height="60" rx="40" fill="#ffffff" opacity="0.22" filter="url(#soft)" />
              {/* ears / side joints */}
              <rect x="150" y="212" width="34" height="60" rx="16" fill="url(#charcoal)" />
              <rect x="336" y="212" width="34" height="60" rx="16" fill="url(#charcoal)" />
              {/* antenna */}
              <rect x="254" y="118" width="12" height="40" rx="6" fill="url(#charcoal)" />
              <motion.circle
                cx="260"
                cy="112"
                r="9"
                fill="#ff5757"
                animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 8px #ff5757)' }}
              />

              {/* visor */}
              <rect x="196" y="196" width="128" height="96" rx="46" fill="url(#visor)" />
              {/* visor glossy reflection */}
              <ellipse cx="232" cy="222" rx="40" ry="18" fill="#ffffff" opacity="0.16" />

              {/* eyes (blink together) */}
              <motion.g
                animate={blink}
                style={{ originX: '260px', originY: '244px', transformBox: 'fill-box' } as any}
              >
                <circle cx="232" cy="244" r="12" fill="#ffffff" />
                <circle cx="288" cy="244" r="12" fill="#ffffff" />
                <circle cx="232" cy="244" r="12" fill="#ff8a8a" opacity="0.6" />
                <circle cx="288" cy="244" r="12" fill="#ff8a8a" opacity="0.6" />
                <circle cx="232" cy="244" r="5" fill="#fff" />
                <circle cx="288" cy="244" r="5" fill="#fff" />
              </motion.g>

              {/* cheek vents */}
              <rect x="210" y="300" width="30" height="6" rx="3" fill="#000" opacity="0.2" />
              <rect x="280" y="300" width="30" height="6" rx="3" fill="#000" opacity="0.2" />
            </motion.g>

            {/* ===== LAPTOP ===== */}
            <g>
              {/* screen back / lid */}
              <rect x="150" y="470" width="220" height="8" rx="4" fill="url(#metal)" />
              {/* keyboard deck (perspective trapezoid) */}
              <polygon points="150,478 370,478 410,540 110,540" fill="url(#metal)" />
              <polygon points="150,478 370,478 402,534 118,534" fill="#1c1e20" />
              {/* keys glow */}
              <polygon points="168,486 352,486 380,524 140,524" fill="#0e0f10" />
              <rect x="168" y="492" width="184" height="3" rx="1.5" fill="#ff5757" opacity="0.5" />
              <rect x="160" y="502" width="200" height="3" rx="1.5" fill="#ff5757" opacity="0.35" />
              <rect x="152" y="512" width="216" height="3" rx="1.5" fill="#ff5757" opacity="0.25" />
              {/* trackpad glow */}
              <ellipse cx="260" cy="531" rx="24" ry="4" fill="#ff8a8a" opacity="0.4" />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
