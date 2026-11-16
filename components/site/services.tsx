import { Reveal } from './reveal'

function TypeTile() {
  return (
    <div className="glass flex aspect-square w-full max-w-[17rem] flex-col justify-between rounded-[2rem] p-6">
      <span className="sheen" aria-hidden="true" />
      <span className="text-[5.5rem] leading-none font-extrabold tracking-tighter">Aa</span>
      <div className="flex gap-2" aria-hidden="true">
        <i className="block size-8 rounded-full bg-lime" />
        <i className="block size-8 rounded-full bg-white" />
        <i className="block size-8 rounded-full bg-[#4a6dff]" />
        <i className="block size-8 rounded-full bg-white/20" />
      </div>
    </div>
  )
}

function CodeTile() {
  return (
    <div className="glass aspect-square w-full max-w-[17rem] rounded-[2rem] p-6">
      <span className="sheen" aria-hidden="true" />
      <p className="text-3xl font-extrabold text-lime" aria-hidden="true">
        {'</>'}
      </p>
      <div className="mt-6 space-y-3" aria-hidden="true">
        {['w-2/3', 'w-4/5 ml-5', 'w-1/2 ml-5', 'w-3/5 ml-10', 'w-2/5'].map((c, i) => (
          <div key={i} className={`h-2 rounded-full ${c} ${i === 3 ? 'bg-lime/80' : 'bg-white/25'}`} />
        ))}
      </div>
    </div>
  )
}

function WireTile() {
  return (
    <div className="glass grid aspect-square w-full max-w-[17rem] grid-cols-6 grid-rows-6 gap-2.5 rounded-[2rem] p-5">
      <span className="sheen" aria-hidden="true" />
      <div className="col-span-6 row-span-1 rounded-full bg-white/25" />
      <div className="ph col-span-4 row-span-3 rounded-xl border border-white/10" />
      <div className="col-span-2 row-span-3 rounded-xl bg-white/12" />
      <div className="col-span-2 row-span-2 rounded-xl bg-white/12" />
      <div className="col-span-4 row-span-2 rounded-xl bg-lime/85" />
    </div>
  )
}

function DeviceTile() {
  return (
    <div className="glass relative aspect-square w-full max-w-[17rem] rounded-[2rem]">
      <span className="sheen" aria-hidden="true" />
      <div className="absolute inset-x-6 top-7 bottom-14 rounded-xl border border-white/30" aria-hidden="true">
        <div className="mx-auto mt-2 h-1 w-1/3 rounded-full bg-white/25" />
      </div>
      <div className="absolute right-8 bottom-6 h-24 w-20 rounded-xl border border-white/40 bg-void/60 backdrop-blur-md" aria-hidden="true" />
      <div className="absolute bottom-6 left-9 h-16 w-9 rounded-lg border border-lime/80 bg-lime/15" aria-hidden="true" />
    </div>
  )
}

const services = [
  {
    title: 'Вебдизайн',
    text: 'Візуальна ідея, типографіка та композиція, які впізнаваною мовою розповідають про ваш бізнес.',
    tags: ['Концепція', 'Макети', 'Візуальна система'],
    visual: <TypeTile />,
    glow: '-right-24 -top-24',
  },
  {
    title: 'Фронтенд-розробка',
    text: 'Чистий, швидкий і зрозумілий код. Сайт, який легко підтримувати та розвивати далі.',
    tags: ['React', 'Next.js', 'Доступність'],
    visual: <CodeTile />,
    glow: '-left-24 -bottom-32',
  },
  {
    title: 'UI/UX-дизайн',
    text: 'Продумана структура сторінок і сценарії: відвідувач швидко розуміє, що пропонуєте саме ви.',
    tags: ['Структура', 'Прототипи', 'Контент'],
    visual: <WireTile />,
    glow: '-right-24 -bottom-32',
  },
  {
    title: 'Адаптивні сайти',
    text: 'Окремо продумані версії для десктопа, планшета й телефона — не просто зменшена копія.',
    tags: ['Desktop', 'Tablet', 'Mobile'],
    visual: <DeviceTile />,
    glow: '-left-24 -top-24',
  },
]

export function Services() {
  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="chip mb-6 text-lime">02 — Послуги</p>
          <h2 className="display text-[clamp(2.4rem,5.4vw,5rem)]">
            Що ми <span className="text-lime-grad">робимо</span>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-mist">
            Чотири напрями, які разом дають цілісний сайт — від першого ескізу до готової
            сторінки у браузері.
          </p>
        </Reveal>

        <ul className="mt-14 space-y-5 md:mt-20 md:space-y-8">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="stack-card"
              style={{ '--i': i, zIndex: i + 1 } as React.CSSProperties}
            >
              <article className="panel relative grid items-center gap-8 overflow-hidden rounded-[2rem] p-6 md:min-h-[24rem] md:grid-cols-12 md:gap-10 md:p-12">
                <div
                  className={`pointer-events-none absolute size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(198_255_61/0.16),transparent)] ${s.glow}`}
                  aria-hidden="true"
                />
                <div className="relative md:col-span-7">
                  <p className="mb-6 flex items-center gap-3 text-sm font-extrabold text-lime">
                    <span className="grid size-10 place-items-center rounded-full border border-lime/40">
                      0{i + 1}
                    </span>
                    <span className="h-px w-12 bg-lime/30" aria-hidden="true" />
                  </p>
                  <h3 className="display text-[clamp(2rem,4.4vw,4rem)]">{s.title}</h3>
                  <p className="mt-5 max-w-lg leading-relaxed text-mist">{s.text}</p>
                  <ul className="mt-7 flex flex-wrap gap-2" aria-label="Що входить">
                    {s.tags.map((t) => (
                      <li key={t} className="chip text-fog">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative flex justify-center md:col-span-5 md:justify-end">
                  {s.visual}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
