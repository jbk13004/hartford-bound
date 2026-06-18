import { driveDownloadUrl, parseDriveUrl } from '@/shared/lib/drive'

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

  return (
    <a
      href={driveDownloadUrl(parsed.fileId)}
      download
      aria-label={label ?? 'Download original'}
      className="inline-flex items-center justify-center text-slate-500 hover:text-sky"
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        download
      </span>
    </a>
  )
}
