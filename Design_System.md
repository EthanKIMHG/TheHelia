# Design System

This document is the current The Helia design system source of truth.
Use it with [AGENTS.md](/Users/ethan/Desktop/thehelia/AGENTS.md) for execution rules and with [FOLLOW_UP_GUIDE.md](/Users/ethan/Desktop/thehelia/FOLLOW_UP_GUIDE.md) for detailed implementation history.

## Overview

The Helia is an information-first postpartum care center website.
The product tone is premium, calm, warm, and conversion-oriented rather than clinical, flashy, or startup-like.
Design decisions should preserve the current booking and information flow while improving readability, trust, and scanability.

## Source Of Truth

- Global theme tokens and typography: [src/app/globals.css](/Users/ethan/Desktop/thehelia/src/app/globals.css)
- Execution rules and repo workflow: [AGENTS.md](/Users/ethan/Desktop/thehelia/AGENTS.md)
- Historical design changes and recent UI decisions: [FOLLOW_UP_GUIDE.md](/Users/ethan/Desktop/thehelia/FOLLOW_UP_GUIDE.md)

If documents conflict, follow `globals.css` for tokens, this file for design direction, `FOLLOW_UP_GUIDE.md` for recent applied patterns, and `AGENTS.md` for execution rules.

## Brand Direction

- Core mood: warm serenity, quiet luxury, trustworthy care
- Product goal: make users feel informed, reassured, and ready to book or contact
- Visual stance: editorial warmth over hospital sterility
- UX stance: high clarity over ornamental complexity

## Theme Tokens

### Light theme

- `--background: #FAF9F6`
- `--foreground: #4A3B36`
- `--primary: #A68B7C`
- `--secondary: #9E948D`
- `--accent: #D9C6BC`
- `--border: #E6DBD4`

### Dark theme

- `--background: #141313`
- `--foreground: #FFFFFF`
- `--primary: #A8B5A0`
- `--secondary: #E0E0E0`
- `--accent: #6C7A5E`
- `--border: #444240`

### Token rules

- Use semantic tokens before introducing custom colors
- Prefer `bg-primary/5`, `bg-primary/10`, `text-primary`, `text-secondary`, `text-foreground`, `border-border/30`, and `divide-border/50`
- In dark mode, stay inside the existing token system instead of adding one-off hex palettes
- Warm neutrals and primary-family surfaces should carry most section styling

## Typography

### Font system

- Default display serif: `--font-serif` backed by Playfair
- Korean serif locale font: `--font-korean` backed by Nanum Myeongjo
- Sans support font: `Pretendard`
- Default body font currently inherits the serif family at `body`

### Usage rules

- Use `font-display-serif` for high-importance headings that should follow the brand serif system
- Korean pages should inherit `Nanum Myeongjo` through `.font-locale-ko`
- Use `font-force-playfair` only when the English brand wordmark must remain fixed to Playfair regardless of locale
- Do not mix unrelated font families inside the same section without a strong hierarchy reason

### Text hierarchy

- Headings should feel editorial and premium, but not oversized to the point of harming readability
- Body copy should prioritize legibility and steady rhythm over decorative styling
- Labels, badges, and support text should use stronger contrast than before; avoid washed-out muted text

## Surfaces, Shape, And Texture

- Use soft, warm surfaces instead of stark white or cold gray panels
- Default rounded feel should stay generous; the brand radius token is `--radius-brand: 2rem`
- Borders should be subtle and supportive, not heavy separators
- Soft shadow plus warm border is preferred over dramatic glass or hard elevation
- The site already uses a light grain overlay on `body`; preserve that analog texture unless a section has a strong reason to opt out

## Layout Principles

### Information architecture

- The site is not a product dashboard; it should read like a premium care guide
- Use clear section sequencing that helps users understand services, daily life, pricing, and booking
- Prioritize conversion-friendly flow over experimental composition

### Responsive behavior

- Mobile readability is a first-order requirement
- Prefer `text-left md:text-center` for section headers when centered mobile text wraps awkwardly
- Use constrained line length, Korean-friendly wrapping, and tighter mobile line-height where needed
- Mobile and desktop may use different presentation patterns when that improves clarity

### Approved layout patterns

- Soft bento cards for feature and service overviews
- Dedicated mobile comparison boards for dense pricing or policy data
- Card-based mobile detail blocks instead of horizontal-scroll-heavy tables where possible
- Timeline or guided-step cards for process-oriented content

## Interaction Principles

- Motion should feel calm and deliberate, not flashy
- Hover behavior must not cause layout jumps
- Desktop-only hover reveals are acceptable when mobile gets the same information in a visible static form
- Prefer smooth opacity, translate, and contrast transitions over large transform-driven spectacle

## Current Component Patterns

### Bento and showcase cards

- Keep the primary card visually dominant without making side cards cramped
- Hover reveals should preserve card height stability
- Smaller cards may use tighter type scale and reduced hover lift
- Mobile should expose essential content without requiring hover

### Daily flow and operational content

- Daily rhythm content should be grouped by meaningful time zones rather than dense timetable grids
- Use distinct chips, icons, or numbered markers to improve first-glance understanding
- Operational rules such as massage, breast care, and class timing should live in a clearly separated guide block

### Reservation and pricing

- Reservation and pricing pages should share one visual family
- Pricing comparison on mobile should be at-a-glance first, deep detail second
- Use mobile `Quick Compare` style boards when users need to compare tiers such as VIP, VVIP, and Prestige quickly
- Refund policy on mobile should use comparison cards or boards rather than wide tables
- Process flows should read clearly as ordered steps without decorative clutter
- Contact and booking channels should emphasize the primary conversion path first, with secondary contact methods clearly subordinate

### Detail sections

- Room and spa detail sections should use clean token-based surfaces with strong foreground contrast
- Highlight states should align with the primary family, not detached colors
- Desktop tables are acceptable when the matrix matters; mobile should favor cards or simplified boards

## Dark Mode

- Dark mode should remain warm, calm, and contrast-safe
- Use `[data-theme="dark"]` token behavior from `globals.css`
- Prefer `dark:bg-primary/10` family surfaces, token-based borders, and stronger foreground hierarchy
- Do not introduce harsh neon accents or cool blue-grays that break the brand tone

## Hero Rules

- Hero presentation can be immersive, but it should still support clarity and brand trust
- The `.home-hero` layout is already tuned for large screens in `globals.css`
- Preserve full-width presence and calm premium pacing
- The `The Helia` wordmark may be locked to Playfair when locale overrides would otherwise replace it

## Design Do And Do Not

### Do

- Keep the site warm, premium, and easy to scan
- Reuse semantic tokens and existing spacing or contrast patterns
- Prefer additive refinement over full visual resets
- Match new sections to the current reservation and pricing tone system

### Do not

- Reintroduce cold grayscale or purple-leaning palettes detached from brand tokens
- Center long Korean copy on mobile when it harms readability
- Add hover-only disclosure for critical information on touch devices
- Use low-contrast muted text for important labels, values, or guidance
- Replace the current calm editorial tone with tech-product or hospital-admin styling

## Maintenance Rule

When a substantial UI direction changes in implementation, update this file and keep it aligned with the latest design decisions captured in `FOLLOW_UP_GUIDE.md`.
