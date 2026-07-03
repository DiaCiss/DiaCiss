'use client'

import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a small coral glowing dot with a trailing ring that
 * expands over interactive elements. Desktop / fine-pointer only —
 * touch devices keep their native behaviour and never see this.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    const root = document.querySelector('.optimum-root') as HTMLElement | null
    root?.classList.add('opt-cursor-on')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      }
      const target = e.target as HTMLElement
      const interactive = !!target.closest(
        'a, button, [role="button"], input, .opt-read'
      )
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? '64px' : '42px'
        ringRef.current.style.height = interactive ? '64px' : '42px'
        ringRef.current.style.borderColor = interactive
          ? 'rgba(255,87,87,0.9)'
          : 'rgba(255,87,87,0.5)'
      }
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      root?.classList.remove('opt-cursor-on')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="opt-cursor" aria-hidden />
      <div
        ref={ringRef}
        className="opt-cursor-ring transition-[width,height,border-color] duration-200 ease-out"
        aria-hidden
      />
    </>
  )
}
