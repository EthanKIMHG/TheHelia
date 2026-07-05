---
name: frontend-bugfix
description: Use this when fixing a UI bug, interaction issue, rendering defect, hydration mismatch, styling regression, or small frontend behavior issue.
---

# Frontend bugfix workflow

## Goal

Fix the reported frontend problem with the smallest safe change and verify the behavior at the narrowest useful level.

## Workflow

1. Identify the exact UI surface, route, component, and state involved.
2. Reproduce the bug from code, logs, screenshots, or issue text.
3. Trace the minimal path of data and rendering involved.
4. Edit only the files directly responsible for the defect.
5. Avoid broad refactors, design rewrites, or unrelated cleanup.
6. Validate with the smallest relevant check:
   - component or route-level test if available
   - typecheck for touched files if supported
   - targeted lint or build check if needed
7. Report root cause, fix, and validation clearly.

## Rules

- Preserve current UX unless the task explicitly asks for a redesign.
- Do not silently change copy, spacing systems, theme tokens, or shared primitives unless needed for the fix.
- Be careful with server/client boundaries, hydration, and async data loading.
- Prefer fixing the source of invalid state instead of adding defensive patches everywhere.
- If the issue comes from API shape mismatch, note that separately and coordinate with the API contract skill.

## Output format

When done, summarize:

- Root cause
- Files changed
- What was fixed
- Validation run
- Remaining risk
