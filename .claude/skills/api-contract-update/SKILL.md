---
name: api-contract-update
description: Use this when changing request or response schemas, route contracts, typed API clients, DTOs, validators, or any interface shared between frontend and backend.
---

# API contract update workflow

## Goal

Make contract changes deliberately, keep consumers aligned, and minimize accidental breakage.

## Workflow

1. Identify the current contract source of truth:
   - OpenAPI schema
   - route handler types
   - validator schema
   - shared DTO or client types
2. Determine whether the requested change is backward compatible.
3. Update the contract source first.
4. Update server implementation.
5. Update all known consumers:
   - frontend calls
   - typed clients
   - tests
   - mocks
   - examples or docs
6. Run the narrowest validation that proves contract consistency.

## Rules

- Do not make breaking contract changes unless the task explicitly allows it.
- If a breaking change is necessary, document exactly what broke and what consumers must change.
- Prefer additive changes over destructive ones.
- Keep field names, nullability, and status codes consistent across layers.
- Check serialization details carefully, especially dates, enums, optional fields, and error shapes.

## Output format

When done, summarize:

- Contract change
- Compatibility impact
- Consumers updated
- Validation run
- Migration notes if any
