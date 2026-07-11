import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ABOUT_SECTION_INDEX, SECTION_COUNT, aboutPanels } from './portfolioData';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';

function App() {
  const reduced = useReducedMotion();
  const [activeSection, setActiveSection] = useState(0);
  const [aboutPanel, setAboutPanel] = useState(0);
  const [aboutDirection, setAboutDirection] = useState(1);
  const mainRef = useRef<HTMLElement>(null);
  const navigationLockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const updateAboutPanel = useCallback(
    (nextPanel: number) => {
      const clampedPanel = Math.max(0, Math.min(aboutPanels.length - 1, nextPanel));
      if (clampedPanel === aboutPanel) return false;

      setAboutDirection(clampedPanel > aboutPanel ? 1 : -1);
      setAboutPanel(clampedPanel);
      return true;
    },
    [aboutPanel],
  );

  const goToSection = useCallback(
    (nextSection: number) => {
      const clampedSection = Math.max(0, Math.min(SECTION_COUNT - 1, nextSection));
      if (clampedSection === activeSection) return false;

      setActiveSection(clampedSection);
      return true;
    },
    [activeSection],
  );

  const navigateStep = useCallback(
    (direction: 1 | -1) => {
      if (activeSection === ABOUT_SECTION_INDEX) {
        const nextAboutPanel = aboutPanel + direction;
        if (nextAboutPanel >= 0 && nextAboutPanel < aboutPanels.length) {
          return updateAboutPanel(nextAboutPanel);
        }
      }

      return goToSection(activeSection + direction);
    },
    [activeSection, aboutPanel, goToSection, updateAboutPanel],
  );

  const handleNavigationDelta = useCallback(
    (delta: number) => {
      if (Math.abs(delta) < 18 || navigationLockedRef.current) return;

      const moved = navigateStep(delta > 0 ? 1 : -1);
      if (!moved) return;

      navigationLockedRef.current = true;
      window.setTimeout(() => {
        navigationLockedRef.current = false;
      }, reduced ? 120 : 760);
    },
    [navigateStep, reduced],
  );

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      handleNavigationDelta(event.deltaY);
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };
    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null) return;

      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      handleNavigationDelta(delta);
    };

    main.addEventListener('wheel', handleWheel, { passive: false });
    main.addEventListener('touchstart', handleTouchStart, { passive: true });
    main.addEventListener('touchmove', handleTouchMove, { passive: false });
    main.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      main.removeEventListener('wheel', handleWheel);
      main.removeEventListener('touchstart', handleTouchStart);
      main.removeEventListener('touchmove', handleTouchMove);
      main.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNavigationDelta]);

  return (
    <main
      ref={mainRef}
      className="h-[100dvh] select-none overflow-hidden bg-zinc-950 text-zinc-100"
    >
      <motion.div
        className="h-full"
        animate={{ y: `-${activeSection * 100}dvh` }}
        transition={reduced ? { duration: 0 } : { duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroSection goToSection={goToSection} isActive={activeSection === 0} />
          <AboutSection
            activePanel={aboutPanel}
            direction={aboutDirection}
            isActive={activeSection === ABOUT_SECTION_INDEX}
            onPanelChange={updateAboutPanel}
          />
        <ProjectsSection />
        <ContactSection goToSection={goToSection} />
      </motion.div>
    </main>
  );
}

export { App };
