export const THEME_STORAGE_KEY = 'rochdegote:theme'
export const THEME_ATTRIBUTE = 'data-theme'
export const THEME_TRANSITION_CLASS = 'theme-transition'

export type Theme = 'dark' | 'light'

export const DEFAULT_THEME: Theme = 'dark'

export function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light'
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : null
  } catch {
    return null
  }
}

export function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* storage unavailable — the theme still applies for this session */
  }
}

export function preferredTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  return readStoredTheme() ?? DEFAULT_THEME
}

/**
 * Applies the theme attribute without animation. Called before first paint so
 * a returning light-theme visitor does not see a dark flash.
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
  document.documentElement.style.colorScheme = theme
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Crossfades between themes by temporarily opting every element into a color
 * transition, swapping the attribute, then releasing the class once the new
 * colors are committed. Skips the animation entirely when the visitor has asked
 * for reduced motion.
 */
export function transitionTheme(theme: Theme): void {
  const root = document.documentElement

  if (prefersReducedMotion()) {
    applyTheme(theme)
    return
  }

  root.classList.add(THEME_TRANSITION_CLASS)
  applyTheme(theme)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove(THEME_TRANSITION_CLASS)
    })
  })
}
