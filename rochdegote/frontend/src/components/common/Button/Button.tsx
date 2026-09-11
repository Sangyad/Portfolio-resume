import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary'; size?: 'medium' | 'large' }

export function Button({ className, variant = 'primary', size = 'medium', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')} {...props} />
}
