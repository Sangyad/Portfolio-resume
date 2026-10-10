import { describe, expect, it } from 'vitest'
import {
  DEFAULT_THEME,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  THEME_TRANSITION_CLASS,
  applyTheme,
  isTheme,
  preferredTheme,
  readStoredTheme,
  storeTheme,
  transitionTheme,
} from './theme'

describe('theme storage', () => {
  it('persists a valid theme and reads it back', () => {
    storeTheme('light')
    expect(readStoredTheme()).toBe('light')
    expect(preferredTheme()).toBe('light')
  })

  it('ignores an invalid stored value and falls back to the default', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'neon')
    expect(readStoredTheme()).toBeNull()
    expect(preferredTheme()).toBe(DEFAULT_THEME)
  })

  it('recognises only the two supported themes', () => {
    expect(isTheme('dark')).toBe(true)
    expect(isTheme('light')).toBe(true)
    expect(isTheme('sepia')).toBe(false)
  })
})

describe('transitionTheme', () => {
  it('applies the theme attribute on first paint without animating', () => {
    applyTheme('light')
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('light')
    expect(document.documentElement.classList.contains(THEME_TRANSITION_CLASS)).toBe(false)
  })

  it('adds the crossfade class and releases it after the frame', async () => {
    transitionTheme('dark')
    expect(document.documentElement.classList.contains(THEME_TRANSITION_CLASS)).toBe(true)
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark')

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

    expect(document.documentElement.classList.contains(THEME_TRANSITION_CLASS)).toBe(false)
  })
})
