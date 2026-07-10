import { AnimatePresence, motion } from 'motion/react';
import Masonry from '../../Masonry';
import { aboutImages, type aboutPanels } from '../../portfolioData';

type AboutPanel = (typeof aboutPanels)[number];

function AboutPortrait() {
  return (
    <figure className="relative h-full min-h-36 overflow-hidden border-2 border-zinc-950 bg-zinc-950 sm:min-h-44 lg:min-h-0">
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] -bottom-[10%] top-[4%] border-2 border-zinc-100"
        style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 78%, 79% 78%, 79% 100%, 0 100%, 0 18%)' }}
      />
      <div
        className="absolute bottom-[5%] left-[4%] right-[12%] top-[3%] overflow-hidden bg-zinc-800"
        style={{ clipPath: 'polygon(0 13%, 18% 0, 100% 0, 100% 87%, 79% 100%, 0 100%)' }}
      >
        <img
          src="/about-portrait.jpeg"
          alt="Vinicius Isumi em retrato preto e branco"
          decoding="async"
          className="h-full w-full object-cover object-[50%_28%] grayscale contrast-125 sm:object-[50%_24%] lg:object-[50%_center]"
        />
      </div>
      <div className="absolute left-[4%] top-[3%] bg-zinc-950 px-3 py-2 text-[10px] font-bold tracking-[0.14em] text-zinc-100 sm:text-xs">
        VINICIUS / ISUMI
      </div>
      <div className="absolute bottom-[5%] left-[4%] h-2 w-[36%] bg-zinc-100" aria-hidden="true" />
    </figure>
  );
}

function AboutVisual({ kind }: { kind: AboutPanel['visual'] }) {
  if (kind === 'portrait') return <AboutPortrait />;

  if (kind === 'masonry') {
    return (
      <div className="h-full min-h-0 overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
        <Masonry items={aboutImages} ease="power3.out" duration={0.6} stagger={0.04} animateFrom="bottom" scaleOnHover hoverScale={0.97} blurToFocus colorShiftOnHover={false} />
      </div>
    );
  }

  return null;
}

function AboutPanelVisual({
  panel,
  direction,
  isActive,
  reduced,
}: {
  panel: AboutPanel;
  direction: number;
  isActive: boolean;
  reduced: boolean | null;
}) {
  const hasVisual = panel.id !== 'career';

  return (
    <div className={`relative h-full min-h-0 overflow-visible pt-4 sm:pt-5 lg:pl-6 lg:pt-0 xl:pl-8 ${hasVisual ? '' : 'hidden'}`}>
      <AnimatePresence mode="wait" initial={false}>
        {hasVisual && (
          <motion.div
            key={`${panel.id}-visual`}
            initial={reduced ? false : { opacity: 0, y: direction * 28, scale: 0.985, filter: 'blur(12px)' }}
            animate={
              reduced
                ? { opacity: 1 }
              : isActive
                ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, y: direction * 28, scale: 0.985, filter: 'blur(12px)' }
            }
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: direction * -20, scale: 0.99, filter: 'blur(8px)' }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="h-full min-h-0"
          >
            <AboutVisual kind={panel.visual} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { AboutPanelVisual };
