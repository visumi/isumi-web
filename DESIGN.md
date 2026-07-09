# Design

## System

One-page portfolio in React, Vite, and Tailwind CSS. Visual register: isumi as a brutalist, cyber-sigilist, monochrome ZINC brand surface. The page should feel like a crafted interface and a personal mark at the same time.

## Color

Use only Tailwind CSS `zinc` scale. Contrast comes from black, white, hard grays, and inverted surfaces.

- Main background: `bg-zinc-950`
- Main text: `text-zinc-100`
- Secondary text: `text-zinc-300`
- Primary borders: `border-zinc-100`
- Secondary borders: `border-zinc-700`
- Inverted surface: `bg-zinc-100 text-zinc-950`

Do not use hue accents outside ZINC, colored gradients, decorative glass, or soft shadows.

## Typography

Single font: Space Mono via Google Fonts. The tone is mechanical, technical, and deliberately narrow. Headings can be large and dry, without negative letter spacing.

## Layout

One-page with high-contrast sections:

- Hero as a brief personal intro: greeting, Vinicius Isumi, Senior Frontend Engineer, Dither background, and ASCIIText with the 泉 glyph.
- Stack strip on an inverted surface.
- Projects in brutalist blocks.
- Method in an inverted panel.
- Final contact call.

Avoid identical card grids as dominant grammar; when cards exist, they should be strong, functional blocks.

## Motion

Entry motion uses blur and slight displacement. The Dither background and ASCIIText create the primary kinetic material. Effects should respect `prefers-reduced-motion`, except when the explicit intent of the piece is to keep the background alive.

## Components

- `Reveal`: content entrance inspired by React Bits reveal components.
- `ASCIIText`: interactive ASCII mark using the 泉 glyph.
- `Dither`: kinetic canvas texture for the first section.
- `IsumiGlyph`: consistent use of 泉 as the platform icon.
- `BrutalButton`: hard-border CTA with color inversion and a short displacement.
