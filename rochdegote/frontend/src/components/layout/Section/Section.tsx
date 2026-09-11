import type { HTMLAttributes } from 'react'
import styles from './Section.module.css'

type SectionProps = HTMLAttributes<HTMLElement> & { tone?: 'default' | 'muted' }

export function Section({ className, tone = 'default', ...props }: SectionProps) {
  return <section className={[styles.section, tone === 'muted' && styles.muted, className].filter(Boolean).join(' ')} {...props} />
}
