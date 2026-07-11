import { IconArrowUp, IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import { IsumiGlyph, Reveal } from '../PortfolioPrimitives';
import { CircularText } from './contact/CircularText';

function ContactSection({ goToSection }: { goToSection: (section: number) => void }) {
  return (
    <section id="contact" className="relative grid h-[100dvh] max-h-[100dvh] overflow-hidden border-y-2 border-zinc-950 bg-zinc-100 px-5 py-14 text-zinc-950 sm:px-8 lg:py-20">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center">
        <Reveal className="w-full">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="max-w-4xl">
            <IsumiGlyph className="mb-8 block text-6xl font-bold leading-none text-zinc-950" />
            <h2 className="text-balance text-5xl font-bold leading-none text-zinc-950 sm:text-7xl">Let&apos;s Build Something Great</h2>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-700">
              Feel free to connect with me. I'm always happy to expand my professional network and discuss new opportunities.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:vinicius.isumi@gmail.com" className="inline-flex min-h-12 items-center gap-3 border-2 border-zinc-950 bg-zinc-950 px-5 py-3 text-sm font-bold text-zinc-100 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950">vinicius.isumi@gmail.com</a>
              <a
                href="https://github.com/visumi"
                className="inline-flex size-12 items-center justify-center border-2 border-zinc-950 text-zinc-950 transition-colors hover:border-zinc-950 hover:bg-zinc-950 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
                aria-label="GitHub"
              >
                <IconBrandGithub className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/vinicius-isumi/"
                className="inline-flex size-12 items-center justify-center border-2 border-zinc-950 text-zinc-950 transition-colors hover:border-zinc-950 hover:bg-zinc-950 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin className="size-5" />
              </a>
            </div>
          </div>
          <div className="hidden place-items-center lg:grid">
            <CircularText text="CONTACT*ME*REACH*ME*" spinDuration={20} />
          </div>
          </div>
        </Reveal>
      </div>
      <button
        type="button"
        onClick={() => goToSection(0)}
        className="absolute cursor-pointer bottom-5 left-1/2 grid size-12 -translate-x-1/2 place-items-center border-2 border-zinc-950 bg-zinc-950 text-zinc-100 transition-[background-color,color,transform] duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0 lg:bottom-10 lg:right-10"
        aria-label="Voltar ao início"
      >
        <IconArrowUp className="size-5" aria-hidden="true" />
      </button>
    </section>
  );
}

export { ContactSection };
