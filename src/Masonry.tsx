import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MEDIA_QUERIES = ['(min-width:1500px)', '(min-width:1000px)', '(min-width:640px)'];
const MEDIA_VALUES = [3, 3, 2];
const MOBILE_QUERY = ['(min-width:640px)'];
const MOBILE_VALUES = [0];

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof matchMedia === 'undefined') return defaultValue;
    const matchedIndex = queries.findIndex((query) => matchMedia(query).matches);
    return values[matchedIndex] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get());
    const mediaQueryLists = queries.map((query) => matchMedia(query));
    mediaQueryLists.forEach((queryList) => queryList.addEventListener('change', handler));
    return () => mediaQueryLists.forEach((queryList) => queryList.removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
};

interface Item {
  id: string;
  img: string;
  height: number;
  label?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useMedia(MEDIA_QUERIES, MEDIA_VALUES, 1);
  const isMobile = useMedia(MOBILE_QUERY, MOBILE_VALUES, 1) === 1;
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const hasMounted = useRef(false);
  const prefersReducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const columnHeights = new Array(columns).fill(0);
    const gap = 14;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((item) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const x = column * (columnWidth + gap);
      const height = item.height / 2;
      const y = columnHeights[column];

      columnHeights[column] += height + gap;
      return { ...item, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (isMobile) return;
    if (!grid.length) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current && !prefersReducedMotion) {
        const start = getInitialPosition(item);

        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, {
          opacity: 1,
          ...animationProps,
          duration: prefersReducedMotion ? 0 : duration,
          ease,
          overwrite: 'auto',
        });
      }
    });

    hasMounted.current = true;
  }, [grid, isMobile, stagger, animateFrom, blurToFocus, duration, ease, prefersReducedMotion]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover && !prefersReducedMotion) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover && !prefersReducedMotion) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  if (isMobile) {
    const mobileItems = items.slice(0, 6);

    return (
      <div ref={containerRef} className="grid h-full w-full grid-cols-3 grid-rows-3 gap-3 overflow-hidden">
        {mobileItems.map((item, index) => (
          <span
            key={item.id}
            className={`relative block overflow-hidden rounded-xl bg-zinc-300 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img
              src={item.img}
              alt={item.label ?? ''}
              loading="eager"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover opacity-80 blur-[0.35px] grayscale mix-blend-multiply"
            />
            <span className="absolute inset-0 bg-zinc-100/20 mix-blend-screen" />
            {colorShiftOnHover && <span className="color-overlay pointer-events-none absolute inset-0 bg-zinc-100 opacity-0" />}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content block rounded-xl opacity-0"
          style={{ willChange: 'transform, width, height, opacity' }}
          onMouseEnter={(event) => handleMouseEnter(item.id, event.currentTarget)}
          onMouseLeave={(event) => handleMouseLeave(item.id, event.currentTarget)}
        >
          <span
            className="relative block h-full w-full overflow-hidden rounded-xl bg-cover bg-center opacity-80 blur-[0.35px] grayscale mix-blend-multiply transition-[filter,opacity] duration-300 hover:opacity-95 hover:blur-0 hover:grayscale-0"
            style={{ backgroundImage: `url(${item.img})` }}
            role="img"
            aria-label={item.label}
          >
            <span className="absolute inset-0 bg-zinc-100/20 mix-blend-screen" />
            {colorShiftOnHover && <span className="color-overlay pointer-events-none absolute inset-0 bg-zinc-100 opacity-0" />}
          </span>
        </div>
      ))}
    </div>
  );
}
