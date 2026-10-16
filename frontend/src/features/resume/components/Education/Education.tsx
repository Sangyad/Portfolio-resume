import { SectionHeading } from '../SectionHeading/SectionHeading'
import type { Education } from '../../types'
import styles from './Education.module.css'

type EducationSectionProps = {
  items: Education[]
}

export function EducationSection({ items }: EducationSectionProps) {
  return (
    <section id="education" aria-labelledby="education-heading" className={styles.section}>
      <div className="shell">
        <SectionHeading eyebrow="06 / education" title="Education" headingId="education-heading" />

        {items.length === 0 ? (
          <p className={styles.empty}>// no education listed</p>
        ) : (
          <ul className={styles.list}>
            {items.map((entry) => (
              <li key={entry.id} className={styles.item}>
                <p className={styles.period}>{entry.period}</p>

                <div className={styles.body}>
                  <h3 className={styles.degree}>{entry.degree}</h3>
                  <p className={styles.school}>{entry.school}</p>
                  <p className={styles.campus}>{entry.campus}</p>
                  <p className={styles.summary}>{entry.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
