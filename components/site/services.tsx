import { Reveal } from './reveal'

const services = [
  {
    title: 'Вебдизайн',
    text: 'Візуальна ідея, типографіка та композиція, які впізнаваною мовою розповідають про ваш бізнес.',
    tags: ['Концепція', 'Макети', 'Візуальна система'],
  },
  {
    title: 'Фронтенд-розробка',
    text: 'Чистий, швидкий і зрозумілий код. Сайт, який легко підтримувати та розвивати далі.',
    tags: ['React', 'Next.js', 'Доступність'],
  },
  {
    title: 'UI/UX-дизайн',
    text: 'Продумана структура сторінок і сценарії: відвідувач швидко розуміє, що пропонуєте саме ви.',
    tags: ['Структура', 'Прототипи', 'Контент'],
  },
  {
    title: 'Адаптивні сайти',
    text: 'Окремо продумані версії для десктопа, планшета й телефона — не просто зменшена копія.',
    tags: ['Desktop', 'Tablet', 'Mobile'],
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-rule bg-paper-deep/60">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-12 md:gap-x-8 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <Reveal>
              <p className="eyebrow mb-6 text-rust">02 / Послуги</p>
              <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)]">
                Що ми <em className="italic">робимо</em>
              </h2>
              <p className="mt-8 max-w-xs leading-relaxed text-ink-soft">
                Чотири напрями, які разом дають цілісний сайт — від першого ескізу до готової
                сторінки у браузері.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="md:col-span-8 md:col-start-5">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60}>
              <article className="group grid gap-4 border-t border-ink/70 py-8 transition-colors hover:bg-paper/70 md:grid-cols-[4rem_1fr] md:gap-8 md:px-4 md:py-10">
                <span className="font-serif text-lg italic text-rust">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.9rem,3.6vw,3.2rem)] font-light leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{s.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Що входить">
                    {s.tags.map((t) => (
                      <li key={t} className="eyebrow text-[0.66rem] text-ink-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
          <li className="border-t border-ink/70" aria-hidden="true" />
        </ul>
      </div>
    </section>
  )
}
