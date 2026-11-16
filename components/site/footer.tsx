import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pt-14 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="text-base font-extrabold tracking-[0.18em]">WILKREY</p>
        <p className="text-sm font-semibold text-mist">© 2026 WILKREY. Усі права захищено.</p>
        <a
          href="#top"
          className="glass inline-flex size-12 items-center justify-center self-start rounded-full transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 md:self-auto"
          aria-label="Нагору"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </a>
      </div>
      <p
        className="mt-10 bg-gradient-to-b from-white/25 to-transparent bg-clip-text text-center text-[clamp(3.5rem,17.5vw,17rem)] leading-[0.78] font-extrabold tracking-[-0.06em] text-transparent select-none"
        aria-hidden="true"
      >
        WILKREY
      </p>
    </footer>
  )
}
