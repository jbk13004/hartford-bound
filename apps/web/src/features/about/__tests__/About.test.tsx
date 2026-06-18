import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/utils'
import { About } from '../components/About'

describe('About', () => {
  it('renders the team section without any placeholder headshot imagery', () => {
    const { container } = renderWithProviders(<About />)

    expect(screen.getByText('Dr. Elena Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('Dr. Marcus Thorne')).toBeInTheDocument()

    // No fake aida-public headshots, and no <img> headshots at all.
    expect(container.innerHTML).not.toContain('lh3.googleusercontent.com/aida-public')
    expect(container.querySelector('img')).toBeNull()
  })
})
