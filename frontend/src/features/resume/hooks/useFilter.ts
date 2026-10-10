import { useCallback, useState } from 'react'

export function useFilter() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const reset = useCallback(() => {
    setQuery('')
    setTag(null)
  }, [])

  return { query, tag, setQuery, setTag, reset }
}
