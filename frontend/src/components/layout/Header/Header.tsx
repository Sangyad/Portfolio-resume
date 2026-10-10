import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Header.module.css'

type HeaderProps = HTMLAttributes<HTMLElement> & {
  activeId: string | null
  onNavigate: (id: string) => void
  onOpenPalette: () => void
  links: { label: string; href: string }[]
  name: string
  children?: ReactNode
}

export function Header({
  activeId,
  onNavigate,
  onOpenPalette,
  links,
  name,
  children,
  className,
  ...props
}: HeaderProps) {
  return (
    <header className={[styles.header, className].filter(Boolean).join(' ')} {...props}>
      <a className={styles.skip} href="#about">
        Skip to content
      </a>

      <div className={styles.inner}>
        <button type="button" className={styles.brand} onClick={() => onNavigate('about')}>
          <span className={styles.brandMark} aria-hidden="true">
            ~
          </span>
          <span className={styles.brandName}>{name}</span>
        </button>

        <nav aria-label="Resume sections">
          <ul className={styles.nav}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={[styles.navLink, activeId === link.href.slice(1) && styles.active]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    onNavigate(link.href.slice(1))
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {children}
          <button
            type="button"
            className={styles.paletteTrigger}
            onClick={onOpenPalette}
            aria-label="Open command palette"
          >
            <span aria-hidden="true">⌘K</span>
          </button>
        </div>
      </div>
    </header>
  )
}
