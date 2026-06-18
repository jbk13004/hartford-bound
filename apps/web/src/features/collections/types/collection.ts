import { splitTags } from '@/shared/lib/ids'

/** Raw CSV row — every cell is a string. */
export interface CollectionRow {
  id: string
  title: string
  subtitle: string
  description: string
  cover_image_url: string
  tags: string
}

/**
 * Domain model: a curated thematic grouping of maps — a Maps landing-page card.
 * Membership is authored on `maps.collection_ids`; the reverse ("maps in this
 * collection") is derived in code.
 */
export interface Collection {
  id: string
  title: string
  subtitle: string
  description: string
  /** Flickr static URL for the card cover. */
  cover_image_url: string
  tags: readonly string[]
}

/** Map a raw CSV row to the typed domain model. */
export const toCollection = (row: CollectionRow): Collection => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  description: row.description,
  cover_image_url: row.cover_image_url,
  tags: splitTags(row.tags),
})
