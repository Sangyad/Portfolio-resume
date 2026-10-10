# PROGRESS.md

## Status
🟢 Active

## Completed
- Added two real certificates (Cisco Cybersecurity Defense Analyst, Assumption
  College of Toledo participation) and converted/optimised their images
- Added `status: 'earned' | 'in-progress'` to the certificate model; pending
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
- (none)

## Up Next
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