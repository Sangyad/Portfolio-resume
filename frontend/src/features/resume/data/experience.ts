import type { Role } from '../types'

export const roles: Role[] = [
  {
    id: 'northwind',
    company: 'Northwind Systems',
    title: 'Senior Software Engineer',
    location: 'Remote',
    startDate: '2022-03',
    endDate: null,
    summary:
      'Lead engineer on a multi-tenant analytics platform serving 40k daily active accounts.',
    highlights: [
      'Cut p95 API latency from 840ms to 190ms by rewriting the aggregation layer around precomputed rollups.',
      'Introduced a typed contract-testing gate that cut production incidents by roughly 60% in two quarters.',
      'Mentored four engineers; two were promoted within a year.',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    tags: ['platform', 'leadership', 'performance'],
  },
  {
    id: 'lumen',
    company: 'Lumen Health',
    title: 'Full-Stack Engineer',
    location: 'Lisbon',
    startDate: '2020-01',
    endDate: '2022-02',
    summary:
      'Built patient-facing scheduling and records tooling for a regulated healthcare provider.',
    highlights: [
      'Shipped a WCAG 2.2 AA scheduling flow used by 120k patients, audited with screen readers.',
      'Designed an append-only audit log for record access, which passed compliance review first pass.',
      'Reduced onboarding drop-off 31% by rebuilding the intake wizard end to end.',
    ],
    stack: ['TypeScript', 'React', 'GraphQL', 'PostgreSQL'],
    tags: ['accessibility', 'compliance', 'frontend'],
  },
  {
    id: 'foundry',
    company: 'Foundry Interactive',
    title: 'Frontend Engineer',
    location: 'Berlin',
    startDate: '2018-06',
    endDate: '2019-12',
    summary: 'Front-end work on a real-time collaborative editing product.',
    highlights: [
      'Rebuilt the document editor surface, improving large-document open time by 3.2x.',
      'Established the first design-token pipeline shared by design and engineering.',
    ],
    stack: ['JavaScript', 'React', 'Sass'],
    tags: ['frontend', 'performance', 'design-systems'],
  },
  {
    id: 'aperture',
    company: 'Aperture Labs',
    title: 'Junior Developer',
    location: 'Remote',
    startDate: '2017-09',
    endDate: '2018-05',
    summary:
      'First engineering role: internal tooling and support tooling for a logistics product.',
    highlights: [
      'Automated a manual reporting process, saving the team roughly 8 hours a week.',
      'Wrote the onboarding documentation still used by new hires.',
    ],
    stack: ['JavaScript', 'Python', 'PostgreSQL'],
    tags: ['tooling', 'automation'],
  },
]
