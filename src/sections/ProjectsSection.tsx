import { IconExternalLink } from '@tabler/icons-react';
import { Reveal } from '../PortfolioPrimitives';
import { projects } from '../portfolioData';

function ProjectsSection() {
  return (
    <section id="projects" className="grid h-[100dvh] max-h-[100dvh] overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <h2 className="text-balance text-4xl font-bold leading-tight text-zinc-100 sm:text-6xl">
              Projects with technical pulse.
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-8 text-zinc-300">
              This first version keeps strategic placeholders for real cases, screenshots, and links. The structure is
              ready for GitHub Pages and a custom domain.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group min-h-80 border-2 border-zinc-700 bg-zinc-950 p-5 transition-colors duration-300 hover:border-zinc-100 hover:bg-zinc-900">
                <div className="flex items-start justify-between gap-4">
                  <span className="border border-zinc-600 px-2 py-1 text-xs text-zinc-400">{project.meta}</span>
                  <IconExternalLink
                    className="size-5 text-zinc-500 transition-colors group-hover:text-zinc-100"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-20 text-2xl font-bold leading-tight text-zinc-100">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{project.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ProjectsSection };
