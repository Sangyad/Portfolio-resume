import type { Project } from '../types'

/**
 * PLACEHOLDER content — shape mirrors a real portfolio grid so the layout can
 * be judged now. Replace each entry with your own work; the status badges
 * update themselves.
 */
export const projects: Project[] = [
  {
    id: 'ledger',
    title: 'Ledger: a double-entry core for small teams',
    summary:
      'Accounting engine that treats every balance as derived, never stored — so the books reconcile by construction.',
    status: 'live',
    stack: ['TypeScript', 'Postgres', 'React', 'Docker'],
    tags: ['backend', 'frontend', 'live'],
    image: '/projects/ledger.svg',
    imageAlt:
      'Ledger project dashboard showing an accounts overview with a balance chart and recent transactions',
    href: null,
  },
  {
    id: 'atlas',
    title: 'Atlas: deployment drift detection',
    summary:
      'Compares running Kubernetes manifests against git and flags drift before it becomes an incident.',
    status: 'in-progress',
    stack: ['Rust', 'Kubernetes', 'ClickHouse'],
    tags: ['devops', 'platform', 'in-progress'],
    image: '/projects/atlas.svg',
    imageAlt:
      'Atlas project interface showing a cluster drift report comparing running manifests against git',
    href: null,
  },
  {
    id: 'signal',
    title: 'Signal: webhook replay and inspection',
    summary:
      'Local-first webhook debugger that records deliveries, lets you replay them, and diffs payloads across attempts.',
    status: 'in-progress',
    stack: ['Node.js', 'SQLite', 'React'],
    tags: ['tooling', 'backend', 'in-progress'],
    image: '/projects/signal.svg',
    imageAlt:
      'Signal project interface showing a list of captured webhook deliveries with payload diff',
    href: null,
  },
  {
    id: 'untitled',
    title: 'Project untitled',
    summary: 'Something new is taking shape behind the scenes. Check back soon.',
    status: 'coming-soon',
    stack: [],
    tags: ['coming-soon'],
    image: '/projects/untitled.svg',
    imageAlt: 'Placeholder panel for an upcoming project',
    href: null,
  },
]
