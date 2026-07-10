import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type LogoLoopItem = {
  id: string;
  icon: ReactNode;
};

const MIN_COPIES = 2;
const COPY_HEADROOM = 2;
const SPEED = 28;

function LogoLoop({ items, ariaLabel }: { items: LogoLoopItem[]; ariaLabel: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const measuredWidth = Math.ceil(sequenceRef.current?.getBoundingClientRect().width ?? 0);
    if (!measuredWidth) return;

    setSequenceWidth(measuredWidth);
    setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerWidth / measuredWidth) + COPY_HEADROOM));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;
    if (!container || !sequence) return;

    if (!window.ResizeObserver) {
      window.addEventListener('resize', updateDimensions);
      updateDimensions();
      return () => window.removeEventListener('resize', updateDimensions);
    }

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    observer.observe(sequence);
    updateDimensions();
    return () => observer.disconnect();
  }, [items, updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !sequenceWidth) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    offsetRef.current = ((offsetRef.current % sequenceWidth) + sequenceWidth) % sequenceWidth;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      offsetRef.current = (offsetRef.current + SPEED * deltaTime) % sequenceWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [sequenceWidth]);

  const sequences = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          key={`sequence-${copyIndex}`}
          ref={copyIndex === 0 ? sequenceRef : undefined}
          className="flex shrink-0 items-center"
          aria-hidden={copyIndex > 0}
        >
          {items.map((item) => (
            <li key={`${item.id}-${copyIndex}`} className="grid size-7 shrink-0 place-items-center mr-7">
              {item.icon}
            </li>
          ))}
        </ul>
      )),
    [copyCount, items],
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      role="region"
      aria-label={ariaLabel}
    >
      <div ref={trackRef} className="flex w-max items-center text-zinc-500 will-change-transform" aria-live="off">
        {sequences}
      </div>
    </div>
  );
}

export { LogoLoop };
export type { LogoLoopItem };
