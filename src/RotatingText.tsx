import { AnimatePresence, motion, useReducedMotion, type Transition } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

type RotatingTextProps = {
  texts: string[];
  className?: string;
  rotationInterval?: number;
  transition?: Transition;
};

function RotatingText({
  texts,
  className,
  rotationInterval = 3000,
  transition = { type: 'spring', damping: 28, stiffness: 330 },
}: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = texts[currentIndex] ?? '';
  const characters = useMemo(() => Array.from(currentText), [currentText]);

  useEffect(() => {
    if (reduced || texts.length < 2) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % texts.length);
    }, rotationInterval);

    return () => window.clearInterval(interval);
  }, [reduced, rotationInterval, texts.length]);

  if (!currentText) return null;

  return (
    <span className={`relative inline-flex overflow-hidden py-[0.12em] align-baseline ${className ?? ''}`}>
      <span className="sr-only">{currentText}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentText}
          aria-hidden="true"
          className="inline-flex"
          initial={reduced ? false : { y: '105%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: '-115%', opacity: 0 }}
          transition={reduced ? { duration: 0.15 } : transition}
        >
          {characters.map((character, index) => (
            <motion.span
              key={`${character}-${index}`}
              className="inline-block"
              initial={reduced ? false : { y: '105%' }}
              animate={{ y: 0 }}
              exit={reduced ? undefined : { y: '-115%' }}
              transition={
                reduced
                  ? { duration: 0.15 }
                  : {
                      ...transition,
                      delay: index * 0.025,
                    }
              }
            >
              {character}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default RotatingText;
