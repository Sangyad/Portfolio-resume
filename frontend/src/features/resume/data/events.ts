import type { Event } from '../types'

export const events: Event[] = [
  {
    id: 'kubecon-eu',
    name: 'KubeCon + CloudNativeCon Europe',
    kind: 'Conference',
    location: 'Paris, France',
    date: '2025-03-18',
    summary: 'Three days on platform engineering, scheduling maturity, and cluster cost control.',
    outcome:
      'Ran hallway conversations on progressive delivery; adopted graduated rollouts across our deploy pipeline.',
    tags: ['devops', 'cloud', 'platform'],
  },
  {
    id: 'leaddev-london',
    name: 'LeadDev London',
    kind: 'Conference',
    location: 'London, UK',
    date: '2024-05-21',
    summary: 'A conference for engineering managers on technical leadership and team design.',
    outcome: 'Rebuilt our growth conversation framework after the staff-engineering track.',
    tags: ['leadership', 'management'],
  },
  {
    id: 'react-summit',
    name: 'React Summit',
    kind: 'Conference',
    location: 'Amsterdam, Netherlands',
    date: '2023-06-14',
    summary: 'Community conference on React rendering, server components, and performance.',
    outcome:
      'Prototyped streaming rendering for our reporting surface, cutting time-to-first-paint by 45%.',
    tags: ['frontend', 'performance'],
  },
  {
    id: 'a11y-workshop',
    name: 'Accessibility Workshop Intensive',
    kind: 'Workshop',
    location: 'Remote',
    date: '2023-02-09',
    summary: 'Hands-on training on WCAG 2.2, screen reader testing, and accessible component APIs.',
    outcome: 'Our design system shipped with keyboard and reduced-motion guarantees built in.',
    tags: ['accessibility', 'frontend'],
  },
  {
    id: 'secops',
    name: 'SRECon Europe',
    kind: 'Conference',
    location: 'Dublin, Ireland',
    date: '2022-09-06',
    summary: 'Reliability practice: error budgets, SLOs, and humane on-call rotation.',
    outcome: 'Introduced SLOs and a blameless post-incident template still in use today.',
    tags: ['reliability', 'devops'],
  },
]
