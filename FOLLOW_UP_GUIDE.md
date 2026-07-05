# The Helia Frontend Improvement Log

Last updated: 2026-07-04

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

### 29) Stories guest-reviews real blog review curation (6 links)
- Request: Replace `stories/guest-reviews` cards with real blog-review-based summaries and ensure each review card opens the matching source link.
- Change:
  - Replaced all 6 review entries in `src/components/stories/GuestReviewsPageContent.tsx` with blog-based data only (no cafe links).
  - Updated each card with:
    - actual blog URL (`link`) for click-through.
    - updated `date` from post publish timing.
    - rewritten `content.ko` / `content.en` summaries based on reviewed post content.
    - author/initial labels aligned to each blog source.
  - Applied the following source links:
    - `https://blog.naver.com/wodllove2/224199420109`
    - `https://blog.naver.com/jjcokoboolhj/223630616760`
    - `https://blog.naver.com/kkodaejang/224247014451`
    - `https://blog.naver.com/dongkozip/223828057989`
    - `https://blog.naver.com/taetae_1201/224179921722`
    - `https://blog.naver.com/rlorxya/224158217705`
- Result:
  - `stories/guest-reviews` now shows 6 real blog-derived review cards.
  - Every card is clickable and opens the corresponding original blog post in a new tab.

### 30) Stories guest-reviews expansion (+2 additional blog reviews)
- Request: Add two more blog reviews to the existing `stories/guest-reviews` card list.
- Change:
  - Added 2 new review entries (`id: 7`, `id: 8`) to `src/components/stories/GuestReviewsPageContent.tsx`.
  - Wrote Korean/English card summaries from each post’s key points:
    - `https://blog.naver.com/serrri/224106408914` (VIP + 베이비스파 중심 후기)
    - `https://blog.naver.com/fullcart/224186390662` (VVIP 2주 + 산후마사지 후기)
  - Set both cards to open original blog links on click and aligned date/author/initial metadata with the source posts.
- Result:
  - `stories/guest-reviews` now includes 8 real blog-based review cards.
  - Newly added 2 cards are fully clickable and consistent with existing review card UX.

### 31) SEO base domain alignment (`thehelia.co.kr`)
- Request: The site domain changed from the Vercel preview domain to the production domain and SEO-related references needed to be updated accordingly.
- Change:
  - Added a shared site constant module in `src/lib/site.ts`:
    - `SITE_URL = 'https://thehelia.co.kr'`
    - `SITE_IMAGE_URL = 'https://thehelia.co.kr/img/main/homepage_1.jpg'`
  - Updated locale layout metadata in `src/app/[locale]/layout.tsx`:
    - `openGraph.url` now uses the production domain.
    - JSON-LD `LodgingBusiness.url` now uses the production domain.
    - JSON-LD `image` now uses the production image URL derived from `SITE_IMAGE_URL`.
  - Updated technical SEO route handlers:
    - `src/app/robots.ts` sitemap URL now points to `https://thehelia.co.kr/sitemap.xml`
    - `src/app/sitemap.ts` URL generation now uses the production domain for every localized route.
  - Removed obsolete “도메인 변경 해야함” placeholder comments from SEO-related files.
- Result:
  - Structured data, Open Graph URL, `robots.txt`, and `sitemap.xml` now point to the same canonical production domain.
  - The site no longer mixes preview-domain and production-domain signals across core SEO surfaces.
  - `pnpm build` passes after the update.

### 32) SEO step 1: sitemap route cleanup + `metadataBase`
- Request: Start the SEO follow-up work step by step, beginning with the most foundational technical items.
- Change:
  - Updated `src/app/sitemap.ts` to include only the actual published localized routes:
    - kept: home, about, location, reservation, reservation price, infant room, moms class, FAQ, guest reviews
    - added concrete detail pages:
      - `/room-suites/vip`
      - `/room-suites/vvip`
      - `/room-suites/prestige`
      - `/service/helia-spa`
      - `/service/baby-spa`
    - removed legacy/non-canonical entries:
      - `/room-suites`
      - `/service/massage`
      - `/service/spa`
  - Updated `src/app/layout.tsx` to define:
    - `metadataBase: new URL('https://thehelia.co.kr')`
  - This ensures relative metadata fields such as canonicals and localized alternates resolve against the production domain.
- Result:
  - The sitemap now reflects the real public route inventory instead of stale placeholder URLs.
  - Canonical/alternate metadata now has a correct absolute URL base at the root layout level.
  - `pnpm build` passes after the update.

### 33) SEO step 2: route-level metadata rollout for published subpages
- Request: Continue the SEO follow-up step by step by splitting metadata at the page level instead of relying only on locale layout defaults.
- Change:
  - Added a reusable helper in `src/lib/seo.ts`:
    - `normalizeLocale()`
    - `buildSubPageMetadata()`
  - `buildSubPageMetadata()` now derives page-specific metadata from existing navigation content in `src/components/header/nav-data.ts`:
    - title
    - description / preview copy
    - canonical
    - localized alternates (`ko`, `en`)
    - Open Graph image
    - Twitter card image
  - Added `generateMetadata()` to the published subpages:
    - `the-helia/about`
    - `the-helia/location`
    - `reservation`
    - `reservation/price`
    - `room-suites/vip`
    - `room-suites/vvip`
    - `room-suites/prestige`
    - `service/helia-spa`
    - `service/baby-spa`
    - `service/infant-room`
    - `service/moms-class`
    - `stories/faq`
    - `stories/guest-reviews`
  - Updated pages that were relying on context fallback only so `localeOverride` is passed explicitly where needed.
- Result:
  - Published subpages now emit route-specific metadata instead of sharing only locale-level defaults.
  - Canonical and `hreflang` links are now generated consistently at the page level for the localized routes above.
  - Open Graph and Twitter previews now use page-representative images from navigation preview assets for these routes.
  - `pnpm build` passes after the update.

### 34) SEO step 3: home-route metadata split + page-scoped structured data
- Request: Continue with the next SEO pass by separating home-route metadata and refining structured data so it only appears on pages where the content truly matches.
- Change:
  - Refactored the locale home route:
    - moved the existing client-side home implementation from `src/app/[locale]/page.tsx` into `src/components/home/HomePageContent.tsx`
    - converted `src/app/[locale]/page.tsx` into a server wrapper so it can export route-level metadata
  - Added dedicated home metadata in `src/lib/seo.ts` via `buildHomePageMetadata()`:
    - home-specific title
    - home-specific description
    - canonical / localized alternates
    - Open Graph / Twitter image metadata
  - Fixed the floating reservation CTA on the home page to use an absolute localized path:
    - `/${locale}/reservation`
  - Extracted FAQ source content into `src/components/stories/faq-data.ts` so it can be reused by both the page UI and structured data generation.
  - Added `src/lib/structured-data.ts` with:
    - `buildLodgingBusinessStructuredData()`
    - `buildFaqPageStructuredData()`
  - Applied page-scoped JSON-LD:
    - home page now emits `LodgingBusiness`
    - FAQ page now emits `FAQPage`
  - Removed the old global `LodgingBusiness` script from `src/app/[locale]/layout.tsx` so business schema is no longer emitted on every localized route.
- Result:
  - The home page now has its own route-level metadata rather than inheriting only locale-layout defaults.
  - `LodgingBusiness` schema is now limited to a page where the business context is appropriate.
  - `FAQPage` schema is now backed by real visible Q&A content.
  - The site no longer emits the same business structured data on unrelated subpages.
  - `pnpm build` passes after the update.

### 35) SEO step 4: image SEO pass (representative images + descriptive alt text)
- Request: Continue the next SEO step with an image-focused pass that improves how search engines interpret representative images and key content visuals.
- Change:
  - Updated `src/lib/seo.ts` with route-level representative image overrides for major pages:
    - `about`
    - `location`
    - `reservation`
    - `reservation/price`
    - `room-suites/*`
    - `service/*`
    - `stories/*`
  - This replaces weaker generic preview selection in metadata with more page-relevant OG/Twitter images where possible.
  - Improved home hero carousel alt text in `src/components/home/HeroCarousel.tsx` so the six home slides no longer use numeric placeholder-style alt values.
  - Improved image alt quality in service/story components:
    - `src/components/service/HeliaSpaPageContent.tsx`
      - replaced generic head spa labels such as `Head Spa Main` with descriptive scene-based alt text
      - added per-image alt text for prenatal / postpartum / breast care galleries
    - `src/components/service/BabySpaPageContent.tsx`
      - added descriptive per-image alt text for baby spa gallery images
      - replaced generic strength image alt text with content-based titles
    - `src/components/service/EducationalStrengths.tsx`
      - replaced one-word alt values (`Education`, `Medical`, `Recovery`) with descriptive image intent
    - `src/components/stories/GuestReviewsPageContent.tsx`
      - replaced generic `Review Thumbnail` alt text with review-author-based thumbnail descriptions
  - Updated `src/components/service/SpaServiceBento.tsx` to support both:
    - legacy string image arrays
    - new `{ src, alt }` image objects
  - This kept existing pages compatible while allowing more descriptive alt metadata where available.
- Result:
  - Metadata-level representative images are now more closely aligned with the actual content of each major page.
  - Several high-visibility image groups no longer rely on generic or repeated alt strings.
  - The image SEO baseline is stronger without breaking existing page components that still pass legacy image arrays.
  - `pnpm build` passes after the update.

### 36) SEO step 5: legacy-host redirect for sitemap/domain consolidation
- Request: Investigate a Search Console sitemap error that still referenced `https://the-helia.vercel.app/...` URLs even after the production domain migration.
- Verification:
  - `src/app/sitemap.ts` already generated `https://thehelia.co.kr/...` URLs.
  - The live `https://thehelia.co.kr/sitemap.xml` response also already served `https://thehelia.co.kr/...` URLs.
  - The Search Console error examples therefore pointed to stale legacy-host signals rather than a remaining sitemap code issue.
- Change:
  - Added `src/middleware.ts` to issue a `308` redirect from the legacy production alias host `the-helia.vercel.app` to `https://thehelia.co.kr`, preserving path and query string.
- Result:
  - Requests to the legacy Vercel production alias now consolidate onto the canonical domain.
  - Sitemap, robots, and page URLs on the legacy host no longer compete with the primary domain.
  - This should help Search Console stop surfacing stale legacy-domain URL examples after the next re-fetch.
  - `pnpm build` passes after the update.

### 37) SEO step 6: home search title signal changed to brand-first naming
- Request: The Google result for the homepage was showing a generic title such as `프리미엄 산후조리원` instead of the brand-led name the user wants.
- Change:
  - Updated the Korean homepage metadata in `src/lib/seo.ts` so the home route now emits the absolute title `더 헬리아 산후조리원`.
  - Updated SEO-facing Korean brand signals in:
    - `src/app/[locale]/layout.tsx`
      - title default
      - title template
      - keywords
      - Open Graph `siteName`
    - `src/lib/seo.ts`
      - Open Graph `siteName`
      - Korean fallback brand title
    - `src/lib/structured-data.ts`
      - `LodgingBusiness.name`
- Result:
  - The homepage now sends a stronger brand-first title signal for Korean search results.
  - Metadata, Open Graph, and structured data all align on `더 헬리아 산후조리원` instead of mixing generic-title and no-space brand variants.
  - Google can still rewrite titles, but the source signals are now materially closer to the requested SERP naming.

### 38) HomePrograms UX simplification with modal detail flow
- Request: Reduce reading fatigue in the homepage program section by showing only key messages first, then revealing detailed information in a dialog or modal when the user clicks. Mobile optimization was required.
- Change:
  - Updated `src/components/home/HomePrograms.tsx` so each program card now shows:
    - concise eyebrow
    - short title
    - one-line summary
    - clear `자세히 보기` / `View details` CTA
  - Replaced the always-visible long descriptions with a detail dialog:
    - desktop: centered modal
    - mobile: bottom-sheet style modal
  - Added detail bullets per program so users can open only the topic they care about instead of scanning all text in the default layout.
  - Added interaction/accessibility behavior:
    - body scroll lock while modal is open
    - close on overlay click
    - close on `Escape`
    - explicit dialog labeling
  - Kept the review-backed program themes but rewrote the section subtitle to explain the lighter scan-first reading pattern.
- Result:
  - Default homepage scanning is lighter and more conversion-friendly because the section no longer front-loads all explanatory text.
  - Mobile users now get a more natural tap-to-expand experience without reading through six dense cards in sequence.
  - The section still preserves depth for users who want more detail, but only on demand.

### 39) HomePrograms motion pass for calmer interaction
- Request: Add softer transitions so the simplified HomePrograms UX feels smoother when users interact with it.
- Change:
  - Updated `src/components/home/HomePrograms.tsx` to use `framer-motion` for the interaction layer.
  - Added card-level motion refinement:
    - subtle lift on hover
    - softer CTA arrow movement
    - calmer shadow/border transition timing
  - Added modal animation flow:
    - overlay fade in/out
    - dialog scale + slide entrance/exit
    - detail header content fade/translate entrance
    - staggered reveal for detail bullets
  - Added reduced-motion guards with `useReducedMotion` so the section does not force animation where motion should be minimized.
- Result:
  - The program cards now feel less abrupt during hover and tap interaction.
  - The modal/bottom-sheet detail flow opens and closes with a more premium, calmer rhythm aligned to the site tone.
  - Motion remains scoped to this section and does not require broader layout or animation-system changes.

### 40) HomePrograms modal copy tone refined to brand voice
- Request: The modal detail text felt too analytical and AI-written. Rewrite the copy so it reads more like The Helia’s own strengths rather than review analysis.
- Change:
  - Updated the detailed modal copy in `src/components/home/HomePrograms.tsx`:
    - rewrote Korean detail bullets from report-like sentences into shorter brand-benefit phrases
    - adjusted Korean detail descriptions above the bullets to feel warmer and more direct
    - aligned English detail copy to the same more brand-forward tone so locale behavior stays consistent
- Result:
  - The modal now reads more like on-site brand messaging and less like a review summary.
  - Key strengths are presented more directly, with less hedging and less analytical framing.

### 41) Home quick-fit section added above Programs
- Request: Add one more section above `HomePrograms` because first-touch homepage information felt too light, but avoid repeating the same strengths content in another summary block.
- Change:
  - Added `src/components/home/HomeFitGuide.tsx`.
  - Inserted the section in `src/components/home/HomePageContent.tsx` between:
    - `HomeIntroView`
    - `HomePrograms`
  - Designed the section around user fit instead of feature explanation:
    - `병원과 가까운 조리원을 찾는 분`
    - `신생아실 운영을 꼼꼼히 보는 분`
    - `회복 설비와 객실 컨디션을 중요하게 보는 분`
    - `초산모도 편안한 분위기를 원하는 분`
  - Used a split layout:
    - left intro panel for framing
    - right card grid for quick self-selection
  - Kept copy intentionally short so users can decide quickly whether to keep reading.
- Result:
  - The homepage now gives users a faster “is this for me?” checkpoint before entering the deeper strengths section.
  - The new section complements `HomePrograms` instead of duplicating it, because it frames the content from the visitor’s perspective rather than the brand’s feature perspective.

### 42) SEO step 7: about/location structured data expansion + deeper image-alt pass
- Request: Continue the SEO follow-up with page-scoped schema on facility-introduction routes and clean up the most generic remaining image alt text.
- Change:
  - Added `WebPage` structured data to:
    - `/[locale]/the-helia/about`
    - `/[locale]/the-helia/location`
  - Included `primaryImageOfPage` in the new page schema so each route exposes a representative crawlable image signal tied to its own metadata.
  - Emitted the existing `LodgingBusiness` entity on those pages as well, but gave it a stable localized home-page `@id` and kept its `url` on the locale root so the business entity stays anchored to the main site instead of shifting to a subpage URL.
  - Extracted shared subpage SEO content into `getSubPageSeoContent()` so route metadata and JSON-LD use the same localized title, description, representative image, and image alt inputs.
  - Updated representative metadata images:
    - `about` now uses `/img/private.jpg`
    - `location` now uses `/img/location2.png`
  - Refined several remaining overly generic alt strings in:
    - `src/components/pages/the-helia/about/AboutPageShowcase.tsx`
    - `src/components/home/HomeIntroView.tsx`
    - `src/components/service/SpaBrandIntro.tsx`
- Result:
  - The `about` and `location` pages now expose cleaner page-specific schema while still referencing the same business entity consistently.
  - Representative metadata images and visible alt text better match the actual content of those routes, which should strengthen image interpretation and landing-page relevance.

### 43) Manual the-helia navigation preview image reassignment
- Request: Keep the user-edited `the-helia` navigation image updates as-is and record the adjustment without changing the code again.
- Change:
  - In `src/components/header/nav-data.ts`, the main `the-helia` preview image was manually changed from `/img/subhero/thehelia.jpg` to `/img/main/homepage_2.jpg`.
  - The `about` submenu preview image was also aligned to `/img/main/homepage_2.jpg`.
  - The `the-helia` main and `about` preview alt text was updated to:
    - `en`: `Family lounge area at The Helia`
    - `ko`: `더헬리아 가족 전용 라운지 전경`
  - The `location` submenu preview image remains pointed at `/img/location2.png` with exterior-focused alt text.
- Result:
  - The recorded follow-up state now matches the current user-authored `nav-data.ts` image mapping for the `the-helia` section.

### 44) Helia Spa page refactor to design-system editorial flow
- Request: Refactor `/service/helia-spa` so the page feels closer to the design system while keeping the existing photo assets, improving section arrangement, and paying closer attention to text alignment.
- Change:
  - Rebuilt `src/components/service/HeliaSpaPageContent.tsx` around a clearer editorial sequence:
    - added a top program-overview section with direct anchors to each treatment block
    - kept the existing service photos and core detail sections
    - added a calmer bottom CTA tied to the reservation path
  - Reworked `src/components/service/SpaBrandIntro.tsx` to better match the warm-neutral brand system:
    - replaced the earlier center-heavy composition with a left-led editorial split layout
    - kept the existing THALAC product and spa-room images
    - moved supporting benefit cards into a more readable bento-style row
  - Tightened long-form copy alignment so Korean body text stays easier to scan, especially on smaller screens.
- Result:
  - The Helia Spa page now reads more like a premium care guide and less like a loose sequence of standalone blocks.
  - Information hierarchy is clearer before users enter the detailed service galleries, while the original imagery remains intact.

### 45) Helia Spa feature-card density pass (prenatal / postpartum / breast care)
- Request: Reduce the large empty space inside the benefit cards for prenatal body therapy, postpartum body therapy, and breast care by either enlarging type or adding more visible benefit points.
- Change:
  - Updated `src/components/service/SpaServiceBento.tsx` so feature-card titles and list text render slightly larger with a roomier bullet rhythm.
  - Expanded the benefit lists in `src/components/service/HeliaSpaPageContent.tsx` for:
    - prenatal body therapy
    - postpartum body therapy
    - breast care
  - Applied the same information-density update to both Korean and English copy so locale behavior remains aligned.
- Result:
  - The three treatment sections now fill their feature cards more naturally, with less dead space and stronger first-glance readability.

### 46) Helia Spa locale-safe feature-card height fix
- Request: Fix the broken desktop layout on `/service/helia-spa` where Korean and English text-length differences caused the spa feature cards to overflow into the CTA area.
- Change:
  - Updated `src/components/service/SpaServiceBento.tsx` to remove the fixed desktop section height that had been locking the image-and-card grid to `600px`.
  - Kept the image panel visually substantial by converting the old fixed height into a desktop `min-height` on the carousel card instead of a hard section cap.
  - Removed the equal-height `flex-1` behavior from the feature cards so each locale can expand naturally based on its own copy length.
- Result:
  - The prenatal, postpartum, and breast-care sections now handle longer English lines and denser Korean copy without overlapping the CTA block below.
  - Layout behavior is more stable across locales while preserving the same image assets and overall visual structure.

### 47) Helia Spa desktop image-height sync with feature cards
- Request: Make the prenatal, postpartum, and breast-care image panel match the combined height of the two feature cards on desktop instead of keeping its own separate fixed visual height.
- Change:
  - Updated `src/components/service/SpaServiceBento.tsx` so the desktop bento grid uses the grid row's default stretch behavior again.
  - Changed the image panel from a desktop fixed/min-height approach to `lg:h-full lg:min-h-0`, allowing it to inherit the actual height created by the adjacent feature-card column.
- Result:
  - The left image and right feature stack now stay visually aligned in height on desktop, which makes the spa sections feel more balanced across both Korean and English layouts.

### 48) Baby Spa page refactor to design-system care-guide flow
- Request: Improve `/service/baby-spa` so it feels more aligned with the current design system, while keeping the existing photo assets and making text alignment more intentional.
- Change:
  - Rebuilt `src/components/service/BabySpaPageContent.tsx` into a clearer sequence:
    - added a top overview section with quick navigation cards
    - kept the existing baby-spa gallery and core benefit bento
    - added a bottom consultation CTA connected to the reservation path
  - Reworked the old strengths area into a more editorial two-part layout:
    - a first block focused on the private one-to-one experience and the Suwon-only positioning
    - a second block focused on organic care products and hands-on bathing education
  - Kept the existing baby-spa and strength images, but moved them into warmer split layouts with stronger left-aligned reading rhythm and cleaner section hierarchy.
  - Refined Korean and English copy so both locales support the same care-guide tone and section structure.
- Result:
  - The Baby Spa page now reads more like a premium family-care guide instead of a short service summary.
  - Information flow, text alignment, and CTA structure are more consistent with the Helia Spa refactor and the broader The Helia design system.

### 49) Global floating reservation CTA rollout
- Request: Apply the floating reservation CTA that had been used on the homepage to the entire site so users can jump to the reservation page from anywhere.
- Change:
  - Extracted the homepage floating reservation button into `src/components/common/FloatingReservationCta.tsx`.
  - Mounted the shared CTA in `src/components/LocaleShell.tsx` so it appears across locale pages instead of only inside the home page content.
  - Removed the old homepage-only CTA block from `src/components/home/HomePageContent.tsx` to avoid duplicate floating buttons.
- Result:
  - The same floating reservation entry point now stays available across the site with the existing light/dark styling and locale-aware label copy.
  - Homepage behavior is preserved visually, but the CTA is now managed from one shared location.

### 50) Guest reviews page refactor to design-system editorial layout
- Request: Improve `/stories/guest-reviews` so it feels more aligned with the current design system while preserving the real guest-review source links.
- Change:
  - Rebuilt `src/components/stories/GuestReviewsPageContent.tsx` into a calmer editorial sequence:
    - added a top overview section that explains how to read the curated reviews
    - surfaced summary stats for review count, coverage area, and stay types
    - split the page into a featured-review section and a broader review archive section
  - Replaced the previous masonry-style card layout with a more stable grid so the page feels less like a review platform and more like a premium care guide.
  - Enriched each review card with:
    - a short headline
    - category label
    - highlight chips for faster scanning
    - a clearer original-review CTA while preserving the external source links
  - Kept the existing review sources and thumbnails, but restyled the cards with warmer token-based surfaces, stronger left-aligned typography, and more consistent hierarchy.
- Result:
  - The guest reviews page now feels more in-family with the Helia/Baby Spa refactors and the overall The Helia design system.
  - Users can scan review themes faster without losing access to the original blog posts.

### 51) Guest reviews overview whitespace balance pass
- Request: Improve the overly empty top overview area on `/stories/guest-reviews`, where the stat cards felt too tall and sparse.
- Change:
  - Updated the `ReviewsOverview` layout in `src/components/stories/GuestReviewsPageContent.tsx` so the outer split section no longer visually forces the stat area into tall empty columns.
  - Reworked the right-side summary area into a more balanced two-column composition:
    - first two stat cards stay compact
    - the last stat card spans wider instead of growing tall
    - the review-curation note moved into its own wide supporting card beneath the stats
  - Slightly tightened the left-side title width so the introductory block and the summary cards feel more proportionate.
- Result:
  - The guest reviews overview now uses the space more intentionally and feels less vertically empty while keeping the same content.
  - The section reads more like a designed editorial introduction and less like a stretched dashboard summary.

### 52) Guest reviews featured-story priority change
- Request: In the `먼저 읽어보면 좋은 후기` section, surface the `serrri` and `fullcart` blog reviews first.
- Change:
  - Updated the featured-review selection logic in `src/components/stories/GuestReviewsPageContent.tsx` so the featured section now explicitly pulls review `id: 7` and `id: 8` instead of using the first two array items.
  - The remaining reviews continue to render in the archive grid without changing their source data.
- Result:
  - The featured guest-review area now prioritizes the requested two blog posts while preserving the rest of the review page structure.

### 53) Cross-page mobile title centering pass
- Request: Optimize mobile layout so page and section titles are not all left-aligned.
- Change:
  - Centered mobile page/title header clusters across shared templates and major page sections while keeping card bodies, FAQ rows, lists, and dense informational text left-aligned.
  - Updated `SubPageHero` and `SubPageTemplate` so subpage hero and intro titles inherit the mobile-centered behavior.
  - Added a missing mobile suite title block in `RoomSuiteTemplate` so room pages show the active suite title and copy above the mobile suite switcher.
  - Adjusted the home cinematic title to center on mobile, avoid carousel-dot overlap, and use a mobile-safe shadow instead of `mix-blend-overlay`.
  - Updated the responsive design-system note to reflect the current rule: center compact titles when it helps hierarchy, but keep long copy constrained and readable.
- Result:
  - Mobile pages now present title hierarchy more intentionally without converting content-heavy areas into centered body copy.
  - Desktop alignment remains unchanged where the existing layout depended on left-aligned split compositions.

### 54) Mobile pricing table readability rebuild
- Request: Improve mobile readability of the price page pricing components.
- Change:
  - Replaced the mobile-only 3-column `Quick Compare` matrix in `PricePageContent` with a simpler vertical price-list component.
  - Each mobile plan card now shows only the core scan path:
    - room tier
    - 2-week price
    - short description
    - baby-care ratio, head-spa benefit, and key benefit
  - Kept the desktop 3-card pricing layout and detailed room/spa/refund sections unchanged.
- Result:
  - Mobile users can read VIP, VVIP, and Prestige pricing one tier at a time without cramped table cells.
  - The primary price hierarchy is stronger while preserving the original pricing data.

## SEO Follow-up Priorities

- Completed in this step:
  - Priority 0) sitemap route alignment
  - Priority 1) root `metadataBase`
  - Priority 2) route-level metadata rollout for published subpages
  - home-route metadata split
  - structured data scope refinement for home and FAQ
  - first-pass image SEO improvements
  - legacy-host redirect for domain consolidation
  - brand-first home search title signal

### Priority 0) Align sitemap entries with real published routes [Completed]
- Previous state:
  - `src/app/sitemap.ts` still contains legacy paths such as:
    - `/room-suites`
    - `/service/massage`
    - `/service/spa`
  - The current published route structure includes concrete detail pages such as:
    - `/room-suites/vip`
    - `/room-suites/vvip`
    - `/room-suites/prestige`
    - `/service/helia-spa`
    - `/service/baby-spa`
- Why:
  - A sitemap should list the canonical URLs you actually want indexed.
  - Listing stale URLs while omitting real landing pages weakens crawl quality and can delay or distort indexing.
- Completed action:
  - Replaced legacy route entries with the current published page set.
- Ongoing note:
  - Re-check sitemap coverage whenever nav structure changes.

### Priority 1) Add `metadataBase` in root layout [Completed]
- Previous state:
  - `src/app/layout.tsx` defines icons and manifest, but does not define `metadataBase`.
  - `src/app/[locale]/layout.tsx` uses relative `alternates.canonical` values such as `/${locale}`.
- Why:
  - In Next.js App Router, `metadataBase` is the standard way to turn relative canonical / alternate / OG image paths into fully-qualified URLs at the app level.
- Completed action:
  - Set `metadataBase: new URL('https://thehelia.co.kr')` in `src/app/layout.tsx`.

### Priority 2) Split metadata by route, not only by locale [Completed for published subpages]
- Previous state:
  - Metadata generation exists in `src/app/[locale]/layout.tsx`, but route-level `generateMetadata` or `metadata` exports are not present for the major subpages.
- Why:
  - Right now many pages are likely sharing the same title/description pattern, which weakens title relevance and snippet quality for search.
- Completed action:
  - Added route-specific metadata to the published subpages under `the-helia`, `reservation`, `room-suites`, `service`, and `stories`.
- Ongoing note:
  - The locale root home page still relies on locale layout defaults and can be split into its own server wrapper later if a distinct home-only title/description strategy is needed.
  - That home-only server wrapper has now been added.

### Priority 3) Add page-specific Open Graph images [Mostly completed]
- Current state:
  - Published subpages now use page-representative preview images from nav metadata.
  - The home route now has its own route-level image metadata as well.
  - Major routes now also use explicit representative-image overrides where stronger page-specific assets were available.
- Why:
  - Search and social previews are stronger when each key landing page has a representative image instead of a generic shared asset.
- Next action:
  - Review whether each current route override is the best long-term SERP/social asset.
  - Expand custom OG image selection beyond static file choices if more polished branded share visuals are needed.

### Priority 4) Strengthen multilingual SEO (`hreflang` completeness)
- Current state:
  - Locale alternates are defined for `ko` and `en`, but the setup should be extended consistently at the page level.
- Why:
  - Each localized page should clearly point to its corresponding language variant so search engines understand the relationship between `/ko/...` and `/en/...`.
- Next action:
  - Ensure each major route emits consistent localized alternates.
  - Consider adding an `x-default` handling strategy if the root route is intended as a language selector / redirect entry.

### Priority 5) Expand structured data only where the content truly matches [Partially completed]
- Current state:
  - `LodgingBusiness` has been moved off the locale-wide layout and is now emitted only on content-matching pages:
    - home
    - `about`
    - `location`
  - `FAQPage` structured data has been added to the FAQ route.
  - `about` and `location` now also emit page-scoped `WebPage` structured data with `primaryImageOfPage`.
- Why:
  - Structured data is useful only when it accurately reflects the visible content of the page.
  - Additional schema can help, but only when it matches the page type and content one-to-one.
- Next action:
  - Consider page-specific schema only where appropriate:
    - `WebPage` + `primaryImageOfPage` for strong image landing pages.
    - Additional business properties such as geo coordinates, postal code, and sameAs only if verified.

### Priority 6) Improve image SEO [Partially completed]
- Current state:
  - A first pass has been completed for route-level representative metadata images and several obvious generic alt strings.
  - A deeper pass has now been applied to the `about` route gallery, the home intro cards, and the spa brand section.
  - Some image-heavy sections still likely contain alt text that can be refined further in a deeper audit.
- Why:
  - Image discovery and result quality depend on crawlable image markup, descriptive alt text, and strong landing-page metadata.
- Next action:
  - Continue a deeper audit of remaining hero/section images for:
    - descriptive `alt` text
    - representative filenames
    - consistent use of crawlable image elements
  - Consider extending sitemap coverage if important image assets are not being discovered reliably.

### Priority 7) Submit and monitor the updated sitemap in Search Console
- Current state:
  - `robots.txt` and `sitemap.xml` now point to the production domain.
  - The legacy production alias `the-helia.vercel.app` is now redirected to `https://thehelia.co.kr` so Google receives a single canonical host signal.
- Why:
  - After a domain-level SEO change, sitemap submission and indexing monitoring should follow immediately.
- Next action:
  - Verify `https://thehelia.co.kr` in Google Search Console.
  - Submit `/sitemap.xml`.
  - Remove or ignore any old sitemap submissions tied to the legacy Vercel host if they still appear in Search Console.
  - Re-submit the production sitemap or request a refresh if Search Console continues to show stale old-domain examples.
  - Monitor indexing, canonical selection, and enhancement reports after deployment.

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
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/the-helia/about/page.tsx`
- `src/app/[locale]/the-helia/location/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/lib/site.ts`
- `src/lib/seo.ts`
- `src/lib/structured-data.ts`
- `src/components/home/HomePageContent.tsx`
- `src/components/home/HomeFitGuide.tsx`
- `src/components/home/HeroCarousel.tsx`
- `src/components/stories/faq-data.ts`
- `src/components/service/SpaServiceBento.tsx`
- `src/components/service/HeliaSpaPageContent.tsx`
- `src/components/service/BabySpaPageContent.tsx`
- `src/components/service/EducationalStrengths.tsx`
- `src/components/stories/GuestReviewsPageContent.tsx`
- `FOLLOW_UP_GUIDE.md`
- `src/middleware.ts`

### Design system overhaul — bright quiet luxury (2026-07-04)
- Request: redesign the site in a five-star resort language (One&Only minimal grammar as base, Four Seasons spec clarity for rooms), bright ivory tone. Design-only change — all copy preserved; Naver reservation routing untouched.
- Change:
  - `Design_System.md` fully rewritten as the new source of truth (bright ivory/espresso monochrome-warm palette, eyebrow/tlink utilities, square geometry, hairline structure, no shadows/glass/pill badges).
  - `src/app/globals.css`: new light tokens (`#FBF9F4` bg / `#3A2E22` fg / taupe / clay / sand / hairline), warm-espresso dark tokens (sage removed), `--radius-brand: 0`, added `.eyebrow` and `.tlink` utilities.
  - `Header.tsx`: transparent over the home hero → solid ivory + hairline after 24px scroll (and always on subpages / when nav panels open); tracked-text `THE HELIA` wordmark replaces the logo image; height h-16 → h-20 (`LocaleShell` min-h calc updated); on home the header gets `-mb-20` so the hero runs underneath it (note: pulling the hero up with negative margin instead gets clipped by `overflow-x-hidden` on the home main wrapper).
  - `CinematicHero.tsx`: dark veil/pulse blob removed; ivory gradient veils top/bottom; centered tracked serif wordmark at bottom (espresso — photography is bright); thin drip scroll line. `HeroCarousel.tsx`: dots → hairline dashes bottom-left, espresso.
  - `HomeIntroView.tsx`: manifesto treatment (serif-normal statement, clay support copy, more whitespace).
  - `BentoGridShowcase.tsx`: bento grid replaced with a 3-column triptych (tall 3:4 images, captions below with eyebrow/badge row, serif title, hairline bullet rows). Same data/props/hrefs.
  - `HomeFitGuide.tsx`, `HomePrograms.tsx`: card boxes → hairline-top list cards, eyebrow labels, serif-normal titles; program dialog squared and de-chromed.
  - `HomeNavigationGallery.tsx`: square panels, glass pills → hairline-bordered links + solid ivory CTA, softer inactive dimming with drop-shadow labels for contrast on bright photos.
  - `HomePageContent.tsx` partners heading + marquee bg on tokens; `Footer.tsx`: warm espresso bg, hairline consultation blocks, square buttons, tracked labels.
- Validation: `pnpm build` passes; visually verified in dev (desktop + mobile, home + subpage, light theme; dark theme tokens rechecked).
- Note: subpages inherit the new tokens automatically; their legacy rounded/badge surfaces migrate incrementally per `Design_System.md` → Migration Status.

### Full-site migration to the new design system (2026-07-04)
- Request: extend the bright quiet-luxury system beyond the landing page to every page. Design-only; all copy, data, routes, and logic preserved.
- Change (grammar applied everywhere: square corners, hairline structure instead of boxes/shadows/glass, `.eyebrow` labels instead of pill badges, serif-normal headings, clay `text-secondary` body, standalone taupe icons, soft border/scale hovers):
  - Shared shell: `SubPageHero`, `SubPageTemplate`, `RoomSuiteTemplate`, `common/FloatingReservationCta` (now a square solid espresso bar — hrefs/visibility logic untouched), `common/AIAgentFAB`, `common/GlobalPageLoader`, `header/DesktopNavPanel` (hairline list rows), `header/MobileNavDrawer` (tracked `THE HELIA` wordmark replaces logo images).
  - Service/nursery: all `service/*` components (spa bento/accordion/carousel interactions kept, surfaces squared; `ClassSchedule` desktop board → hairline `divide-x` columns), `pages/service/infant-room/NewbornPageContent` (composition-only), `nursery/NewbornProcess` (1px timeline, square markers), `nursery/NewbornStrengths`.
  - Rooms/reservation/stories: `RoomSuiteShowcase` (Four Seasons spec-card grammar: label/value hairline rows, squared gallery), `ReservationPageContent` (Naver CTA dominant solid `bg-foreground`; tel/Kakao as quiet hairline links — all links untouched), `PricePageContent` (plan cards + room/spa/refund tables as hairline boards, serif `tabular-nums` prices, emphasis via `border-foreground/40` not fills), `AboutPageShowcase` (hardcoded pastel timeline palettes removed → tokens), `LocationPageShowcase` (map deep-link dialog kept, bottom-sheet radius retained), `FaqPageContent` (`divide-y` accordion), `GuestReviewsPageContent` (quiet quote treatment).
- Validation: `pnpm build` passes; visual spot checks in dev (home desktop, room-suites/vip, reservation, reservation/price, stories/faq, service/helia-spa).

### Helia Spa page imagery replaced with subject-matched Unsplash photos (2026-07-04)
- Request: the spa page's real photos were blurry; replace them with treatment-relevant stock photos (head spa → head spa imagery, breast care → related imagery, etc.).
- Change: added 22 curated Unsplash photos under `public/img/spa/us/` (visually reviewed one by one for subject and tone match against the bright design system) and repointed `HeliaSpaPageContent.tsx` (ko + en arrays) and `SpaBentoGrid.tsx`:
  - `headspa-1..4` — shampoo-basin scalp care, calming treatment, therapist facial touch, aroma relaxation
  - `pre-1..5` — pregnant belly (x2), table shoulder care, foot bath (edema), caring hands
  - `after-1..6` — oil back massage, back massage, hot stone, shoulder care, stone bathtub room, oil detail
  - `breast-1..5` — tasteful indirect imagery only (rose-quartz oil set, oil application, lotion/care products)
  - `bento-thalac` (warm shoreline for the THALAC marine card), `bento-atmosphere` (private spa lounge)
- Also fixed pre-existing 404s in `SpaBentoGrid` (`/img/spa/spa3.jpg`, `/img/spa/headspa1.jpg` never existed on disk).
- Original photos in `public/img/spa/` were kept (not deleted) in case a revert is wanted.
- License: Unsplash License — free for commercial use, no attribution required. Note: these are stock scenes, not the actual facility; replace with a professional shoot when available.
- Validation: `pnpm build` passes; direct and `/_next/image` optimizer requests return 200 with valid JPEG for all new files (browser-tab pixel check was inconclusive only because a backgrounded preview tab defers image decode).

### Spa broken-image URLs removed + moms-class promo block removed (2026-07-04)
- Request: delete the spa-page image URLs that rendered as broken (X-box) in the user's session, and remove everything ("CTA") above "The Helia Programs" on the moms-class page.
- Change:
  - `HeliaSpaPageContent.tsx`: removed the first image entry of each program gallery (`us/headspa-1`, `us/pre-1`, `us/after-1`, `us/breast-1`) from both ko and en arrays; `SpaBentoGrid.tsx` head-spa card repointed to `us/headspa-2.jpg`. Note: those four files actually serve 200/valid JPEG in production (the X-boxes came from a stale dev/browser cache), and the files remain in `public/img/spa/us/` — entries can be restored if wanted.
  - `ClassSchedule.tsx`: no longer renders `EducationalStrengths` (AI-image promo bento + QR hybrid banner) — moms-class now opens directly with "The Helia Programs". Unused imports cleaned in `ClassSchedule.tsx` and `MomsClassPageContent.tsx`; `EducationalStrengths.tsx` is now unused but kept on disk.
- Validation: `pnpm build` passes; a11y snapshot of `/ko/service/moms-class` confirms hero → The Helia Programs order; rendered spa page HTML contains zero references to the removed URLs.

### Mobile optimization pass (2026-07-04)
- Request: optimize the site for mobile.
- Audit: automated horizontal-overflow scan of all 14 routes at 375px (iframe-based) found zero overflow; issues found were density/perf, not layout breakage.
- Change:
  - `Header.tsx`: h-16 on mobile / md:h-20 (home hero pull adjusted to `-mb-16 md:-mb-20`); `LocaleShell` min-height calc updated to match.
  - `FloatingReservationCta.tsx`: compact single-line bar on mobile (tracking label hidden below md, tighter padding/icon).
  - `SubPageHero.tsx`: removed the `unoptimized` bypass so local hero images go through the Next image optimizer (they previously shipped original full-size files), quality 100 → 85, mobile min-height 500px → 420px.
  - `HeroCarousel.tsx`: carousel image quality 100 → 85 (LCP weight).
  - `MobileNavDrawer.tsx`: drawer wordmark no longer wraps (nowrap, text-base, tracking 0.3em).
- Validation: `pnpm build` passes; verified at 375×812 — home hero, moms-class, price boards, drawer open state.

### Desktop nav panel + SubPageTemplate intro redesign (2026-07-04)
- Request: update the desktop header nav panel design; the sub-page template intro looked cluttered.
- Change:
  - `DesktopNavPanel.tsx`: redesigned as a compact 540px dropdown card anchored under the header (user rejected an interim full-width mega panel as too sparse). Left: eyebrow section label + tight hairline link rows with hover/active ArrowUpRight; right: 200px `border-l` preview column (image + serif caption + clamped clay copy). Quick fade-in via framer-motion, transparent click-catcher (no page dim), no shadow; fixed stale `top-16` offsets to `top-20` (desktop header is h-20); removed the image `unoptimized` bypass.
  - `SubPageTemplate.tsx`: removed stray debug text `123` rendered next to every sub-page title; intro now = parent-section eyebrow (only when different from the page title) → serif title → short centered hairline divider → constrained clay description (`max-w-[34ch]`, looser leading); more generous spacing (pt-16/24, gap-12/16, pb-16/24).
- Validation: `pnpm build` passes; verified panel open state and moms-class intro at 1280px.

### One&Only-style full-screen nav + photo-forward homepage (2026-07-04)
- Request: reference One&Only Resorts' sidebar-style navigation (stays/dining/experiences), emphasize photography, reduce text overall — update destructively.
- Change:
  - New `header/FullscreenNav.tsx`: full-screen photo-forward menu overlay (One&Only grammar). Left column = large serif category list (dimmed inactive + `01`–`0N` numerals + hairline dividers), hover/first-item reveals sub-links and swaps the right-column full-height image (crossfade). Footer has the reserve button + locale/theme toggles. Esc + body-scroll-lock. Serves both desktop and mobile (image column hidden below `lg`).
  - `Header.tsx` rebuilt: minimal three-zone bar (menu button · centered wordmark · reserve link). Removed the top-bar link row (`DesktopPrimaryNav`), hover dropdown (`DesktopNavPanel`), and `MobileNavDrawer` usage — all replaced by the overlay. Locale/theme toggles moved into the overlay. A `NavCloseButton` (z-70) keeps close + wordmark reachable above the overlay.
  - `DesktopPrimaryNav.tsx`, `DesktopNavPanel.tsx`, `MobileNavDrawer.tsx` are now unused (kept on disk, not imported).
  - Homepage photo emphasis + text cuts: `HomeIntroView` manifesto secondary paragraph trimmed from 3 sentences to 1 (ko + en); `BentoGridShowcase` triptych images enlarged to `aspect-[3/5]` in a wider `max-w-[1600px]` container with tighter gaps, captions reduced to eyebrow + serif title only (description paragraph + hairline bullet list removed from the home cards — full detail still lives on the sub-pages).
- Validation: `pnpm build` passes. Overlay verified with real screenshots on desktop (light) + mobile — category list, active-state dim, sub-link reveal, and right-image crossfade all working. Homepage triptych/manifesto changes confirmed via a11y snapshot + DOM inspection (preview screenshots at deep scroll come back blank due to a Lenis smooth-scroll vs. screenshot-compositor desync, not a render bug — DOM shows images loaded, opaque, positioned).

### Baby spa page imagery replaced with Unsplash (2026-07-04)
- Request: on the baby-spa page, keep the first real baby-spa photo and replace the rest with Unsplash.
- Change: kept `/img/babyspa/babyspa1.jpg` (real). Added 5 curated, reviewed-one-by-one Unsplash photos under `public/img/babyspa/us/` and repointed `BabySpaPageContent.tsx` (ko + en), with alt text updated to accurately describe each new image:
  - Bento carousel: babyspa1 (kept) + `bonding` (parent holding baby) + `newborn-rest` (sleeping newborn) + `baby-play` (baby at play).
  - Strengths row 1 (1:1 private spa / watching baby float) ← `water-play` (baby on a float ring — literal match for the copy).
  - Strengths row 2 (organic care / bathing education) ← `feet-care` (newborn feet in a towel — bath/care).
- Note: one initial candidate (`massage`) turned out to be an ADULT back massage (the same shot as the helia-spa page), so it was discarded — Unsplash has few genuine baby-massage/baby-bath photos findable by ID. The old files (`babyspa2/3/4.jpg`, `strength-babyspa1/2.png`) remain on disk, unused.
- License: Unsplash License (free commercial use, no attribution). These are stock babies, not actual guests — replace with a real shoot when available.
- Validation: `pnpm build` passes; all 5 new files + babyspa1 return 200 through the `/_next/image` optimizer at production sizes; rendered HTML confirms the wiring and zero remaining old refs. (In-browser screenshots at deep scroll were blank/dark again due to the Lenis smooth-scroll vs. screenshot-compositor desync noted earlier — not a render bug.)

### Newborn-room "Uncompromising Premium Care" imagery replaced with Unsplash (2026-07-04)
- Request: on the infant-room page, replace the images below the "타협하지 않는 프리미엄 케어" (Uncompromising Premium Care) heading with Unsplash.
- Scope: that heading lives in `nursery/NewbornStrengths.tsx` (rendered via `pages/service/infant-room/NewbornPageContent.tsx`, NOT the unused `service/InfantRoomPageContent.tsx`). Its four strength images were AI-generated (they carried a "생성형 AI" disclaimer). The bento sections above (observation room + newborn room, `/img/infant/infant1–6.jpg`) are real facility photos and were left untouched.
- Change: added 4 curated Unsplash photos under `public/img/infant/us/` and repointed the `strengths` array; also removed the now-inaccurate AI-image disclaimer overlay.
  - `care.jpg` (parents cradling a newborn) → Strength 01 "1:3 소수 정예 케어 & 상시 오픈 투어"
  - `bassinet.jpg` (infant resting in a bassinet) → Strength 02 "100cm 감염 예방 거리두기"
  - `tending.jpg` (hands cradling a newborn) → Strength 03 "1인 1 기저귀 갈이대 & 전용 처치"
  - `bath.jpg` (baby in a bathtub) → Strength 04 "매일 아침 개별 욕조 목욕"
- Sourcing note: nursery/bassinet/bath photo IDs aren't findable by blind CDN-ID guessing — used WebSearch (unsplash.com) to find real photo pages, then WebFetch on each page to extract the `images.unsplash.com/photo-…` CDN URL. Rejected a "pediatrician giving a vaccine injection" candidate (needle → off-tone for a premium care page). Old files (`strength_infant1.jpg`, `strength_infant2/3/4.png`) remain on disk, unused.
- License: Unsplash License (free commercial use, no attribution). Stock, not the actual facility — replace with a real shoot when available.
- Validation: `pnpm build` passes; all 4 new files return 200 through `/_next/image`; rendered HTML confirms all four wired in (this section SSRs all 4, unlike the carousel bentos) with zero old refs. (Deep-scroll screenshots still blank due to the Lenis vs. screenshot-compositor desync noted earlier.)

### Moms-class header de-duplication + header language toggle (2026-07-04)
- Request: the moms-class page stacked three near-identical centered header blocks (page title "교육 프로그램" → "The Helia Programs" → "Weekly Routine / 반복 교육 프로그램 캘린더"); improve readability. Also re-expose a language toggle (multilingual is supported but the toggle was buried in the FullscreenNav overlay after the header redesign).
- Change:
  - `ClassSchedule.tsx`: removed the redundant "The Helia Programs" umbrella block (it duplicated the SubPageTemplate page title). Removed the doubled table caption title ("주간 반복 일정") — the desktop calendar table now shows just a slim "매월 반복 / Every Month" meta line + the availability note. Gave "프로그램 구성" a matching eyebrow ("LINEUP") so the page now reads as one page title (교육 프로그램) → two parallel content sections (반복 교육 프로그램 캘린더, 프로그램 구성). Added `Sparkles` to the lucide import.
  - `Header.tsx`: added a visible locale toggle to the right cluster (shows "EN" on Korean pages, "KO" on English), calling the existing `changeLocale` (router.push to the mirrored path). The reserve link now sits in a flex group beside it. The overlay's locale toggle stays as well.
- Validation: `pnpm build` passes; a11y snapshot confirms the cleaned heading hierarchy and the header language button (aria-label "Switch to English"/"한국어로 전환"); click test confirms EN → `/en/service/moms-class` with content switching to English; header shows KO/RESERVE on `/en`.

### Photo-forward pass across text-heavy pages (2026-07-04)
- Request: compare every page against the (photo-forward) landing page and replace excessive text with related Unsplash imagery.
- Audit (unique content images per rendered page): moms-class 1 (hero only) and reservation 1 were the clear outliers; price/faq are data/Q&A pages where text is appropriate (left alone); rooms 9, helia-spa 8, infant-room 7, reviews 7, baby-spa 4, about 4 are balanced. About remains the most text-dense (daily-flow columns) — candidate for a future pass.
- Change:
  - `ClassSchedule.tsx` (moms-class): the 10-item Program Lineup converted from icon+text cards to photo cards (aspect-[4/5] image + serif title + schedule line). Added 10 topic-matched Unsplash photos under `public/img/momclass/us/` — pediatric (stethoscope exam), discharge (parents holding newborn), photo (newborn studio shoot on pink fur), pilates (reformer studio), sleep (sleeping newborn), cues (soothing a crying baby), book (baby with picture book), massage (baby on soft towel), casting (hand cradling baby foot), first-aid (CPR manikin training). Removed the now-unused per-item `icon`/`color` fields and lucide icon imports. Page went from 1 → 11 content images.
  - `ReservationPageContent.tsx`: added a wide photo band (240px/420px) between the process header and the steps using the REAL facility lounge photo `/img/main/homepage_2.jpg` (real beats stock on the conversion page). 1 → 2 content images.
- Sourcing method: WebFetch on Unsplash SEARCH pages (e.g. `/s/photos/baby-massage`) returns several CDN URLs + descriptions per call — much faster than per-photo pages; skip `plus.unsplash.com/premium_photo-*` results (paid Unsplash+ license). All 20 candidates were verified visually via contact sheet before final selection (caught two wrong-ID downloads and earlier a chick-photo false positive).
- Ops note: running `pnpm build` while the preview dev server is running clobbers `.next` and makes the dev server 500 — restart the dev server after builds.
- Validation: `pnpm build` passes; fresh dev server confirms all 10 + lounge images wired in rendered HTML and serving 200 via the optimizer.
- Follow-up in the same pass: `AboutPageShowcase.tsx` DailyFlowSection — added a 4:3 photo atop each of the three time-band columns (`public/img/about/us/`): `morning` (breakfast tray on bed), `afternoon` (bathtub rest — the spa-interior candidate verified earlier but unused), `evening` (mother nuzzling sleeping baby). Icons/copy untouched; about page 4 → 7 content images. Same validation (build + rendered HTML + optimizer 200).

### Guest Reviews page decluttered (2026-07-04)
- Request: the guest-reviews page had too much text and felt cramped (tight spacing).
- Change in `GuestReviewsPageContent.tsx` (copy/data left intact; only rendering trimmed + spacing opened up):
  - Overview: dropped the 3-item stats block AND the "Review Curation" note; the 2-col layout became a single centered intro (eyebrow + serif title + one description line) with generous py.
  - Review cards (both Featured and Archive): removed the long `content` paragraph — each card now reads as photo → category·date (→ stars, featured only) → serif headline → highlight tags → author/date + original-review link. The full text is one click away on the source blog. (`content` still exists in the `Review` type/data, just no longer rendered; `PageCopy` `stats`/`noteTitle`/`noteBody` and the featured/archive `description` fields are now unused but kept.)
  - Section headers: dropped the two long descriptions (titles are self-explanatory); `SectionHeader` `description` is now optional.
  - Spacing opened up: section gaps `mt-16` → `mt-24 md:mt-36`; featured grid `gap-6` → `gap-8 xl:gap-10`; archive grid `gap-6` → `gap-x-8 gap-y-16`; card image heights bumped (featured 280→300, archive 52→56).
- Validation: `pnpm build` passes; server-rendered HTML confirms 8 headlines kept, 0 card content paragraphs, 0 stats/curation/section-description blocks, overview description + highlight tags kept. (Browser screenshots unreliable this session — Lenis smooth-scroll vs. screenshot-compositor desync; verified via SSR HTML + DOM instead.)

### Location page hero redesign (2026-07-04)
- Request: the location page needed a design refresh in line with the design system.
- Diagnosis: the page was already on-system, but the hero's lower block was the eyesore — reservation CTA + building + contact + hours crammed into an asymmetric `lg:grid-cols-[1.05fr_0.95fr]` grid with a row-span and a nested sub-grid (engineered/tight).
- Change in `LocationPageShowcase.tsx`:
  - Hero rebuilt as a clean two-column row: intro (eyebrow + serif title + subtitle + Naver booking CTA moved up here as the primary action + note) on the left, a larger exterior photo (`lg:min-h-[540px]`, was 360) on the right.
  - The cramped fact cards replaced by a single airy 3-column hairline strip (contact · hours · location) — `border-t` + `sm:grid-cols-3` with `sm:border-l` dividers, serif values, taupe eyebrow labels — same grammar as the homepage nursery stat row. Removed the now-unused `FactCard` component.
  - Page spacing opened up: `space-y-20 pb-20` → `space-y-24 pb-24 md:space-y-32`.
  - Map section (embed + address + visit steps + map-app deep-link dialog) and the guide band (transit/parking/timing) were already clean and left untouched — all deep-link logic intact.
  - `reservationEyebrow/Title/Description` copy fields are now unused (kept in the content object).
- Validation: `pnpm build` passes; server-rendered HTML confirms the booking CTA + hero image + all 3 facts + `sm:grid-cols-3` strip are present, and the old reservation article and `lg:grid-cols-[1.05fr_0.95fr]` grid are gone; map + guide preserved. (Browser screenshots blank again — Lenis vs. screenshot-compositor desync; verified via SSR HTML. Theme also kept defaulting to dark on fresh dev loads — set cookie+reload to force light.)

### Helia Spa page text cut to ~40% + THALAC image via Unsplash (2026-07-04)
- Request: the spa page still felt text-heavy (wanted ~40% of the text), fill the rest with related photos, and source a THALAC brand image from Unsplash.
- Change in `HeliaSpaPageContent.tsx` (ko + en) — data trimmed, no component/layout changes so other pages using SpaServiceBento (baby-spa, infant-room) are untouched:
  - Program feature lists cut from 39 → 16 items: every program now shows 2 groups × 2 items (head spa dropped its 3rd "Private Care" group; prenatal/postpartum/breast-care went 5→2 items per group). Items were merged/condensed, not just deleted.
  - Section `description` paragraphs, the hero `intro` (3 lines → 1), and the THALAC `description` (2 paragraphs → 1 sentence) all shortened.
  - The 4 program sections stay photo-forward automatically — the bento/carousel image galleries are unchanged, so less text now sits beside the same images.
  - `SpaBrandIntro.tsx`: THALAC image `/img/spa/thalac.png` → `/img/spa/us/thalac.jpg` (Unsplash: a serum dropper bottle resting in a swirl of sand — marine/mineral esthetic matching the French thalassotherapy brand story), added `sizes`.
- Validation: `pnpm build` passes; SSR HTML confirms all 8 feature group headings present once each, dropped "프라이빗 케어" absent, old long items gone, THALAC image serving 200 via the optimizer with no remaining `thalac.png` refs. (Note: `grep -o "…" | head && echo` always runs the echo regardless of match — use `grep -q` for presence checks.)

## Follow-up Notes For Next AI
- Keep app scope static/content-driven (no auth, no DB).
- Continue improvements based on new user directives and append each change under `Completed Improvements`.
- SEO next pass should focus on the remaining deeper image-alt audit, optional geo/sameAs schema enrichment only if verified, and Search Console submission/monitoring.
