# AGENTS.md

## Purpose

This file is the primary instruction document for work in this repository. When Codex or any other agent modifies the repo, follow this file first and use the supporting documents below for their intended purposes.

### Instruction precedence

Use the following precedence order.

1. The closest `AGENTS.md` in the current directory tree
2. The root [AGENTS.md](/Users/ethan/Desktop/thehelia/AGENTS.md)
3. [Design_System.md](/Users/ethan/Desktop/thehelia/Design_System.md) for The Helia design system
4. [FOLLOW_UP_GUIDE.md](/Users/ethan/Desktop/thehelia/FOLLOW_UP_GUIDE.md) for recent implementation context
5. `codex-template/` documents and skills as template source material

If these documents conflict, use `AGENTS.md` for execution rules, `Design_System.md` for design direction, and `FOLLOW_UP_GUIDE.md` for historical implementation context.

## Repository context

- This project is The Helia postpartum care center website
- It is an information-first website without a database, login, or signup flows
- The goals are strong visual quality, clear copy, and conversion-friendly page flow
- This is primarily a refactor, so preserving existing logic and user flow takes priority

## Working style

- Think before editing
- Restate the task internally and keep changes tightly scoped
- Make the smallest useful change that fully solves the request
- Do not refactor unrelated code
- Do not introduce new abstractions, libraries, config, or features unless required
- Match the existing code style, naming, and file organization
- Prefer deleting complexity over adding complexity
- Be explicit about assumptions when requirements are incomplete

## Planning and execution

- Start by locating the smallest set of files needed for the task
- Read only the files that are likely to matter
- Before editing, define a concrete success condition
- For non-trivial tasks, write or present a short plan before making changes
- If there are multiple valid interpretations, choose the safest one and state it

## Editing rules

- Keep diffs surgical
- Preserve backward compatibility unless the task explicitly allows breaking changes
- Avoid changing public APIs, env names, routes, schemas, or file formats without clear need
- Do not rename files, move files, or reorganize folders unless the task requires it
- Do not add comments that restate obvious code
- Only remove dead code when it is directly related to your change and you are confident it is unused
- Never overwrite user-authored work without necessity
- Ask for confirmation only when the action is destructive, irreversible, or likely to break production behavior

## Validation

- Validate with the smallest relevant command set
- Prefer targeted checks before broad ones
- If tests exist near the changed code, run those first
- If lint, typecheck, or tests are too expensive, explain what was not run and why
- Never claim something is verified unless you actually ran the check

## Next.js and frontend conventions

### Stack baseline

- Next.js `15.5.2` with App Router
- React `19.1.0`
- TypeScript `5.x`
- Tailwind CSS `4.x`
- `clsx` for conditional class composition
- `framer-motion` for light interactions and `GSAP` for heavier timelines or scroll animation
- `lucide-react` as the default icon library

### React and Next.js

- Default to React Server Components
- Add `'use client'` only when state, event handlers, effects, or browser APIs are required
- Fetch data on the server with `fetch` or Server Actions when possible
- Use client-state libraries only when the interaction truly belongs on the client
- Be careful with server and client boundaries, hydration, and async loading behavior

### TypeScript

- Define props types in the component file unless the type is reused broadly
- Centralize reused complex types in `lib/types.ts` or `lib/models/`
- Give functions and components explicit return types
- Do not use `any`

### File and import structure

- Component filenames use PascalCase
- Utilities and hooks use camelCase
- Prefer direct imports over barrel files such as folder-level `index.ts`
- Group imports in this order:
  - external packages
  - alias imports such as `@/components` and `@/lib`
  - relative imports

### Styling

- Use single quotes
- Omit semicolons
- Keep Tailwind utility order predictable and consistent
- Use `clsx` for conditional classes
- Avoid changing shared spacing, theme tokens, or primitives unless the task requires it

### Hooks and rendering

- Keep hook dependency arrays accurate
- Avoid unstable object and array dependencies when they trigger needless rerenders
- Prefer fixing the source of invalid state over adding defensive patches everywhere

## The Helia design system

The current design system source of truth is [Design_System.md](/Users/ethan/Desktop/thehelia/Design_System.md). Use the following principles as the baseline for visual work and refactoring.

### Refactoring protocol

- This is a refactor, not a greenfield rebuild
- Preserve existing business logic and reservation or inquiry flows
- Start with skin-first changes before touching deeper behavior
- Replace UI incrementally at the component level instead of rewriting whole pages at once
- Check mobile layout safety whenever a component is changed

### Visual direction

- Follow the `Organic Serenity` and `Smart Comfort` tone
- Combine soft bento information structure with warmer, more organic presentation
- Favor warm neutrals with calm accent colors such as sage or deep blue
- When motion is needed, prefer soothing and gradual movement over aggressive effects

## Context documents

- Read [FOLLOW_UP_GUIDE.md](/Users/ethan/Desktop/thehelia/FOLLOW_UP_GUIDE.md) before editing an area that was recently changed
- Treat `FOLLOW_UP_GUIDE.md` as implementation history and current-state context, not as the primary execution rulebook
- Update repository guidance when repeated confusion appears, but do not rewrite historical follow-up notes unless the task asks for it

## Skills

Use the root `.agents/skills` directory as the active skill path for this repository. `codex-template/.agents/skills` is the template source, but in this repo the root skills below take precedence.

### Available repo skills

- `.agents/skills/frontend-bugfix`: use for UI bugs, rendering defects, hydration mismatches, and small frontend behavior fixes
- `.agents/skills/api-contract-update`: use for request or response schema changes, DTOs, validators, typed clients, and route contract updates
- `.agents/skills/repo-safety-check`: use before high-risk changes involving schema, infrastructure, auth, billing, secrets, or deployment

Use them with the following intent.

- Use `frontend-bugfix` for UI bug fixes
- Use `api-contract-update` for contract or type-boundary changes
- Use `repo-safety-check` for deployment, auth, billing, schema, or secret-related work

## Communication

- Summarize what changed, why it changed, and how it was verified
- Call out assumptions, risks, and follow-up work separately when relevant
- Do not say a problem is fixed unless validation supports that claim
- When the user asks for snippet-only output, include the target file path at the top of the code block
- When the user asks for a code review, prioritize convention violations, server or client boundary issues, performance risks, and type safety issues

## Safety rails

- Never commit secrets, tokens, or credentials
- Treat migrations, deployment settings, auth, billing, and destructive scripts as high-risk areas
- Prefer reversible and additive changes in production-sensitive paths
- If a change could cause downtime, data loss, auth failure, or billing issues, call that out clearly

## Default completion checklist

Before finishing, confirm internally that you did the following:

- Scoped the task correctly
- Minimized the diff
- Avoided unrelated edits
- Ran the most relevant validation you could
- Reported validation truthfully
