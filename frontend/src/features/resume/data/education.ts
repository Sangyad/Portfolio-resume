import type { Education } from '../types'

/**
 * SEEDED FROM CERTIFICATE EVIDENCE, NOT CONFIRMED BY THE OWNER.
 * The Assumption College of Toledo BSIT program is corroborated by the
 * participation certificate; campus and years are unverified guesses.
 * Replace with your real details.
 */
export const education: Education[] = [
  {
    id: 'bsit',
    degree: 'Bachelor of Science in Information Technology',
    school: 'Assumption College of Toledo',
    campus: 'BSIT Program',
    period: '2022 — 2027',
    summary:
      'Coursework across systems design, databases, networking, and web application development, alongside the certifications listed above.',
    tags: ['degree', 'networking', 'web'],
  },
]
