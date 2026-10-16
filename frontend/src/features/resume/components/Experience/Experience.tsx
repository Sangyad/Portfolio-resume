import { useState } from 'react'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { experience, formatRange } from '../../data'
import styles from './Experience.module.css'

export function Experience() {
  const { ref, revealed } = useScrollReveal<HTMLOListElement>()
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <section id="experience" aria-labelledby="experience-heading" className={styles.section}>
      <SectionHeading eyebrow="03 / experience" title="Experience" headingId="experience-heading" />

      <ol ref={ref} className={styles.timeline}>
        {experience.map((role, position) => {
          const expanded = expandedId === role.id
          const panelId = `role-panel-${role.id}`
          const buttonId = `role-button-${role.id}`

          return (
            <li
              key={role.id}
              className={[styles.entry, revealed && styles.revealed].join(' ')}
              style={{ '--stagger': `${position * 70}ms` } as React.CSSProperties}
            >
              <div className={styles.marker} aria-hidden="true" />

              <article className={styles.card}>
                <header className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.roleTitle}>{role.title}</h3>
                    <p className={styles.company}>
                      {role.company}
                      <span className={styles.location}> · {role.location}</span>
                    </p>
                  </div>
                  <p className={styles.dates}>{formatRange(role.startDate, role.endDate)}</p>
                </header>

                <p className={styles.summary}>{role.summary}</p>

                <button
                  type="button"
                  id={buttonId}
                  className={styles.toggle}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setExpandedId(expanded ? null : role.id)}
                >
                  {expanded ? 'collapse' : 'details'}
                  <span className={styles.chevron} aria-hidden="true" data-open={expanded} />
                </button>

                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
                  <ul className={styles.highlights}>
                    {role.highlights.map((highlight) => (
                      <li key={highlight} className={styles.highlight}>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <ul className={styles.tags}>
                    {role.stack.map((item) => (
                      <li key={item} className={styles.tag}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
