'use client'

import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#work', label: 'Роботи' },
  { href: '#services', label: 'Послуги' },
  { href: '#studio', label: 'Студія' },
  { href: '#process', label: 'Процес' },
  { href: '#contact', label: 'Контакт' },
]

const sectionIds = ['top', ...links.map((l) => l.href.slice(1))]

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false })
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({})
  const target = hovered ?? active
  const scrollLock = useRef(false)
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const armUnlock = () => {
    clearTimeout(unlockTimer.current)
    unlockTimer.current = setTimeout(() => {
      scrollLock.current = false
    }, 160)
  }

  const goTo = (id: string) => {
    setActive(id === 'top' ? null : id)
    scrollLock.current = true
    armUnlock()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLock.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? null : entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    const onScroll = () => {
      if (scrollLock.current) armUnlock()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearTimeout(unlockTimer.current)
    }
  }, [])

  useEffect(() => {
    const measure = () => {
      const li = target ? itemRefs.current[target] : null
      if (li) setPill({ x: li.offsetLeft, w: li.offsetWidth, visible: true })
      else setPill((p) => ({ ...p, visible: false }))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [target])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex flex-col items-center px-3 md:top-5">
      <div className="glass flex w-full max-w-[54rem] items-center justify-between gap-2 rounded-full py-2 pr-2 pl-5">
        <a
          href="#top"
          onClick={() => {
            goTo('top')
            setOpen(false)
          }}
          className="flex items-center gap-3 text-base font-extrabold tracking-[0.18em]"
          aria-label="WILKREY — на початок"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.png"
            alt=""
            width={668}
            height={324}
            className="h-6 w-auto drop-shadow-[0_2px_8px_rgb(255_255_255/0.18)]"
          />
          WILKREY
        </a>

        <nav aria-label="Основна навігація" className="hidden md:block">
          <ul className="relative flex" onPointerLeave={() => setHovered(null)}>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-white/12 shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]"
              style={{
                width: pill.w,
                transform: `translateX(${pill.x}px)`,
                opacity: pill.visible ? 1 : 0,
                transition:
                  'transform .6s var(--ease-spring), width .6s var(--ease-spring), opacity .3s ease',
              }}
            />
            {links.map((l) => {
              const id = l.href.slice(1)
              return (
                <li
                  key={id}
                  ref={(el) => {
                    itemRefs.current[id] = el
                  }}
                >
                  <a
                    href={l.href}
                    aria-current={active === id ? 'location' : undefined}
                    onClick={() => goTo(id)}
                    onPointerEnter={() => setHovered(id)}
                    onFocus={() => setHovered(id)}
                    onBlur={() => setHovered(null)}
                    className="relative z-10 block px-4 py-2.5 text-sm font-bold text-mist transition-colors duration-300 hover:text-fog aria-[current=location]:text-fog"
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <a
          href="#contact"
          onClick={() => goTo('contact')}
          className="hidden items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-extrabold text-void shadow-[0_0_30px_-4px_rgb(255_255_255/0.55)] transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-105 md:inline-flex"
        >
          Написати
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="flex h-11 items-center gap-3 rounded-full bg-white/10 pr-4 pl-5 text-sm font-bold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Закрити' : 'Меню'}
          <span className="relative block h-2.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-fog transition-all duration-500 ease-[var(--ease-spring)] ${
                open ? 'top-1 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-fog transition-all duration-500 ease-[var(--ease-spring)] ${
                open ? 'top-1 -rotate-45' : 'top-2'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`glass mt-2 w-full max-w-[54rem] origin-top rounded-[2rem] p-3 transition-all duration-500 ease-[var(--ease-out-expo)] md:hidden ${
          open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-3 scale-95 opacity-0'
        }`}
      >
        <nav aria-label="Мобільна навігація">
          <ul>
            {links.map((l, i) => (
              <li
                key={l.href}
                className="transition-all duration-500 ease-[var(--ease-out-expo)]"
                style={{
                  transitionDelay: open ? `${80 + i * 55}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(10px)',
                }}
              >
                <a
                  href={l.href}
                  onClick={() => {
                    goTo(l.href.slice(1))
                    setOpen(false)
                  }}
                  className="flex items-baseline justify-between rounded-2xl px-4 py-3.5 text-3xl font-extrabold tracking-tight transition-colors hover:bg-white/8"
                >
                  {l.label}
                  <span className="eyebrow text-mist">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-2 space-y-1 rounded-2xl bg-black/20 px-4 py-3 text-sm font-semibold">
          <a href="mailto:hello.wilkrey@gmail.com" className="block py-1.5">
            hello.wilkrey@gmail.com
          </a>
          <a
            href="https://t.me/wilkrey"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1.5 text-lime"
          >
            Telegram — @wilkrey
          </a>
        </div>
      </div>
    </header>
  )
}
