---
name: repo-safety-check
description: Use this before high-risk work involving schema migrations, infra config, deployment settings, auth, billing, secrets, destructive scripts, or production-sensitive paths.
---

# Repository safety check workflow

## Goal

Reduce the chance of high-impact mistakes before making risky repository changes.

## Workflow

1. Identify the blast radius:
   - production runtime
   - database schema or data
   - auth/session logic
   - billing or payments
   - secrets or credentials
   - deployment and CI/CD
2. Read the minimal set of relevant files plus adjacent docs.
3. Classify the requested change as one of:
   - safe and local
   - medium risk
   - high risk
4. For medium or high risk work, write a short plan before editing.
5. Prefer reversible and additive changes.
6. Avoid combining unrelated risk in one patch.
7. Validate with the most relevant targeted checks available.

## Rules

- Never expose or log secrets.
- Never rotate or replace credentials unless explicitly asked.
- Treat migrations as dangerous until proven reversible.
- Do not change deployment defaults casually.
- If the change could cause downtime, data loss, auth failure, or billing issues, call that out clearly.

## Output format

When done, summarize:

- Risk classification
- Blast radius
- Changes made
- Validation run
- Residual risk
