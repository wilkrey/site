import Image from 'next/image'
import { Reveal } from './reveal'

const principles = [
  ['Спершу сенс', 'Кожен елемент на сторінці має причину. Якщо її немає — елемента теж немає.'],
  ['Увага до деталей', 'Відступи, пропорції, шрифти й стани наведення — те, що відчувається, навіть коли його не помічають.'],
  ['Ясна комунікація', 'Говоримо простою мовою та домовляємося про кожен етап наперед.'],
]

export function Studio() {
  return (
    <section id="studio" className="relative px-3 py-24 md:px-5 md:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40rem] bg-[radial-gradient(50%_60%_at_80%_100%,rgb(255_255_255/0.14),transparent),radial-gradient(40%_50%_at_10%_90%,rgb(70_110_255/0.14),transparent)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px]">
        <Reveal className="panel relative overflow-hidden rounded-[2rem] md:rounded-[3rem]">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-[46rem]">
            <div className="parallax absolute -inset-y-[10%] inset-x-0" data-parallax="-0.07">
              <Image
                src="/images/studio-sketch.png"
                alt="Рука малює олівцем вайрфрейм сайту в блокноті"
                fill
                sizes="(min-width: 1440px) 1440px, 100vw"
                className="object-cover brightness-[0.8]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent md:from-void/95 md:via-void/30" />
            <p className="chip absolute top-4 left-4 bg-void/40 backdrop-blur-md md:top-8 md:left-8">
              Кожен сайт починається з паперу
            </p>
          </div>

          <div className="relative grid gap-8 p-6 md:absolute md:inset-x-0 md:bottom-0 md:grid-cols-12 md:items-end md:gap-10 md:p-12">
            <div className="md:col-span-7">
              <p className="chip mb-6 text-lime">03 — Студія</p>
              <h2 className="display text-[clamp(2.2rem,4.8vw,4.6rem)]">
                Невелика студія, <span className="text-lime-grad">велика</span> увага до
                кожного сайту
              </h2>
            </div>
            <div className="glass rounded-[1.75rem] bg-void/30 p-6 md:col-span-5 md:p-7">
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-white/85">
                <p>
                  WILKREY — незалежна студія вебдизайну й розробки. Ми працюємо напряму з
                  людьми, чия справа потребує сайту: з малим бізнесом, підприємцями та
                  незалежними фахівцями.
                </p>
                <p>
                  Не збираємо сайти з шаблонів. Починаємо з розуміння вашої справи, а потім
                  проєктуємо та пишемо код, який говорить мовою саме вашого бренду.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <ul className="mt-4 grid gap-4 md:mt-6 md:grid-cols-3 md:gap-6">
          {principles.map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 90}>
              <div className="glass h-full rounded-[2rem] p-7 md:p-8">
                <span className="sheen" aria-hidden="true" />
                <p className="mb-10 text-sm font-extrabold text-lime">0{i + 1}</p>
                <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
