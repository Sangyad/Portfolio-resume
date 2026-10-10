import type { Certificate, Event, SectionId } from '../types'
import { certificates } from './certificates'
import { events } from './events'
import { roles } from './experience'
import { profile } from './profile'
import { specialties } from './specialties'

export { profile, roles as experience, specialties, certificates, events }

export const sections: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'about' },
  { id: 'specialties', label: 'specialties' },
  { id: 'experience', label: 'experience' },
  { id: 'certificates', label: 'certificates' },
  { id: 'events', label: 'events' },
  { id: 'contact', label: 'contact' },
]

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
