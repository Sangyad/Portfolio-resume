import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  index: string
  title: string
  headingId: string
}

export function SectionHeading({ index, title, headingId }: SectionHeadingProps) {
  return (
    <header className={styles.heading}>
      <p className={styles.index}>
        <span aria-hidden="true">##</span> {index}
      </p>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
    </header>
  )
}
