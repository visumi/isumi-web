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
      <LogoLoop
        items={frontendTechnologies}
        ariaLabel="Tecnologias de frontend"
        className="py-2 text-zinc-800 [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)] sm:py-1 sm:text-zinc-500 sm:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        itemClassName="size-8 mr-6 sm:size-7 sm:mr-7"
      />
      <div className="mt-5 sm:mt-8">
        <ol className="grid w-full min-w-0 max-w-full grid-cols-1 gap-y-0 overflow-x-clip px-2 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9 sm:px-0 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {careerTimeline.map((job, index) => (
            <li
              key={job.company}
              className="relative flex min-h-0 flex-col border-t-2 border-zinc-950 py-4 pl-5 sm:min-h-48 sm:py-0 sm:pl-0 sm:pt-7 lg:min-h-56 lg:px-5 lg:pt-7 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="absolute left-0 top-0 block size-5 -translate-y-1/2 border-2 border-zinc-950 bg-zinc-100" aria-hidden="true">
                <span className={`absolute inset-0 m-auto block size-2 ${index === 0 ? 'bg-zinc-950' : 'bg-zinc-400'}`} />
              </span>
              <p className="text-[10px] font-bold tracking-[0.08em] text-zinc-500">{job.period}</p>
              <h3 className="mt-1.5 text-sm font-bold leading-tight text-zinc-950">{job.company}</h3>
              <p className="mt-1 text-xs font-bold leading-snug text-zinc-700">{job.role}</p>
              <p className="mt-2 max-w-[34ch] text-[11px] leading-4 text-zinc-600 sm:hidden">{job.mobileDetail}</p>
              <p className="mt-4 hidden max-w-[36ch] text-xs leading-5 text-zinc-600 sm:block">{job.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export { CareerTimeline };
