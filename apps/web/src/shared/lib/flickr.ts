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
export function parseFlickrUrl(url: string): ParsedFlickr | null {
  // IMPLEMENTOR: match live.staticflickr.com/{server}/{photoId}_{secret}_{size}.jpg
  void url
  return null
}

/** Rebuild a static image URL for `parsed` at the requested size. */
export function flickrSrc(parsed: ParsedFlickr, size: FlickrSize): string {
  // IMPLEMENTOR: https://live.staticflickr.com/{server}/{photoId}_{secret}_{size}.jpg
  void parsed
  void size
  return ''
}

/** Attribution link to the photo's Flickr page. */
export function flickrPage(parsed: ParsedFlickr): string {
  // IMPLEMENTOR: https://www.flickr.com/photos//{photoId}
  void parsed
  return ''
}
