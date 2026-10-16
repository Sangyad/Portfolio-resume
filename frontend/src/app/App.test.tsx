import { beforeEach, expect, test } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

test('renders the profile identity', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Renier John A. Rocha' })
  ).toBeInTheDocument()
  const hero = document.getElementById('about') as HTMLElement
  expect(within(hero).getByText('Full-Stack Engineer')).toBeInTheDocument()
  expect(within(hero).getByText(/TypeScript · Postgres · Cloud/)).toBeInTheDocument()
})

test('exposes every resume section as a landmark', () => {
  render(<App />)

  const ids = [
    'about',
    'featured',
    'specialties',
    'experience',
    'projects',
    'certificates',
    'education',
    'personal',
    'events',
    'contact',
  ]

  for (const id of ids) {
    expect(document.getElementById(id)).toBeInTheDocument()
  }
})

test('defaults to the light theme and persists a switch to dark', async () => {
  const user = userEvent.setup()
  render(<App />)

  const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
  await user.click(toggle)

  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  expect(window.localStorage.getItem('rochdegote:theme')).toBe('dark')
  expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
})

test('renders proficiency meters with accessible values', () => {
  render(<App />)

  const meter = screen.getByRole('meter', { name: 'TypeScript proficiency' })
  expect(meter).toHaveAttribute('aria-valuenow', '95')
})

test('expands a role detail panel on demand', async () => {
  const user = userEvent.setup()
  render(<App />)

  // The most recent role starts expanded; the next one is collapsed.
  const expanded = screen.getByRole('button', { name: 'collapse' })
  expect(expanded).toHaveAttribute('aria-expanded', 'true')
  expect(document.getElementById(expanded.getAttribute('aria-controls')!)).toBeVisible()

  const collapsed = screen.getAllByRole('button', { name: 'details' })[0]
  const panelId = collapsed.getAttribute('aria-controls')!
  expect(document.getElementById(panelId)).not.toBeVisible()

  await user.click(collapsed)

  expect(collapsed).toHaveAttribute('aria-expanded', 'true')
  expect(document.getElementById(panelId)).toBeVisible()
  expect(
    within(document.getElementById(panelId)!).getByText(/Regulated healthcare provider|pass/)
  ).toBeInTheDocument()
})

test('badges in-progress credentials so they never read as earned', () => {
  render(<App />)

  const carousel = screen.getByRole('group', { name: /certificates carousel/i })
  const badges = within(carousel).getAllByText('in progress')

  // The six cloud credentials are pending; the two real ones are not badged.
  expect(badges).toHaveLength(6)
  expect(within(carousel).getByText('Cybersecurity Defense Analyst Pathway Exam')).toBeVisible()
  expect(within(carousel).getByText(/Certificate of Participation/)).toBeVisible()
})

test('falls back to monogram initials when no profile photo exists', () => {
  render(<App />)

  const avatar = screen.getByRole('img', { name: /Full-Stack Engineer$/ })
  fireEvent.error(avatar)

  expect(screen.getByRole('img', { name: 'Renier John A. Rocha monogram' })).toBeInTheDocument()
})

test('spotlights the first shipped project in the featured build', () => {
  render(<App />)

  const featured = document.getElementById('featured') as HTMLElement
  expect(
    within(featured).getByRole('heading', { name: /^Ledger: a double-entry core/ })
  ).toBeInTheDocument()
  expect(within(featured).getByText('shipped')).toBeInTheDocument()
})

test('gives every project a visible text status, never colour alone', () => {
  render(<App />)

  const projects = document.getElementById('projects') as HTMLElement

  // One shipped project, two in progress, one coming soon. Each status appears
  // twice: as a badge on the media and as the footer label.
  expect(within(projects).getAllByText('live')).toHaveLength(2)
  expect(within(projects).getAllByText('in progress')).toHaveLength(4)
  expect(within(projects).getAllByText('coming soon')).toHaveLength(2)

  expect(within(projects).getByRole('heading', { name: 'Project untitled' })).toBeVisible()
})

test('renders education with its period and institution', () => {
  render(<App />)

  const education = document.getElementById('education') as HTMLElement
  expect(
    within(education).getByRole('heading', {
      name: /Bachelor of Science in Information Technology/,
    })
  ).toBeVisible()
  expect(within(education).getByText('2022 — 2027')).toBeVisible()
  expect(within(education).getByText('Assumption College of Toledo')).toBeVisible()
})

test('falls back to a monogram in the personal block when no photo exists', () => {
  render(<App />)

  const personal = document.getElementById('personal') as HTMLElement
  expect(within(personal).getByRole('img', { name: 'Personal photo placeholder' })).toBeVisible()
  expect(within(personal).getByText('Photography')).toBeVisible()
})

test('filters certificates by text query and shows an empty state', async () => {
  const user = userEvent.setup()
  render(<App />)

  const search = screen.getByLabelText('Search certificates')
  await user.type(search, 'kubernetes')

  const carousel = screen.getByRole('group', { name: /certificates carousel/i })
  expect(within(carousel).getByText(/Certified Kubernetes Administrator/)).toBeInTheDocument()
  expect(within(carousel).queryByText(/Project Management Professional/)).toBeNull()

  await user.clear(search)
  await user.type(search, 'zzzz-no-match')
  expect(screen.getByText('// no certificates match this filter')).toBeInTheDocument()
})

test('filters certificates by tag chip', async () => {
  const user = userEvent.setup()
  const { unmount } = render(<App />)

  const certificateSection = document.getElementById('certificates') as HTMLElement
  await user.click(within(certificateSection).getByRole('button', { name: 'leadership' }))

  const carousel = within(certificateSection).getByRole('group', {
    name: /certificates carousel/i,
  })
  expect(within(carousel).getByText(/Project Management Professional/)).toBeInTheDocument()
  expect(within(carousel).queryByText(/Cybersecurity Defense Analyst/)).toBeNull()

  unmount()
})

test('opens the command palette with the keyboard and navigates', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.keyboard('{Control>}k{/Control}')

  const dialog = screen.getByRole('dialog', { name: 'Command palette' })
  expect(dialog).toBeInTheDocument()
  expect(within(dialog).getByRole('option', { name: /go to certificates/ })).toBeInTheDocument()
  expect(within(dialog).getByRole('option', { name: /go to projects/ })).toBeInTheDocument()
})

test('promotes only the primary sections into the sticky nav', () => {
  render(<App />)

  const nav = screen.getByRole('navigation', { name: 'Resume sections' })

  for (const label of ['projects', 'experience', 'events']) {
    expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
  }

  // Ten sections would wrap on narrow screens, so the rest stay out of the nav.
  expect(within(nav).queryByRole('link', { name: 'education' })).toBeNull()
})

test('closes the command palette on Escape', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.keyboard('{Control>}k{/Control}')
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument()

  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog', { name: 'Command palette' })).toBeNull()
})
