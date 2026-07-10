import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCode,
  IconExternalLink,
} from '@tabler/icons-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import ASCIIText from './ASCIIText';
import Dither from './Dither';
import GradientText from './GradientText';
import LineSidebar from './LineSidebar';
import Masonry from './Masonry';
import ShinyText from './ShinyText';

const ISUMI_GLYPH = String.fromCharCode(0x6cc9);

const aboutMenuItems = ['Origin', 'Perspective', 'Signal'];

const aboutImages = [
  {
    id: 'city',
    img: 'https://picsum.photos/id/1011/600/760?grayscale',
    height: 360,
    label: 'Black and white urban composition',
  },
  {
    id: 'desk',
    img: 'https://picsum.photos/id/201/600/860?grayscale',
    height: 430,
    label: 'Black and white texture detail',
  },
  {
    id: 'motion',
    img: 'https://picsum.photos/id/1076/600/780?grayscale',
    height: 390,
    label: 'Abstract black and white landscape',
  },
  {
    id: 'night',
    img: 'https://picsum.photos/id/1033/600/720?grayscale',
    height: 320,
    label: 'Monochrome outdoor scene',
  },
  {
    id: 'quiet',
    img: 'https://picsum.photos/id/1067/600/820?grayscale',
    height: 410,
    label: 'Monochrome environmental portrait',
  },
  {
    id: 'signal',
    img: 'https://picsum.photos/id/1025/600/740?grayscale',
    height: 350,
    label: 'High contrast black and white image',
  },
  {
    id: 'city1',
    img: 'https://picsum.photos/id/1011/600/760?grayscale',
    height: 360,
    label: 'Black and white urban composition',
  },
  {
    id: 'desk1',
    img: 'https://picsum.photos/id/201/600/860?grayscale',
    height: 430,
    label: 'Black and white texture detail',
  },
  {
    id: 'motion1',
    img: 'https://picsum.photos/id/1076/600/780?grayscale',
    height: 390,
    label: 'Abstract black and white landscape',
  },
  {
    id: 'night1',
    img: 'https://picsum.photos/id/1033/600/720?grayscale',
    height: 320,
    label: 'Monochrome outdoor scene',
  },
  {
    id: 'quiet1',
    img: 'https://picsum.photos/id/1067/600/820?grayscale',
    height: 410,
    label: 'Monochrome environmental portrait',
  },
  {
    id: 'signal1',
    img: 'https://picsum.photos/id/1025/600/740?grayscale',
    height: 350,
    label: 'High contrast black and white image',
  },
];

const aboutPanels = [
  {
    id: 'origin',
    eyebrow: 'ABOUT ME',
    title: 'Creating, collecting, connecting.',
    paragraphs: [
      'I have always been passionate about creating and connecting art, communication, and ideas. Through traveling, photography, and the people I meet along the way, I constantly find new perspectives and inspiration.',
      'I keep a mental archive of places, conversations, textures, moods, and visual details that eventually find their way into how I think and make things.',
    ],
    tags: ['Travel', 'Photography', 'Culture'],
    visual: 'masonry',
  },
  {
    id: 'perspective',
    eyebrow: 'HOW I SEE',
    title: 'A restless eye for human moments.',
    paragraphs: [
      'The things that stay with me are rarely loud. A city at night, the rhythm of a street, a good conversation, a photo that almost explains itself.',
      'I care about the emotional weight of details: how people move through places, how images carry memory, and how a small shift in tone can change the meaning of an experience.',
    ],
    tags: ['People', 'Cities', 'Memory'],
    visual: 'notes',
  },
  {
    id: 'signal',
    eyebrow: 'WHAT MOVES ME',
    title: 'Technology as a way to expand imagination.',
    paragraphs: [
      'Bringing technology together with creativity, culture, and human experiences is what keeps me motivated to keep learning, creating, and evolving.',
      'As an Artificial Intelligence enthusiast, I am especially interested in how emerging technologies can expand creativity, enhance digital experiences, and help shape more meaningful products.',
    ],
    tags: ['AI', 'Ideas', 'Meaning'],
    visual: 'signal',
  },
];

const SECTION_COUNT = 5;
const ABOUT_SECTION_INDEX = 1;
const CONTACT_SECTION_INDEX = 4;

const projects = [
  {
    title: 'Operational interface',
    description: 'Dense, responsive dashboards for real decision workflows.',
    meta: 'Product / Frontend',
  },
  {
    title: 'Interactive experience',
    description: 'Prototypes with motion, micro-interactions, and visual narrative.',
    meta: 'Creative Code',
  },
  {
    title: 'Web architecture',
    description: 'Full-stack apps with clear contracts between UI, API, and state.',
    meta: 'Systems',
  },
];

const principles = [
  'Interfaces that feel like tools, not templates.',
  'Motion as language, not decoration.',
  'Visual detail without sacrificing legibility.',
  'Code simple enough to keep evolving.',
];

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

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-zinc-950">
      <Dither
        waveColor={[0.52, 0.52, 0.52]}
        disableAnimation={false}
        enableMouseInteraction
        mouseRadius={0.26}
        colorNum={4}
        pixelSize={2}
        waveAmplitude={0.34}
        waveFrequency={4.2}
        waveSpeed={0.11}
      />
      <div className="pointer-events-none absolute inset-0 bg-zinc-950/68" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,transparent_0,transparent_24%,rgb(9_9_11/0.72)_62%,rgb(9_9_11)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-zinc-950" />
    </div>
  );
}

function AboutVisual({ kind }: { kind: string }) {
  if (kind === 'masonry') {
    return (
      <div className="h-full min-h-0 overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
        <Masonry
          items={aboutImages}
          ease="power3.out"
          duration={0.6}
          stagger={0.04}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
          colorShiftOnHover={false}
        />
      </div>
    );
  }

  if (kind === 'signal') {
    return (
      <div className="grid h-full min-h-0 content-center gap-3 rounded-2xl bg-zinc-950 p-4 text-zinc-100 mix-blend-multiply sm:p-5">
        {['CREATIVITY', 'CULTURE', 'INTELLIGENCE', 'EXPERIENCE'].map((item, index) => (
          <div
            key={item}
            className="flex items-center justify-between gap-4 rounded-xl bg-zinc-100/90 px-4 py-3 text-zinc-950 blur-[0.2px]"
            style={{ opacity: 0.92 - index * 0.08 }}
          >
            <span className="text-xs font-bold sm:text-sm">{item}</span>
            <span className="h-px flex-1 bg-zinc-950/30" aria-hidden="true" />
            <span className="font-bold">{String(index + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col justify-center rounded-2xl bg-zinc-950 p-5 text-zinc-100 mix-blend-multiply">
      <div className="grid grid-cols-2 gap-3">
        {['Night walks', 'Street rhythm', 'Long talks', 'Small details'].map((item, index) => (
          <div key={item} className="min-h-28 rounded-xl bg-zinc-100/90 p-4 text-zinc-950 opacity-90 blur-[0.2px]">
            <span className="block text-xs font-bold text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
            <span className="mt-8 block text-sm font-bold leading-tight">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection({
  activePanel,
  direction,
  onPanelChange,
}: {
  activePanel: number;
  direction: number;
  onPanelChange: (index: number) => void;
}) {
  const reduced = useReducedMotion();

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
      className="grid h-[100dvh] max-h-[100dvh] overflow-hidden border-y-2 border-zinc-100 bg-zinc-100 text-zinc-950"
    >
      <div className="mx-auto grid h-full w-full max-w-7xl grid-rows-[auto_1fr] gap-4 px-5 py-5 sm:gap-6 sm:px-8 sm:py-8 lg:grid-cols-[16rem_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1 lg:items-center lg:gap-6 lg:py-10 xl:grid-cols-[17rem_minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex items-center justify-between gap-4 lg:block lg:-ml-10 xl:-ml-16">
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
            className="hidden lg:flex"
          />
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

        <div className="relative min-h-0 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={panel.id}
              initial={reduced ? false : { opacity: 0, x: direction * 36, filter: 'blur(10px)' }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -24, filter: 'blur(8px)' }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full min-h-0 flex-col justify-center"
            >
              <span className="text-sm font-bold text-zinc-500">{panel.eyebrow}</span>
              <h2 className="mt-4 text-balance text-3xl font-bold leading-none text-zinc-950 sm:mt-5 sm:text-5xl lg:text-6xl">
                {panel.title}
              </h2>
              <div className="mt-5 max-w-xl space-y-3 text-pretty text-xs leading-6 text-zinc-700 sm:mt-6 sm:space-y-4 sm:text-base sm:leading-8">
                {panel.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7">
                {panel.tags.map((item) => (
                  <span key={item} className="border border-zinc-400 px-2 py-1 text-xs font-bold text-zinc-700">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative h-[28dvh] min-h-0 overflow-hidden sm:h-[36dvh] lg:h-[calc(100dvh-5rem)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${panel.id}-visual`}
              initial={reduced ? false : { opacity: 0, y: direction * 28, scale: 0.985, filter: 'blur(12px)' }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: direction * -20, scale: 0.99, filter: 'blur(8px)' }}
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="h-full min-h-0"
            >
              <AboutVisual kind={panel.visual} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function App() {
  const reduced = useReducedMotion();
  const [activeSection, setActiveSection] = useState(0);
  const [aboutPanel, setAboutPanel] = useState(0);
  const [aboutDirection, setAboutDirection] = useState(1);
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

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      event.preventDefault();
      handleNavigationDelta(event.deltaY);
    },
    [handleNavigationDelta],
  );

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLElement>) => {
    event.preventDefault();
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      if (touchStartYRef.current === null) return;

      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      handleNavigationDelta(delta);
    },
    [handleNavigationDelta],
  );

  return (
    <main
      className="h-[100dvh] overflow-hidden bg-zinc-950 text-zinc-100"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="h-full"
        animate={{ y: `-${activeSection * 100}dvh` }}
        transition={reduced ? { duration: 0 } : { duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
      <section className="relative grid h-[100dvh] max-h-[100dvh] items-center overflow-hidden">
        <HeroBackground />
        <div id="top" className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
          <Reveal className="w-full">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <ASCIIText
                text={ISUMI_GLYPH}
                enableWaves
                asciiFontSize={5}
                textFontSize={420}
                textColor="#f4f4f5"
                planeBaseHeight={18}
                className="mb-1 h-32 w-[min(88vw,24rem)] sm:mb-2 sm:h-36 sm:w-[min(88vw,48rem)] lg:h-40 lg:w-[58rem]"
              />
              <h1 className="text-balance text-4xl font-bold leading-[0.94] tracking-normal text-zinc-100 sm:text-6xl lg:text-8xl">
                ISUMI
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 sm:mt-7 sm:text-lg sm:leading-8">
                <ShinyText
                  text="Senior Frontend Engineer"
                  speed={2.4}
                  delay={0.45}
                  color="#a1a1aa"
                  shineColor="#f4f4f5"
                  spread={110}
                  direction="left"
                  className="font-bold"
                />
              </p>
              <GradientText
                colors={['#f4f4f5', '#d4d4d8', '#a1a1aa', '#71717a', '#d4d4d8']}
                animationSpeed={6}
                showBorder={false}
                direction="horizontal"
                className="mt-4 max-w-[44rem] text-pretty text-sm leading-7 text-zinc-300 sm:mt-5 sm:text-base sm:leading-8"
              >
                Creative, communicative, and product-minded &mdash; driven to create experiences that go beyond the code.
              </GradientText>
              <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-9">
                <BrutalButton onClick={() => goToSection(ABOUT_SECTION_INDEX)}>About me</BrutalButton>
                <OutlineButton onClick={() => goToSection(CONTACT_SECTION_INDEX)}>Contact me</OutlineButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AboutSection activePanel={aboutPanel} direction={aboutDirection} onPanelChange={updateAboutPanel} />

      <section id="projects" className="grid h-[100dvh] max-h-[100dvh] overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <h2 className="text-balance text-4xl font-bold leading-tight text-zinc-100 sm:text-6xl">
              Projects with technical pulse.
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-8 text-zinc-300">
              This first version keeps strategic placeholders for real cases, screenshots, and links. The structure is ready for GitHub Pages and a custom domain.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group min-h-80 border-2 border-zinc-700 bg-zinc-950 p-5 transition-colors duration-300 hover:border-zinc-100 hover:bg-zinc-900">
                <div className="flex items-start justify-between gap-4">
                  <span className="border border-zinc-600 px-2 py-1 text-xs text-zinc-400">{project.meta}</span>
                  <IconExternalLink className="size-5 text-zinc-500 transition-colors group-hover:text-zinc-100" aria-hidden="true" />
                </div>
                <h3 className="mt-20 text-2xl font-bold leading-tight text-zinc-100">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{project.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section id="method" className="grid h-[100dvh] max-h-[100dvh] overflow-hidden border-y-2 border-zinc-100 bg-zinc-100 text-zinc-950">
        <div className="mx-auto grid h-full w-full max-w-7xl content-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <Reveal>
            <div>
              <IconCode className="mb-7 size-12" aria-hidden="true" />
              <h2 className="text-balance text-4xl font-bold leading-tight sm:text-6xl">
                Direct method, sharp finish, strange in the best way.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-3">
            {principles.map((principle, index) => (
              <Reveal key={principle} delay={index * 0.06}>
                <div className="flex gap-5 border-2 border-zinc-950 p-5">
                  <span className="text-xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-pretty text-lg font-bold leading-8">{principle}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative grid h-[100dvh] max-h-[100dvh] overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center">
        <Reveal>
          <div className="max-w-4xl">
            <IsumiGlyph className="mb-8 block text-6xl font-bold leading-none text-zinc-100" />
            <h2 className="text-balance text-5xl font-bold leading-none text-zinc-100 sm:text-7xl">
              Let&apos;s build something that doesn&apos;t look rented.
            </h2>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-300">
              Replace these links with your real channels and connect each project to repositories, demos, and case studies.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BrutalButton href="mailto:you@domain.com">you@domain.com</BrutalButton>
              <a href="https://github.com/" className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900" aria-label="GitHub">
                <IconBrandGithub className="size-5" />
              </a>
              <a href="https://linkedin.com/" className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900" aria-label="LinkedIn">
                <IconBrandLinkedin className="size-5" />
              </a>
              <a href="https://x.com/" className="inline-flex size-12 items-center justify-center border-2 border-zinc-500 text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-900" aria-label="X">
                <IconBrandX className="size-5" />
              </a>
            </div>
          </div>
        </Reveal>
        </div>
      </section>
      </motion.div>
    </main>
  );
}

export { App };
