import type { Specialty } from '../types'

export const specialties: Specialty[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 95,
    category: 'language',
    note: 'Strict mode everywhere, discriminated unions over optional soup.',
  },
  {
    id: 'react',
    name: 'React',
    level: 93,
    category: 'frontend',
    note: 'Composition, hooks, and rendering cost as a first-class concern.',
  },
  {
    id: 'node',
    name: 'Node.js',
    level: 88,
    category: 'backend',
    note: 'Streaming APIs, job workers, and boring reliable services.',
  },
  {
    id: 'css',
    name: 'CSS Architecture',
    level: 86,
    category: 'frontend',
    note: 'Token-driven design systems, container queries, no !important.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    level: 82,
    category: 'data',
    note: 'Query plans, partial indexes, and migrations that do not lock tables.',
  },
  {
    id: 'testing',
    name: 'Testing',
    level: 84,
    category: 'quality',
    note: 'RTL by accessible behavior, Playwright for the critical paths.',
  },
  {
    id: 'docker',
    name: 'Docker & CI',
    level: 80,
    category: 'devops',
    note: 'Reproducible builds, multi-stage images, green pipelines as a gate.',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    level: 74,
    category: 'backend',
    note: 'Schema design, N+1 elimination, persisted queries.',
  },
  {
    id: 'aws',
    name: 'AWS',
    level: 76,
    category: 'devops',
    note: 'ECS, RDS, S3, and cost reviews that actually reduce spend.',
  },
  {
    id: 'a11y',
    name: 'Accessibility',
    level: 79,
    category: 'frontend',
    note: 'WCAG 2.2 AA: keyboard paths, focus order, reduced motion.',
  },
]
