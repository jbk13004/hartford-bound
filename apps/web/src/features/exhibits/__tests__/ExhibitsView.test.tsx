import { describe, it, expect } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/server'
import { renderWithProviders } from '@/test/utils'
import { ExhibitsView } from '../components/ExhibitsView'

describe('ExhibitsView', () => {
  it('defaults to the active exhibit and shows its first panel with a derived counter', async () => {
    renderWithProviders(<ExhibitsView />)
    // First panel of the-great-migration (ordered by sort_order).
    expect(await screen.findByText('North End Arrivals')).toBeInTheDocument()
    // Count derived from the 2 rows for this exhibit — never typed.
    expect(screen.getByText(/PANEL 01 \/ 2/)).toBeInTheDocument()
  })

  it('advances panels with the next control and wraps the counter', async () => {
    renderWithProviders(<ExhibitsView />)
    await screen.findByText('North End Arrivals')

    fireEvent.click(screen.getByRole('button', { name: /next panel/i }))

    expect(await screen.findByText('Building Community')).toBeInTheDocument()
    expect(screen.getByText(/PANEL 02 \/ 2/)).toBeInTheDocument()
  })

  it('renders linked stories and maps resolved from story_ids / map_ids', async () => {
    renderWithProviders(<ExhibitsView />)
    await screen.findByText('North End Arrivals')

    // story_ids → addie-brown, james-mars
    expect(screen.getByRole('heading', { name: 'Addie Brown' })).toBeInTheDocument()
    // map_ids → holc-redlining, ward-map-1910
    expect(screen.getByRole('heading', { name: 'HOLC Redlining' })).toBeInTheDocument()
  })

  it('renders a zero-count panel without crashing for an exhibit with no panels', async () => {
    // An exhibit whose id matches no panel rows: the count is derived as 0, and
    // the slideshow must render `PANEL 00 / 0` rather than crashing on `% 0`.
    server.use(
      http.get('*/data/exhibits.csv', () =>
        HttpResponse.text(
          `id,title,subtitle,year_start,year_end,dates_label,active,lat,lng,tags,story_ids,map_ids,cover_image_url
no-panels,No Panels,An empty exhibit.,1900,1950,,TRUE,,,race,,,
`,
        ),
      ),
    )

    renderWithProviders(<ExhibitsView />)

    await waitFor(() => {
      expect(screen.getByText(/PANEL 00 \/ 0/)).toBeInTheDocument()
    })
  })

  it('switches exhibit when a different one is selected', async () => {
    renderWithProviders(<ExhibitsView />)
    await screen.findByText('North End Arrivals')

    // Selecting the inactive exhibit swaps the panel + counter (it has 1 panel).
    fireEvent.click(screen.getByRole('button', { name: /Housing Justice/i }))

    await waitFor(() => {
      expect(screen.getByText('The Red Lines')).toBeInTheDocument()
    })
    expect(screen.getByText(/PANEL 01 \/ 1/)).toBeInTheDocument()
  })
})
