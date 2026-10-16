import { SectionHeading } from '../SectionHeading/SectionHeading'
import { ProjectCard } from '../ProjectCard/ProjectCard'
import type { Project } from '../../types'
import styles from './Projects.module.css'

type ProjectsProps = {
  items: Project[]
}

export function Projects({ items }: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className={styles.section}>
      <div className="shell">
        <SectionHeading eyebrow="04 / projects" title="Projects" headingId="projects-heading" />

        {items.length === 0 ? (
          <p className={styles.empty}>// no projects yet</p>
        ) : (
          <ul className={styles.grid}>
            {items.map((project) => (
              <li key={project.id} className={styles.item}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
