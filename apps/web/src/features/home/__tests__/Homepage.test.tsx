import { describe, it, expect, vi, beforeEach } from 'vitest'
import { waitFor, screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/test/utils'

// mapbox-gl does not render in jsdom, so stub the map + marker. Each Marker
// registers itself as "live" on construction and removes itself on `.remove()`,
// letting the test count markers currently plotted after a filter change.
const liveMarkers = new Set<FakeMarker>()

class FakeMarker {
  constructor() {
    liveMarkers.add(this)
  }
  setLngLat() {
    return this
  }
  addTo() {
    return this
  }
  getElement() {
    return document.createElement('div')
  }
  remove() {
    liveMarkers.delete(this)
    return this
  }
}

vi.mock('mapbox-gl', () => {
  class FakeMap {
    remove() {}
    scrollZoom = { enable() {} }
    boxZoom = { enable() {} }
    dragRotate = { enable() {} }
    dragPan = { enable() {} }
    keyboard = { enable() {} }
    doubleClickZoom = { enable() {} }
    touchZoomRotate = { enable() {} }
  }
  return { default: { accessToken: '', Map: FakeMap, Marker: FakeMarker } }
})

// Imported after the mock so the hook picks up the stub.
const { Homepage } = await import('../components/Homepage')

describe('Homepage map filtering', () => {
  beforeEach(() => liveMarkers.clear())

  it('plots a marker per navigable asset and exposes the themes present', async () => {
    renderWithProviders(<Homepage />)

    // 2 stories + 3 maps carry coordinates and a detail route.
    await waitFor(() => expect(liveMarkers.size).toBe(5))

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Race' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Migration' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Mobility' })).not.toBeInTheDocument()
  })

  it('re-plots only the selected theme when a filter pill is pressed', async () => {
    renderWithProviders(<Homepage />)
    await waitFor(() => expect(liveMarkers.size).toBe(5))

    // race: james-mars + holc-redlining + ward-map-1910.
    fireEvent.click(screen.getByRole('button', { name: 'Race' }))
    await waitFor(() => expect(liveMarkers.size).toBe(3))

    // migration: trolley-1950 only.
    fireEvent.click(screen.getByRole('button', { name: 'Migration' }))
    await waitFor(() => expect(liveMarkers.size).toBe(1))

    // back to the full set.
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    await waitFor(() => expect(liveMarkers.size).toBe(5))
  })
})
