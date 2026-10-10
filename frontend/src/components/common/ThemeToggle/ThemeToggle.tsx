import type { ButtonHTMLAttributes } from 'react'
import styles from './ThemeToggle.module.css'

type ThemeToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle, className, ...props }: ThemeToggleProps) {
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={[styles.toggle, className].filter(Boolean).join(' ')}
      onClick={onToggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      data-theme-state={theme}
      {...props}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === 'dark' ? (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={styles.label}>{theme}</span>
    </button>
  )
}
