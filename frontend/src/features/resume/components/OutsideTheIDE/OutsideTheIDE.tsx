import { SectionHeading } from '../SectionHeading/SectionHeading'
import type { Profile } from '../../types'
import styles from './OutsideTheIDE.module.css'

type OutsideTheIDEProps = {
  profile: Profile
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * The human counterweight to the technical sections. Falls back to a monogram
 * when no photo is supplied, so there is never a broken image.
 */
export function OutsideTheIDE({ profile }: OutsideTheIDEProps) {
  return (
    <section id="personal" aria-labelledby="personal-heading" className={styles.section}>
      <div className="shell">
        <SectionHeading
          eyebrow="07 / outside the ide"
          title="Outside the IDE"
          headingId="personal-heading"
        />

        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.note}>{profile.personalNote}</p>

            {profile.interests.length > 0 ? (
              <ul className={styles.interests} aria-label="Interests">
                {profile.interests.map((interest) => (
                  <li key={interest} className={styles.interest}>
                    {interest}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <figure className={styles.media}>
            {profile.personalPhoto ? (
              <img
                className={styles.image}
                src={profile.personalPhoto}
                alt={`${profile.name} away from the screen`}
                loading="lazy"
                decoding="async"
                width={640}
                height={480}
              />
            ) : (
              <div className={styles.monogram} role="img" aria-label="Personal photo placeholder">
                {initials(profile.name)}
              </div>
            )}
          </figure>
        </div>
      </div>
    </section>
  )
}
