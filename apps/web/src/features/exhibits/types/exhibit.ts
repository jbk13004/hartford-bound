import type { Asset } from '@/shared/relationships'
import { splitIds, splitTags } from '@/shared/lib/ids'

/** Raw CSV row — every cell is a string, exactly as PapaParse returns it. */
export interface ExhibitRow {
  id: string
  title: string
  subtitle: string
  year_start: string
  year_end: string
  dates_label: string
  active: string
  lat: string
  lng: string
  tags: string
  story_ids: string
  map_ids: string
  cover_image_url: string
}

/** Domain model: one exhibit. Panels live in `exhibit_panels`, not here. */
export interface Exhibit {
  id: string
  title: string
  /** Subtitle doubles as the intro line. */
  subtitle: string
  year_start?: number
  year_end?: number
  dates_label: string
  /** `TRUE`/`FALSE` — highlighted in the selector strip. */
  active: boolean
  lat?: number
  lng?: number
  /** Tag ids; the first is the primary tag (drives color). */
  tags: readonly string[]
  /** `stories.id` list — the exhibit↔story relationship, authored here. */
  story_ids: readonly string[]
  /** `maps.id` list — the exhibit↔map relationship, authored here. */
  map_ids: readonly string[]
  /** Flickr static URL. */
  cover_image_url: string
}

/** Parse a numeric cell to a number, or `undefined` if blank/non-numeric. */
const toNumber = (value: string): number | undefined => {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : undefined
}

const toBool = (value: string): boolean => /^(true|yes|1)$/i.test(value?.trim() ?? '')

/** Map a raw CSV row to the typed domain model. */
export const toExhibit = (row: ExhibitRow): Exhibit => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  year_start: toNumber(row.year_start),
  year_end: toNumber(row.year_end),
  dates_label: row.dates_label,
  active: toBool(row.active),
  lat: toNumber(row.lat),
  lng: toNumber(row.lng),
  tags: splitTags(row.tags),
  story_ids: splitIds(row.story_ids),
  map_ids: splitIds(row.map_ids),
  cover_image_url: row.cover_image_url,
})

/** Project an exhibit onto the generic `Asset` shape for the shared relationship layer. */
export const exhibitToAsset = (exhibit: Exhibit): Asset => ({
  id: exhibit.id,
  title: exhibit.title,
  type: 'exhibit',
  href: `/exhibits/${exhibit.id}`,
  year_start: exhibit.year_start,
  year_end: exhibit.year_end,
  tags: exhibit.tags,
  lat: exhibit.lat,
  lng: exhibit.lng,
  imageUrl: exhibit.cover_image_url,
  primaryTag: exhibit.tags[0],
})
