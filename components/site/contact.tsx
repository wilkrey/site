import { Reveal } from './reveal'

export function Contact() {
  return (
    <section id="contact" className="bg-rust text-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow mb-8">05 / Контакт</p>
          <h2 className="display text-[clamp(2.8rem,8vw,7.2rem)] text-balance">
            Маєте ідею?
            <br />
            <em className="italic">Напишіть нам.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-x-8">
          <Reveal delay={100} className="md:col-span-5">
            <p className="max-w-sm leading-relaxed text-paper/90">
              Коротко розкажіть про свою справу та що потрібно від сайту. Ми відповімо та
              запропонуємо наступні кроки.
            </p>
          </Reveal>

          <Reveal delay={180} className="md:col-span-6 md:col-start-7">
            <dl className="border-t border-paper/50">
              <div className="group grid gap-2 border-b border-paper/50 py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                <dt className="eyebrow text-paper/80">Email</dt>
                <dd>
                  <a
                    href="mailto:hello.wilkrey@gmail.com"
                    className="link-line break-all font-serif text-[clamp(1.35rem,3vw,2.2rem)] font-light"
                  >
                    hello.wilkrey@gmail.com
                  </a>
                </dd>
              </div>
              <div className="group grid gap-2 border-b border-paper/50 py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                <dt className="eyebrow text-paper/80">Telegram</dt>
                <dd>
                  <a
                    href="https://t.me/wilkrey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line font-serif text-[clamp(1.35rem,3vw,2.2rem)] font-light"
                  >
                    @wilkrey
                  </a>
                </dd>
              </div>
            </dl>
            <a
              href="https://t.me/wilkrey"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-paper px-8 text-ink transition-colors hover:bg-ink hover:text-paper sm:w-auto"
            >
              Написати в Telegram
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
