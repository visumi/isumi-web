import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCode,
  IconExternalLink,
} from '@tabler/icons-react';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import ASCIIText from './ASCIIText';
import Dither from './Dither';
import ShinyText from './ShinyText';

const ISUMI_GLYPH = String.fromCharCode(0x6cc9);

const stacks = ['React', 'Angular', 'Cloudflare', 'Tailwind', 'Workers', 'Design Systems'];

const projects = [
  {
    title: 'Operational interface',
    description: 'Dense, responsive dashboards for real decision workflows.',
    meta: 'Product / Frontend',
  },
  {
    title: 'Interactive experience',
    description: 'Prototypes with motion, micro-interactions, and visual narrative.',
    meta: 'Creative Code',
  },
  {
    title: 'Web architecture',
    description: 'Full-stack apps with clear contracts between UI, API, and state.',
    meta: 'Systems',
  },
];

const principles = [
  'Interfaces that feel like tools, not templates.',
  'Motion as language, not decoration.',
  'Visual detail without sacrificing legibility.',
  'Code simple enough to keep evolving.',
];

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(10px)' }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BrutalButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-12 items-center gap-3 border-2 border-zinc-100 bg-zinc-100 px-5 py-3 text-sm font-bold text-zinc-950 transition-transform duration-300 ease-out hover:-translate-y-1 hover:bg-zinc-950 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
    >
      {children}
      <IconArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </a>
  );
}

function IsumiGlyph({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {ISUMI_GLYPH}
    </span>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-zinc-950">
      <Dither
        waveColor={[0.78, 0.78, 0.78]}
        disableAnimation={false}
        enableMouseInteraction
        mouseRadius={0.26}
        colorNum={4}
        pixelSize={2}
        waveAmplitude={0.34}
        waveFrequency={4.2}
        waveSpeed={0.11}
      />
      <div className="pointer-events-none absolute inset-0 bg-zinc-950/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,transparent_0,transparent_24%,rgb(9_9_11/0.72)_62%,rgb(9_9_11)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-zinc-950" />
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <section className="relative grid h-[100dvh] max-h-[100dvh] items-center overflow-hidden">
        <HeroBackground />
        <div id="top" className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
          <Reveal className="w-full">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <ASCIIText
                text={ISUMI_GLYPH}
                enableWaves
                asciiFontSize={5}
                textFontSize={420}
                textColor="#f4f4f5"
                planeBaseHeight={10}
                className="mb-1 h-36 w-[min(88vw,24rem)] sm:mb-2 sm:h-56 sm:w-[min(88vw,48rem)] lg:h-72 lg:w-[58rem]"
              />
              <h1 className="text-balance text-4xl font-bold leading-[0.94] tracking-normal text-zinc-100 sm:text-6xl lg:text-8xl">
                ISUMI
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 sm:mt-7 sm:text-lg sm:leading-8">
                <ShinyText
                  text="Senior Frontend Engineer"
                  speed={2.4}
                  delay={0.45}
                  color="#a1a1aa"
                  shineColor="#f4f4f5"
                  spread={110}
                  direction="left"
                  className="font-bold"
                />
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-9">
                <BrutalButton href="#projects">View projects</BrutalButton>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center gap-3 border-2 border-zinc-500 px-5 py-3 text-sm font-bold text-zinc-100 transition-colors duration-300 hover:border-zinc-100 hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
                >
                  Contact me
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-zinc-100 bg-zinc-100 py-5 text-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 text-sm font-bold sm:px-8">
          {stacks.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="size-2 bg-zinc-950" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <h2 className="text-balance text-4xl font-bold leading-tight text-zinc-100 sm:text-6xl">
              Projects with technical pulse.
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-8 text-zinc-300">
              This first version keeps strategic placeholders for real cases, screenshots, and links. The structure is ready for GitHub Pages and a custom domain.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group min-h-80 border-2 border-zinc-700 bg-zinc-950 p-5 transition-colors duration-300 hover:border-zinc-100 hover:bg-zinc-900">
                <div className="flex items-start justify-between gap-4">
                  <span className="border border-zinc-600 px-2 py-1 text-xs text-zinc-400">{project.meta}</span>
                  <IconExternalLink className="size-5 text-zinc-500 transition-colors group-hover:text-zinc-100" aria-hidden="true" />
                </div>
                <h3 className="mt-20 text-2xl font-bold leading-tight text-zinc-100">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{project.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="method" className="border-y-2 border-zinc-100 bg-zinc-100 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <Reveal>
            <div>
              <IconCode className="mb-7 size-12" aria-hidden="true" />
              <h2 className="text-balance text-4xl font-bold leading-tight sm:text-6xl">
                Direct method, sharp finish, strange in the best way.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-3">
            {principles.map((principle, index) => (
              <Reveal key={principle} delay={index * 0.06}>
                <div className="flex gap-5 border-2 border-zinc-950 p-5">
                  <span className="text-xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-pretty text-lg font-bold leading-8">{principle}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-4xl">
            <IsumiGlyph className="mb-8 block text-6xl font-bold leading-none text-zinc-100" />
            <h2 className="text-balance text-5xl font-bold leading-none text-zinc-100 sm:text-7xl">
              Let&apos;s build something that doesn&apos;t look rented.
            </h2>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-300">
              Replace these links with your real channels and connect each project to repositories, demos, and case studies.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BrutalButton href="mailto:voce@seudominio.com">voce@seudominio.com</BrutalButton>
              <a href="https://github.com/" className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900" aria-label="GitHub">
                <IconBrandGithub className="size-5" />
              </a>
              <a href="https://linkedin.com/" className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900" aria-label="LinkedIn">
                <IconBrandLinkedin className="size-5" />
              </a>
              <a href="https://x.com/" className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900" aria-label="X">
                <IconBrandX className="size-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export { App };
