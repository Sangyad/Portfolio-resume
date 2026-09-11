# Architecture Overview

## Runtime shape

- Frontend: React + Vite
- Backend/data: None / frontend only
- Platform: web
- Architecture profile: small
- Styling mode: css-modules
- Authentication: public

## Generated source map

This map is derived from the runnable source, routes, migrations, and tests generated for this
specific stack and architecture profile. Tooling, deployment, and guidance files are omitted.

```text
rochdegote/
└── frontend/src/
    ├── components/
    │   ├── common/Button/
    │   │   ├── Button.module.css
    │   │   ├── Button.test.tsx
    │   │   └── Button.tsx
    │   └── layout/
    │       ├── Container/
    │       │   ├── Container.module.css
    │       │   └── Container.tsx
    │       └── Section/
    │           ├── Section.module.css
    │           └── Section.tsx
    ├── styles/
    │   ├── base.css
    │   ├── reset.css
    │   └── tokens.css
    ├── test/
    │   └── setup.ts
    ├── App.module.css
    ├── App.test.tsx
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    └── vite-env.d.ts
```

This is the exact generated source tree, not the complete reference architecture. The application
is intentionally a small vertical slice; absent reference folders are not missing requirements.
Add domain features only after recording product goals and boundaries in `CONTEXT.md`. Keep entry
points thin, validate at trust boundaries, and enforce authorization beside protected data or side
effects.

## Detailed structure rules

- `playbooks/stack/react-vite/structure.md`

The structure playbooks show available destinations and profile growth rules. Create a folder only
when its responsibility exists. Before an agent removes or reorganizes user-created architecture,
it must explain the change, future placement, and recovery path and then ask for approval.

## Verification boundary

The starter is considered healthy when its lint/typecheck/tests/build commands pass.
Documentation explains those executable patterns; it does not override working code and tests.
