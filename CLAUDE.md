# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Repository context

- This project is The Helia postpartum care center (산후조리원) website
- It is an information-first website without a database, login, or signup flows
- The goals are strong visual quality, clear copy, and conversion-friendly page flow
- This is primarily a refactor, so preserving existing logic and user flow takes priority

## Supporting documents

- [Design_System.md](Design_System.md) — source of truth for The Helia design system and visual direction
- [FOLLOW_UP_GUIDE.md](FOLLOW_UP_GUIDE.md) — implementation history and current-state context; read it before editing a recently changed area, but treat it as context, not as the execution rulebook

## Commands

- `pnpm dev` — dev server (Next.js with Turbopack)
- `pnpm build` — production build (also serves as the typecheck; there is no separate lint/test setup)
- `pnpm start` — serve the production build

## Stack

- Next.js `15.x` with App Router (Turbopack in dev)
- React `19.x`, TypeScript `5.x`
- Tailwind CSS `4.x`, `clsx` (+ `tailwind-merge`) for conditional class composition
- `framer-motion` for light interactions, `GSAP` for heavier timelines or scroll animation, `lenis` for smooth scrolling
- `lucide-react` as the default icon library

## Structure

- `src/app/[locale]/` — locale-prefixed App Router pages (the site is multilingual)
- `src/app/api/` — route handlers
- `src/components/` — grouped by surface (`home`, `pages`, `service`, `stories`, `nursery`, `header`, `footer`, `common`, `ui`)
- `src/lib/`, `src/context/` — utilities and shared context

## Working style

- Make the smallest useful change that fully solves the request; keep diffs surgical
- Do not refactor unrelated code or introduce new abstractions, libraries, config, or features unless required
- Match the existing code style, naming, and file organization; prefer deleting complexity over adding it
- Do not rename, move, or reorganize files unless the task requires it
- Avoid changing public APIs, env names, routes, schemas, or file formats without clear need
- Be explicit about assumptions when requirements are incomplete

## React and Next.js conventions

- Default to React Server Components; add `'use client'` only when state, event handlers, effects, or browser APIs are required
- Fetch data on the server with `fetch` or Server Actions when possible
- Be careful with server/client boundaries, hydration, and async loading behavior
- Keep hook dependency arrays accurate; avoid unstable object/array dependencies that trigger needless rerenders
- Prefer fixing the source of invalid state over adding defensive patches everywhere

## TypeScript

- Define props types in the component file unless the type is reused broadly
- Centralize reused complex types in `src/lib`
- Give functions and components explicit return types
- Do not use `any`

## Code style

- Single quotes, no semicolons
- Component filenames use PascalCase; utilities and hooks use camelCase
- Prefer direct imports over barrel files (no folder-level `index.ts`)
- Import order: external packages → alias imports (`@/components`, `@/lib`) → relative imports
- Use `clsx` for conditional classes; keep Tailwind utility order predictable
- Avoid changing shared spacing, theme tokens, or primitives unless the task requires it

## Design direction

- Follow the `Organic Serenity` and `Smart Comfort` tone defined in [Design_System.md](Design_System.md)
- Combine soft bento information structure with warmer, more organic presentation
- Favor warm neutrals with calm accent colors such as sage or deep blue
- When motion is needed, prefer soothing and gradual movement over aggressive effects
- Replace UI incrementally at the component level instead of rewriting whole pages at once
- Check mobile layout safety whenever a component is changed
- Preserve existing reservation and inquiry flows

## Skills

Repo skills live in `.claude/skills/`:

- `frontend-bugfix` — UI bugs, rendering defects, hydration mismatches, small frontend behavior fixes
- `api-contract-update` — request/response schema changes, DTOs, validators, typed clients, route contract updates
- `repo-safety-check` — run before high-risk changes involving schema, infrastructure, auth, billing, secrets, or deployment

## Validation and safety

- Validate with the smallest relevant command set; `pnpm build` is the broadest check available
- Never claim something is verified unless you actually ran the check
- Never commit secrets, tokens, or credentials
- If a change could cause downtime, data loss, auth failure, or billing issues, call that out clearly
