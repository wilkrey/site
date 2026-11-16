import { ArrowDown, ArrowRight } from 'lucide-react'
import { HeroStage } from './hero-stage'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-5 pt-28 pb-8 md:px-10 md:pt-32"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="parallax absolute -top-[30%] -right-[20%] size-[56rem] max-w-none"
          data-parallax="0.12"
        >
          <div className="drift size-full rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.26),rgb(255_255_255/0.06)_55%,transparent)]" />
        </div>
        <div
          className="parallax absolute -bottom-[35%] -left-[25%] size-[52rem] max-w-none"
          data-parallax="-0.08"
        >
          <div className="drift size-full rounded-full bg-[radial-gradient(closest-side,rgb(70_110_255/0.2),transparent)] [animation-direction:alternate-reverse]" />
        </div>
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <p className="chip enter mb-8 text-fog md:mb-10" style={delay(100)}>
            <i className="block size-1.5 rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)]" aria-hidden="true" />
            Незалежна студія вебдизайну та розробки
          </p>

          <h1 className="display text-[clamp(2.5rem,5.2vw,5.5rem)]">
            <span className="line">
              <span style={delay(250)}>Сайти, що мають</span>
            </span>
            <span className="line">
              <span style={delay(380)}>
                <em className="text-lime-grad">характер</em> і
              </span>
            </span>
            <span className="line">
              <span style={delay(510)}>працюють на&nbsp;вас</span>
            </span>
          </h1>

          <p
            className="enter mt-8 max-w-xl text-base leading-relaxed text-mist md:mt-10 md:text-lg"
            style={delay(750)}
          >
            WILKREY створює сучасні сайти та лендінги для малого бізнесу, підприємців і
            незалежних професіоналів — від ідеї та макета до адаптивної розробки.
          </p>

          <div
            className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={delay(900)}
          >
            <a
              href="#contact"
              data-magnetic
              className="magnetic group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-lime pr-2 pl-7 text-base font-extrabold text-void shadow-[0_0_44px_-6px_rgb(255_255_255/0.6)]"
            >
              Обговорити проєкт
              <span className="grid size-10 place-items-center rounded-full bg-void text-lime transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1">
                <ArrowRight className="size-5" aria-hidden="true" />
              </span>
            </a>
            <a
              href="#work"
              data-magnetic
              className="magnetic glass inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-bold"
            >
              Дивитись роботи
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <HeroStage />
        </div>
      </div>

      <div
        className="enter mx-auto mt-14 flex w-full max-w-[1440px] items-center justify-between gap-4 md:mt-16"
        style={delay(1300)}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Напрями роботи">
          {['Сайти', 'Лендінги', 'UI/UX'].map((t) => (
            <li key={t} className="chip text-mist">
              {t}
            </li>
          ))}
        </ul>
        <a
          href="#work"
          className="hidden items-center gap-2 text-sm font-bold text-mist transition-colors hover:text-fog sm:inline-flex"
        >
          Прокрутити
          <ArrowDown className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
