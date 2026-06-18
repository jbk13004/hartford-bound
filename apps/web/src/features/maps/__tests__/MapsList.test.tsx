import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/utils'
import { MapsList } from '../components/MapsList'

describe('MapsList', () => {
  it('renders the curated collections as the landing cards', async () => {
    renderWithProviders(<MapsList />)

    expect(await screen.findByText('Routes and Roots')).toBeInTheDocument()
    expect(await screen.findByText('Hartford Through Time')).toBeInTheDocument()
  })
})
