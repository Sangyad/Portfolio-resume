import { useEffect, useState } from 'react'
import type { SectionId } from '../types'

export function useScrollSpy(sectionIds: readonly SectionId[]) {
  const [activeId, setActiveId] = useState<SectionId | null>(sectionIds[0] ?? null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id as SectionId)
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [sectionIds])

  return { activeId, setActiveId }
}
