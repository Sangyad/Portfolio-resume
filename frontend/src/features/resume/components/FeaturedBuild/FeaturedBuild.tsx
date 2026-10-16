import { SectionHeading } from '../SectionHeading/SectionHeading'
import type { Project } from '../../types'
import styles from './FeaturedBuild.module.css'

type FeaturedBuildProps = {
  project: Project | undefined
}

const statusLabels: Record<Project['status'], string> = {
  live: 'shipped',
  'in-progress': 'in progress',
  'coming-soon': 'coming soon',
}

/**
 * Spotlight card for the flagship project. Renders nothing when the project
 * list is empty so an empty data file degrades quietly instead of showing a
 * broken section.
 */
export function FeaturedBuild({ project }: FeaturedBuildProps) {
  if (!project) return null

  return (
    <section id="featured" aria-labelledby="featured-heading" className={styles.section}>
      <div className="shell">
        <SectionHeading
          eyebrow="01 / featured build"
          title="Featured build"
          headingId="featured-heading"
        />

        <div className={styles.card}>
          <figure className={styles.media}>
            <img
              className={styles.image}
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
              width={1024}
              height={640}
            />
          </figure>

          <div className={styles.body}>
            <p className={styles.eyebrow}>
              <span className={styles.status}>{statusLabels[project.status]}</span>
            </p>
            <h3 className={styles.title}>{project.title}</h3>
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
          </div>
        </div>
      </div>
    </section>
  )
}
