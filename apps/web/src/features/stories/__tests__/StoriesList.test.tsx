import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/server'
import { renderWithProviders } from '@/test/utils'
import { StoriesList } from '../components/StoriesList'

describe('StoriesList', () => {
  it('renders the stories fetched from the CSV data source', async () => {
    renderWithProviders(<StoriesList />)

    // Resolves once RTK Query has fetched (MSW) and mapped the rows.
    expect(await screen.findByText('Addie Brown')).toBeInTheDocument()
    expect(await screen.findByText('James Mars')).toBeInTheDocument()
  })

  it('renders the FlickrImage placeholder for a story with a blank hero', async () => {
    // A blank hero_image_url must yield the neutral placeholder box (never a
    // broken <img>) — mirrors the seed `catharine-freebody` row.
    server.use(
      http.get('*/data/stories.csv', () =>
        HttpResponse.text(
          `id,title,subtitle,excerpt,year_start,year_end,dates_label,lat,lng,tags,map_ids,hero_image_url
no-hero,No Hero,A subtitle,An excerpt.,1900,1950,,41.76,-72.68,race,,
`,
        ),
      ),
    )

    renderWithProviders(<StoriesList />)

    const placeholder = await screen.findByRole('img', { name: 'No Hero' })
    expect(placeholder).toHaveAttribute('data-flickr-empty', 'true')
  })
})
