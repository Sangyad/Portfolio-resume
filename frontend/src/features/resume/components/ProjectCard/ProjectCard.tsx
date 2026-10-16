import type { Project } from '../../types'
import styles from './ProjectCard.module.css'

/**
 * Human-readable status text. Each pending state gets distinct wording so the
 * badge is never ambiguous even with colour stripped.
 */
const statusLabels: Record<Project['status'], string> = {
  live: 'live',
  'in-progress': 'in progress',
  'coming-soon': 'coming soon',
}

type ProjectCardProps = {
  project: Project
  /** Heading level for the card title, so callers keep a sane document outline. */
  headingLevel?: 3 | 4
}

export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const shipped = project.status === 'live'
  const Heading = headingLevel === 3 ? 'h3' : 'h4'
  const badgeClass = [styles.badge, shipped ? styles.badgeLive : styles.badgePending].join(' ')

  return (
    <article
      className={styles.card}
      aria-labelledby={`project-${project.id}-title`}
      data-status={project.status}
    >
      <figure className={[styles.media, !shipped && styles.mediaPending].filter(Boolean).join(' ')}>
        <img
          className={styles.image}
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width={640}
          height={400}
        />
        <span className={badgeClass}>{statusLabels[project.status]}</span>
      </figure>

      <div className={styles.body}>
        <div className={styles.topline}>
          <Heading id={`project-${project.id}-title`} className={styles.title}>
            {project.title}
          </Heading>
        </div>

        <p className={styles.summary}>{project.summary}</p>

        {project.stack.length > 0 ? (
          <ul className={styles.stack} aria-label="Stack">
            {project.stack.map((item) => (
              <li key={item} className={styles.stackItem}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <footer className={styles.footer}>
          {project.href ? (
            <a className={styles.link} href={project.href} rel="noreferrer noopener">
              visit ↗
            </a>
          ) : (
            <span className={styles.statusText}>{statusLabels[project.status]}</span>
          )}
        </footer>
      </div>
    </article>
  )
}
