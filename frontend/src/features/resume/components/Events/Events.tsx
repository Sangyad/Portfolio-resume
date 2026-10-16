import { useState } from 'react'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { FilterBar } from '../FilterBar/FilterBar'
import { formatDate } from '../../data'
import type { Event } from '../../types'
import styles from './Events.module.css'

type EventsProps = {
  items: Event[]
  allTags: string[]
  totalCount: number
  query: string
  tag: string | null
  onQueryChange: (value: string) => void
  onTagChange: (tag: string | null) => void
  onReset: () => void
}

export function Events({
  items,
  allTags,
  totalCount,
  query,
  tag,
  onQueryChange,
  onTagChange,
  onReset,
}: EventsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="events" aria-labelledby="events-heading" className={styles.section}>
      <SectionHeading eyebrow="08 / events" title="Events" headingId="events-heading" />

      <FilterBar
        idPrefix="events"
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
        <p className={styles.empty}>// no events match this filter</p>
      ) : (
        <ul className={styles.grid}>
          {items.map((event) => {
            const expanded = expandedId === event.id
            const panelId = `event-panel-${event.id}`
            const buttonId = `event-button-${event.id}`

            return (
              <li key={event.id} className={styles.item}>
                <article className={styles.card}>
                  <p className={styles.meta}>
                    <span className={styles.kind}>{event.kind}</span>
                    <span className={styles.dotSep} aria-hidden="true">
                      ·
                    </span>
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                  </p>

                  <h3 className={styles.title}>{event.name}</h3>
                  <p className={styles.location}>{event.location}</p>
                  <p className={styles.summary}>{event.summary}</p>

                  <button
                    type="button"
                    id={buttonId}
                    className={styles.toggle}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setExpandedId(expanded ? null : event.id)}
                  >
                    {expanded ? 'less' : 'takeaway'}
                  </button>

                  <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
                    <p className={styles.outcome}>{event.outcome}</p>
                  </div>

                  <ul className={styles.tags}>
                    {event.tags.map((item) => (
                      <li key={item} className={styles.tag}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
