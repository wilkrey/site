import { Reveal } from './reveal'
import { Timeline } from './timeline'

const steps = [
  ['Знайомство', 'Обговорюємо вашу справу, аудиторію та завдання сайту. Домовляємося про обсяг робіт.'],
  ['Структура', 'Збираємо структуру сторінок і змісту. Визначаємо, що саме має побачити відвідувач.'],
  ['Дизайн', 'Малюємо макети: композиція, типографіка, кольори. Обговорюємо та уточнюємо разом з вами.'],
  ['Розробка', 'Верстаємо та програмуємо адаптивний сайт, перевіряємо його на різних екранах.'],
  ['Запуск', 'Готуємо сайт до публікації, передаємо матеріали та пояснюємо, як ним користуватися.'],
]

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="parallax absolute top-[20%] -left-[20%] size-[50rem]" data-parallax="0.1">
          <div className="size-full rounded-full bg-[radial-gradient(closest-side,rgb(198_255_61/0.14),transparent)]" />
        </div>
        <div className="parallax absolute -right-[20%] bottom-[5%] size-[46rem]" data-parallax="-0.08">
          <div className="size-full rounded-full bg-[radial-gradient(closest-side,rgb(70_110_255/0.18),transparent)]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="chip mb-6 text-lime">04 — Процес</p>
          <h2 className="display text-[clamp(2.4rem,5.4vw,5rem)]">
            Від розмови до <span className="text-lime-grad">готового</span> сайту
          </h2>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-mist">
            П&apos;ять зрозумілих етапів. Ви завжди знаєте, на якому кроці проєкт і що буде
            далі.
          </p>
        </Reveal>

        <div className="mt-16 md:mt-24">
          <Timeline>
            {steps.map(([title, text], i) => (
              <Reveal
                as="li"
                key={title}
                delay={60}
                className="group relative grid py-3 md:grid-cols-2 md:py-5"
              >
                <span className="absolute top-9 left-5 z-10 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-graphite text-xs font-extrabold text-mist transition-all duration-700 ease-[var(--ease-spring)] group-[.is-in]:scale-110 group-[.is-in]:border-lime group-[.is-in]:bg-lime group-[.is-in]:text-void group-[.is-in]:shadow-[0_0_34px_rgb(198_255_61/0.7)] md:top-12 md:left-1/2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className={`ml-14 md:ml-0 ${
                    i % 2 ? 'md:col-start-2 md:pl-14' : 'md:col-start-1 md:pr-14'
                  }`}
                >
                  <div className="glass rounded-[1.75rem] p-6 md:p-8">
                    <span className="sheen" aria-hidden="true" />
                    <h3 className="text-2xl font-extrabold tracking-tight md:text-4xl">{title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-mist">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  )
}
