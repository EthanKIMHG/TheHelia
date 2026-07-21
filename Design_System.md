# Design System

This document is the current The Helia design system source of truth.
Use it with [CLAUDE.md](CLAUDE.md) for execution rules and with [FOLLOW_UP_GUIDE.md](FOLLOW_UP_GUIDE.md) for detailed implementation history.

## Overview

The Helia is an information-first postpartum care center website designed in the visual language of a five-star resort (primary reference: One&Only Resorts; secondary: Four Seasons room/spec presentation).

The product tone is **bright quiet luxury**: airy ivory light, generous whitespace, hairline structure, and restrained serif typography. The site should feel like a calm morning in a resort suite — never clinical, never busy, never decorated for decoration's sake.

Design decisions must preserve the existing booking flow (Naver routing) and information flow while improving atmosphere, trust, and scanability.

## Source Of Truth

- Global theme tokens, typography, and shared utilities: [src/app/globals.css](src/app/globals.css)
- Execution rules and repo workflow: [CLAUDE.md](CLAUDE.md)
- Historical design changes and recent UI decisions: [FOLLOW_UP_GUIDE.md](FOLLOW_UP_GUIDE.md)

If documents conflict, follow `globals.css` for tokens, this file for design direction, `FOLLOW_UP_GUIDE.md` for recent applied patterns, and `CLAUDE.md` for execution rules.

## Brand Direction

- Core mood: bright serenity, quiet luxury, trustworthy care
- Design DNA: One&Only minimal immersion as the base grammar; Four Seasons spec-card clarity for rooms and comparison content
- Visual stance: photography and whitespace carry the page; UI chrome recedes to hairlines and tracked labels
- UX stance: high clarity over ornamental complexity; information density is delivered through quiet structure (hairline rows, spec lists), not boxes and badges

## Theme Tokens

### Light theme (default)

- `--background: #FBF9F4` — bright warm ivory
- `--foreground: #3A2E22` — espresso
- `--primary: #A29380` — taupe (eyebrows, labels, quiet accents)
- `--secondary: #84776A` — clay (muted body copy)
- `--accent: #EAE1D1` — sand (soft tinted surfaces)
- `--border: #E4DBCB` — hairline

### Dark theme

- `--background: #16120D` — deep warm espresso
- `--foreground: #F2EBE0` — warm ivory text
- `--primary: #B9A88F` — light taupe
- `--secondary: #A99C8C` — muted warm grey
- `--accent: #2E261D` — dark sand surface
- `--border: #3A3128` — dark hairline

### Token rules

- Use semantic tokens before introducing custom colors
- Prefer `text-primary`, `text-secondary`, `text-foreground`, `bg-accent/40`, `border-border`, `divide-border`
- The palette is intentionally monochrome-warm; do not add new accent hues (no sage, no blue, no gold) without a deliberate brand decision
- Strong contrast lives in `foreground` on `background`; everything else stays quiet

## Typography

### Font system

- Display serif: `--font-serif` (Playfair) via `.font-display-serif` / `.font-force-playfair`
- Korean serif: `--font-korean` (Nanum Myeongjo) via `.font-locale-ko`
- Sans support: Pretendard (`--font-sans`) for labels and UI text

### The three type voices

1. **Display serif** — headings and statements. `font-weight: 400` (never bold), generous line-height (1.4–1.9 for Korean), slight positive letter-spacing on short lines. Oversized-but-calm: `text-3xl`–`text-5xl`, not poster-size.
2. **Eyebrow label** — the signature utility. Small (10–11px), uppercase, tracked wide (`tracking-[0.3em]`–`[0.42em]`), `text-primary`, semibold sans. Use the `.eyebrow` utility. Every section opens with one.
3. **Body / support** — quiet and legible. `text-secondary` or `text-foreground/80`, relaxed leading (1.8–2.0 for Korean), constrained measure (`max-w-[56ch]` or less).

### Usage rules

- Headings are `font-normal` serif — bold serif headings are a legacy pattern; remove them when touching a component
- Uppercase tracked labels replace pill badges as the default "label" treatment
- Text links use the `.tlink` utility: small tracked uppercase with a hairline underline that darkens on hover
- Do not center long Korean copy on mobile when it harms readability

## Surfaces, Shape, And Texture

The Helia renders on a **Liquid Glass** material system (Apple iOS 26 glass), re-tuned for the bright ivory palette. See [Liquid Glass Material](#liquid-glass-material) for the tokens, utility classes, and primitives.

- **Glass surfaces.** Cards, panels, chrome bars, floating controls, and image frames use the frosted-glass material — a translucent warm-white fill + backdrop blur + upper-left specular highlight (135°) + hairline edge + soft warm dual-shadow. Content photography stays opaque _inside_ its glass frame.
- **Superellipse radii.** The `--radius-*` tokens replace the former square geometry: cards 12–16px, large image frames 20px, pills/chips/toggles 100px, sheets 40px. Full-width chrome bars stay radius 0; standalone full-bleed hero images stay square.
- **Gentle elevation.** Glass reads through its soft warm shadow, hairline, and specular — not heavy drop shadows. Interactive glass controls grow to `1.05` on press (spring physics); the dominant conversion CTA stays a **solid espresso pill** with the same press physics (never frosted glass).
- **Hairlines still structure content _inside_ glass** — top rules on list rows, column dividers on stat panels. The glass card is the container; hairlines organize its interior.
- **Subtle depth.** A faint on-palette warm radial field (`.glass-depth`, plus a global `body` layer) gives glass something to refract, without changing the ivory identity. Full-bleed solid color bands (e.g. the dark footer) stay flat — do not glassify them.
- The light grain overlay on `body` is part of the brand's analog texture; preserve it.

## Liquid Glass Material

The glass foundation lives in [src/app/globals.css](src/app/globals.css) (tokens + utility classes) and [src/components/ui/glass/](src/components/ui/glass/) (primitives). It is re-tuned for the bright ivory base: fills are frosted warm-white (not the dark-oriented white-alpha of the source), shadows are warm and soft, the palette is unchanged.

### Tokens (globals.css is the single source of truth for values)

- **Optics** — `--glass-blur` / `--glass-blur-heavy` / `--glass-saturation`; composed as `--glass-backdrop` / `--glass-backdrop-heavy`. Tuned strong enough that the frost + refraction read on the bright base.
- **Fills** — `--glass-fill` (translucent frosted white), `--glass-fill-prominent`, `--glass-fill-warm` (sand-tinted), `--glass-fill-14`/`-20`/`-24` (white-alpha, for glass over photography).
- **Sheen & light** — `--glass-sheen` / `--glass-sheen-strong` (diagonal 135° specular light-catch, layered as `background-image`), `--glass-specular` (bright rim + upper-left inner light), `--glass-edge`, `--glass-hairline` (espresso), `--glass-hairline-dark`.
- **Shadows** — `--shadow-glass`, `--shadow-glass-strong` (warm), `--shadow-glass-dark`.
- **Radii** — `--radius-sm|input|card|md|lg|group|sheet|pill`.
- **Motion** — `--dur-fast|dur|dur-slow`, `--ease-glass`, `--spring`, `--press-scale` (1.05).
- **Dark zone** — `--zone-dark` (deep warm espresso-black `#14100B`), `--zone-dark-elevated`, `--zone-dark-fg`/`-secondary`/`-primary`/`-border`, `--zone-dark-glow` (champagne/rose-gold/amber). Applied via `.zone-dark`.

The glass intensity (sheen brightness, blur, translucency, and the warm depth-field strength) is deliberately pushed for a clear liquid-glass read on the ivory base; adjust these token values in `globals.css` to dial the whole site up or down at once.

### Utility classes

- `.glass` — default frosted card surface · `.glass-prominent` — stronger chrome · `.glass-warm` — sand-tinted · `.glass-on-dark` — over photography/dark bands · `.glass-bar` — full-width chrome bar (pair with `border-b border-border`) · `.glass-depth` — section warm-depth background · `.glass-interactive` — hover lift for clickable cards · `.glass-press` — press-grow for glass controls · `.press-grow` — scale-only press for solid controls.

### Primitives

- `GlassCard` — base surface; props `tone` (`light`/`warm`/`prominent`/`dark`), `radius`, `interactive`, `as`.
- `GlassButton` — control button; `variant` (`glass`/`prominent`/`solid`). `solid` = dominant espresso CTA.
- `GlassIconButton` — round/square glass icon button (arrows, toggles, FABs).
- `GlassChip` — pill label/badge/tag.

### Rules of thumb

- Glass is chrome **and** content surface here (a deliberate departure from the source's chrome-only rule), but photography stays opaque inside its glass frame, and refractive glass is never nested inside another glass card.
- Remove any competing `bg-*` utility when adding a glass class to an element.
- The dominant reservation/Naver CTA stays solid espresso with `press-grow`; secondary controls use glass.
- Preserve reservation/inquiry logic and routing when restyling.

### Light and dark zones

Glass strength is content-adaptive (per the source library: darker backgrounds get richer glass with a brighter Fresnel rim). The Helia uses two zones on the same page:

- **Light zone (default)** — bright ivory + the warm depth field; glass is subtle and translucent. Main content lives here.
- **Dark zone (`.zone-dark`)** — deep warm espresso-black (`#14100B`) with a champagne/rose-gold glow field; glass turns rich with a bright rim (use `.glass-on-dark` for surfaces inside it). Used for the footer and any dramatic closing band, so the light→dark rhythm lets the glass shine. `.zone-dark` remaps the semantic tokens (`--foreground`, `--secondary`, `--primary`, `--border`, `--accent`) so token-based children adapt automatically. Keep it warm — this is the ivory family at night, not a cool navy.

## Photography

- Photography is the primary design material; sections should give images large, uncropped presence (full-bleed or tall 3:4 columns)
- Direction: bright natural light, warm ivory interiors, no heavy color grading, no dark moody edits
- Text over photos: prefer espresso text over bright imagery with a soft ivory gradient veil (`from-[#FBF9F4]/60`) for legibility; use white text only where a photo is genuinely deep in tone, with a subtle dark gradient
- Hover: slow scale (`scale-[1.03]`, 700ms+, soft ease) — never brightness flashes or dramatic zooms

## Layout Grammar

The homepage establishes the grammar; subpages adopt it incrementally.

- **Immersive hero** — full-viewport photography, minimal centered copy (tracked wordmark line), thin vertical scroll line, transparent header at top
- **Manifesto block** — a short centered serif statement surrounded by generous whitespace (`py-24`+)
- **Triptych** — three equal tall-image columns with captions below the image (eyebrow / serif title / clay description / hairline detail rows)
- **Hairline stat row** — numbers presented in serif with tracked-label captions, separated by 1px column rules, bordered top and bottom; replaces dark stat bands and badge chips
- **Spec card** (Four Seasons grammar) — image, serif name, tracked size/view line, then label/value hairline rows; used for rooms and comparison content
- **Hairline list** — icon-light rows or cards separated by top rules for feature/program enumerations

### Responsive behavior

- Mobile readability is a first-order requirement
- Triptychs and spec grids collapse to a single constrained column
- Stat rows collapse to a 2-column grid with preserved hairlines
- Keep long explanatory copy left-aligned when centered text wraps awkwardly; Korean-friendly wrapping (`break-keep`) throughout

## Interaction Principles

- Motion is slow, soft, and scarce: opacity/translate reveals (`ScrollReveal`), long-duration image scale on hover, gentle crossfades
- No bouncing icons, pulsing blobs, rotating chips, or hover translations of whole cards
- Hover behavior must not cause layout jumps
- Anything hover-revealed on desktop must be statically visible on mobile
- Respect `useReducedMotion` in new motion code

## Header And Navigation

- Header is a minimal three-zone bar: menu button (left) · tracked `THE HELIA` wordmark (center) · reserve link (right). Transparent over the home hero, solid ivory + bottom hairline after scroll and on subpages. Foreground text stays espresso in both states (photography is bright).
- Primary navigation is a **full-screen photo-forward overlay** (One&Only grammar), opened by the menu button — the same overlay serves desktop and mobile. There is no top-bar link row or hover dropdown.
  - Left column: large serif category list (`text-4xl`–`text-5xl`), inactive items dimmed to `foreground/45`, numbered `01`–`0N`, hairline dividers. Hovering (desktop) or the first item (default) reveals that category's sub-links as small tracked-uppercase text and swaps the image.
  - Right column (desktop only): full-height photography that crossfades to the active category's preview image.
  - Footer: solid espresso reserve button + square locale/theme toggle buttons (moved out of the header).
  - Close button and centered wordmark sit above the overlay; `Esc` and body-scroll-lock handled.

## Dark Mode

- Dark mode is deep warm espresso, not cool grey — same monochrome-warm family as light mode
- Use `[data-theme="dark"]` token behavior from `globals.css`
- Hairline structure carries over; avoid introducing luminous surfaces or neon accents

## Reservation And Pricing

- The reservation flow routes to Naver — preserve it exactly
- Pricing/comparison content should migrate toward the spec-card and hairline-board grammar (at-a-glance first, detail second)
- The primary conversion path (Naver reservation) is always the visually dominant action; secondary contacts stay subordinate text links

## Design Do And Do Not

### Do

- Let photography and whitespace do the work; keep glass quiet and on-palette (frosted warm-white / sand)
- Open every section with an `.eyebrow` label
- Reach for the glass primitives (`GlassCard`, `GlassButton`, `GlassIconButton`, `GlassChip`) and utility classes over ad-hoc surfaces
- Use hairlines to structure content _inside_ glass, and serif-normal for headings
- Keep the palette monochrome-warm and bright
- Match new sections to the homepage grammar

### Do not

- Over-glassify full-bleed color bands, nest refractive glass inside another glass card, or turn the dominant reservation CTA into frosted glass
- Recolor text or introduce new accent hues; glass fills stay white/warm
- Use bold serif headings or washed-out low-contrast labels
- Add dark moody photo treatments
- Replace the calm resort tone with tech-product or hospital-admin styling
- Break the Naver reservation routing or inquiry flows

## Migration Status

The full site is on the new system: homepage (hero, manifesto, triptych, fit guide, programs, navigation gallery, partners), shared shell (header, nav panel, mobile drawer, footer, sub-page hero/templates, floating reservation CTA, page loader), service pages (infant room, helia spa, baby spa, moms class, schedules, spa bento/accordion/carousel), nursery sections, room suites (spec-card grammar), reservation and price boards, about/location, and stories (FAQ, guest reviews).

The **Liquid Glass material** (see above) has been applied across all of these surfaces: chrome (glass bars, floating controls, nav footer), content cards/panels/image frames (frosted glass + superellipse radii), and controls (glass buttons/chips/icon buttons), while preserving the color palette, layout arrangement, and reservation flow. New components must follow the glass grammar from the start.

## Maintenance Rule

When a substantial UI direction changes in implementation, update this file and keep it aligned with the latest design decisions captured in `FOLLOW_UP_GUIDE.md`.
