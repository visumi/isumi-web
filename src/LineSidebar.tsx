import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

type Falloff = 'linear' | 'smooth' | 'sharp';

export interface LineSidebarProps {
  items?: string[];
  activeIndex?: number | null;
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (progress: number) => number> = {
  linear: (progress) => progress,
  smooth: (progress) => progress * progress * (3 - 2 * progress),
  sharp: (progress) => progress * progress * progress,
};

const DEFAULT_ITEMS = ['Origin', 'Perspective', 'Signal'];

export default function LineSidebar({
  items = DEFAULT_ITEMS,
  activeIndex,
  accentColor = '#18181b',
  textColor = '#71717a',
  markerColor = '#a1a1aa',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = '',
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const smoothingRef = useRef(smoothing);
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | null>(defaultActive);

  const selectedIndex = activeIndex ?? internalActiveIndex;
  const selectedIndexRef = useRef<number | null>(selectedIndex);
  selectedIndexRef.current = selectedIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const delta = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const step = 1 - Math.exp(-delta / tau);

    let moving = false;
    const elements = itemRefs.current;

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      if (!element) continue;

      const target = Math.max(targetsRef.current[index] || 0, selectedIndexRef.current === index ? 1 : 0);
      const current = currentRef.current[index] || 0;
      const next = current + (target - current) * step;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;

      currentRef.current[index] = value;
      element.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;

      const rect = list.getBoundingClientRect();
      const pointerY = event.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;

      itemRefs.current.forEach((element, index) => {
        if (!element) return;
        const center = element.offsetTop + element.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[index] = ease(Math.max(0, 1 - distance / proximityRadius));
      });

      startLoop();
    },
    [falloff, proximityRadius, startLoop],
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      setInternalActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>, index: number, label: string) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      handleClick(index, label);
    },
    [handleClick],
  );

  useEffect(() => {
    startLoop();
  }, [selectedIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const tickClass = showMarker
    ? `after:absolute after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] ${
        scaleTick
          ? "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
          : 'after:-translate-y-1/2'
      }`
    : '';

  return (
    <nav
      aria-label="About sections"
      className={`relative flex justify-start${showMarker ? ' [padding-left:calc(var(--marker-length)+var(--marker-gap))]' : ''}${className ? ` ${className}` : ''}`}
      style={
        {
          '--accent-color': accentColor,
          '--text-color': textColor,
          '--marker-color': markerColor,
          '--marker-length': `${markerLength}px`,
          '--marker-gap': `${markerGap}px`,
          '--tick-scale': tickScale,
          '--max-shift': `${maxShift}px`,
          '--item-gap': `${itemGap}px`,
          '--font-size': `${fontSize}rem`,
          '--smoothing': `${smoothing}ms`,
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="m-0 flex list-none flex-col py-3 [gap:var(--item-gap)]"
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            aria-current={selectedIndex === index ? 'true' : undefined}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(index, label)}
            onKeyDown={(event) => handleKeyDown(event, index, label)}
            className={`relative cursor-pointer before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 ${tickClass}`}
          >
            {showMarker && (
              <span
                aria-hidden="true"
                className="absolute left-[calc(-1*var(--marker-length)-var(--marker-gap))] top-1/2 h-px w-[length:var(--marker-length)] origin-left [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]"
              />
            )}
            <span className="relative inline-flex items-baseline leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]">
              {showIndex && (
                <span className="mr-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span>{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
