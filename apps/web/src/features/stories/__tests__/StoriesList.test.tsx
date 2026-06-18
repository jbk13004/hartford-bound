import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/utils'
import { StoriesList } from '../components/StoriesList'

describe('StoriesList', () => {
  it('renders the stories fetched from the CSV data source', async () => {
    renderWithProviders(<StoriesList />)

    // Resolves once RTK Query has fetched (MSW) and mapped the rows.
    expect(await screen.findByText('Addie Brown')).toBeInTheDocument()
    expect(await screen.findByText('James Mars')).toBeInTheDocument()
  })
})
