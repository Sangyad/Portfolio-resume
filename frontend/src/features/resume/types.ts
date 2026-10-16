export type Theme = 'dark' | 'light'

export type Specialty = {
  id: string
  name: string
  level: number
  category: string
  note: string
}

export type Role = {
  id: string
  company: string
  title: string
  location: string
  startDate: string
  endDate: string | null
  summary: string
  highlights: string[]
  stack: string[]
  tags: string[]
}

export type CertificateStatus = 'earned' | 'in-progress'

export type Certificate = {
  id: string
  title: string
  issuer: string
  issuedOn: string
  credentialId: string
  credentialUrl: string | null
  summary: string
  skills: string[]
  tags: string[]
  /** `in-progress` credentials are badged so they never read as earned. */
  status: CertificateStatus
  /** Path under /public. Replace with your own files. */
  image: string
  imageAlt: string
}

/**
 * `live` is shipped work. `in-progress` and `coming-soon` are deliberately
 * distinct — one is being built, the other is only intended — and both render a
 * visible text badge so status never depends on colour alone.
 */
export type ProjectStatus = 'live' | 'in-progress' | 'coming-soon'

export type Project = {
  id: string
  title: string
  summary: string
  status: ProjectStatus
  /** Short stack labels rendered as chips, e.g. React · Postgres · Docker. */
  stack: string[]
  tags: string[]
  /** Path under /public. Replace with your own files. */
  image: string
  imageAlt: string
  href: string | null
}

export type Education = {
  id: string
  degree: string
  school: string
  campus: string
  period: string
  summary: string
  tags: string[]
}

export type Event = {
  id: string
  name: string
  kind: string
  location: string
  date: string
  summary: string
  outcome: string
  tags: string[]
}

export type Profile = {
  name: string
  handle: string
  title: string
  /** Rendered after the title, de-emphasised. */
  titleSuffix: string
  tagline: string
  location: string
  availability: string
  /** Inline chips woven into the hero copy, e.g. React · Postgres · Docker. */
  stack: string[]
  links: { label: string; href: string }[]
  interests: string[]
  /** Copy for the "outside the IDE" block. */
  personalNote: string
  /** Optional photo under /public. Falls back to monogram initials. */
  personalPhoto: string | null
}

export type SectionId =
  | 'about'
  | 'featured'
  | 'specialties'
  | 'experience'
  | 'projects'
  | 'certificates'
  | 'education'
  | 'personal'
  | 'events'
  | 'contact'
