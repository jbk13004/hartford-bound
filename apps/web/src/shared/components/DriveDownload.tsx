import { parseDriveUrl } from '@/shared/lib/drive'

export interface DriveDownloadProps {
  /** The pasted Drive share URL. Blank/unparseable → renders nothing. */
  url: string
  /** Optional button label; defaults to a sensible "Download" affordance. */
  label?: string
}

/**
 * A download affordance for an archive item's original file. Renders a plain
 * `<a>`-based download (no JS fetch, no CORS) when `url` is present and
 * parseable, and hides cleanly when blank. The view URL is the fallback target
 * for Drive's large-file "confirm download" interstitial.
 */
export function DriveDownload({ url, label }: DriveDownloadProps) {
  const parsed = parseDriveUrl(url)
  if (!parsed) return null

  // IMPLEMENTOR: render an <a href={driveDownloadUrl(parsed.fileId)} download>
  // with `label` (default "Download original"); keep the view URL available as
  // the large-file fallback target.
  void label
  return null
}
