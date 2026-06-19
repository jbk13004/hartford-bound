import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import {
  FLICKR_SIZES,
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
   * Open a full-screen, in-page zoom/pan lightbox on click. Defaults to
   * `true`. Set `false` when the image fills a `<button>` (e.g. a clickable
   * thumbnail), where the wrapper would otherwise swallow the button's click.
   */
  linkToSource?: boolean
}

/**
 * Renders a Flickr-hosted image from a single pasted static URL, emitting a
 * `srcset`/`sizes` for the requested size. By default a click opens the image
 * full-screen in an in-page lightbox (wheel / pinch / double-click zoom +
 * click-drag pan) rather than navigating away to Flickr.
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
  const [open, setOpen] = useState(false)
  const parsed = parseFlickrUrl(url)

  if (!parsed) {
    // Neutral placeholder box: no <img>, no lightbox.
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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0"
      >
        {img}
      </button>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        // 'b' (1024px) is the largest Flickr size reliably generated for every
        // photo; the 'k' (2048px) size 410s when the original isn't that big,
        // which left the lightbox empty. Zoom still magnifies up to 3x.
        slides={[{ src: flickrSrc(parsed, 'b'), alt }]}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </>
  )
}
