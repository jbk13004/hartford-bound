import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '@/test/utils'
import { MapDetail } from '../components/MapDetail'

describe('MapDetail', () => {
  it('renders the scan, context, and real related maps (collection siblings)', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/maps/:mapId" element={<MapDetail />} />
      </Routes>,
      { route: '/maps/holc-redlining' },
    )

    expect(await screen.findByText('HOLC Redlining')).toBeInTheDocument()
    expect(await screen.findByText('Redlining context.')).toBeInTheDocument()
    // ward-map-1910 shares the routes-and-roots collection (and the housing tag),
    // so it surfaces as related — not a slice placeholder.
    expect(await screen.findByText('1910 Ward Map')).toBeInTheDocument()
  })
})
