import { useCallback, useState } from 'react'
import { applyTheme, preferredTheme, storeTheme, transitionTheme, type Theme } from '@/lib/theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(preferredTheme)

  const changeTheme = useCallback((next: Theme) => {
    storeTheme(next)
    transitionTheme(next)
    setTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      storeTheme(next)
      transitionTheme(next)
      return next
    })
  }, [])

  return { theme, setTheme: changeTheme, toggleTheme, applyTheme }
}
