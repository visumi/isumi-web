import { useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import LineSidebar from '../LineSidebar';
import { aboutImages, aboutMenuItems, aboutPanels } from '../portfolioData';
import { AboutPanelContent } from './about/AboutPanelContent';
import { AboutPanelVisual } from './about/AboutPanelVisual';

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
  const [portraitStatus, setPortraitStatus] = useState<'loading' | 'ready' | 'error'>('loading');

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

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    const setStatus = (status: 'ready' | 'error') => {
      if (!cancelled) setPortraitStatus(status);
    };

    image.decoding = 'async';
    image.onload = () => {
      if (typeof image.decode !== 'function') {
        setStatus('ready');
        return;
      }

      void image.decode().then(
        () => setStatus('ready'),
        () => setStatus('ready'),
      );
    };
    image.onerror = () => setStatus('error');
    image.src = '/about-portrait.jpeg';

    return () => {
      cancelled = true;
    };
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
      className="relative grid h-[100dvh] max-h-[100dvh] overflow-hidden border-y-2 border-zinc-100 bg-zinc-100 text-zinc-950"
    >
      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        <div className="relative mx-auto h-full max-w-[90rem] px-8 py-10">
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
            className="pointer-events-auto absolute left-8 top-1/2 -translate-y-1/2 lg:-translate-x-10 xl:-translate-x-16"
          />
        </div>
      </div>
      <div className="mx-auto grid h-full w-full max-w-[90rem] grid-rows-[auto_auto_minmax(0,1fr)] gap-3 px-5 py-5 sm:grid-rows-[auto_auto_minmax(0,1fr)] sm:gap-5 sm:px-8 sm:py-8 lg:grid-cols-[16rem_minmax(0,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-1 lg:items-stretch lg:gap-8 lg:py-10 xl:grid-cols-[17rem_minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="flex items-center justify-between gap-4 lg:block">
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

        <AboutPanelContent panel={panel} direction={direction} isActive={isActive} reduced={reduced} />
        <AboutPanelVisual panel={panel} direction={direction} isActive={isActive} reduced={reduced} portraitStatus={portraitStatus} />
      </div>
    </section>
  );
}

export { AboutSection };
