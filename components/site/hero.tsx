import Image from 'next/image'
import { Reveal } from './reveal'

export function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-[1440px] px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-7 md:pt-6">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-4 md:mb-12">
              <span className="h-px w-10 bg-ink" aria-hidden="true" />
              Незалежна студія вебдизайну та розробки
            </p>
          </Reveal>

          <Reveal delay={80} as="div">
            <h1 className="display text-[clamp(2.9rem,8.4vw,7.6rem)] text-balance">
              Сайти, що мають
              <br />
              <em className="font-light text-rust italic">характер</em> і
              <br className="hidden md:block" /> працюють на&nbsp;вас
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,26rem)_1fr] md:items-end">
            <Reveal delay={160}>
              <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                WILKREY створює сучасні сайти та лендінги для малого бізнесу, підприємців і
                незалежних професіоналів — від ідеї та макета до адаптивної розробки.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-start lg:flex-row">
                <a
                  href="#contact"
                  className="eyebrow inline-flex h-14 items-center justify-center gap-3 bg-ink px-8 text-paper transition-colors hover:bg-rust"
                >
                  Обговорити проєкт
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#work"
                  className="eyebrow inline-flex h-14 items-center justify-center border border-ink px-8 transition-colors hover:bg-ink hover:text-paper"
                >
                  Дивитись роботи
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120} className="relative md:col-span-5 md:col-start-8">
          <figure className="relative md:mt-10">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/hero-desk.png"
                alt="Робочий стіл дизайнера: паперові ескізи макетів, олівець, лінійка та чашка кави біля вікна"
                fill
                priority
                sizes="(min-width: 768px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-4 flex items-start justify-between gap-6 text-ink-soft">
              <span>Fig. 01 — ескізи до першого макета</span>
              <span className="text-rust" aria-hidden="true">
                ●
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="mt-14 flex items-center justify-between border-t border-rule pt-5 md:mt-24">
        <p className="eyebrow text-ink-soft">Сайти · Лендінги · UI/UX</p>
        <a href="#work" className="eyebrow link-line hidden pb-1 sm:inline">
          Прокрутити ↓
        </a>
      </div>
    </section>
  )
}
