import type { HTMLAttributes } from 'react'
import { Container } from '../Container/Container'
import styles from './Footer.module.css'

type FooterProps = HTMLAttributes<HTMLElement> & { name: string }

export function Footer({ name, className, ...props }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')} {...props}>
      <Container>
        <p className={styles.line}>
          <span aria-hidden="true">$</span> echo "built with care by {name}"
        </p>
        <p className={styles.line}>
          <span aria-hidden="true">©</span> {year} — no cookies, no trackers, no nonsense.
        </p>
      </Container>
    </footer>
  )
}
