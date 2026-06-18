import type { Asset } from '@/shared/relationships'
import { splitTags } from '@/shared/lib/ids'

/** Raw CSV row — every cell is a string, exactly as PapaParse returns it. */
export interface ArchiveItemRow {
  id: string
  title: string
  category: string
  year_start: string
  year_end: string
  dates_label: string
  tags: string
  image_url: string
  download_url: string
  description: string
}

/** Domain model: one browsable archive item (a first-class asset). */
export interface ArchiveItem {
  id: string
  title: string
  /** `photographs` | `documents` | `maps` | `oral-histories` | … */
  category: string
  year_start?: number
  year_end?: number
  dates_label: string
  /** Tag ids; the first is the primary tag (drives color). */
  tags: readonly string[]
  /** Flickr static URL — the preview shown in the archive grid. */
  image_url: string
  /** Google Drive share link — the downloadable original. Blank = no download. */
  download_url: string
  description: string
}

/** Parse a numeric cell to a number, or `undefined` if blank/non-numeric. */
const toNumber = (value: string): number | undefined => {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : undefined
}

/** Map a raw CSV row to the typed domain model. */
export const toArchiveItem = (row: ArchiveItemRow): ArchiveItem => ({
  id: row.id,
  title: row.title,
  category: row.category,
  year_start: toNumber(row.year_start),
  year_end: toNumber(row.year_end),
  dates_label: row.dates_label,
  tags: splitTags(row.tags),
  image_url: row.image_url,
  download_url: row.download_url,
  description: row.description,
})

/** Project an archive item onto the generic `Asset` shape for the shared layer. */
export const archiveToAsset = (item: ArchiveItem): Asset => ({
  id: item.id,
  title: item.title,
  type: 'archive',
  href: `/archive/${item.id}`,
  year_start: item.year_start,
  year_end: item.year_end,
  tags: item.tags,
  imageUrl: item.image_url,
  primaryTag: item.tags[0],
})
