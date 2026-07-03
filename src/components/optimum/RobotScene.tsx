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
              {/* glossy coral shell — brighter key from top-left */}
              <radialGradient id="shell" cx="35%" cy="24%" r="85%">
                <stop offset="0%" stopColor="#ffd0cf" />
                <stop offset="24%" stopColor="#ff9b9b" />
                <stop offset="55%" stopColor="#ff5f5f" />
                <stop offset="82%" stopColor="#ec4646" />
                <stop offset="100%" stopColor="#c9352f" />
              </radialGradient>
              {/* recessed / back-facing shell (shoulders, arms) */}
              <radialGradient id="shellDark" cx="38%" cy="26%" r="88%">
                <stop offset="0%" stopColor="#ff8f8f" />
                <stop offset="50%" stopColor="#e84a4a" />
                <stop offset="100%" stopColor="#a82a26" />
              </radialGradient>
              {/* vertical form-shadow to give every part volume */}
              <linearGradient id="formShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="42%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#7a1f1c" stopOpacity="0.5" />
              </linearGradient>
              {/* coral rim / back light */}
              <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                <stop offset="82%" stopColor="#ffb9b9" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffd8d8" stopOpacity="0.9" />
              </linearGradient>
              {/* charcoal joints, shaded */}
              <linearGradient id="charcoal" x1="0.2" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#45484c" />
                <stop offset="55%" stopColor="#2b2d30" />
                <stop offset="100%" stopColor="#151719" />
              </linearGradient>
              {/* black glossy visor */}
              <radialGradient id="visor" cx="40%" cy="24%" r="88%">
                <stop offset="0%" stopColor="#33363a" />
                <stop offset="42%" stopColor="#17181b" />
                <stop offset="100%" stopColor="#040405" />
              </radialGradient>
              {/* laptop metal */}
              <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#565a5f" />
                <stop offset="100%" stopColor="#27292b" />
              </linearGradient>
              <radialGradient id="screenGlow" cx="50%" cy="100%" r="75%">
                <stop offset="0%" stopColor="#ff8a8a" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ff5757" stopOpacity="0" />
              </radialGradient>

              <filter id="blur2" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
              <filter id="blur6" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="blur12" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="12" />
              </filter>

              {/* clip masks keep the studio highlights inside each shell */}
              <clipPath id="clipHead">
                <rect x="176" y="150" width="168" height="180" rx="62" />
              </clipPath>
              <clipPath id="clipChest">
                <rect x="168" y="350" width="184" height="156" rx="58" />
              </clipPath>
              <clipPath id="clipVisor">
                <rect x="196" y="196" width="128" height="96" rx="46" />
              </clipPath>
            </defs>

            {/* soft contact shadow of the whole rig */}
            <ellipse cx="260" cy="548" rx="150" ry="16" fill="#000" opacity="0.35" filter="url(#blur12)" />

            {/* ===== TORSO / SHOULDERS ===== */}
            <g>
              {/* back shoulder mass */}
              <rect x="138" y="360" width="244" height="150" rx="62" fill="url(#shellDark)" />
              {/* shoulder joints (behind chest) */}
              <circle cx="156" cy="392" r="31" fill="url(#charcoal)" />
              <circle cx="364" cy="392" r="31" fill="url(#charcoal)" />
              <ellipse cx="149" cy="382" rx="10" ry="14" fill="#fff" opacity="0.18" filter="url(#blur2)" />
              <ellipse cx="357" cy="382" rx="10" ry="14" fill="#fff" opacity="0.14" filter="url(#blur2)" />

              {/* ARMS reaching down to the laptop */}
              <g>
                <rect x="110" y="402" width="60" height="122" rx="30" fill="url(#shellDark)" transform="rotate(16 140 460)" />
                <rect x="350" y="402" width="60" height="122" rx="30" fill="url(#shellDark)" transform="rotate(-16 380 460)" />
                {/* forearm rim light */}
                <rect x="110" y="402" width="60" height="122" rx="30" fill="url(#formShade)" transform="rotate(16 140 460)" />
                <rect x="350" y="402" width="60" height="122" rx="30" fill="url(#formShade)" transform="rotate(-16 380 460)" />
                {/* hands / wrist joints near keyboard */}
                <circle cx="182" cy="520" r="24" fill="url(#charcoal)" />
                <circle cx="338" cy="520" r="24" fill="url(#charcoal)" />
                <ellipse cx="176" cy="512" rx="8" ry="10" fill="#fff" opacity="0.16" filter="url(#blur2)" />
                <ellipse cx="332" cy="512" rx="8" ry="10" fill="#fff" opacity="0.16" filter="url(#blur2)" />
              </g>

              {/* chest plate */}
              <rect x="168" y="350" width="184" height="156" rx="58" fill="url(#shell)" />
              <g clipPath="url(#clipChest)">
                {/* volume shade */}
                <rect x="168" y="350" width="184" height="156" rx="58" fill="url(#formShade)" />
                {/* broad studio gloss (upper) */}
                <ellipse cx="228" cy="384" rx="70" ry="30" fill="#fff" opacity="0.28" filter="url(#blur12)" />
                {/* sharp key hotspot */}
                <ellipse cx="212" cy="376" rx="20" ry="12" fill="#fff" opacity="0.6" filter="url(#blur2)" />
                {/* back-light rim on lower-right */}
                <rect x="168" y="350" width="184" height="156" rx="58" fill="url(#rim)" opacity="0.7" />
                {/* panel seam */}
                <path d="M200 470 H320" stroke="#7a1f1c" strokeWidth="2" opacity="0.35" />
              </g>

              {/* chest core */}
              <circle cx="260" cy="432" r="27" fill="url(#charcoal)" />
              <circle cx="260" cy="432" r="27" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="2" />
              <motion.circle
                cx="260"
                cy="432"
                r="12"
                fill="#ff6b6b"
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.1, 1] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  filter: 'drop-shadow(0 0 12px #ff5757)',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }}
              />
              <circle cx="255" cy="427" r="3.5" fill="#fff" opacity="0.8" />
            </g>

            {/* ===== NECK ===== */}
            <rect x="236" y="320" width="48" height="54" rx="20" fill="url(#charcoal)" />
            <ellipse cx="250" cy="332" rx="6" ry="16" fill="#fff" opacity="0.14" filter="url(#blur2)" />
            {/* ambient occlusion where neck meets chest */}
            <ellipse cx="260" cy="360" rx="40" ry="12" fill="#000" opacity="0.28" filter="url(#blur6)" />

            {/* ===== HEAD (breathing + tilt + blink) ===== */}
            <motion.g
              animate={headTilt}
              style={{ originX: '260px', originY: '250px', transformBox: 'fill-box' } as any}
            >
              {/* antenna */}
              <rect x="255" y="116" width="10" height="42" rx="5" fill="url(#charcoal)" />
              <motion.g
                animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.18, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '260px', originY: '110px', transformBox: 'fill-box' } as any}
              >
                <circle cx="260" cy="110" r="14" fill="#ff5757" opacity="0.35" filter="url(#blur6)" />
                <circle cx="260" cy="110" r="8" fill="#ff6b6b" />
                <circle cx="257" cy="107" r="2.6" fill="#fff" opacity="0.9" />
              </motion.g>

              {/* ears / side joints */}
              <rect x="150" y="214" width="32" height="58" rx="15" fill="url(#charcoal)" />
              <rect x="338" y="214" width="32" height="58" rx="15" fill="url(#charcoal)" />
              <ellipse cx="158" cy="228" rx="5" ry="10" fill="#fff" opacity="0.16" filter="url(#blur2)" />

              {/* head shell */}
              <rect x="176" y="150" width="168" height="180" rx="62" fill="url(#shell)" />
              <g clipPath="url(#clipHead)">
                {/* volume shade */}
                <rect x="176" y="150" width="168" height="180" rx="62" fill="url(#formShade)" />
                {/* broad studio reflection */}
                <ellipse cx="226" cy="188" rx="66" ry="34" fill="#fff" opacity="0.32" filter="url(#blur12)" />
                {/* sharp key hotspot */}
                <ellipse cx="210" cy="176" rx="18" ry="11" fill="#fff" opacity="0.72" filter="url(#blur2)" />
                {/* secondary glint */}
                <circle cx="300" cy="182" r="6" fill="#fff" opacity="0.4" filter="url(#blur2)" />
                {/* coral back-light rim (lower-right edge) */}
                <rect x="176" y="150" width="168" height="180" rx="62" fill="url(#rim)" />
              </g>

              {/* visor */}
              <rect x="196" y="196" width="128" height="96" rx="46" fill="url(#visor)" />
              <rect x="196" y="196" width="128" height="96" rx="46" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="2" />
              <g clipPath="url(#clipVisor)">
                {/* curved top reflection band */}
                <ellipse cx="248" cy="200" rx="86" ry="26" fill="#fff" opacity="0.14" filter="url(#blur6)" />
                <path d="M206 214 Q252 196 320 210" stroke="#fff" strokeWidth="3" strokeOpacity="0.25" fill="none" filter="url(#blur2)" />
                {/* soft screen bounce from below */}
                <ellipse cx="260" cy="300" rx="70" ry="26" fill="#ff5757" opacity="0.16" filter="url(#blur6)" />
              </g>

              {/* eyes (blink together) */}
              <motion.g
                animate={blink}
                style={{ originX: '260px', originY: '244px', transformBox: 'fill-box' } as any}
              >
                <circle cx="230" cy="244" r="15" fill="#ff8a8a" opacity="0.35" filter="url(#blur6)" />
                <circle cx="290" cy="244" r="15" fill="#ff8a8a" opacity="0.35" filter="url(#blur6)" />
                <circle cx="230" cy="244" r="11" fill="#fff" />
                <circle cx="290" cy="244" r="11" fill="#fff" />
                <circle cx="230" cy="244" r="11" fill="#ffdede" opacity="0.5" />
                <circle cx="290" cy="244" r="11" fill="#ffdede" opacity="0.5" />
                <circle cx="227" cy="240" r="3.4" fill="#fff" />
                <circle cx="287" cy="240" r="3.4" fill="#fff" />
              </motion.g>

              {/* mouth / cheek vents */}
              <rect x="238" y="276" width="44" height="7" rx="3.5" fill="#000" opacity="0.3" />
              <rect x="246" y="276" width="8" height="7" rx="2" fill="#ff5757" opacity="0.35" />
              <rect x="266" y="276" width="8" height="7" rx="2" fill="#ff5757" opacity="0.35" />
            </motion.g>

            {/* ===== LAPTOP ===== */}
            <g>
              {/* contact shadow under laptop */}
              <ellipse cx="260" cy="544" rx="140" ry="12" fill="#000" opacity="0.3" filter="url(#blur6)" />
              {/* hinge / screen base */}
              <rect x="150" y="470" width="220" height="9" rx="4.5" fill="url(#metal)" />
              {/* keyboard deck (perspective trapezoid) */}
              <polygon points="150,479 370,479 412,542 108,542" fill="url(#metal)" />
              <polygon points="150,479 370,479 404,536 116,536" fill="#1b1d1f" />
              {/* recessed key area + glow */}
              <polygon points="168,487 352,487 382,526 138,526" fill="#0c0d0e" />
              <polygon points="168,487 352,487 382,526 138,526" fill="url(#screenGlow)" opacity="0.5" />
              <rect x="170" y="493" width="180" height="3" rx="1.5" fill="#ff6b6b" opacity="0.55" />
              <rect x="162" y="503" width="196" height="3" rx="1.5" fill="#ff6b6b" opacity="0.4" />
              <rect x="153" y="513" width="214" height="3" rx="1.5" fill="#ff6b6b" opacity="0.28" />
              {/* trackpad */}
              <ellipse cx="260" cy="532" rx="26" ry="4.5" fill="#ff8a8a" opacity="0.45" />
              {/* front edge highlight */}
              <path d="M116 536 H404" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.12" />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
