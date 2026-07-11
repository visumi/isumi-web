import { useCallback, useState, type PointerEvent, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

function BorderGlow({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(false);

  const move = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const degrees = Math.atan2(event.clientY - rect.top - rect.height / 2, event.clientX - rect.left - rect.width / 2) * (180 / Math.PI) + 90;
    setAngle(degrees);
  }, [reduced]);

  const glow = `conic-gradient(from ${angle}deg at 50% 50%, transparent 0deg, transparent 282deg, rgb(244 244 245 / 0.16) 302deg, rgb(244 244 245 / 0.95) 328deg, rgb(161 161 170 / 0.34) 346deg, transparent 360deg)`;

  return (
    <div
      className={`group/glow relative isolate h-full p-0.5 ${className}`}
      onPointerMove={move}
      onPointerEnter={() => !reduced && setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -inset-3 -z-10 opacity-0 blur-xl transition-opacity duration-500 group-hover/glow:opacity-30" style={{ background: glow }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-zinc-700 transition-opacity duration-300" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-200" style={{ background: glow, opacity: active ? 1 : 0 }} />
      <div className="relative h-full bg-zinc-950">{children}</div>
    </div>
  );
}

export { BorderGlow };
