import { Reveal } from './reveal'

const steps = [
  ['Знайомство', 'Обговорюємо вашу справу, аудиторію та завдання сайту. Домовляємося про обсяг робіт.'],
  ['Структура', 'Збираємо структуру сторінок і змісту. Визначаємо, що саме має побачити відвідувач.'],
  ['Дизайн', 'Малюємо макети: композиція, типографіка, кольори. Обговорюємо та уточнюємо разом з вами.'],
  ['Розробка', 'Верстаємо та програмуємо адаптивний сайт, перевіряємо його на різних екранах.'],
  ['Запуск', 'Готуємо сайт до публікації, передаємо матеріали та пояснюємо, як ним користуватися.'],
]

export function Process() {
  return (
    <section id="process" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-6">
            <p className="eyebrow mb-6 text-[#f08a68]">04 / Процес</p>
            <h2 className="display text-[clamp(2.4rem,5.4vw,4.8rem)]">
              Від розмови до <em className="italic">готового</em> сайту
            </h2>
          </Reveal>
          <Reveal delay={100} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="leading-relaxed text-paper/70">
              П&apos;ять зрозумілих етапів. Ви завжди знаєте, на якому кроці проєкт і що буде
              далі.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 md:mt-24">
          {steps.map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 50}>
              <div
                className={`grid gap-3 border-t border-paper/25 py-7 md:grid-cols-12 md:items-baseline md:gap-x-8 md:py-10 ${
                  i % 2 ? 'md:pl-[8.33%]' : ''
                }`}
              >
                <span className="font-serif text-5xl font-light italic text-[#f08a68] md:col-span-2 md:text-7xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-3xl font-light tracking-tight md:col-span-4 md:text-5xl">
                  {title}
                </h3>
                <p className="max-w-md leading-relaxed text-paper/70 md:col-span-4 md:col-start-8">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
          <li className="border-t border-paper/25" aria-hidden="true" />
        </ol>
      </div>
    </section>
  )
}
