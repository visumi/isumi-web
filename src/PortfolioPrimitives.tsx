import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { ISUMI_GLYPH } from './portfolioData';

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(10px)' }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const brutalButtonClassName =
  'group inline-flex min-h-12 items-center gap-3 border-2 border-zinc-100 bg-zinc-100 px-5 py-3 text-sm font-bold text-zinc-950 transition-transform duration-300 ease-out cursor-pointer hover:bg-zinc-950 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100';

function BrutalButton(props: { href: string; children: ReactNode } | { onClick: () => void; children: ReactNode }) {
  if ('href' in props) {
    return (
      <a href={props.href} className={brutalButtonClassName}>
        {props.children}
      </a>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={brutalButtonClassName}>
      {props.children}
    </button>
  );
}

function OutlineButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 items-center gap-3 border-2 border-zinc-500 px-5 py-3 text-sm font-bold text-zinc-100 transition-colors duration-300 cursor-pointer hover:border-zinc-100 hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
    >
      {children}
    </button>
  );
}

function IsumiGlyph({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {ISUMI_GLYPH}
    </span>
  );
}

export { BrutalButton, IsumiGlyph, OutlineButton, Reveal };
