import Image from 'next/image'
import { Reveal } from './reveal'

const principles = [
  ['Спершу сенс', 'Кожен елемент на сторінці має причину. Якщо її немає — елемента теж немає.'],
  ['Увага до деталей', 'Відступи, пропорції, шрифти й стани наведення — те, що відчувається, навіть коли його не помічають.'],
  ['Ясна комунікація', 'Говоримо простою мовою та домовляємося про кожен етап наперед.'],
]

export function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-8">
        <Reveal className="md:col-span-6 md:col-start-1 md:row-start-1">
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/studio-sketch.png"
                alt="Рука малює олівцем вайрфрейм сайту в блокноті"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-4 text-ink-soft">
              Fig. 02 — кожен сайт починається з паперу
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={100} className="md:col-span-5 md:col-start-8 md:row-start-1 md:pt-10">
          <p className="eyebrow mb-6 text-rust">03 / Студія</p>
          <h2 className="display text-[clamp(2.4rem,4.8vw,4.2rem)]">
            Невелика студія, <em className="italic">велика</em> увага до кожного сайту
          </h2>
          <div className="mt-8 space-y-5 leading-relaxed text-ink-soft">
            <p>
              WILKREY — незалежна студія вебдизайну й розробки. Ми працюємо напряму з людьми, чия
              справа потребує сайту: з малим бізнесом, підприємцями та незалежними фахівцями.
            </p>
            <p>
              Не збираємо сайти з шаблонів. Починаємо з розуміння вашої справи, а потім
              проєктуємо та пишемо код, який говорить мовою саме вашого бренду.
            </p>
          </div>
        </Reveal>
      </div>

      <ul className="mt-16 grid border-t border-ink/70 md:mt-28 md:grid-cols-3">
        {principles.map(([title, text], i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 80}
            className="border-b border-rule py-8 md:border-b-0 md:py-10 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10"
          >
            <p className="eyebrow mb-4 text-ink-soft">0{i + 1}</p>
            <h3 className="font-serif text-2xl font-light tracking-tight md:text-3xl">{title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
