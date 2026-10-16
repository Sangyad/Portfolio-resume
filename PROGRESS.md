# PROGRESS.md

## Status
🟢 Active

## Completed
- Added two real certificates (Cisco Cybersecurity Defense Analyst, Assumption
  College of Toledo participation) and converted/optimised their images
  credentials render an "in progress" badge, a dashed border, and read
  "target … not yet earned" so they never present as completed credentials
- Generated neutral placeholder images for the six pending cloud credentials
- Added a Hero avatar slot at `public/profile.jpg` with a monogram fallback
- Rebuilt design tokens as a full two-theme scale (dark terminal default, light
  override) with colour, type, space, radius, motion, and layout tokens
- Added global `prefers-reduced-motion` guard and focus-visible outlines
- Built the resume data layer: `types.ts` plus `profile`, `experience`,
  `certificates`, `events`, `specialties` data files
- Implemented `src/lib/theme.ts` — storage, pre-paint apply, and the animated
  crossfade (skipped under reduced motion)
- Built `Hero`, `Specialties` (meters), `Experience` (timeline + accordions),
  `Certificates` (horizontal snap carousel), `Events` (card grid),
  `FilterBar`, `Contact`
- Added `Header` (sticky nav + scroll-spy + palette trigger), `Footer`,
  `ThemeToggle`, `CommandPalette` with focus trap and Escape handling
- Wired `app/App.tsx` → `pages/ResumePage.tsx`; removed the superseded starter
  `App.tsx` / `App.module.css` / `App.test.tsx`
- Updated `index.html` metadata and set `data-theme="dark"` on `<html>`
- Replaced starter assertions with 17 product tests and 5 Playwright e2e specs
- Generated the missing `package-lock.json` via `npm install`

## In Progress
- Replacing the placeholder Projects grid, Education entry, personal copy, and
  interests with the owner's real content

## Completed
- Restyled to the light monochrome reference design: light is now the default
  theme and the dark terminal palette moved to `[data-theme='dark']`, kept as a
  first-class alternate rather than a deprecated mode
- Added four sections alongside the existing ones — Featured Build, Projects,
  Education, and "Outside the IDE" — bringing the page to ten sections in the
  agreed order
- Added `Project` (with `live` / `in-progress` / `coming-soon`) and `Education`
  types plus `projects.ts` and `education.ts` data files
- `featuredProject` promotes itself to the first `live` project, so shipping
  work needs no wiring change
- Project status is carried by visible text badges and a dashed border, never by
  colour alone
- Restyled Hero (circular avatar, stack chips, title suffix), Contact (full-row
  chevron rows), Header, Footer, SectionHeading (eyebrow + rule), Experience,
  Events, Certificates, FilterBar, CommandPalette, ThemeToggle, and Button
- Narrowed the sticky nav to Projects / Experience / Events via `navSections`;
  all ten sections stay reachable by scroll and from the command palette
- Removed the terminal grid backdrop and switched the body to a sans stack;
  `--font-mono` retained for code and credential IDs
- Added `--shadow-card`, `--shadow-lift`, `--color-border-strong`,
  `--tracking-eyebrow`, and `--content-width` tokens
- Added four placeholder project SVGs under `public/projects/`
- Grew the suite to 22 product tests and 8 Playwright specs
- Ignored nested `test-results/` so the frontend e2e output stays out of the repo

## Up Next
- **Confirmed direction (2026-10-16): restyle toward a light monochrome
  reference design — light default, dark retained as an alternate; add Featured
  Build, Projects, Education, and "Outside the IDE" alongside the existing
  sections; no case-study routing, no chat widget, no GitHub activity.** The
  restyle and four sections are now built; what remains is real content.
- Replace the placeholder Projects grid with real work in
  `src/features/resume/data/projects.ts`; set `status: 'live'` as projects ship
  and the Featured Build follows automatically
- Education entry in `src/features/resume/data/education.ts` is seeded from
  certificate evidence and is awaiting the owner's real school, campus, and years
- Replace the placeholder personal copy, interests, and `personalPhoto` in
  `src/features/resume/data/profile.ts`
- Replace the placeholder bio, handle, location, and social links in
  `src/features/resume/data/profile.ts` with real values
- Add a photo at `public/profile.jpg` to replace the monogram fallback
- Replace placeholder experience, events, and specialty entries
- Replace or remove the six in-progress cloud credentials as they are earned

## Blocked
- (none)

## Decisions Made
- No router: single page with anchor navigation keeps the dependency count at
  React alone
- Theme bootstrapped from `main.tsx` rather than an inline script, because the
  generated `nginx.conf` CSP forbids inline scripts and was to stay untouched
- Certificate carousel arrows hide below `48rem`; swipe and native scrolling
  cover narrow screens