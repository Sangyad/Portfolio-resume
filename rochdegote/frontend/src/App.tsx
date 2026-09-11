import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import styles from './App.module.css'

export function App() {
  return <main><Section className={styles.hero}><Container className={styles.content}><p className={styles.eyebrow}>create-win-project</p><h1 className={styles.heading}>Your starter is running</h1><p className={styles.description}>{"portfolio"}</p><p>Read <code>AGENTS.md</code> before your first agent-assisted change.</p></Container></Section></main>
}
