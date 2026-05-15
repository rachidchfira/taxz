<!-- Sync Impact Report
Version change: template → 1.0.0
Added: 5 principles, Stack Constraints, Development Workflow, Governance sections
Removed: all placeholder tokens
Templates updated: ✅ constitution.md; plan/spec/tasks templates unchanged (no conflicts)
Deferred TODOs: none
-->

# VietPIT Constitution

## Core Principles

### I. Stack Fidelity
The existing stack (Next.js 16 App Router, TypeScript, Tailwind CSS 4, shadcn/ui, Prisma ORM)
MUST be used for all new work. No new frameworks, ORMs, state libraries, or UI systems may be
introduced without explicit justification and documented tradeoff.

### II. Minimal Footprint
Every change MUST touch the fewest files necessary. New files are created only when no existing
file can be extended cleanly. Helpers are introduced only when used in 3+ places. No speculative
abstractions, no future-proofing.

### III. Scope Control
Implementation MUST match the specification exactly — no more, no less. Feature expansions,
refactors of adjacent code, and "nice-to-have" additions are out of scope unless explicitly
approved. Over-engineering MUST be flagged immediately before proceeding.

### IV. Spec-Driven Order
Work MUST follow: constitution → specify → clarify → checklist → plan → tasks → analyze → implement.
Coding MUST NOT begin until the spec and plan are stable. One task group is implemented at a time.

### V. Simplicity Over Cleverness
Readable, direct code is preferred over clever abstractions. Complexity MUST be justified with an
explicit tradeoff note. Testing is required only where failure risk is high (tax calculation logic,
form validation, API routes). No test infrastructure changes unless required by spec.

## Stack Constraints

- Framework: Next.js 16 App Router only (no Pages Router)
- Language: TypeScript strict mode (no `any` without justification)
- Styling: Tailwind CSS 4 + shadcn/ui (no new CSS libraries)
- Database: Prisma ORM + SQLite dev / PostgreSQL prod (no schema changes unless spec requires)
- Icons: Lucide React only
- No new npm packages without explicit approval
- Color system: Navy #1E3A8A / Teal #40E0D0 (MUST be respected in all UI work)

## Development Workflow

- Spec is the source of truth; implementation is scoped execution
- Before coding: produce a 3–5 bullet planned diff
- After coding: list changed files, what changed, risks/follow-ups
- Do not silently refactor unrelated code
- Do not add comments, docstrings, or type annotations to unchanged code
- Flag immediately: unclear requirements, dependency sprawl, scope creep, premature architecture

## Governance

This constitution supersedes all other development guidance. Amendments require:
1. A stated reason (new constraint, discovered risk, or explicit user approval)
2. Version increment: MAJOR = principle removal/redefinition; MINOR = new principle; PATCH = wording
3. Update to this file before any implementation proceeds

All spec/plan/task artifacts MUST comply with this constitution. Non-compliance MUST be flagged
before implementation proceeds.

**Version**: 1.0.0 | **Ratified**: 2026-03-28 | **Last Amended**: 2026-03-28
