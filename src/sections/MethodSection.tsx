import { IconCode } from '@tabler/icons-react';
import { Reveal } from '../PortfolioPrimitives';
import { principles } from '../portfolioData';

function MethodSection() {
  return (
    <section
      id="method"
      className="grid h-[100dvh] max-h-[100dvh] overflow-hidden border-y-2 border-zinc-100 bg-zinc-100 text-zinc-950"
    >
      <div className="mx-auto grid h-full w-full max-w-7xl content-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
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
  );
}

export { MethodSection };
