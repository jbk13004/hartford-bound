import type { Asset } from '@/shared/relationships'
import { decadeOf } from '@/shared/relationships'
import { splitIds, splitTags } from '@/shared/lib/ids'

/** Raw CSV row — every cell is a string, exactly as PapaParse returns it. */
export interface MapRow {
  id: string
  title: string
  subtitle: string
  description: string
  year_start: string
  year_end: string
  dates_label: string
  lat: string
  lng: string
  tags: string
  collection_ids: string
  image_url: string
}

/**
 * Domain model: one individual historical map scan (its own detail page).
 * Named `HartMap` to avoid shadowing the global `Map`.
 */
export interface HartMap {
  id: string
  title: string
  subtitle: string
  /** The "Historical Context" article text. */
  description: string
  year_start?: number
  year_end?: number
  dates_label: string
  lat?: number
  lng?: number
  /** Tag ids; the first is the primary tag (drives color). */
  tags: readonly string[]
  /** `collections.id` list — which landing groupings this map appears in. */
  collection_ids: readonly string[]
  /** Flickr static URL — the map scan itself. */
  image_url: string
}

/** Parse a numeric cell to a number, or `undefined` if blank/non-numeric. */
const toNumber = (value: string): number | undefined => {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : undefined
}

/** Map a raw CSV row to the typed domain model. */
export const toMap = (row: MapRow): HartMap => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  description: row.description,
  year_start: toNumber(row.year_start),
  year_end: toNumber(row.year_end),
  dates_label: row.dates_label,
  lat: toNumber(row.lat),
  lng: toNumber(row.lng),
  tags: splitTags(row.tags),
  collection_ids: splitIds(row.collection_ids),
  image_url: row.image_url,
})

/** The decade this map starts in, derived from `year_start` (e.g. `1930`). */
export const mapDecade = (map: HartMap): number | undefined => decadeOf(map.year_start)

/** Project a map onto the generic `Asset` shape for the shared relationship layer. */
export const mapToAsset = (map: HartMap): Asset => ({
  id: map.id,
  title: map.title,
  type: 'map',
  href: `/maps/${map.id}`,
  year_start: map.year_start,
  year_end: map.year_end,
  tags: map.tags,
  lat: map.lat,
  lng: map.lng,
  imageUrl: map.image_url,
  excerpt: map.description,
  primaryTag: map.tags[0],
})
