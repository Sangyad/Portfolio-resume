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
  expect(screen.getByText('Senior Full-Stack Engineer')).toBeInTheDocument()
})

test('exposes every resume section as a landmark', () => {
  render(<App />)

  for (const id of ['about', 'specialties', 'experience', 'certificates', 'events', 'contact']) {
    expect(document.getElementById(id)).toBeInTheDocument()
  }
})

test('toggles the theme and persists the choice', async () => {
  const user = userEvent.setup()
  render(<App />)

  const toggle = screen.getByRole('button', { name: /switch to light mode/i })
  await user.click(toggle)

  expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  expect(window.localStorage.getItem('rochdegote:theme')).toBe('light')
  expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
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

  const avatar = screen.getByRole('img', { name: /Senior Full-Stack Engineer$/ })
  fireEvent.error(avatar)

  expect(screen.getByRole('img', { name: 'Profile placeholder' })).toBeInTheDocument()
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
})

test('closes the command palette on Escape', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.keyboard('{Control>}k{/Control}')
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument()

  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog', { name: 'Command palette' })).toBeNull()
})
