'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#work', label: 'Роботи' },
  { href: '#services', label: 'Послуги' },
  { href: '#studio', label: 'Студія' },
  { href: '#process', label: 'Процес' },
  { href: '#contact', label: 'Контакт' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-paper/90 backdrop-blur-md' : 'bg-transparent'
      } ${scrolled && !open ? 'border-b border-rule' : 'border-b border-transparent'}`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-serif text-xl font-semibold tracking-[0.14em]"
          aria-label="WILKREY — на початок"
        >
          WILKREY
        </a>

        <nav aria-label="Основна навігація" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="eyebrow link-line pb-1">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://t.me/wilkrey"
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow hidden border border-ink px-5 py-3 transition-colors hover:bg-ink hover:text-paper md:inline-block"
        >
          Написати
        </a>

        <button
          type="button"
          className="eyebrow -mr-2 flex h-11 items-center gap-3 px-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Закрити' : 'Меню'}
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 bottom-0 flex flex-col justify-between bg-paper px-5 pt-8 pb-10 transition-all duration-500 md:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <nav aria-label="Мобільна навігація">
          <ul className="border-t border-rule">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-rule">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 font-serif text-4xl font-light tracking-tight"
                >
                  {l.label}
                  <span className="eyebrow text-ink-soft">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-sm">
          <a href="mailto:hello.wilkrey@gmail.com" className="block py-1">
            hello.wilkrey@gmail.com
          </a>
          <a
            href="https://t.me/wilkrey"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1"
          >
            Telegram — @wilkrey
          </a>
        </div>
      </div>
    </header>
  )
}
