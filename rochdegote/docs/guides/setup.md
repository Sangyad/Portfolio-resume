# Local Setup Guide

## Prerequisites

- Node.js 22.14.0 or newer with npm 11.19.0 or newer (tested on Node.js 24.20.0)
- npm

## Install and start

```bash
cd frontend/
cp .env.example .env.local
npm install
npm run dev
```

## Validate

```bash
cd frontend/
npm run lint
npm run typecheck
npm run test --if-present
npm run build
```

Commit the generated `package-lock.json`; CI uses `npm ci`.
