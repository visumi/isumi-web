import { AnimatePresence, motion } from 'motion/react';
import type { aboutPanels } from '../../portfolioData';
import RotatingText from '../../RotatingText';
import { CareerTimeline } from './CareerTimeline';

type AboutPanel = (typeof aboutPanels)[number];

function AboutPanelContent({
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
  return (
    <div className={`relative min-h-0 min-w-0 overflow-visible ${panel.id === 'career' ? 'lg:col-span-2' : ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
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
          className="about-copy-column flex min-h-0 min-w-0 flex-col justify-start lg:h-full lg:justify-center"
        >
          <span className="text-sm font-bold text-zinc-500">{panel.eyebrow}</span>
          <h2 className="about-title mt-4 text-balance text-3xl font-bold leading-none text-zinc-950 sm:mt-5 sm:text-5xl lg:text-5xl xl:text-6xl">
            {panel.id === 'perspective' ? (
              <RotatingText texts={['Creating', 'Collecting', 'Connecting']} className="min-w-[11ch]" />
            ) : (
              panel.title
            )}
          </h2>
          {panel.id === 'career' ? (
            <CareerTimeline />
          ) : (
            <div className="about-prose mt-5 max-w-xl space-y-3 text-pretty text-xs leading-6 text-zinc-700 sm:mt-6 sm:space-y-4 sm:text-base sm:leading-8">
              {panel.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { AboutPanelContent };
