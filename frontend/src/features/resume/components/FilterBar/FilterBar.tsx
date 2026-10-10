import styles from './FilterBar.module.css'

type FilterBarProps = {
  query: string
  tag: string | null
  tags: string[]
  onQueryChange: (value: string) => void
  onTagChange: (tag: string | null) => void
  onReset: () => void
  resultCount: number
  totalCount: number
  idPrefix: string
}

export function FilterBar({
  query,
  tag,
  tags,
  onQueryChange,
  onTagChange,
  onReset,
  resultCount,
  totalCount,
  idPrefix,
}: FilterBarProps) {
  const isFiltered = query.trim().length > 0 || tag !== null

  return (
    <div className={styles.bar}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.prompt} aria-hidden="true">
            /
          </span>
          <input
            className={styles.input}
            type="search"
            id={`${idPrefix}-search`}
            value={query}
            placeholder="search…"
            autoComplete="off"
            aria-label={`Search ${idPrefix}`}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        <p className={styles.count} role="status" aria-live="polite">
          {resultCount}/{totalCount}
        </p>

        {isFiltered ? (
          <button type="button" className={styles.reset} onClick={onReset}>
            clear
          </button>
        ) : null}
      </div>

      <ul className={styles.tags}>
        <li>
          <button
            type="button"
            className={[styles.tag, tag === null && styles.active].filter(Boolean).join(' ')}
            aria-pressed={tag === null}
            onClick={() => onTagChange(null)}
          >
            all
          </button>
        </li>
        {tags.map((item) => (
          <li key={item}>
            <button
              type="button"
              className={[styles.tag, tag === item && styles.active].filter(Boolean).join(' ')}
              aria-pressed={tag === item}
              onClick={() => onTagChange(tag === item ? null : item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
