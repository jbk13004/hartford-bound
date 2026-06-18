import { describe, it, expect } from 'vitest'
import { flickrPage, flickrSrc, parseFlickrUrl } from '../flickr'

const VALID = 'https://live.staticflickr.com/65535/53778710552_01f2058482_b.jpg'

describe('parseFlickrUrl', () => {
  it('decodes a valid static image URL into its parts', () => {
    expect(parseFlickrUrl(VALID)).toEqual({
      server: '65535',
      photoId: '53778710552',
      secret: '01f2058482',
      size: 'b',
    })
  })

  it('returns null for a blank string', () => {
    expect(parseFlickrUrl('')).toBeNull()
    expect(parseFlickrUrl('   ')).toBeNull()
  })

  it('returns null for a non-matching / garbage URL', () => {
    expect(parseFlickrUrl('https://example.com/photo.jpg')).toBeNull()
    expect(parseFlickrUrl('not a url')).toBeNull()
    // The photo-page link is not the static image URL.
    expect(parseFlickrUrl('https://www.flickr.com/photos/x/53778710552')).toBeNull()
  })
})

describe('flickrSrc', () => {
  it('rebuilds the URL at a requested size', () => {
    const parsed = parseFlickrUrl(VALID)!
    expect(flickrSrc(parsed, 'q')).toBe(
      'https://live.staticflickr.com/65535/53778710552_01f2058482_q.jpg',
    )
    expect(flickrSrc(parsed, 'k')).toBe(
      'https://live.staticflickr.com/65535/53778710552_01f2058482_k.jpg',
    )
  })
})

describe('flickrPage', () => {
  it('builds the attribution photo-page link', () => {
    const parsed = parseFlickrUrl(VALID)!
    expect(flickrPage(parsed)).toBe('https://www.flickr.com/photos//53778710552')
  })
})
