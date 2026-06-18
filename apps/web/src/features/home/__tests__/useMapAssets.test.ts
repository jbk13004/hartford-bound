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

  it('colors each marker by its primary tag', async () => {
    const { result } = renderHookWithProviders(() => useMapAssets())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    const { markers } = result.current

    // james-mars' primary tag is `race` (#C26B5A, theme race).
    const james = markers.find((m) => m.href === '/stories/james-mars')
    expect(james?.color).toBe('#C26B5A')
    expect(james?.theme).toBe('race')

    // addie-brown's primary tag is `labor` (#D1D35E, blank theme).
    const addie = markers.find((m) => m.href === '/stories/addie-brown')
    expect(addie?.color).toBe('#D1D35E')
    expect(addie?.theme).toBe('')
  })

  it('exposes the distinct non-empty themes present for theme filtering', async () => {
    const { result } = renderHookWithProviders(() => useMapAssets())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    // race + migration are present; the blank theme (labor) is excluded.
    expect(result.current.themes).toEqual(['migration', 'race'])
  })
})
