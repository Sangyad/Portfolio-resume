import { useEffect, useState } from 'react'

export function useScrollReveal<T extends HTMLElement>(options?: { threshold?: number }) {
  const [ref, setRef] = useState<T | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = ref
    if (!node) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, options?.threshold])

  return { ref: setRef, revealed }
}
