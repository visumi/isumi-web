import {
  IconArrowUpRight,
  IconBrandAngular,
  IconBrandFigma,
  IconBrandGithub,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVite,
} from '@tabler/icons-react';
import { Reveal } from '../PortfolioPrimitives';
import ShinyText from '../ShinyText';
import { BorderGlow } from './projects/BorderGlow';
import { ShapeGrid } from './projects/ShapeGrid';

const projects = [
  {
    index: '01',
    title: 'Playground.',
    description: 'A personal platform for expenses, shared rooms and travel planning — designed as one coherent system.',
    technologies: [
      { name: 'Angular', icon: IconBrandAngular },
      { name: 'TypeScript', icon: IconBrandTypescript },
      { name: 'Vite', icon: IconBrandVite },
      { name: 'Tailwind', icon: IconBrandTailwind },
    ],
    githubUrl: 'https://github.com/visumi/isumi-playground',
    liveUrl: 'https://playground.isumi.com.br/',
  },
    {
    index: '02',
    title: 'YT Scroll',
    description: 'A Chrome extension where you can control your volume via mouse wheel.',
    technologies: [
      { name: 'Javascript', icon: IconBrandJavascript },
    ],
    githubUrl: 'https://github.com/visumi/pancakes-youtube-scroll',
  },
] as const;

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <BorderGlow className="group">
      <article className="relative flex h-full min-h-72 flex-col p-5 transition-[background-color,transform] duration-500 ease-out sm:min-h-80 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-bold text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">{project.index}</span>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir o GitHub de ${project.title}`}
          className="grid size-10 place-items-center border border-zinc-700 text-zinc-300 transition-colors duration-300 hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
        >
          <IconBrandGithub className="size-5" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-auto">
        <h3 className="min-h-[2rem] max-w-[13ch] text-balance text-2xl font-bold leading-[0.96] text-zinc-100 sm:min-h-[3.6rem] sm:text-3xl">{project.title}</h3>
        <p className="mt-4 h-24 max-w-[33ch] overflow-hidden text-pretty text-xs leading-6 text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 sm:h-28 sm:text-sm sm:leading-7">{project.description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
        <ul className="flex items-center gap-3" aria-label={`Tecnologias utilizadas em ${project.title}`}>
          {project.technologies.map(technology => {
            const Icon = technology.icon;
            return <li key={technology.name} title={technology.name}><Icon className="size-5 text-zinc-400 transition-colors duration-300 group-hover:text-zinc-100" aria-hidden="true" /></li>;
          })}
        </ul>
        {'liveUrl' in project ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${project.title} em uma nova aba`}
            className="cursor-pointer text-zinc-600 transition-[color,transform] duration-300 hover:translate-x-0.5 hover:-translate-y-0.5 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
          >
            <IconArrowUpRight className="size-5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
      </article>
    </BorderGlow>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative grid h-[100dvh] max-h-[100dvh] overflow-hidden bg-zinc-950 px-5 py-12 sm:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-90"><ShapeGrid /></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,transparent_0%,rgb(9_9_11/0.35)_48%,rgb(9_9_11/0.94)_100%)]" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-xs font-bold tracking-[0.14em] text-zinc-400">PROJECTS</p><h2 className="mt-4 text-balance text-4xl font-bold leading-[0.96] text-zinc-100 sm:text-6xl">Where my ideas come to <ShinyText text="life" speed={2.6} delay={0.5} color="#a1a1aa" shineColor="#f4f4f5" spread={110} className="whitespace-nowrap" /></h2></div>
          </div>
        </Reveal>

        <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-10">
          {projects.map((project, index) => <Reveal key={project.index} delay={0.08 + index * 0.08} className="h-full"><ProjectCard project={project} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export { ProjectsSection };
