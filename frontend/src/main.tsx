import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { applyTheme, preferredTheme } from '@/lib/theme'
import './styles.css'

applyTheme(preferredTheme())

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root was not found')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)
