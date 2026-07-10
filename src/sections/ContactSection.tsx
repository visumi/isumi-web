import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import { BrutalButton, IsumiGlyph, Reveal } from '../PortfolioPrimitives';

function ContactSection() {
  return (
    <section id="contact" className="relative grid h-[100dvh] max-h-[100dvh] overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center">
        <Reveal>
          <div className="max-w-4xl">
            <IsumiGlyph className="mb-8 block text-6xl font-bold leading-none text-zinc-100" />
            <h2 className="text-balance text-5xl font-bold leading-none text-zinc-100 sm:text-7xl">
              Let&apos;s build something that doesn&apos;t look rented.
            </h2>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-300">
              Replace these links with your real channels and connect each project to repositories, demos, and case
              studies.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BrutalButton href="mailto:you@domain.com">you@domain.com</BrutalButton>
              <a
                href="https://github.com/"
                className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900"
                aria-label="GitHub"
              >
                <IconBrandGithub className="size-5" />
              </a>
              <a
                href="https://linkedin.com/"
                className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin className="size-5" />
              </a>
              <a
                href="https://x.com/"
                className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900"
                aria-label="X"
              >
                <IconBrandX className="size-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { ContactSection };
