import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderHookWithProviders } from '@/test/utils'
import { useDerivedTimeline } from '../hooks/useDerivedTimeline'

describe('useDerivedTimeline', () => {
  it('unions every dated asset type plus context events, sorted by year', async () => {
    const { result } = renderHookWithProviders(() =>
      useDerivedTimeline({ type: 'all', century: 'all' }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    const entries = result.current.entries

    // All four asset types are represented in the union.
    const types = new Set(entries.map((e) => e.type))
    expect(types).toContain('story')
    expect(types).toContain('map')
    expect(types).toContain('exhibit')
    expect(types).toContain('archive')

    // The 1635 context event (no type) sorts first; entries are ascending by year.
    expect(entries[0]).toMatchObject({ id: 'hartford-founded', year: 1635 })
    expect(entries[0].type).toBeUndefined()
    const years = entries.map((e) => e.year)
    expect([...years].sort((a, b) => a - b)).toEqual(years)

    // Asset entries link to their detail page; context events do not.
    const story = entries.find((e) => e.id === 'addie-brown')
    expect(story?.href).toBe('/stories/addie-brown')
    expect(entries.find((e) => e.id === 'hartford-founded')?.href).toBeUndefined()
  })

  it('filters by entry type, including the non-asset "event" filter', async () => {
    const { result } = renderHookWithProviders(() =>
      useDerivedTimeline({ type: 'event', century: 'all' }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    const entries = result.current.entries
    expect(entries.length).toBeGreaterThan(0)
    expect(entries.every((e) => e.type === undefined)).toBe(true)
  })

  it('filters by century', async () => {
    const { result } = renderHookWithProviders(() =>
      useDerivedTimeline({ type: 'all', century: 1600 }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.entries.map((e) => e.id)).toEqual(['hartford-founded'])
  })
})
