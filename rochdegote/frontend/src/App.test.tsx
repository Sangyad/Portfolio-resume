import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders the starter heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Your starter is running' })).toBeInTheDocument()
})
