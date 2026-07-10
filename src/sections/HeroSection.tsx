import ASCIIText from '../ASCIIText';
import Dither from '../Dither';
import GradientText from '../GradientText';
import { BrutalButton, OutlineButton, Reveal } from '../PortfolioPrimitives';
import ShinyText from '../ShinyText';
import { ABOUT_SECTION_INDEX, CONTACT_SECTION_INDEX, ISUMI_GLYPH } from '../portfolioData';

function HeroBackground({ isActive }: { isActive: boolean }) {
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
        isActive={isActive}
      />
      <div className="pointer-events-none absolute inset-0 bg-zinc-950/68" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,transparent_0,transparent_24%,rgb(9_9_11/0.72)_62%,rgb(9_9_11)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-zinc-950" />
    </div>
  );
}

function HeroSection({ goToSection, isActive }: { goToSection: (section: number) => void; isActive: boolean }) {
  return (
    <section className="relative grid h-[100dvh] max-h-[100dvh] items-center overflow-hidden">
      <HeroBackground isActive={isActive} />
      <div
        id="top"
        className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:py-12"
      >
        <Reveal className="w-full">
          <div className="mx-auto flex max-w-5xl select-none flex-col items-center text-center">
            <ASCIIText
              text={ISUMI_GLYPH}
              enableWaves
              isActive={isActive}
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
                isActive={isActive}
                className="font-bold"
              />
            </p>
            <GradientText
              colors={['#f4f4f5', '#d4d4d8', '#a1a1aa', '#71717a', '#d4d4d8']}
              animationSpeed={6}
              showBorder={false}
              direction="horizontal"
              isActive={isActive}
              className="mt-4 max-w-[44rem] text-pretty text-sm leading-7 text-zinc-300 sm:mt-5 sm:text-base sm:leading-8"
            >
              Creative, communicative, and product-minded &mdash; driven to create experiences that go beyond the code.
            </GradientText>
            <div className="mt-7 flex select-auto flex-wrap justify-center gap-3 sm:mt-9">
              <BrutalButton onClick={() => goToSection(ABOUT_SECTION_INDEX)}>About me</BrutalButton>
              <OutlineButton onClick={() => goToSection(CONTACT_SECTION_INDEX)}>Contact me</OutlineButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { HeroSection };
