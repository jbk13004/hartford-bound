import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '@/test/utils'
import { MapAtlas } from '../components/MapAtlas'

describe('MapAtlas', () => {
  it('renders every map scan when no collection is selected', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/maps/atlas" element={<MapAtlas />} />
      </Routes>,
      { route: '/maps/atlas' },
    )

    expect(await screen.findByText('HOLC Redlining')).toBeInTheDocument()
    expect(await screen.findByText('1910 Ward Map')).toBeInTheDocument()
    expect(await screen.findByText('Trolley Lines')).toBeInTheDocument()
  })

  it('filters the grid to a collection by maps.collection_ids membership', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/maps/atlas/:collectionId" element={<MapAtlas />} />
      </Routes>,
      { route: '/maps/atlas/hartford-through-time' },
    )

    // Only the trolley map belongs to hartford-through-time.
    expect(await screen.findByText('Trolley Lines')).toBeInTheDocument()
    expect(screen.queryByText('HOLC Redlining')).not.toBeInTheDocument()
    expect(screen.queryByText('1910 Ward Map')).not.toBeInTheDocument()
  })
})
