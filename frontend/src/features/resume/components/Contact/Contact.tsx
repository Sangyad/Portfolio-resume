import { SectionHeading } from '../SectionHeading/SectionHeading'
import { profile } from '../../data'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className={styles.section}>
      <SectionHeading index="05" title="contact" headingId="contact-heading" />

      <div className={styles.body}>
        <p className={styles.lead}>
          <span aria-hidden="true">&gt;</span> {profile.availability}.
          <br />
          If the work above sounds like your team, I would like to hear from you.
        </p>

        <ul className={styles.links}>
          {profile.links.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href} rel="noreferrer noopener">
                <span className={styles.linkLabel}>{link.label}</span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
