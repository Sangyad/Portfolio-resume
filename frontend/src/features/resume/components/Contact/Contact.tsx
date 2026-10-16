import { SectionHeading } from '../SectionHeading/SectionHeading'
import { profile } from '../../data'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className={styles.section}>
      <div className="shell">
        <SectionHeading
          eyebrow="09 / contact"
          title="Let's work together."
          headingId="contact-heading"
        />

        <div className={styles.body}>
          <p className={styles.lead}>
            {profile.availability}. If the work above sounds like your team, I would like to hear
            from you.
          </p>

          <ul className={styles.links}>
            {profile.links.map((link) => (
              <li key={link.href}>
                <a className={styles.row} href={link.href} rel="noreferrer noopener">
                  <span className={styles.rowLabel}>{link.label}</span>
                  <span className={styles.rowValue}>
                    {link.href.replace(/^mailto:/, '').replace(/^https?:\/\//, '')}
                  </span>
                  <span className={styles.chevron} aria-hidden="true">
                    ›
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
