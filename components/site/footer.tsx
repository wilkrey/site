export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-serif text-lg font-semibold tracking-[0.14em]">WILKREY</p>
        <p className="eyebrow text-paper/60">© 2026 WILKREY. Усі права захищено.</p>
        <a href="#top" className="eyebrow link-line self-start pb-1 md:self-auto">
          Нагору ↑
        </a>
      </div>
    </footer>
  )
}
