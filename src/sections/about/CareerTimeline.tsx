import {
  IconBrandAngular,
  IconBrandFigma,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
} from '@tabler/icons-react';
import { LogoLoop } from '../../LogoLoop';
import { careerTimeline } from '../../portfolioData';

const frontendTechnologies = [
  { id: 'react', icon: <IconBrandReact className="size-6" /> },
  { id: 'nextjs', icon: <IconBrandNextjs className="size-6" /> },
  { id: 'angular', icon: <IconBrandAngular className="size-6" /> },
  { id: 'typescript', icon: <IconBrandTypescript className="size-6" /> },
  { id: 'javascript', icon: <IconBrandJavascript className="size-6" /> },
  { id: 'github', icon: <IconBrandGithub className="size-6" /> },
  { id: 'figma', icon: <IconBrandFigma className="size-6" /> },
  { id: 'html', icon: <IconBrandHtml5 className="size-6" /> },
  { id: 'tailwind', icon: <IconBrandTailwind className="size-6" /> },
];

function CareerTimeline() {
  return (
    <div className="min-w-0 w-full">
      <LogoLoop items={frontendTechnologies} ariaLabel="Tecnologias de frontend" />
      <div className="mt-7 sm:mt-8">
        <ol className="grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-8 sm:gap-y-9 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {careerTimeline.map((job, index) => (
            <li
              key={job.company}
              className="relative flex min-h-44 flex-col border-t-2 border-zinc-950 pt-6 sm:min-h-48 sm:pt-7 lg:min-h-56 lg:px-5 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="absolute left-0 top-0 block size-5 -translate-y-1/2 border-2 border-zinc-950 bg-zinc-100" aria-hidden="true">
                <span className={`absolute inset-0 m-auto block size-2 ${index === 0 ? 'bg-zinc-950' : 'bg-zinc-400'}`} />
              </span>
              <p className="text-[10px] font-bold tracking-[0.08em] text-zinc-500">{job.period}</p>
              <h3 className="mt-2 text-sm font-bold leading-tight text-zinc-950">{job.company}</h3>
              <p className="mt-1 text-xs font-bold leading-snug text-zinc-700">{job.role}</p>
              <p className="mt-4 max-w-[36ch] text-xs leading-5 text-zinc-600">{job.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export { CareerTimeline };
