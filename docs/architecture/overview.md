# architecture

- Frontend: React + Vite
- Backend/data: None / frontend only
- Platform: web
- Architecture profile: small
- Styling mode: css-modules
- Authentication: public
- No router: the resume is a single page with anchor navigation

## Runtime shape

```text
main.tsx                applies the stored theme, then mounts <App />
app/App.tsx             application root — delegates to the page
pages/ResumePage.tsx    route-level composition, owns palette + filter state
components/layout/      Header, Footer, Container, Section
components/common/      Button, ThemeToggle, CommandPalette
features/resume/
  components/           Hero, Specialties, Experience, Certificates, Events,
                        Contact, FilterBar, SectionHeading
  hooks/                useTheme, useScrollReveal, useScrollSpy, useFilter
  data/                 profile, experience, certificates, events, specialties
  types.ts              shared resume types
lib/theme.ts            theme storage, pre-paint apply, animated crossfade
```

## Content ownership

All resume copy lives in `features/resume/data/`. Components read from
`data/index.ts` and never hold hard-coded profile content, so personalising the
resume means editing five files and nothing else.

## Theming

Colour is expressed only through tokens. `:root` defines the dark terminal
palette; `:root[data-theme='light']` overrides the colour subset and
`color-scheme`. `lib/theme.ts` owns the `data-theme` attribute, persistence, and
the crossfade. `nginx.conf` is unchanged, so no inline bootstrap script is used.

## Structure rules

- `components/common` imports nothing from `pages` or `features`
- `features/resume` imports layout and common components, never the reverse
- Tokens live in `src/styles/`; component CSS may only reference them