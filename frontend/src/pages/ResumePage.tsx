import { useCallback, useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { Container } from '@/components/layout/Container/Container'
import {
  CommandPalette,
  type PaletteCommand,
} from '@/components/common/CommandPalette/CommandPalette'
import { ThemeToggle } from '@/components/common/ThemeToggle/ThemeToggle'
import { Hero } from '@/features/resume/components/Hero/Hero'
import { Specialties } from '@/features/resume/components/Specialties/Specialties'
import { Experience } from '@/features/resume/components/Experience/Experience'
import { Certificates } from '@/features/resume/components/Certificates/Certificates'
import { Events } from '@/features/resume/components/Events/Events'
import { Contact } from '@/features/resume/components/Contact/Contact'
import { useScrollSpy } from '@/features/resume/hooks/useScrollSpy'
import { useFilter } from '@/features/resume/hooks/useFilter'
import { useTheme } from '@/features/resume/hooks/useTheme'
import {
  certificates,
  events,
  filterCertificates,
  filterEvents,
  profile,
  sections,
  uniqueTags,
} from '@/features/resume/data'
import type { SectionId } from '@/features/resume/types'
import styles from './ResumePage.module.css'

const sectionIds = sections.map((section) => section.id)

export function ResumePage() {
  const { theme, toggleTheme } = useTheme()
  const { activeId, setActiveId } = useScrollSpy(sectionIds)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const certificateFilter = useFilter()
  const eventFilter = useFilter()

  const navigateTo = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return

      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id as SectionId)
      window.history.replaceState(null, '', `#${id}`)
    },
    [setActiveId]
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filteredCertificates = useMemo(
    () => filterCertificates(certificateFilter.query, certificateFilter.tag),
    [certificateFilter.query, certificateFilter.tag]
  )

  const filteredEvents = useMemo(
    () => filterEvents(eventFilter.query, eventFilter.tag),
    [eventFilter.query, eventFilter.tag]
  )

  const certificateTags = useMemo(() => uniqueTags(certificates), [])
  const eventTags = useMemo(() => uniqueTags(events), [])

  const commands = useMemo<PaletteCommand[]>(
    () => [
      ...sections.map((section) => ({
        id: `go-${section.id}`,
        label: `go to ${section.label}`,
        hint: 'section',
        run: () => navigateTo(section.id),
      })),
      {
        id: 'theme',
        label: `switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
        hint: 'theme',
        run: toggleTheme,
      },
      {
        id: 'focus-search',
        label: 'search certificates',
        hint: 'focus',
        run: () => {
          navigateTo('certificates')
          window.setTimeout(() => document.getElementById('certificates-search')?.focus(), 320)
        },
      },
    ],
    [navigateTo, theme, toggleTheme]
  )

  return (
    <>
      <Header
        activeId={activeId}
        onNavigate={navigateTo}
        onOpenPalette={() => setPaletteOpen(true)}
        links={sections.map((section) => ({ label: section.label, href: `#${section.id}` }))}
        name={profile.name}
      >
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </Header>

      <main>
        <Hero />
        <Specialties />
        <Experience />
        <Container>
          <Certificates
            items={filteredCertificates}
            allTags={certificateTags}
            totalCount={certificates.length}
            query={certificateFilter.query}
            tag={certificateFilter.tag}
            onQueryChange={certificateFilter.setQuery}
            onTagChange={certificateFilter.setTag}
            onReset={certificateFilter.reset}
          />

          <Events
            items={filteredEvents}
            allTags={eventTags}
            totalCount={events.length}
            query={eventFilter.query}
            tag={eventFilter.tag}
            onQueryChange={eventFilter.setQuery}
            onTagChange={eventFilter.setTag}
            onReset={eventFilter.reset}
          />
        </Container>
        <Contact />
      </main>

      <Footer name={profile.name} className={styles.footer} />

      <CommandPalette
        open={paletteOpen}
        commands={commands}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  )
}
