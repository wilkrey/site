import { Reveal } from './reveal'

function Bar({ className = '' }: { className?: string }) {
  return <div className={`bg-ink/15 ${className}`} />
}

function BrowserFrame({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="flex h-full flex-col border border-ink/70 bg-paper">
      <div className="flex items-center gap-3 border-b border-ink/30 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block size-1.5 rounded-full bg-ink/40" />
          <i className="block size-1.5 rounded-full bg-ink/40" />
          <i className="block size-1.5 rounded-full bg-ink/40" />
        </span>
        <span className="eyebrow truncate text-[0.6rem] text-ink-soft">{url}</span>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  )
}

function LandingWire() {
  return (
    <BrowserFrame url="ваш-сайт.ua">
      <div className="absolute inset-0 grid grid-cols-12 gap-3 p-5 md:p-8">
        <div className="col-span-7 flex flex-col justify-between">
          <Bar className="h-3 w-1/4" />
          <div className="space-y-3">
            <Bar className="h-8 w-full md:h-12" />
            <Bar className="h-8 w-4/5 md:h-12" />
            <Bar className="mt-4 h-2 w-2/3" />
            <Bar className="h-2 w-1/2" />
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-24 bg-rust/80" />
            <div className="h-8 w-24 border border-ink/40" />
          </div>
        </div>
        <div className="ph-x col-span-5 border border-ink/30 bg-paper-deep" />
      </div>
    </BrowserFrame>
  )
}

function MobileWire() {
  return (
    <div className="mx-auto flex h-full w-[62%] flex-col border border-ink/70 bg-paper p-3">
      <div className="mx-auto mb-3 h-1 w-10 bg-ink/30" />
      <Bar className="h-2 w-1/3" />
      <div className="ph-x my-3 aspect-[4/3] border border-ink/30 bg-paper-deep" />
      <Bar className="h-5 w-full" />
      <Bar className="mt-2 h-5 w-2/3" />
      <Bar className="mt-4 h-1.5 w-full" />
      <Bar className="mt-1.5 h-1.5 w-5/6" />
      <div className="mt-auto h-8 w-full bg-rust/80" />
    </div>
  )
}

function GridWire() {
  return (
    <BrowserFrame url="ваш-сайт.ua / про-нас">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-2 gap-3 p-5 md:p-8">
        <div className="ph-x col-span-2 row-span-2 border border-ink/30 bg-paper-deep" />
        <Bar className="col-span-4 h-4 self-start" />
        <div className="ph-x col-span-2 border border-ink/30 bg-paper-deep" />
        <div className="col-span-2 space-y-2 self-end">
          <Bar className="h-3 w-full" />
          <Bar className="h-3 w-2/3" />
          <Bar className="h-2 w-full" />
        </div>
      </div>
    </BrowserFrame>
  )
}

function Caption({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <figcaption className="mt-4 flex items-start justify-between gap-4">
      <div>
        <p className="eyebrow text-ink-soft">{index}</p>
        <p className="mt-2 font-serif text-2xl font-light tracking-tight md:text-3xl">{title}</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{note}</p>
      </div>
      <span className="eyebrow shrink-0 border border-rust px-2.5 py-1.5 text-[0.62rem] text-rust">
        Плейсхолдер
      </span>
    </figcaption>
  )
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
      <div className="grid gap-6 md:grid-cols-12 md:gap-x-8">
        <Reveal className="md:col-span-5">
          <p className="eyebrow mb-6 text-rust">01 / Вибрані роботи</p>
          <h2 className="display text-[clamp(2.4rem,5.4vw,4.8rem)]">
            Тут буде <em className="italic">ваш</em> наступний кейс
          </h2>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:self-end">
          <p className="leading-relaxed text-ink-soft">
            Реальні проєкти з&apos;являться тут одразу після публікації. Поки що це чесні
            заготовки — вони показують формати сайтів, з якими ми працюємо, а не вигадані
            замовлення.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
        <Reveal as="figure" className="md:col-span-7">
          <div className="aspect-[4/3]">
            <LandingWire />
          </div>
          <Caption
            index="Кейс 01"
            title="Лендінг для послуги"
            note="Місце для першого реального проєкту: головний екран, структура та адаптивні версії."
          />
        </Reveal>

        <Reveal as="figure" delay={100} className="md:col-span-4 md:col-start-9 md:mt-32">
          <div className="aspect-[3/4]">
            <MobileWire />
          </div>
          <Caption
            index="Кейс 02"
            title="Мобільна версія"
            note="Тут покажемо, як сайт виглядає й працює на телефоні."
          />
        </Reveal>

        <Reveal as="figure" className="md:col-span-8 md:col-start-3 md:-mt-12">
          <div className="aspect-[16/10]">
            <GridWire />
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
