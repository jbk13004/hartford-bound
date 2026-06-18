/**
 * Google Drive download helper (archive originals).
 *
 * The curator pastes a normal Drive **share** link; the app converts it to a
 * direct-download URL — same one-paste ergonomics as Flickr. The Drive file
 * must be shared "Anyone with the link" or the download fails. See
 * `docs/data-model.md` → "Google Drive downloads".
 */

/** The parts decoded from a Drive share URL. */
export interface ParsedDrive {
  fileId: string
}

/**
 * Parse a Drive share link into its file id. Accepts the three common forms:
 *   - `https://drive.google.com/file/d/<id>/view?...`
 *   - `https://drive.google.com/...?id=<id>`
 *   - `https://drive.google.com/open?id=<id>`
 * Returns `null` for a blank or unrecognized link (never throws).
 */
export function parseDriveUrl(shareUrl: string): ParsedDrive | null {
  const url = shareUrl.trim()
  const fileMatch = /\/file\/d\/([^/]+)/.exec(url)
  if (fileMatch) return { fileId: fileMatch[1] }
  const idMatch = /[?&]id=([^&]+)/.exec(url)
  if (idMatch) return { fileId: idMatch[1] }
  return null
}

/** Direct-download URL for a file id. */
export function driveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

/**
 * View-page URL for a file id — the large-file fallback. Files Drive can't
 * virus-scan return a "confirm download" interstitial instead of the bytes;
 * for those, open the view page in a new tab.
 */
export function driveViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`
}
