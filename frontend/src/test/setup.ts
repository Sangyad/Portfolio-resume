import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

/*
 * Node 24 exposes an experimental global `localStorage` that is undefined
 * unless `--localstorage-file` is passed, and it shadows the jsdom
 * implementation. Provide a minimal in-memory Storage so browser-storage code
 * is exercised exactly as it ships.
 */
if (typeof window !== 'undefined' && !window.localStorage) {
  const store = new Map<string, string>()

  const storage: Storage = {
    get length() {
      return store.size
    },
    clear() {
      store.clear()
    },
    getItem(key) {
      return store.get(key) ?? null
    },
    key(index) {
      return [...store.keys()][index] ?? null
    },
    removeItem(key) {
      store.delete(key)
    },
    setItem(key, value) {
      store.set(key, String(value))
    },
  }

  Object.defineProperty(window, 'localStorage', { value: storage, configurable: true })
}
