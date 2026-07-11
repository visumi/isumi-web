import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

function CircularText({ text, spinDuration = 20 }: { text: string; spinDuration?: number }) {
  const reduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const characters = Array.from(text);
  const duration = isHovered ? spinDuration / 4 : spinDuration;
  const radius = 98;

  return (
    <motion.div
      aria-hidden="true"
      className="relative size-52 cursor-pointer font-mono text-lg font-bold text-zinc-950 lg:size-60 xl:size-72"
      animate={reduced ? { rotate: 0 } : { rotate: 360, scale: isHovered ? 0.94 : 1 }}
      transition={reduced ? { duration: 0 } : { rotate: { duration, ease: 'linear', repeat: Infinity }, scale: { type: 'spring', damping: 20, stiffness: 300 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters.map((character, index) => {
        const rotation = (360 / characters.length) * index;
        return (
          <span
            key={`${character}-${index}`}
            className="absolute left-1/2 top-1/2 inline-block origin-center"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-${radius}px)` }}
          >
            {character === ' ' ? '\u00a0' : character}
          </span>
        );
      })}
    </motion.div>
  );
}

export { CircularText };
