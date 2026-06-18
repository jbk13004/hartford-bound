/**
 * Flickr static-image helper.
 *
 * Every image in the data model is one pasted Flickr **static** URL
 * (`https://live.staticflickr.com/{server}/{photoId}_{secret}_{size}.jpg`).
 * That single string encodes the server, photo id, and secret — enough to
 * rebuild any size on demand and to link back to the photo page for
 * attribution. See `docs/data-model.md` → "Flickr images".
 */

/** Flickr size suffixes the app uses, mapped to their longest-edge pixel width. */
export const FLICKR_SIZES = {
  q: 150,
  w: 400,
  z: 640,
  c: 800,
  b: 1024,
  k: 2048,
} as const

export type FlickrSize = keyof typeof FLICKR_SIZES

/** The components decoded from a Flickr static image URL. */
export interface ParsedFlickr {
  server: string
  photoId: string
  secret: string
  size: string
}

/**
 * Parse a pasted Flickr static image URL into its parts.
 * Returns `null` for a blank or non-matching string (never throws) so callers
 * can render a clean empty state instead of a broken image.
 */
const FLICKR_URL =
  /^https:\/\/live\.staticflickr\.com\/(\d+)\/(\d+)_([0-9a-z]+)_([a-z]+)\.jpg$/

export function parseFlickrUrl(url: string): ParsedFlickr | null {
  const match = FLICKR_URL.exec(url.trim())
  if (!match) return null
  const [, server, photoId, secret, size] = match
  return { server, photoId, secret, size }
}

/** Rebuild a static image URL for `parsed` at the requested size. */
export function flickrSrc(parsed: ParsedFlickr, size: FlickrSize): string {
  return `https://live.staticflickr.com/${parsed.server}/${parsed.photoId}_${parsed.secret}_${size}.jpg`
}

/** Attribution link to the photo's Flickr page. */
export function flickrPage(parsed: ParsedFlickr): string {
  return `https://www.flickr.com/photos//${parsed.photoId}`
}
