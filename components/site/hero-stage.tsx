'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const dot = <i className="block size-2 rounded-full bg-white/35" />

export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = ref.current
    if (!stage) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
      return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        stage.style.setProperty('--px', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
        stage.style.setProperty('--py', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:max-w-none"
      aria-label="Візуалізація: макет сайту на склі поверх ескізів"
      role="img"
    >
      <div
        className="enter absolute inset-x-[5%] top-0 bottom-[9%]"
        style={{ '--d': '300ms' } as React.CSSProperties}
      >
        <div className="layer h-full" style={{ '--depth': -14 } as React.CSSProperties}>
          <div className="relative h-full overflow-hidden rounded-[2.25rem] border border-white/15 shadow-[0_60px_120px_-40px_rgb(255_255_255/0.3)]">
            <Image
              src="/images/hero-desk.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover brightness-[0.72] saturate-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-lime/20 via-transparent to-transparent mix-blend-soft-light" />
          </div>
        </div>
      </div>

      <div
        className="enter absolute bottom-0 left-0 w-[76%] sm:-left-6 lg:-left-12"
        style={{ '--d': '650ms' } as React.CSSProperties}
      >
        <div className="layer" style={{ '--depth': 20 } as React.CSSProperties}>
          <div className="glass overflow-hidden rounded-[1.75rem] p-4">
            <span className="sheen" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                {dot}
                {dot}
                {dot}
              </span>
              <span className="truncate rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-bold text-white/70">
                ваш-сайт.ua
              </span>
            </div>
            <div className="mt-5 space-y-2.5" aria-hidden="true">
              <div className="h-4 w-4/5 rounded-full bg-white/85" />
              <div className="h-4 w-3/5 rounded-full bg-white/35" />
              <div className="mt-4 h-1.5 w-full rounded-full bg-white/20" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
            </div>
            <div className="mt-5 flex gap-2" aria-hidden="true">
              <div className="h-8 w-24 rounded-full bg-lime shadow-[0_0_24px_rgb(255_255_255/0.6)]" />
              <div className="h-8 w-16 rounded-full border border-white/25" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="enter absolute -top-3 right-[-3%] lg:-top-6 lg:right-[-6%]"
        style={{ '--d': '900ms' } as React.CSSProperties}
      >
        <div className="layer" style={{ '--depth': 38 } as React.CSSProperties}>
          <div
            className="orb float size-28 sm:size-36"
            style={{ '--fdur': '8s' } as React.CSSProperties}
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="enter absolute top-[16%] left-[-2%] sm:left-[-6%]"
        style={{ '--d': '1050ms' } as React.CSSProperties}
      >
        <div className="layer" style={{ '--depth': 28 } as React.CSSProperties}>
          <div
            className="glass float flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-extrabold"
            style={{ '--fdur': '6.5s', '--fd': '-2s' } as React.CSSProperties}
          >
            <i className="block size-1.5 rounded-full bg-lime" aria-hidden="true" />
            UI/UX
          </div>
        </div>
      </div>

      <div
        className="enter absolute right-[-2%] bottom-[24%] sm:right-[-5%]"
        style={{ '--d': '1200ms' } as React.CSSProperties}
      >
        <div className="layer" style={{ '--depth': 32 } as React.CSSProperties}>
          <div
            className="glass float flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-extrabold"
            style={{ '--fdur': '7.5s', '--fd': '-4s' } as React.CSSProperties}
          >
            <i className="block size-1.5 rounded-full bg-lime" aria-hidden="true" />
            Next.js
          </div>
        </div>
      </div>
    </div>
  )
}
