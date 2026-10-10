import { expect, test } from '@playwright/test'

test('loads the resume with the profile identity', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Renier John A. Rocha' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'certificates', exact: true })).toBeVisible()
})

test('toggles the theme and keeps the choice across a reload', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /switch to light mode/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
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
