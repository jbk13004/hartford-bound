import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FlickrImage } from '../FlickrImage'

const VALID = 'https://live.staticflickr.com/65535/53778710552_01f2058482_b.jpg'

describe('FlickrImage', () => {
  it('renders an image with an attribution link for a valid URL', () => {
    render(<FlickrImage url={VALID} size="b" alt="A historic photo" />)

    const img = screen.getByRole('img', { name: 'A historic photo' })
    expect(img).toHaveAttribute('src', expect.stringContaining('live.staticflickr.com'))

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://www.flickr.com/photos//53778710552')
  })

  it('renders a bare image with no attribution link when linkToSource is false', () => {
    render(<FlickrImage url={VALID} size="b" alt="A historic photo" linkToSource={false} />)

    const img = screen.getByRole('img', { name: 'A historic photo' })
    expect(img).toHaveAttribute('src', expect.stringContaining('live.staticflickr.com'))
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders a clean placeholder (no broken img, no link) for a blank URL', () => {
    render(<FlickrImage url="" size="b" alt="Missing" />)

    // No real image element, no attribution link.
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    const placeholder = screen.getByRole('img', { name: 'Missing' })
    expect(placeholder).not.toHaveAttribute('src')
  })
})
