import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DriveDownload } from '../DriveDownload'

describe('DriveDownload', () => {
  it('renders a download link for a parseable share URL', () => {
    render(<DriveDownload url="https://drive.google.com/file/d/1AbCdEf_123/view" />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      'https://drive.google.com/uc?export=download&id=1AbCdEf_123',
    )
  })

  it('uses a custom label when provided', () => {
    render(
      <DriveDownload
        url="https://drive.google.com/open?id=1AbCdEf_123"
        label="Download scan"
      />,
    )
    expect(screen.getByText('Download scan')).toBeInTheDocument()
  })

  it('renders nothing when the URL is blank', () => {
    const { container } = render(<DriveDownload url="" />)
    expect(container).toBeEmptyDOMElement()
  })
})
