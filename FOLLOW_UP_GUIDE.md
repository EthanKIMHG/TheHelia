# The Helia Frontend Improvement Log

Last updated: 2026-04-07

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

### 8) About page daily flow content updated with real operations
- Request: Replace generic `DailyFlowSection` text with actual center routine grouped by morning/lunch/evening, without listing a full timestamp table.
- Change:
  - Updated `dailyFlow` copy in `AboutPageShowcase` to reflect real operations:
    - Morning: breakfast, morning rooming-in, morning snack, feeding/pumping routine check.
    - Lunch/Afternoon: lunch/snack, free blocks for pumping/classes/body care/breast care.
    - Evening: dinner, evening rooming-in, evening snack, late-night free rest and bedtime prep.
  - Added operational guide details in copy:
    - Body massage: Mon-Sat, 10:00-17:00.
    - Breast care: Mon/Wed/Fri, 10:00-13:30.
    - Education classes: follow in-house posted schedule.
- Result:
  - Daily flow now matches real on-site routines and user expectations.
  - Section remains visually consistent while conveying practical information.

### 9) DailyFlowSection UX visibility upgrade
- Request: Improve visual clarity and scanability of the daily flow UI for users.
- Change:
  - Added time-zone-specific visual identity per card (morning/lunch-evening/evening) with distinct icon and soft color tone.
  - Added focus chips (`focus`) on each card so users can instantly identify key activities.
  - Replaced plain bullet dots with numbered badges to improve reading order.
  - Added a dedicated `Operation Guide` block under timeline for massage/class operation rules.
- Result:
  - Better first-glance comprehension of daily rhythm content.
  - Practical operational constraints are now clearly separated from narrative card content.

### 10) Mobile header readability alignment update (DailyFlowSection)
- Request: Improve readability on small screens where centered text felt visually weak and awkwardly wrapped.
- Change:
  - Switched header alignment to mobile-first left alignment with desktop center alignment (`text-left md:text-center`).
  - Added constrained line length for subtitle (`max-w-[30ch]`) and Korean-friendly wrapping (`break-keep`).
  - Tuned heading line-height for mobile (`leading-[1.26]`) to reduce visual crowding.
- Result:
  - Daily flow heading and subtitle are easier to scan on mobile.
  - Desktop visual balance remains centered as before.

### 11) Cross-page mobile readability pass (global alignment + wrapping)
- Request: Apply the same mobile readability principle across all pages, especially where centered text caused weak visibility due to awkward line breaks.
- Change:
  - Audited major home/sub/service/reservation/story/nursery/page templates.
  - Standardized section headers to mobile-first left alignment with desktop center preservation where appropriate (`text-left md:text-center`).
  - Added Korean-friendly wrapping (`break-keep`) and controlled mobile line length on long subtitles (`max-w-[30ch]` pattern).
  - Adjusted heading line-heights on mobile (`leading-[1.25~1.28]`) to reduce visual crowding.
  - Applied to Spa-related components (`SpaBrandIntro`, `SpaServiceBento`, `SpaServiceCarousel`) and shared templates (`SubPageHero`, `SubPageTemplate`) so downstream pages inherit better defaults.
- Result:
  - Better scanability on mobile across multiple pages.
  - Fewer awkward breaks in Korean copy and improved content rhythm without sacrificing desktop composition.

### 12) Reservation pricing page mobile UX overhaul (comparison-first layout)
- Request: Improve reservation pricing mobile UX so users can distinguish VIP, VVIP, and Prestige at a glance; also replace mobile table-heavy detail views with a better format.
- Change:
  - Added a mobile-only `Quick Compare` board in `PricePageContent` that displays VIP/VVIP/PRESTIGE side-by-side on one screen.
  - Introduced key comparison rows (2-week rate, baby care ratio, head spa, partner meal, baby spa, key benefit) for immediate visual differentiation.
  - Kept the existing rich pricing cards for desktop (`md+`) and separated mobile/desktop presentation explicitly.
  - Replaced horizontal-scroll tables on mobile for room rates and spa rates with card-based detail blocks:
    - Room rate cards by room type with period-based price chips.
    - Spa rate cards by course with regular/package/pre-booking values and emphasis styling.
  - Preserved desktop table layout for full matrix readability on larger screens.
- Result:
  - Mobile users can compare all core plan tiers without moving card-to-card.
  - Room/Spa detail pricing is now easier to scan on mobile with reduced horizontal scrolling and lower cognitive load.
  - Desktop information density remains intact.

### 13) Refund policy mobile UI update (at-a-glance comparison)
- Request: Apply the same mobile UX principle to the refund policy table so users can compare conditions at a glance.
- Change:
  - Added mobile-only refund comparison board in `RefundPolicySection`:
    - Converted the single-row table into a 2x2 card grid by cancellation window (`31일 전`, `21~30일`, `10~20일`, `9일 전`).
    - Kept explicit basis label (`계약금` / `Deposit`) on top for context.
    - Applied status color tones so users can visually distinguish high/partial/no refund states instantly.
  - Kept desktop table (`md+`) unchanged for matrix-style readability.
  - Removed mobile horizontal-scroll helper copy for refund section since side-scrolling is no longer required on mobile.
- Result:
  - Refund conditions are immediately scannable on mobile without horizontal scrolling.
  - Users can compare all refund windows in one glance while desktop behavior remains stable.

### 14) Price page visual tone harmonization (warm neutral system)
- Request: Align the overall color tone of the reservation price page for better visual consistency.
- Change:
  - Unified section surfaces (main pricing, promotion, room/spa detail, refund) to a consistent warm-neutral palette based on beige/sand layers.
  - Rebalanced text hierarchy from mixed cool gray/black values to coordinated warm-brown contrast levels for headings/body/meta.
  - Adjusted pricing card tones:
    - Prestige: deep warm-charcoal with cream text.
    - VVIP: warm beige highlight.
    - VIP: soft ivory panel matching the same family.
  - Updated action/button and table states (hover, header rows, muted values, highlighted pre-booking cells) to keep a single accent language around `primary` + warm neutrals.
  - Replaced remaining non-matching refund mobile tones with warm progression shades so the comparison board matches the rest of the page.
- Result:
  - The full pricing page now reads as one coherent visual system instead of mixed palettes.
  - Cross-section transitions feel smoother, and mobile/desktop styling remains consistent in mood.

### 15) Price page dark mode palette pass (contrast-safe warm dark)
- Request: Keep the revised warm tone while making the page readable and balanced in dark mode.
- Change:
  - Added explicit `dark:` palette variants across all major pricing sections (header, plan cards, promotions, room/spa details, refund policy).
  - Switched dark surfaces to warm-charcoal layers and adjusted border/text contrast for each hierarchy level (title/body/meta/value).
  - Added dark variants for mobile comparison cells, tier cards, table headers/rows, chips, and interactive button states.
  - Reworked refund comparison card tones in dark mode to preserve status differentiation without introducing off-theme colors.
- Result:
  - Dark mode now keeps the same brand mood as light mode while maintaining readable contrast.
  - Mobile and desktop both render with consistent tone mapping in dark environments.

### 16) Material 3 tone refinement for detail sections
- Request: Replace outdated/beige-heavy tones in room/spa detail and guide cards by referencing Google design system style.
- Change:
  - Reworked these sections with Material 3-style tokens (`surface`, `surface-container`, `surface-variant`, `outline-variant`, `on-surface`, `on-surface-variant`) for both light and dark.
  - Updated `PromotionSection` and `Service Details` card surfaces and typography from warm beige-heavy values to cleaner neutral M3 layering.
  - Rebuilt `DetailRatesSection` (room/spa):
    - Mobile cards: M3 container hierarchy and readable on-surface text.
    - Desktop tables: M3-like header/background/divider/hover tones.
    - Pre-booking highlight: switched to primary-container style (`#E8DEF8` / dark `#4F378B`) for cleaner emphasis.
- Result:
  - The targeted sections feel more modern and less “muddy/beige”.
  - Visual hierarchy is clearer while preserving brand accent and dark-mode consistency.

### 17) Re-alignment to brand primary/secondary color family
- Request: Ensure tone choices stay close to the project’s `primary` / `secondary` system rather than a detached palette.
- Change:
  - Replaced M3-leaning purple-neutral hardcoded colors in key detail areas with semantic theme tokens:
    - `bg-primary/5`, `bg-primary/10`
    - `text-primary`, `text-secondary`, `text-foreground`
    - `border-border/30`, `divide-border/50`
  - Applied this specifically to the user-requested sections:
    - `Service Details` card in `PromotionSection`
    - `Room Rates Detail` cards/tables
    - `Spa Rates Detail` cards/tables
  - Updated hover/label/muted-value states to stay in the same primary-secondary family in both light and dark themes.
- Result:
  - The section tones now track the site’s brand tokens more naturally.
  - Visual consistency with the rest of the site improved while preserving readability.

### 18) Price page text contrast boost (readability pass)
- Request: Improve overall legibility by making text tones visibly stronger across the page.
- Change:
  - Increased contrast on body/value text in key sections by shifting low-contrast styles to stronger tokens:
    - `text-secondary/85` -> `text-foreground/85`
    - table body values to `text-foreground/80` class family
    - label/meta text from softer muted tones to clearer `text-foreground/75~80` levels
  - Strengthened key label emphasis:
    - `Check List` tone `text-primary/80` -> `text-primary/95`
    - supporting check icons `text-primary/60` -> `text-primary/80`
  - Tuned remaining hardcoded muted shades in header/plan compare labels to darker equivalents for better first-glance readability.
  - Adjusted refund table/detail copy to stronger foreground-based contrast levels.
- Result:
  - Text scanning improved across mobile/desktop, especially in detail tables and guide cards.
  - The page keeps the same visual identity while reducing “washed-out” perception.

### 19) Reservation page tone sync with updated pricing style
- Request: Apply the current pricing page tone to the reservation overview page.
- Change:
  - Updated `ReservationPageContent` sections (`Process`, `Contact`, `Notice`) to match the newer token-driven tone system:
    - Consistent panel surfaces: `bg-white/80` + dark warm panel, `border-border/30`, subtle shadow.
    - Accent surfaces and hover states aligned with `bg-primary/5` and `bg-primary/10`.
  - Increased readability to match pricing page contrast pass:
    - subtitles/notes/step descriptions shifted from low contrast (`/65~70`) to stronger foreground-based levels.
    - small labels and section badges boosted (e.g., `text-primary/95` for key labels).
  - Reworked Notice section from dashed/gradient-heavy style to the same clean card language used by reservation and pricing screens.
- Result:
  - `/reservation` now visually sits in the same design family as `/reservation/price`.
  - Better text legibility with more consistent contrast and component rhythm.

### 20) Dark mode visibility fix for Quick Compare and Refund Policy
- Request: Improve dark mode readability in `Quick Compare` and refund policy table on pricing page.
- Change:
  - `Quick Compare` (mobile):
    - Increased container and row-panel contrast in dark mode (`border-border/50`, brighter panel background).
    - Boosted label readability (`text-primary`, `text-foreground/85~90`) and updated plan tier dark cards with brighter text and clearer border separation.
  - `Refund Policy`:
    - Converted table wrapper/header/rows to stronger token-based dark contrast (`bg-primary/10`, `divide-border/50`, `hover:bg-primary/10`).
    - Raised cell text contrast hierarchy (`foreground/90 -> /75`) for clearer column scanning.
    - Adjusted mobile refund cards’ dark tones to lighter surfaces + brighter text for easier at-a-glance reading.
- Result:
  - Both components now keep visual clarity in dark mode with stronger contrast and clearer data separation.

### 21) Dark mode primary-token alignment on pricing page
- Request: In dark mode, stop relying on custom hardcoded colors and use the already-defined `primary` theme color system.
- Change:
  - Removed remaining dark-mode hardcoded hex classes from `PricePageContent`.
  - Reworked `Quick Compare` mobile board to use `primary`-based surface/border/text hierarchy:
    - tier chips now use `bg-primary` and `bg-primary/*` scale.
    - container/row panels use `dark:bg-primary/10~25` and `dark:border-primary/*`.
  - Updated desktop pricing cards/buttons to `primary` token-based dark states instead of custom warm-charcoal hex values.
  - Rebuilt refund mobile comparison tone ladder with `primary` opacity steps (`/5` to `/30`) for consistent at-a-glance contrast.
  - Unified dark panel backgrounds in promotion/detail/refund wrappers to `dark:bg-primary/10`.
- Result:
  - Dark mode now follows the global theme token system directly.
  - Color behavior is more predictable across sections and aligned with site-wide `primary` definition.

### 22) Reservation process numbering redesign (1-4 step UI)
- Request: Improve the `1,2,3,4` numbering design in the reservation process component for clearer visual flow.
- Change:
  - Rebuilt step items into card-style timeline blocks for stronger hierarchy and scannability.
  - Upgraded number badges from plain circles to `01~04` ring badges with better prominence.
  - Added explicit step-label chip text (`Step 1`, `Step 2`, etc.) above each title.
  - Added directional connectors by viewport:
    - Mobile: vertical connector line between step cards.
    - Desktop: horizontal gradient connector line between columns.
  - Tuned hover/contrast states to remain within the existing `primary` tone family.
- Result:
  - Users can recognize step order faster at first glance.
  - Process section now reads like a guided timeline rather than isolated numbered blocks.

### 23) Consultation booking guidance UX restructure (natural channel flow)
- Request: Improve the consultation booking guidance component so the current 3 contact/reservation cards feel more natural.
- Change:
  - Reorganized channel hierarchy from flat 3-card layout to:
    - Primary featured card: online booking (core conversion path).
    - Secondary quick-contact cards: phone and KakaoTalk.
  - Upgraded the featured booking card with:
    - stronger visual emphasis (`primary` gradient surface),
    - compact highlight chips,
    - clear single primary CTA for booking action.
  - Converted secondary channels into tap-friendly quick-connect cards with consistent icon/CTA affordance.
  - Aligned dark-mode surfaces in this section to token-based tone (`dark:bg-primary/10` family) for consistency with recent palette updates.
- Result:
  - Information now follows a clearer decision flow (Book first, or contact directly).
  - Mobile/desktop both feel less fragmented and more conversion-oriented.

### 24) Reservation process mobile optimization (timeline layout)
- Request: Optimize the reservation process section specifically for mobile.
- Change:
  - Split process rendering by viewport for dedicated UX:
    - Mobile (`md:hidden`): vertical timeline cards with left-side numbered badges (`01~04`) and continuous connector line.
    - Desktop (`md:grid`): existing 4-column flow maintained with horizontal connectors.
  - Reduced mobile section spacing/padding for tighter scan rhythm.
  - Improved text hierarchy in mobile cards (step label -> title -> description) for one-thumb reading.
- Result:
  - Mobile users can follow the booking flow in a clear top-to-bottom sequence.
  - The process now feels intentionally optimized per device instead of one shared layout.

### 25) Mobile process connector natural alignment fix (01-04)
- Request: The connector line between `01, 02, 03, 04` looked visually unnatural on mobile.
- Change:
  - Repositioned connector start point to match the exact center line of each numbered badge.
  - Updated mobile connector style from flat line to subtle vertical gradient for smoother continuity.
  - Added background ring around number badges so the connector visually passes through the badge axis more cleanly.
- Result:
  - Step transitions now feel continuous and intentional on mobile.
  - The 01-04 timeline reads with cleaner rhythm and less visual mismatch.

### 26) Mobile process connector removal
- Request: Remove the step connector line entirely on mobile.
- Change:
  - Deleted the mobile-only vertical connector element between `01~04` cards in `ProcessSection`.
  - Kept numbered badges and card hierarchy unchanged.
- Result:
  - Mobile steps now render as independent cards without connecting lines, matching the requested simpler style.

### 27) Korean locale font application fix + CinematicHero Playfair lock
- Request: Korean pages should apply `Nanum Myeongjo` consistently, while the hero title (`The Helia`) must stay fixed to Playfair.
- Change:
  - Strengthened locale font override rules in `globals.css` so Korean locale also overrides utility families beyond `font-serif`:
    - added KO overrides for `font-sans`, `font-mono`, and `font-playfair` classes under `.font-locale-ko`.
  - Added a dedicated utility class `font-force-playfair` using `--font-serif` with `!important` for explicit Playfair lock use-cases.
  - Updated `CinematicHero` title `motion.h1` to use `font-force-playfair`, and removed component-local Playfair font import to avoid redundant font loading paths.
- Result:
  - Korean locale typography now applies more predictably across sections using different font utility classes.
  - `The Helia` hero title remains fixed to Playfair even on Korean pages.

### 28) DevTools `var(--font-korean)` recognition check and scope hardening
- Request: DevTools Elements showed `var(--font-korean)` not recognized; re-check root cause and harden font variable scope.
- Change:
  - Confirmed runtime HTML for `/ko` includes both font variable classes on `html`:
    - `__variable_0a80b4` (`--font-playfair`)
    - `__variable_88280c` (`--font-nanum-myeongjo`)
  - Moved next/font variable class attachment from `<body>` to `<html>` in `src/app/layout.tsx` so root-scoped theme variables resolve in the same element scope.
  - Added fallback in `--font-korean` declaration:
    - `var(--font-nanum-myeongjo, "Nanum Myeongjo")`
    to keep the variable resolvable even if class application timing differs during hydration/dev inspection.
- Result:
  - CSS variable chain is now stable at root scope and DevTools false-negative warnings are less likely.
  - Korean locale + Playfair lock behavior remains unchanged functionally, but variable resolution is more robust.

### 27) Refund policy day-window realignment (Section 7 sync)
- Request: Update `RefundPolicySection` day windows to match `termsandpolicy.txt` Section 7.
- Change:
  - Replaced refund period labels from the old windows (`31+`, `21-30`, `10-20`, `9`) to the current policy windows:
    - `91+ days or within 24 hours of contract`
    - `61-90 days`
    - `31-60 days`
    - `30 days or less`
  - Renamed internal row keys in `RefundPolicySection` from `d31/d21/d10/d9` to `d91/d61/d31/d30` for semantic clarity.
  - Updated both desktop table headers and mobile comparison cards with the same new timing windows.
- Result:
  - Refund UI now matches the official contract text in `termsandpolicy.txt`.
  - Desktop and mobile show consistent cancellation windows and refund percentages.

## Files Changed
- `src/components/home/BentoGridShowcase.tsx`
- `src/components/pages/the-helia/about/AboutPageShowcase.tsx`
- `src/components/SubPageHero.tsx`
- `src/components/SubPageTemplate.tsx`
- `src/components/home/HomeIntroView.tsx`
- `src/components/home/HomePrograms.tsx`
- `src/components/home/HomeReviews.tsx`
- `src/components/nursery/NewbornProcess.tsx`
- `src/components/nursery/NewbornStrengths.tsx`
- `src/components/pages/reservation/ReservationPageContent.tsx`
- `src/components/pages/reservation/price/PricePageContent.tsx`
- `src/components/pages/room-suites/RoomSuiteShowcase.tsx`
- `src/components/service/ClassSchedule.tsx`
- `src/components/service/EducationalStrengths.tsx`
- `src/components/service/SpaBrandIntro.tsx`
- `src/components/service/SpaServiceBento.tsx`
- `src/components/service/SpaServiceCarousel.tsx`
- `src/components/stories/GuestReviewsPageContent.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/home/CinematicHero.tsx`
- `FOLLOW_UP_GUIDE.md`

## Follow-up Notes For Next AI
- Keep app scope static/content-driven (no auth, no DB).
- Continue improvements based on new user directives and append each change under `Completed Improvements`.
