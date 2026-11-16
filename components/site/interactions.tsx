'use client'

import { useEffect } from 'react'

export function Interactions() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    const magneticEls = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
    const magneticOffsets = new Map<HTMLElement, { x: number; y: number }>()

    let scrollFrame = 0
    const updateScroll = () => {
      scrollFrame = 0
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--scroll', String(max > 0 ? Math.min(1, window.scrollY / max) : 0))
      if (reduceMotion) return
      const vh = window.innerHeight
      for (const el of parallaxEls) {
        const anchor = el.parentElement
        if (!anchor) continue
        const rect = anchor.getBoundingClientRect()
        if (rect.bottom < -300 || rect.top > vh + 300) continue
        const speed = Number(el.dataset.parallax) || 0
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed
        el.style.setProperty('--ty', `${offset.toFixed(1)}px`)
      }
    }
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll)
    }

    let activeGlass: HTMLElement | null = null
    let pointerFrame = 0
    let lastEvent: PointerEvent | null = null

    const resetMagnet = (el: HTMLElement) => {
      el.style.setProperty('--mx', '0px')
      el.style.setProperty('--my', '0px')
      magneticOffsets.set(el, { x: 0, y: 0 })
    }

    const updatePointer = () => {
      pointerFrame = 0
      const e = lastEvent
      if (!e) return

      const target = e.target as HTMLElement | null
      const glass = target?.closest<HTMLElement>('.glass') ?? null
      if (activeGlass && activeGlass !== glass) activeGlass.style.setProperty('--gl', '0.45')
      activeGlass = glass
      if (glass) {
        const rect = glass.getBoundingClientRect()
        glass.style.setProperty('--gx', `${e.clientX - rect.left}px`)
        glass.style.setProperty('--gy', `${e.clientY - rect.top}px`)
        glass.style.setProperty('--gl', '1')
      }

      for (const el of magneticEls) {
        const offset = magneticOffsets.get(el) ?? { x: 0, y: 0 }
        const rect = el.getBoundingClientRect()
        const cx = rect.left - offset.x + rect.width / 2
        const cy = rect.top - offset.y + rect.height / 2
        const reachX = rect.width / 2 + 48
        const reachY = rect.height / 2 + 48
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        if (Math.abs(dx) < reachX && Math.abs(dy) < reachY) {
          const x = dx * 0.28
          const y = dy * 0.38
          el.style.setProperty('--mx', `${x.toFixed(1)}px`)
          el.style.setProperty('--my', `${y.toFixed(1)}px`)
          magneticOffsets.set(el, { x, y })
        } else if (offset.x !== 0 || offset.y !== 0) {
          resetMagnet(el)
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      lastEvent = e
      if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer)
    }
    const onPointerLeave = () => {
      if (activeGlass) activeGlass.style.setProperty('--gl', '0.45')
      activeGlass = null
      magneticEls.forEach(resetMagnet)
    }

    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    if (finePointer) {
      document.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      cancelAnimationFrame(scrollFrame)
      cancelAnimationFrame(pointerFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return null
}
