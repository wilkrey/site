import { ArrowUpRight } from 'lucide-react'
import { ContactForm } from './contact-form'
import { Reveal } from './reveal'

export function Contact() {
  return (
    <section id="contact" className="px-3 pt-10 md:px-5 md:pt-20">
      <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-lime text-void md:rounded-[3rem]">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_90%_0%,#ffffff,transparent),radial-gradient(50%_70%_at_0%_100%,#e4e4e4,transparent)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(#07080a_1px,transparent_1px),linear-gradient(90deg,#07080a_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000,transparent)]"
          aria-hidden="true"
        />
        <div
          className="parallax absolute -right-10 -bottom-20 -z-10 md:right-[6%]"
          data-parallax="-0.1"
          aria-hidden="true"
        >
          <div className="orb float size-56 md:size-72" style={{ '--fdur': '9s' } as React.CSSProperties} />
        </div>

        <div className="px-6 py-16 md:px-14 md:py-28">
          <Reveal>
            <p className="eyebrow mb-8 inline-flex items-center gap-2 rounded-full bg-void/10 px-4 py-2">
              <i className="block size-1.5 rounded-full bg-void" aria-hidden="true" />
              05 — Контакт
            </p>
            <h2 className="display text-[clamp(2.8rem,9vw,8.5rem)]">
              Маєте ідею?
              <br />
              Напишіть нам.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-x-10">
            <Reveal delay={100} className="md:col-span-4">
              <p className="max-w-sm text-lg leading-relaxed font-semibold text-void/80">
                Коротко розкажіть про свою справу та що потрібно від сайту. Ми відповімо та
                запропонуємо наступні кроки.
              </p>
              <ul className="mt-8 space-y-3">
                <li>
                  <a
                    href="mailto:hello.wilkrey@gmail.com"
                    className="glass-dark group flex items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4"
                  >
                    <span className="min-w-0">
                      <span className="eyebrow block text-void/70">Email</span>
                      <span className="mt-1 block text-base font-extrabold tracking-tight break-all">
                        hello.wilkrey@gmail.com
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/wilkrey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-dark group flex items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4"
                  >
                    <span className="min-w-0">
                      <span className="eyebrow block text-void/70">Telegram</span>
                      <span className="mt-1 block text-base font-extrabold tracking-tight">@wilkrey</span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={180} className="md:col-span-7 md:col-start-6">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
