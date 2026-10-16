import type { Certificate, Event, Project, SectionId } from '../types'
import { certificates } from './certificates'
import { education } from './education'
import { events } from './events'
import { roles } from './experience'
import { profile } from './profile'
import { projects } from './projects'
import { specialties } from './specialties'

export { profile, roles as experience, specialties, certificates, events, education, projects }

/**
 * The spotlighted project. Prefers the first shipped project so a promotion
 * from "in progress" needs no edit here — it promotes itself.
 */
export const featuredProject: Project =
  projects.find((project) => project.status === 'live') ?? projects[0]

export const sections: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'about' },
  { id: 'featured', label: 'featured' },
  { id: 'specialties', label: 'specialties' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'certificates', label: 'certificates' },
  { id: 'education', label: 'education' },
  { id: 'personal', label: 'outside the ide' },
  { id: 'events', label: 'events' },
  { id: 'contact', label: 'contact' },
]

/**
 * The subset promoted into the sticky header. Ten links would wrap on narrow
 * screens, so the nav carries the primary destinations only; every section
 * stays reachable by scroll and from the command palette.
 */
const navIds: SectionId[] = ['projects', 'experience', 'events']

export const navSections: { id: SectionId; label: string }[] = sections.filter((section) =>
  navIds.includes(section.id)
)

export function uniqueTags(items: { tags: string[] }[]): string[] {
  const seen = new Set(items.flatMap((item) => item.tags))
  return [...seen].sort((a, b) => a.localeCompare(b))
}

export function matchesFilters(
  item: {
    title?: string
    name?: string
    issuer?: string
    location?: string
    summary: string
    tags: string[]
  },
  query: string,
  tag: string | null
): boolean {
  const matchesTag = !tag || item.tags.includes(tag)
  if (!matchesTag) return false

  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return true

  const haystack = [item.title, item.name, item.issuer, item.location, item.summary, ...item.tags]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return trimmed.split(/\s+/).every((word) => haystack.includes(word))
}

export function filterCertificates(query: string, tag: string | null): Certificate[] {
  return certificates.filter((certificate) => matchesFilters(certificate, query, tag))
}

export function filterEvents(query: string, tag: string | null): Event[] {
  return events.filter((event) => matchesFilters(event, query, tag))
}

export function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function formatRange(start: string, end: string | null): string {
  return end ? `${formatDate(start)} — ${formatDate(end)}` : `${formatDate(start)} — present`
}
