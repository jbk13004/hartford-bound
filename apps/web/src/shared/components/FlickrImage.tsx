import {
  FLICKR_SIZES,
  flickrPage,
  flickrSrc,
  parseFlickrUrl,
  type FlickrSize,
} from '@/shared/lib/flickr'

export interface FlickrImageProps {
  /** The pasted Flickr static image URL. Blank/unparseable → empty state. */
  url: string
  /** Target display size; drives the chosen src and srcset. */
  size: FlickrSize
  alt: string
  className?: string
  /**
   * Wrap the image in an attribution link to the Flickr photo page. Defaults to
   * `true`. Set `false` when the image fills a `<button>` (e.g. a clickable
   * thumbnail), where the anchor would otherwise swallow the button's click.
   */
  linkToSource?: boolean
}

/**
 * Renders a Flickr-hosted image from a single pasted static URL, emitting a
 * `srcset`/`sizes` for the requested size and wrapping it in an attribution
 * link to the Flickr photo page.
 *
 * A blank or unparseable `url` renders a neutral placeholder box — never a
 * broken `<img>` and never a fake headshot.
 */
export function FlickrImage({
  url,
  size,
  alt,
  className,
  linkToSource = true,
}: FlickrImageProps) {
  const parsed = parseFlickrUrl(url)

  if (!parsed) {
    // Neutral placeholder box: no <img>, no attribution link.
    return (
      <div
        role="img"
        aria-label={alt || 'Image unavailable'}
        className={className}
        data-flickr-empty="true"
      />
    )
  }

  const srcSet = (Object.keys(FLICKR_SIZES) as FlickrSize[])
    .map((s) => `${flickrSrc(parsed, s)} ${FLICKR_SIZES[s]}w`)
    .join(', ')
  const sizes = `${FLICKR_SIZES[size]}px`

  const img = (
    <img
      src={flickrSrc(parsed, size)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
    />
  )

  if (!linkToSource) return img

  return (
    <a href={flickrPage(parsed)} target="_blank" rel="noreferrer">
      {img}
    </a>
  )
}
