# The Helia Frontend Improvement Log

Last updated: 2026-04-02

## Project Goal
- Build an informative postpartum care center website without DB, login, or signup features.
- Focus on visual quality, clear copy, and conversion-friendly screen flow.

## Completed Improvements

### 1) BentoGridShowcase bullet hover interaction
- Request: In `src/components/home/BentoGridShowcase.tsx`, show only `item.title` and `item.description` by default, then reveal bullets on mouse hover with a fade-in from below.
- Change:
  - Updated bullet list transition classes to start hidden (`opacity-0`, `translate-y-3`, `max-h-0`, `overflow-hidden`).
  - Added hover animation to reveal bullets (`group-hover:opacity-100`, `group-hover:translate-y-0`, `group-hover:max-h-40`) with `transition-all duration-500`.
- Result:
  - Default card state emphasizes title/description.
  - Bullets appear smoothly from below on hover on `md+` screens.

### 2) BentoGridShowcase card height stability on hover
- Request: Prevent card resize/jump when bullets appear or disappear during hover.
- Change:
  - Moved bullets to `absolute` positioning inside a `relative` content wrapper.
  - Positioned bullets at `top-full` so they render below description without affecting layout flow.
  - Removed reserved desktop padding (`md:pb-24`) to eliminate pre-hover empty space.
  - Shifted the text block upward only on hover (`md:group-hover:-translate-y-20`) to create reveal room for bullets.
- Result:
  - Card dimensions remain stable during hover.
  - No grow/shrink effect and no default empty gap before hover.

### 3) Smaller card typography balancing (Nursery / Spa)
- Request: Nursery Care and Spa & Wellness cards feel cramped compared with the larger Private Suite card.
- Change:
  - Added per-card conditional sizing by index in `BentoCard`:
    - Primary card (`index === 0`): keep larger type scale.
    - Smaller cards (`index !== 0`): reduce title/body/bullet type scale.
  - Reduced desktop hover lift on smaller cards from `-translate-y-20` to `-translate-y-14`.
  - Tightened description lines on smaller cards with `line-clamp-2`.
- Result:
  - Better text density and readability for smaller cards.
  - Visual hierarchy remains clear, with Private Suite as the hero card.

### 4) Card height increase for readability
- Request: Increase card height further to create more breathing room on Nursery Care and Spa & Wellness cards.
- Change:
  - Added explicit `min-height` to all three cards in grid class assignment:
    - Primary card: `min-h-[460px] md:min-h-[860px]`
    - Nursery/Spa cards: `min-h-[360px] md:min-h-[430px]`
- Result:
  - More vertical space for content and hover state in smaller cards.
  - More stable visual balance between the hero card and side cards.

### 5) Bottom padding under bullets
- Request: Add spacing under the bullets (not on the wrapper).
- Change:
  - Removed wrapper-based hover padding approach.
  - Added bottom padding directly on bullet list (`ul`) so spacing belongs to bullets area:
    - Primary card bullets: `md:pb-8`
    - Smaller card bullets: `md:pb-6`
- Result:
  - Bullets reveal keeps a cleaner bottom margin.
  - Spacing intent is tied to bullets block, not the text wrapper.

### 6) Mobile bullets visibility
- Request: Show bullets on mobile as well (no hover interaction on mobile).
- Change:
  - Updated bullet list classes to be visible by default on mobile.
  - Kept desktop-only hover reveal behavior with `md:` scoped animation/positioning classes.
  - Mobile bullet type scale is slightly smaller to fit compact cards.
- Result:
  - Mobile users can always read bullet points without hover.
  - Desktop interaction behavior remains unchanged.

### 7) HomeNavigationGallery title font application fix
- Request: Selected font was not being applied to the target text.
- Change:
  - Added `font-display-serif` to the main gallery heading (`copy.title`) in `HomeNavigationGallery`.
  - This forces the intended display serif utility instead of inheriting locale default text font.
- Result:
  - The chosen title font now applies consistently in the navigation gallery header.

## Files Changed
- `src/components/home/BentoGridShowcase.tsx`

## Follow-up Notes For Next AI
- Keep app scope static/content-driven (no auth, no DB).
- Continue improvements based on new user directives and append each change under `Completed Improvements`.
