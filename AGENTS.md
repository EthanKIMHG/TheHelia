# AGENTS.md

## Purpose

이 저장소의 작업 기준 문서는 이 파일이다. Codex 또는 다른 에이전트가 레포를 수정할 때 먼저 이 문서를 따르고, 아래 보조 문서들을 목적에 맞게 함께 참고한다.

### Instruction precedence

우선순위는 다음과 같다.

1. 현재 디렉터리 기준 가장 가까운 `AGENTS.md`
2. 루트 [AGENTS.md](/Users/ethan/Desktop/thehelia/AGENTS.md)
3. [Design_System.md](/Users/ethan/Desktop/thehelia/Design_System.md) for The Helia design system
4. [FOLLOW_UP_GUIDE.md](/Users/ethan/Desktop/thehelia/FOLLOW_UP_GUIDE.md) for recent implementation context
5. `codex-template/` documents and skills as template source material

문서 간 충돌이 있으면 실행 규칙은 `AGENTS.md`, 디자인 방향은 `Design_System.md`, 과거 변경 맥락은 `FOLLOW_UP_GUIDE.md`를 기준으로 해석한다.

## Repository context

- 이 프로젝트는 The Helia 산후조리원 웹사이트다
- DB, 로그인, 회원가입이 없는 정보 중심 사이트를 전제로 한다
- 목표는 높은 시각 완성도, 명확한 카피, 전환 친화적인 화면 흐름이다
- 신규 구축보다 리팩토링 성격이 강하므로, 기존 로직과 사용자 흐름 보존이 우선이다

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

현재 디자인 시스템 원문은 [Design_System.md](/Users/ethan/Desktop/thehelia/Design_System.md)에 있다. 시각 작업이나 리팩토링은 아래 원칙을 기본으로 따른다.

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

루트 `.agents/skills`를 실제 작업용 스킬 경로로 사용한다. `codex-template/.agents/skills`는 원본 템플릿이며, 현재 레포에서는 아래 루트 스킬을 우선 사용한다.

### Available repo skills

- `.agents/skills/frontend-bugfix`: UI 버그, 렌더링 결함, hydration mismatch, 소규모 프론트엔드 이상 수정
- `.agents/skills/api-contract-update`: request or response schema, DTO, validator, typed client, route contract 변경
- `.agents/skills/repo-safety-check`: schema, infra, auth, billing, secrets, deployment 같은 고위험 변경 전 점검

다음 기준으로 사용한다.

- UI 버그 수정은 `frontend-bugfix`
- 계약 또는 타입 경계 변경은 `api-contract-update`
- 배포, 인증, 결제, 스키마, 시크릿 관련 작업은 `repo-safety-check`

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
