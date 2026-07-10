import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type LogoLoopItem = {
  id: string;
  icon: ReactNode;
};

function LogoLoop({ items, ariaLabel }: { items: LogoLoopItem[]; ariaLabel: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let lastTime = 0;
    let offset = 0;
    const sequenceWidth = track.scrollWidth / 2;

    const animate = (time: number) => {
      const elapsed = Math.min(time - lastTime, 48);
      lastTime = time;
      offset = sequenceWidth > 0 ? (offset + (elapsed * 0.028) % sequenceWidth) % sequenceWidth : 0;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [items]);

  const sequence = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      role="region"
      aria-label={ariaLabel}
    >
      <div ref={trackRef} className="flex w-max items-center gap-7 px-3 text-zinc-500" aria-live="off">
        {sequence.map((item, index) => (
          <span key={`${item.id}-${index}`} className="grid size-7 shrink-0 place-items-center" aria-hidden={index >= items.length}>
            {item.icon}
          </span>
        ))}
      </div>
    </div>
  );
}

export { LogoLoop };
export type { LogoLoopItem };
