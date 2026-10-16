import type { HTMLAttributes } from 'react'
import { Container } from '../Container/Container'
import { profile } from '@/features/resume/data'
import styles from './Footer.module.css'

type FooterProps = HTMLAttributes<HTMLElement> & { name: string }

export function Footer({ name, className, ...props }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')} {...props}>
      <Container>
        <p className={styles.tagline}>Repetition until it becomes technique.</p>

        <div className={styles.meta}>
          <p className={styles.line}>
            <span className={styles.name}>{name}</span>
            <span aria-hidden="true"> · </span>
            <span>{profile.availability}</span>
            <span aria-hidden="true"> · </span>
            <span>{profile.location}</span>
          </p>
          <p className={styles.line}>
            <span aria-hidden="true">©</span> {year} — no cookies, no trackers, no nonsense.
          </p>
        </div>
      </Container>
    </footer>
  )
}
