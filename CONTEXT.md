# CONTEXT.md

## Project
**Name:** rochdegote
**Description:** interactive personal resume / portfolio
**Stack:** react-none
**Styling:** CSS_MODULES
**Compatibility profile:** 2026.09
**Year:** 2026
**Product status:** active

## Product Goals

Present one engineer's career as a single, explorable page: specialties with
proficiency meters, an experience timeline, a browsable certificate carousel, and
the events that shaped the work. Dark terminal aesthetic by default, with a
light theme for reading and printing-adjacent contexts.

## Users

- Recruiters and hiring managers scanning for signal (30-second first pass)
- The owner reviewing and updating their own content between applications
- Engineers arriving from a link and drilling into certificates or events

## Core Workflows

1. Land and read identity, title, availability, and contact links
2. Skim specialties as meters, expand any role for highlights and stack
3. Browse certificates horizontally, scroll left/right with buttons or arrow keys
4. Filter certificates and events by free-text query and tag chips
5. Jump to any section via the sticky nav or the Ctrl/Cmd+K command palette
6. Switch between dark and light themes; the choice persists across visits

## Acceptance Criteria

- All six sections render as landmarks reachable by keyboard
- Proficiency meters expose `role="meter"` with correct `aria-valuenow`
- Certificate carousel scrolls horizontally with working prev/next, arrow keys,
  and a disabled-when-at-edge state
- Search and tag filters update both certificate and event lists, show a live
  result count, and render an empty state when nothing matches
- Theme toggle sets `data-theme`, persists to `localStorage`, and animates the
  colour crossfade
- Every animation is suppressed under `prefers-reduced-motion: reduce`
- Content is editable from `src/features/resume/data/` without touching components

## Out of Scope

- Backend, authentication, and any stored user data
- Print / PDF export stylesheet
- Multi-page routing (single-page anchor navigation only)
- Downloadable CV file generation

## Generated Baseline

- Architecture profile: small
- Production baseline: generated default; deviations require approval.
- Authentication: none
- Uploads: none
- Background jobs: none
- Offline behavior: none

## Product Decisions
- Single scrolling page with anchor navigation; no router dependency
- Zero runtime dependencies beyond React — command palette and carousel are hand-built
- System monospace font stack (`--font-mono`); no webfont download
- Theme initialised in `main.tsx` before render. The generated `nginx.conf`
  Content-Security-Policy forbids inline scripts, so no pre-paint inline
  bootstrap was added; `nginx.conf` remains untouched per explicit instruction
- Theme crossfade uses a transient `.theme-transition` class on `<html>`, removed
  on the next animation frame so hover states never inherit a global transition
- Certificate images are local files under `public/certificates/`, lazy-loaded

## Approved Deviations
- (none)

## Notes
- Resume copy is placeholder sample data except for the name and the two
  certificates. Replacing `src/features/resume/data/*.ts` is the only edit
  needed to personalise further.
- Certificate credentials carry `status: 'earned' | 'in-progress'`. Pending
  ones are badged, dashed-bordered, and labelled "not yet earned" — never
  present an unearned credential as completed.
- Certificate images live in `public/certificates/`, the profile photo at
  `public/profile.jpg` (falls back to monogram initials until supplied).
- `@testing-library/user-event` added as a devDependency for interaction tests.
- `src/test/setup.ts` installs an in-memory `localStorage`: Node 24 exposes an
  experimental global `localStorage` that shadows jsdom's and is undefined
  without `--localstorage-file`.

## Expected Concerns (advisory)
- accessibility, styling-tokens, styling-responsive, web-platform, stack-testing