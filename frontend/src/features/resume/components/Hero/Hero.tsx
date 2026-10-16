import { useState } from 'react'
import { Container } from '@/components/layout/Container/Container'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { profile } from '../../data'
import styles from './Hero.module.css'

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Hero() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>()
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="about" className={styles.hero} aria-labelledby="hero-name">
      <Container>
        <div ref={ref} className={[styles.content, revealed && styles.revealed].join(' ')}>
          <div className={styles.avatarFrame} data-has-image={!imageFailed}>
            {imageFailed ? (
              <span
                className={styles.avatarFallback}
                role="img"
                aria-label={`${profile.name} monogram`}
              >
                <span aria-hidden="true">{initials(profile.name) || '~'}</span>
              </span>
            ) : (
              <img
                className={styles.avatar}
                src="/profile.jpg"
                alt={`${profile.name}, ${profile.title}`}
                width={320}
                height={320}
                loading="eager"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>

          <div className={styles.body}>
            <h1 id="hero-name" className={styles.name}>
              {profile.name}
            </h1>

            <p className={styles.title}>
              {profile.title}
              <span className={styles.titleSuffix}> — {profile.titleSuffix}</span>
            </p>

            <p className={styles.tagline}>{profile.tagline}</p>

            {profile.stack.length > 0 ? (
              <ul className={styles.stack} aria-label="Primary stack">
                {profile.stack.map((item) => (
                  <li key={item} className={styles.stackItem}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt>location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>status</dt>
                <dd className={styles.availability}>
                  <span className={styles.dot} aria-hidden="true" />
                  {profile.availability}
                </dd>
              </div>
            </dl>

            <ul className={styles.links}>
              {profile.links.map((link) => (
                <li key={link.href}>
                  <a className={styles.link} href={link.href} rel="noreferrer noopener">
                    {link.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
