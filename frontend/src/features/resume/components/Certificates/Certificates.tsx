import { useCallback, useEffect, useRef, useState } from 'react'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { FilterBar } from '../FilterBar/FilterBar'
import { formatDate } from '../../data'
import type { Certificate } from '../../types'
import styles from './Certificates.module.css'

type CertificatesProps = {
  items: Certificate[]
  allTags: string[]
  totalCount: number
  query: string
  tag: string | null
  onQueryChange: (value: string) => void
  onTagChange: (tag: string | null) => void
  onReset: () => void
}

export function Certificates({
  items,
  allTags,
  totalCount,
  query,
  tag,
  onQueryChange,
  onTagChange,
  onReset,
}: CertificatesProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const syncScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const maxScroll = track.scrollWidth - track.clientWidth
    setCanScrollLeft(track.scrollLeft > 4)
    setCanScrollRight(track.scrollLeft < maxScroll - 4)

    const card = track.firstElementChild as HTMLElement | null
    if (card) {
      const cardWidth = card.offsetWidth
      setActiveIndex(Math.round(track.scrollLeft / Math.max(cardWidth, 1)))
    }
  }, [])

  useEffect(() => {
    syncScrollState()
    const track = trackRef.current
    if (!track) return

    track.addEventListener('scroll', syncScrollState, { passive: true })
    window.addEventListener('resize', syncScrollState)
    return () => {
      track.removeEventListener('scroll', syncScrollState)
      window.removeEventListener('resize', syncScrollState)
    }
  }, [syncScrollState, items.length])

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    const card = track.firstElementChild as HTMLElement | null
    const distance = card ? card.offsetWidth + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return (
    <section id="certificates" aria-labelledby="certificates-heading" className={styles.section}>
      <SectionHeading index="03" title="certificates" headingId="certificates-heading" />

      <FilterBar
        idPrefix="certificates"
        query={query}
        tag={tag}
        tags={allTags}
        onQueryChange={onQueryChange}
        onTagChange={onTagChange}
        onReset={onReset}
        resultCount={items.length}
        totalCount={totalCount}
      />

      {items.length === 0 ? (
        <p className={styles.empty}>// no certificates match this filter</p>
      ) : (
        <div className={styles.carousel}>
          <button
            type="button"
            className={[styles.arrow, styles.arrowLeft].join(' ')}
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll certificates left"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <ul
            ref={trackRef}
            className={styles.track}
            tabIndex={0}
            role="group"
            aria-label="Certificates carousel, scrollable"
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                scrollByCard(1)
              } else if (event.key === 'ArrowLeft') {
                event.preventDefault()
                scrollByCard(-1)
              }
            }}
          >
            {items.map((certificate) => {
              const inProgress = certificate.status === 'in-progress'

              return (
                <li
                  key={certificate.id}
                  className={[styles.card, inProgress && styles.cardPending].join(' ')}
                >
                  <figure className={styles.media}>
                    <img
                      className={styles.image}
                      src={certificate.image}
                      alt={certificate.imageAlt}
                      loading="lazy"
                      decoding="async"
                      width={320}
                      height={200}
                    />
                    {inProgress ? <span className={styles.badge}>in progress</span> : null}
                  </figure>

                  <div className={styles.body}>
                    <p className={styles.issuer}>{certificate.issuer}</p>
                    <h3 className={styles.title}>{certificate.title}</h3>
                    <p className={styles.summary}>{certificate.summary}</p>

                    <ul className={styles.skills}>
                      {certificate.skills.map((skill) => (
                        <li key={skill} className={styles.skill}>
                          {skill}
                        </li>
                      ))}
                    </ul>

                    <footer className={styles.footer}>
                      <span className={styles.date}>
                        {inProgress ? 'target' : 'issued'} {formatDate(certificate.issuedOn)}
                      </span>
                      {inProgress ? (
                        <span className={styles.credentialPending}>not yet earned</span>
                      ) : certificate.credentialUrl ? (
                        <a
                          className={styles.credential}
                          href={certificate.credentialUrl}
                          rel="noreferrer noopener"
                        >
                          verify ↗
                        </a>
                      ) : (
                        <span className={styles.credentialId}>{certificate.credentialId}</span>
                      )}
                    </footer>
                  </div>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            className={[styles.arrow, styles.arrowRight].join(' ')}
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Scroll certificates right"
          >
            <span aria-hidden="true">›</span>
          </button>

          <ul className={styles.dots} aria-hidden="true">
            {items.map((certificate, index) => (
              <li
                key={certificate.id}
                className={[styles.dot, index === activeIndex && styles.dotActive]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
