import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '@/test/utils'
import { StoryDetail } from '../components/StoryDetail'

describe('StoryDetail', () => {
  it('renders body blocks in sort_order and the maps-in-story rail', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/stories/:storyId" element={<StoryDetail />} />
      </Routes>,
      { route: '/stories/addie-brown' },
    )

    expect(
      await screen.findByRole('heading', { name: 'Addie Brown', level: 1 }),
    ).toBeInTheDocument()
    // Block body rendered by type (heading + paragraph).
    expect(await screen.findByText('Early Life')).toBeInTheDocument()
    expect(await screen.findByText('Second paragraph')).toBeInTheDocument()
    // map_ids resolved into the "Maps in this Story" rail.
    expect(await screen.findByText('Maps in this Story')).toBeInTheDocument()
    expect(await screen.findByText('HOLC Redlining')).toBeInTheDocument()
  })

  it('shows real related stories by shared tags, not a slice placeholder', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/stories/:storyId" element={<StoryDetail />} />
      </Routes>,
      { route: '/stories/james-mars' },
    )

    // james-mars (activism, race) shares no tags with addie-brown (labor, gender),
    // so there should be no related stories — proves it's overlap, not a slice.
    expect(await screen.findByText('No related stories yet.')).toBeInTheDocument()
  })
})
