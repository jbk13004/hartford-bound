import { describe, it, expect } from 'vitest'
import { screen, waitFor, within, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/test/utils'
import { ArchiveList } from '../components/ArchiveList'

describe('ArchiveList', () => {
  it('renders the list of archive items', async () => {
    renderWithProviders(<ArchiveList />)
    expect(await screen.findByText('Albany Avenue Storefronts')).toBeInTheDocument()
    expect(screen.getByText('Fair Housing Petition')).toBeInTheDocument()
  })

  it('shows a Download affordance only for items with a download_url', async () => {
    renderWithProviders(<ArchiveList />)
    // Two of the four fixture rows carry a Drive link.
    const downloads = await screen.findAllByRole('link', { name: /download/i })
    expect(downloads).toHaveLength(2)
    expect(downloads[0]).toHaveAttribute('href', expect.stringContaining('export=download'))
  })

  it('filters by category', async () => {
    renderWithProviders(<ArchiveList />)
    await screen.findByText('Albany Avenue Storefronts')

    fireEvent.click(screen.getByRole('button', { name: /^documents$/i }))

    await waitFor(() => {
      expect(screen.queryByText('Albany Avenue Storefronts')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Fair Housing Petition')).toBeInTheDocument()
  })

  it('filters by tag', async () => {
    renderWithProviders(<ArchiveList />)
    await screen.findByText('Albany Avenue Storefronts')

    const tagSelect = screen.getByLabelText(/filter by tag/i)
    fireEvent.change(tagSelect, { target: { value: 'housing' } })

    await waitFor(() => {
      expect(screen.queryByText('Albany Avenue Storefronts')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Fair Housing Petition')).toBeInTheDocument()
  })

  it('filters by year', async () => {
    renderWithProviders(<ArchiveList />)
    await screen.findByText('Albany Avenue Storefronts')

    const yearSelect = screen.getByLabelText(/filter by year/i)
    fireEvent.change(yearSelect, { target: { value: '1945' } })

    await waitFor(() => {
      expect(screen.queryByText('Albany Avenue Storefronts')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Fair Housing Petition')).toBeInTheDocument()
  })

  it('does not render any placeholder.com thumbnails', async () => {
    const { container } = renderWithProviders(<ArchiveList />)
    await screen.findByText('Albany Avenue Storefronts')
    expect(within(container).queryByText(/placeholder\.com/)).not.toBeInTheDocument()
    expect(container.innerHTML).not.toContain('placeholder.com')
  })
})
