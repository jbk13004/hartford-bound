import type { Asset } from '@/shared/relationships'
import { splitIds, splitTags } from '@/shared/lib/ids'

/** Raw CSV row — every cell is a string, exactly as PapaParse returns it. */
export interface StoryRow {
  id: string
  title: string
  subtitle: string
  excerpt: string
  year_start: string
  year_end: string
  dates_label: string
  lat: string
  lng: string
  tags: string
  map_ids: string
  hero_image_url: string
}

/** Domain model consumed by components. Body lives in `story_blocks`, not here. */
export interface Story {
  id: string
  title: string
  subtitle: string
  excerpt: string
  year_start?: number
  year_end?: number
  /** Display override for fuzzy dates; falls back to formatting the year range. */
  dates_label: string
  lat?: number
  lng?: number
  /** Tag ids; the first is the primary tag (drives color). */
  tags: readonly string[]
  /** `maps.id` list — the story↔map relationship, authored here. */
  map_ids: readonly string[]
  /** Flickr static URL — the portrait/hero. */
  hero_image_url: string
}

/** Parse a numeric cell to a number, or `undefined` if blank/non-numeric. */
const toNumber = (value: string): number | undefined => {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : undefined
}

/** Map a raw CSV row to the typed domain model. */
export const toStory = (row: StoryRow): Story => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  excerpt: row.excerpt,
  year_start: toNumber(row.year_start),
  year_end: toNumber(row.year_end),
  dates_label: row.dates_label,
  lat: toNumber(row.lat),
  lng: toNumber(row.lng),
  tags: splitTags(row.tags),
  map_ids: splitIds(row.map_ids),
  hero_image_url: row.hero_image_url,
})

/** Project a story onto the generic `Asset` shape for the shared relationship layer. */
export const storyToAsset = (story: Story): Asset => ({
  id: story.id,
  title: story.title,
  type: 'story',
  href: `/stories/${story.id}`,
  year_start: story.year_start,
  year_end: story.year_end,
  tags: story.tags,
  lat: story.lat,
  lng: story.lng,
  imageUrl: story.hero_image_url,
  primaryTag: story.tags[0],
})
