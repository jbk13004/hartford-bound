import { afterAll, afterEach, beforeAll } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { server } from './server'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })

  // jsdom's fetch (Node/undici) can't resolve root-relative URLs the way a
  // browser does, so the app's relative CSV fetches (e.g. "/data/stories.csv")
  // would throw before MSW sees them. Normalize them to the jsdom origin.
  // Wrapped after server.listen() so this runs outermost (MSW intercepts the
  // absolute URL it produces).
  const innerFetch = globalThis.fetch
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) =>
    typeof input === 'string' && input.startsWith('/')
      ? innerFetch(`http://localhost${input}`, init)
      : innerFetch(input, init)) as typeof fetch
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
