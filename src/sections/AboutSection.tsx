import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect } from 'react';
import LineSidebar from '../LineSidebar';
import Masonry from '../Masonry';
import { aboutImages, aboutMenuItems, aboutPanels } from '../portfolioData';
import RotatingText from '../RotatingText';

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
      <div className="absolute bottom-[5%] right-0 size-8 bg-zinc-100" aria-hidden="true" />
      <div className="absolute bottom-[5%] left-[4%] h-2 w-[36%] bg-zinc-100" aria-hidden="true" />
    </figure>
  );
}

function AboutVisual({ kind }: { kind: string }) {
  if (kind === 'portrait') {
    return <AboutPortrait />;
  }

  if (kind === 'masonry') {
    return (
      <div className="h-full min-h-0 overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
        <Masonry
          items={aboutImages}
          ease="power3.out"
          duration={0.6}
          stagger={0.04}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
          colorShiftOnHover={false}
        />
      </div>
    );
  }

  if (kind === 'signal') {
    return (
      <div className="grid h-full min-h-0 content-center gap-3 rounded-2xl bg-zinc-950 p-4 text-zinc-100 mix-blend-multiply sm:p-5">
        {['CREATIVITY', 'CULTURE', 'INTELLIGENCE', 'EXPERIENCE'].map((item, index) => (
          <div
            key={item}
            className="flex items-center justify-between gap-4 rounded-xl bg-zinc-100/90 px-4 py-3 text-zinc-950 blur-[0.2px]"
            style={{ opacity: 0.92 - index * 0.08 }}
          >
            <span className="text-xs font-bold sm:text-sm">{item}</span>
            <span className="h-px flex-1 bg-zinc-950/30" aria-hidden="true" />
            <span className="font-bold">{String(index + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col justify-center rounded-2xl bg-zinc-950 p-5 text-zinc-100 mix-blend-multiply">
      <div className="grid grid-cols-2 gap-3">
        {['Night walks', 'Street rhythm', 'Long talks', 'Small details'].map((item, index) => (
          <div key={item} className="min-h-28 rounded-xl bg-zinc-100/90 p-4 text-zinc-950 opacity-90 blur-[0.2px]">
            <span className="block text-xs font-bold text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
            <span className="mt-8 block text-sm font-bold leading-tight">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection({
  activePanel,
  direction,
  isActive,
  onPanelChange,
}: {
  activePanel: number;
  direction: number;
  isActive: boolean;
  onPanelChange: (index: number) => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const preloadImages = () => {
      aboutImages.forEach((item) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = item.img;
        void image.decode?.().catch(() => undefined);
      });
    };

    const timeout = window.setTimeout(preloadImages, 700);
    return () => window.clearTimeout(timeout);
  }, []);

  const updatePanel = useCallback(
    (nextPanel: number) => {
      const clampedPanel = Math.max(0, Math.min(aboutPanels.length - 1, nextPanel));
      if (clampedPanel === activePanel) return false;

      onPanelChange(clampedPanel);
      return true;
    },
    [activePanel, onPanelChange],
  );

  const panel = aboutPanels[activePanel];

  return (
    <section
      id="about"
      className="grid h-[100dvh] max-h-[100dvh] overflow-hidden border-y-2 border-zinc-100 bg-zinc-100 text-zinc-950"
    >
      <div className="mx-auto grid h-full w-full max-w-[90rem] grid-rows-[auto_auto_minmax(0,1fr)] gap-3 px-5 py-5 sm:grid-rows-[auto_auto_minmax(0,1fr)] sm:gap-5 sm:px-8 sm:py-8 lg:grid-cols-[16rem_minmax(0,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-1 lg:items-stretch lg:gap-8 lg:py-10 xl:grid-cols-[17rem_minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="flex items-center justify-between gap-4 lg:justify-start lg:-ml-10 xl:-ml-16">
          <LineSidebar
            items={aboutMenuItems}
            activeIndex={activePanel}
            accentColor="#18181b"
            textColor="#71717a"
            markerColor="#a1a1aa"
            markerLength={60}
            markerGap={0}
            maxShift={30}
            tickScale={0.5}
            itemGap={20}
            fontSize={1.1}
            onItemClick={(index) => updatePanel(index)}
            className="hidden lg:flex"
          />
          <div className="flex w-full gap-2 lg:hidden" aria-label="About sections">
            {aboutMenuItems.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => updatePanel(index)}
                aria-current={activePanel === index ? 'true' : undefined}
                className={`min-h-10 flex-1 rounded-full px-3 text-xs font-bold transition-colors ${
                  activePanel === index ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-200 text-zinc-600'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-0 overflow-visible">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={panel.id}
              initial={reduced ? false : { opacity: 0, x: direction * 36, filter: 'blur(10px)' }}
              animate={
                reduced
                  ? { opacity: 1 }
                  : isActive
                    ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                    : { opacity: 0, x: direction * 36, filter: 'blur(10px)' }
              }
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -24, filter: 'blur(8px)' }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="about-copy-column flex min-h-0 flex-col justify-start lg:h-full lg:justify-center"
            >
              <span className="text-sm font-bold text-zinc-500">{panel.eyebrow}</span>
              <h2 className="about-title mt-4 text-balance text-3xl font-bold leading-none text-zinc-950 sm:mt-5 sm:text-5xl lg:text-5xl xl:text-6xl">
                {panel.id === 'perspective' ? (
                  <RotatingText
                    texts={['Creating', 'Collecting', 'Connecting']}
                    className="min-w-[11ch]"
                  />
                ) : (
                  panel.title
                )}
              </h2>
              <div className="about-prose mt-5 max-w-xl space-y-3 text-pretty text-xs leading-6 text-zinc-700 sm:mt-6 sm:space-y-4 sm:text-base sm:leading-8">
                {panel.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative h-full min-h-0 overflow-visible pt-4 sm:pt-5 lg:pl-6 lg:pt-0 xl:pl-8">
          <AnimatePresence mode="wait" initial={false}>
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export { AboutSection };
