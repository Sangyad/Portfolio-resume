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
  tagline: string
  location: string
  availability: string
  links: { label: string; href: string }[]
}

export type SectionId =
  | 'about'
  | 'specialties'
  | 'experience'
  | 'certificates'
  | 'events'
  | 'contact'
