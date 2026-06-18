import { parseFlickrUrl, type FlickrSize } from '@/shared/lib/flickr'

export interface FlickrImageProps {
  /** The pasted Flickr static image URL. Blank/unparseable → empty state. */
  url: string
  /** Target display size; drives the chosen src and srcset. */
  size: FlickrSize
  alt: string
  className?: string
}

/**
 * Renders a Flickr-hosted image from a single pasted static URL, emitting a
 * `srcset`/`sizes` for the requested size and wrapping it in an attribution
 * link to the Flickr photo page.
 *
 * A blank or unparseable `url` renders a neutral placeholder box — never a
 * broken `<img>` and never a fake headshot.
 */
export function FlickrImage({ url, size, alt, className }: FlickrImageProps) {
  const parsed = parseFlickrUrl(url)

  if (!parsed) {
    // IMPLEMENTOR: neutral placeholder box (no <img>, no attribution link).
    return (
      <div
        role="img"
        aria-label={alt || 'Image unavailable'}
        className={className}
        data-flickr-empty="true"
      />
    )
  }

  // IMPLEMENTOR: build src + srcset + sizes via flickrSrc(parsed, ...) and wrap
  // the <img> in an attribution <a href={flickrPage(parsed)}>.
  void size
  return null
}
