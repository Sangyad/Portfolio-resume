import { SectionHeading } from '../SectionHeading/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { specialties } from '../../data'
import styles from './Specialties.module.css'

export function Specialties() {
  const { ref, revealed } = useScrollReveal<HTMLUListElement>()

  return (
    <section id="specialties" aria-labelledby="specialties-heading" className={styles.section}>
      <SectionHeading
        eyebrow="02 / specialties"
        title="Specialties"
        headingId="specialties-heading"
      />

      <ul ref={ref} className={styles.grid}>
        {specialties.map((specialty, position) => (
          <li
            key={specialty.id}
            className={[styles.item, revealed && styles.revealed].join(' ')}
            style={{ '--stagger': `${position * 45}ms` } as React.CSSProperties}
          >
            <div className={styles.itemHeader}>
              <h3 className={styles.name}>{specialty.name}</h3>
              <span className={styles.level}>{specialty.level}%</span>
            </div>

            <div
              className={styles.track}
              role="meter"
              aria-label={`${specialty.name} proficiency`}
              aria-valuenow={specialty.level}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span
                className={styles.fill}
                style={{ '--level': `${specialty.level}%` } as React.CSSProperties}
              />
            </div>

            <p className={styles.note}>{specialty.note}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
