import { expect, test } from '@playwright/test'

test('loads the resume with the profile identity', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Renier John A. Rocha' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Certificates', exact: true })).toBeVisible()
})

test('renders every section in the agreed order', async ({ page }) => {
  await page.goto('/')

  for (const id of [
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
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1)
  }
})

test('spotlights a shipped project and badges the pending ones', async ({ page }) => {
  await page.goto('/')

  const featured = page.locator('#featured')
  await expect(featured.getByText('shipped')).toBeVisible()

  const projects = page.locator('#projects')
  await expect(projects.getByText('in progress').first()).toBeVisible()
  await expect(projects.getByText('coming soon').first()).toBeVisible()
})

test('toggles the theme and keeps the choice across a reload', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /switch to dark mode/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('filters certificates by tag', async ({ page }) => {
  await page.goto('/')

  const section = page.locator('#certificates')
  await section.getByRole('button', { name: 'leadership', exact: true }).click()

  await expect(section.getByText('Project Management Professional (PMP)')).toBeVisible()
  await expect(section.getByText('Cybersecurity Defense Analyst Pathway Exam')).toHaveCount(0)
})

test('shows earned certificates and badges the in-progress ones', async ({ page }) => {
  await page.goto('/')

  const section = page.locator('#certificates')
  await expect(
    section.getByRole('heading', { name: 'Cybersecurity Defense Analyst Pathway Exam' })
  ).toBeVisible()
  await expect(section.getByRole('heading', { name: /Certificate of Participation/ })).toBeVisible()
  await expect(section.getByText('in progress').first()).toBeVisible()
  await expect(section.locator('img').first()).toBeVisible()
})

test('opens and dismisses the command palette', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Control+k')
  await expect(page.getByRole('dialog', { name: 'Command palette' })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Command palette' })).toHaveCount(0)
})

test('navigates from the sticky nav to projects', async ({ page }) => {
  await page.goto('/')

  const nav = page.getByRole('navigation', { name: 'Resume sections' })
  await nav.getByRole('link', { name: 'projects', exact: true }).click()

  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('#projects')).toBeInViewport()
})
