import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderHookWithProviders } from '@/test/utils'
import { useMapAssets } from '../hooks/useMapAssets'

describe('useMapAssets', () => {
  it('builds markers only from coordinate-bearing stories and maps', async () => {
    const { result } = renderHookWithProviders(() => useMapAssets())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    const { markers } = result.current

    // 2 fixture stories + 3 fixture maps all carry lat/lng. Exhibits carry
    // coordinates too but have no detail route, so they're kept off the map.
    expect(markers).toHaveLength(5)
    const hrefs = markers.map((m) => m.href)
    expect(hrefs).toContain('/stories/addie-brown')
    expect(hrefs).toContain('/maps/holc-redlining')
    expect(hrefs.some((h) => h.startsWith('/exhibits/'))).toBe(false)
  })

  it('carries each marker type and primary-tag theme', async () => {
    const { result } = renderHookWithProviders(() => useMapAssets())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    const { markers } = result.current

    // james-mars is a story; its primary tag `race` rolls up to theme race.
    const james = markers.find((m) => m.href === '/stories/james-mars')
    expect(james?.type).toBe('story')
    expect(james?.theme).toBe('race')

    // addie-brown is a story; its primary tag `labor` has a blank theme.
    const addie = markers.find((m) => m.href === '/stories/addie-brown')
    expect(addie?.type).toBe('story')
    expect(addie?.theme).toBe('')

    // holc-redlining is a map.
    const holc = markers.find((m) => m.href === '/maps/holc-redlining')
    expect(holc?.type).toBe('map')
  })

  it('exposes the distinct non-empty themes present for theme filtering', async () => {
    const { result } = renderHookWithProviders(() => useMapAssets())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    // race + migration are present; the blank theme (labor) is excluded.
    expect(result.current.themes).toEqual(['migration', 'race'])
  })
})
