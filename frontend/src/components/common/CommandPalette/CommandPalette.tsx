import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './CommandPalette.module.css'

export type PaletteCommand = {
  id: string
  label: string
  hint?: string
  run: () => void
}

type CommandPaletteProps = {
  open: boolean
  commands: PaletteCommand[]
  onClose: () => void
}

export function CommandPalette({ open, commands, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return commands
    return commands.filter((command) => command.label.toLowerCase().includes(trimmed))
  }, [commands, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('input, button, [href]')
        if (!focusable || focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  const runSelected = () => {
    const selected = results[activeIndex]
    if (!selected) return
    onClose()
    selected.run()
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <label className={styles.field}>
          <span className={styles.prompt} aria-hidden="true">
            &gt;
          </span>
          <span className={styles.visuallyHidden}>Filter commands</span>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={query}
            placeholder="jump to a section…"
            autoComplete="off"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-results"
            aria-activedescendant={
              results[activeIndex] ? `command-${results[activeIndex].id}` : undefined
            }
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActiveIndex((index) => (results.length === 0 ? 0 : (index + 1) % results.length))
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActiveIndex((index) =>
                  results.length === 0 ? 0 : (index - 1 + results.length) % results.length
                )
              } else if (event.key === 'Enter') {
                event.preventDefault()
                runSelected()
              }
            }}
          />
        </label>

        {results.length === 0 ? (
          <p className={styles.empty}>no matching command</p>
        ) : (
          <ul className={styles.results} id="command-palette-results" role="listbox">
            {results.map((command, index) => (
              <li key={command.id} role="none">
                <button
                  type="button"
                  id={`command-${command.id}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={[styles.result, index === activeIndex && styles.active]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    onClose()
                    command.run()
                  }}
                >
                  <span>{command.label}</span>
                  {command.hint ? <span className={styles.hint}>{command.hint}</span> : null}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
