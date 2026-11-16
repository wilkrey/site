'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const progress = (window.innerHeight * 0.6 - rect.top) / rect.height
      el.style.setProperty('--p', Math.min(1, Math.max(0, progress)).toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <ol ref={ref} className="relative" style={{ '--p': 0 } as React.CSSProperties}>
      <span
        className="absolute top-0 bottom-0 left-5 w-px -translate-x-1/2 bg-white/12 md:left-1/2"
        aria-hidden="true"
      />
      <span
        className="absolute top-0 bottom-0 left-5 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-lime/0 via-lime to-lime shadow-[0_0_18px_rgb(255_255_255/0.9)] md:left-1/2"
        style={{ transform: 'translateX(-50%) scaleY(var(--p))' }}
        aria-hidden="true"
      />
      {children}
    </ol>
  )
}
