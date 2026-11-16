import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'

type Project = {
  index: string
  name: string
  category: string
  description: string
  url: string | null
  host: string
  glow: string
  nameClass: string
}

const projects: Project[] = [
  {
    index: '01',
    name: 'WILKREY',
    category: 'Web Design & Development Studio',
    description:
      'Офіційний сайт WILKREY — креативної студії веб-дизайну та розробки, що створює сучасні, продумані та візуально виразні цифрові рішення.',
    url: 'https://wilkrey.pages.dev',
    host: 'wilkrey.pages.dev',
    glow: 'radial-gradient(70%_80%_at_85%_10%,rgb(255_255_255/0.3),transparent),radial-gradient(60%_70%_at_0%_100%,rgb(70_110_255/0.22),transparent)',
    nameClass: 'text-lime-grad font-extrabold tracking-[0.14em]',
  },
  {
    index: '02',
    name: 'NOIR Café',
    category: 'Website Design · Independent Concept Project',
    description:
      'Незалежний концепт сайту сучасної кав’ярні: вишукана візуальна мова, продумані адаптивні макети та плавні взаємодії.',
    url: null,
    host: 'демо буде додано',
    glow: 'radial-gradient(70%_80%_at_85%_10%,rgb(255_170_80/0.22),transparent),radial-gradient(60%_70%_at_0%_100%,rgb(70_60_50/0.4),transparent)',
    nameClass: 'font-extrabold tracking-[0.2em] text-white',
  },
  {
    index: '03',
    name: 'FLEURÉ',
    category: 'Website Design · Independent Concept Project',
    description:
      'Незалежний концепт сайту флористичної студії: вишукана типографіка, елегантний візуальний сторітелінг та чітко структурований адаптивний досвід.',
    url: null,
    host: 'демо буде додано',
    glow: 'radial-gradient(70%_80%_at_85%_10%,rgb(255_140_180/0.22),transparent),radial-gradient(60%_70%_at_0%_100%,rgb(120_90_255/0.2),transparent)',
    nameClass: 'font-light tracking-[0.3em] text-white',
  },
  {
    index: '04',
    name: 'DENTARA',
    category: 'Website Design · Independent Concept Project',
    description:
      'Незалежний концепт сайту сучасної стоматологічної клініки: чистий, сучасний візуальний напрям, професійна подача та адаптивні макети.',
    url: null,
    host: 'демо буде додано',
    glow: 'radial-gradient(70%_80%_at_85%_10%,rgb(90_220_230/0.22),transparent),radial-gradient(60%_70%_at_0%_100%,rgb(60_110_255/0.22),transparent)',
    nameClass: 'font-bold tracking-[0.22em] text-white',
  },
]

function Preview({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] ${large ? 'aspect-[16/10] md:aspect-auto md:min-h-[26rem]' : 'aspect-[16/10]'}`}
      style={{ backgroundImage: project.glow.replaceAll('_', ' ') }}
    >
      <div className="glass absolute inset-[7%] flex flex-col overflow-hidden rounded-[1.25rem]">
        <span className="sheen" aria-hidden="true" />
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="block size-2 rounded-full bg-white/30" />
            <i className="block size-2 rounded-full bg-white/30" />
            <i className="block size-2 rounded-full bg-white/30" />
          </span>
          <span className="truncate rounded-full bg-white/8 px-3 py-1 text-[0.65rem] font-bold text-white/60">
            {project.host}
          </span>
        </div>
        <div className="grid flex-1 place-items-center px-4">
          <p
            className={`text-center ${project.nameClass} ${large ? 'text-[clamp(2rem,6vw,4.5rem)]' : 'text-[clamp(1.6rem,3.6vw,2.6rem)]'}`}
          >
            {project.name}
          </p>
        </div>
      </div>
    </div>
  )
}

function Info({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className={`flex flex-col gap-4 p-5 pt-5 md:p-7 md:pt-6 ${large ? 'md:justify-between md:p-10' : ''}`}>
      <div>
        <p className="eyebrow text-mist">Проєкт {project.index}</p>
        <h3
          className={`mt-2 font-extrabold tracking-tight ${large ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}
        >
          {project.name}
        </h3>
        <p className="eyebrow mt-3 text-lime">{project.category}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-mist md:text-base">{project.description}</p>
      </div>
      {project.url ? (
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-extrabold text-void shadow-[0_0_30px_-6px_rgb(255_255_255/0.5)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-105">
          Переглянути сайт
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      ) : (
        <span className="eyebrow w-fit rounded-full border border-white/20 px-4 py-2 text-[0.65rem] text-mist">
          Посилання на демо ще не додано
        </span>
      )}
    </div>
  )
}

function ProjectCard({ project, large, delay }: { project: Project; large?: boolean; delay: number }) {
  const body = (
    <div className={`flex h-full flex-col ${large ? 'md:grid md:grid-cols-12' : ''}`}>
      <div className={`m-3 md:m-4 ${large ? 'md:col-span-7' : ''}`}>
        <Preview project={project} large={large} />
      </div>
      <div className={large ? 'md:col-span-5' : ''}>
        <Info project={project} large={large} />
      </div>
    </div>
  )

  return (
    <Reveal
      as="article"
      delay={delay}
      className={`panel relative overflow-hidden rounded-[2rem] ${large ? 'md:col-span-12' : 'md:col-span-6 lg:col-span-4'}`}
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — переглянути сайт (відкриється в новій вкладці)`}
          className="group block h-full transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
        >
          {body}
        </a>
      ) : (
        body
      )}
    </Reveal>
  )
}

export function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-6 md:grid-cols-12 md:gap-x-8">
        <Reveal className="md:col-span-7">
          <p className="chip mb-6 text-lime">01 — Вибрані роботи</p>
          <h2 className="display text-[clamp(2.4rem,5.4vw,5rem)]">
            Вибрані <span className="text-lime-grad">проєкти</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:self-end">
          <p className="leading-relaxed text-mist">
            Власний сайт студії та три незалежні концепт-проєкти — без вигаданих замовлень, лише те, що
            ми справді створили.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-12 md:gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} large={i === 0} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}
