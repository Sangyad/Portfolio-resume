import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  /**
   * Optional uppercase eyebrow, e.g. "04 / experience". Rendered only when
   * supplied so a section can opt out of numbering entirely.
   */
  eyebrow?: string
  title: string
  headingId: string
  /** Optional supporting line rendered under the title. */
  lede?: string
}

export function SectionHeading({ eyebrow, title, headingId, lede }: SectionHeadingProps) {
  return (
    <header className={styles.heading}>
      {eyebrow ? (
        <p className={styles.eyebrow}>
          <span className={styles.rule} aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </header>
  )
}
