import { Reveal } from './reveal'

function Bar({ className = '' }: { className?: string }) {
  return <div className={`rounded-full bg-white/15 ${className}`} />
}

function Frame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-[1.5rem]">
      <span className="sheen" aria-hidden="true" />
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block size-2 rounded-full bg-white/30" />
          <i className="block size-2 rounded-full bg-white/30" />
          <i className="block size-2 rounded-full bg-white/30" />
        </span>
        <span className="truncate rounded-full bg-white/8 px-3 py-1 text-[0.65rem] font-bold text-white/60">
          {url}
        </span>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  )
}

function LandingWire() {
  return (
    <Frame url="ваш-сайт.ua">
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-5 md:p-7">
        <div className="col-span-7 flex flex-col justify-between">
          <Bar className="h-2.5 w-1/4" />
          <div className="space-y-3">
            <Bar className="h-6 w-full bg-white/80 md:h-9" />
            <Bar className="h-6 w-4/5 bg-white/35 md:h-9" />
            <Bar className="mt-4 h-1.5 w-2/3" />
            <Bar className="h-1.5 w-1/2" />
          </div>
          <div className="flex gap-2.5">
            <div className="h-8 w-24 rounded-full bg-lime shadow-[0_0_24px_rgb(198_255_61/0.5)]" />
            <div className="h-8 w-20 rounded-full border border-white/25" />
          </div>
        </div>
        <div className="ph col-span-5 rounded-2xl border border-white/10" />
      </div>
    </Frame>
  )
}

function MobileWire() {
  return (
    <div className="glass mx-auto flex h-full w-[62%] max-w-[15rem] flex-col rounded-[2.25rem] p-3.5">
      <span className="sheen" aria-hidden="true" />
      <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/25" />
      <Bar className="h-2 w-1/3" />
      <div className="ph my-4 aspect-[4/3] rounded-2xl border border-white/10" />
      <Bar className="h-4 w-full bg-white/75" />
      <Bar className="mt-2 h-4 w-2/3 bg-white/30" />
      <Bar className="mt-4 h-1.5 w-full" />
      <Bar className="mt-1.5 h-1.5 w-5/6" />
      <div className="mt-auto h-9 w-full rounded-full bg-lime shadow-[0_0_24px_rgb(198_255_61/0.45)]" />
    </div>
  )
}

function GridWire() {
  return (
    <Frame url="ваш-сайт.ua / про-нас">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-2 gap-4 p-5 md:p-7">
        <div className="ph col-span-2 row-span-2 rounded-2xl border border-white/10" />
        <div className="col-span-4 space-y-2.5 self-start">
          <Bar className="h-4 w-3/4 bg-white/75" />
          <Bar className="h-1.5 w-full" />
        </div>
        <div className="ph col-span-2 rounded-2xl border border-white/10" />
        <div className="col-span-2 space-y-2 self-end">
          <Bar className="h-3 w-full bg-white/50" />
          <Bar className="h-3 w-2/3 bg-white/25" />
          <Bar className="h-1.5 w-full" />
        </div>
      </div>
    </Frame>
  )
}

function Caption({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <figcaption className="flex items-start justify-between gap-4 p-5 pt-5 md:p-7 md:pt-6">
      <div>
        <p className="eyebrow text-mist">{index}</p>
        <p className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">{note}</p>
      </div>
      <span className="eyebrow shrink-0 rounded-full border border-lime/40 px-3 py-1.5 text-[0.6rem] text-lime">
        Плейсхолдер
      </span>
    </figcaption>
  )
}

export function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-6 md:grid-cols-12 md:gap-x-8">
        <Reveal className="md:col-span-7">
          <p className="chip mb-6 text-lime">01 — Вибрані роботи</p>
          <h2 className="display text-[clamp(2.4rem,5.4vw,5rem)]">
            Тут буде <span className="text-lime-grad">ваш</span> наступний кейс
          </h2>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:self-end">
          <p className="leading-relaxed text-mist">
            Реальні проєкти з&apos;являться тут одразу після публікації. Поки що це чесні
            заготовки — вони показують формати сайтів, з якими ми працюємо, а не вигадані
            замовлення.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-12 md:gap-6">
        <Reveal
          as="figure"
          className="panel relative flex flex-col overflow-hidden rounded-[2rem] md:col-span-7"
        >
          <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(70%_80%_at_85%_10%,rgb(198_255_61/0.28),transparent),radial-gradient(60%_70%_at_0%_100%,rgb(70_110_255/0.22),transparent)] md:m-4">
            <div className="absolute inset-[7%]">
              <LandingWire />
            </div>
          </div>
          <Caption
            index="Кейс 01"
            title="Лендінг для послуги"
            note="Місце для першого реального проєкту: головний екран, структура та адаптивні версії."
          />
        </Reveal>

        <Reveal
          as="figure"
          delay={120}
          className="panel relative flex flex-col overflow-hidden rounded-[2rem] md:col-span-5 md:row-span-2"
        >
          <div className="relative m-3 min-h-[26rem] flex-1 overflow-hidden rounded-[1.5rem] bg-[radial-gradient(70%_60%_at_20%_0%,rgb(198_255_61/0.24),transparent),radial-gradient(70%_60%_at_100%_100%,rgb(70_110_255/0.26),transparent)] md:m-4">
            <div className="parallax absolute inset-y-[7%] inset-x-0" data-parallax="-0.05">
              <MobileWire />
            </div>
          </div>
          <Caption
            index="Кейс 02"
            title="Мобільна версія"
            note="Тут покажемо, як сайт виглядає й працює на телефоні."
          />
        </Reveal>

        <Reveal
          as="figure"
          delay={60}
          className="panel relative flex flex-col overflow-hidden rounded-[2rem] md:col-span-7"
        >
          <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(60%_80%_at_10%_0%,rgb(70_110_255/0.26),transparent),radial-gradient(60%_70%_at_100%_100%,rgb(198_255_61/0.2),transparent)] md:m-4">
            <div className="absolute inset-[7%]">
              <GridWire />
            </div>
          </div>
          <Caption
            index="Кейс 03"
            title="Сайт-візитівка"
            note="Місце для проєкту з кількома сторінками та власною візуальною системою."
          />
        </Reveal>
      </div>
    </section>
  )
}
