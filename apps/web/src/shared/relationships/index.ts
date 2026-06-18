/**
 * Shared relationship + derived-view layer.
 *
 * All relationships are authored one-sided as id lists; this layer builds the
 * reverse indexes and the derived timeline / map-marker lists in code, so
 * feature hooks read real related items instead of `.slice(0, 2)` placeholders
 * (see `docs/data-model.md` → "Relationships" and "Derived views"). Everything
 * here is pure and operates on the generic `Asset` projection, so it's built
 * and fixture-tested independently of any one feature's data.
 */
import type { TagsById } from '@/features/tags'
import type {
  Asset,
  MapMarker,
  TimelineEntry,
  TimelineEvent,
} from './types'

export type {
  Asset,
  AssetType,
  MapMarker,
  TimelineEntry,
  TimelineEvent,
} from './types'

/** The decade an asset starts in, e.g. `1937 → 1930`. Undefined year → undefined. */
export function decadeOf(year_start?: number): number | undefined {
  return year_start === undefined ? undefined : Math.floor(year_start / 10) * 10
}

/** Resolve explicit `*_ids` links against an `{ [id]: T }` lookup, dropping misses. */
export function resolveIds<T>(ids: readonly string[], byId: Readonly<Record<string, T>>): T[] {
  return ids.map((id) => byId[id]).filter((value): value is T => value !== undefined)
}

/**
 * Build a tag-id → assets reverse index across all assets (an asset appears
 * under each of its tags). The basis for "all assets tagged X".
 */
export function buildReverseIndex(assets: readonly Asset[]): Map<string, Asset[]> {
  const index = new Map<string, Asset[]>()
  for (const asset of assets) {
    for (const tagId of asset.tags) {
      const bucket = index.get(tagId)
      if (bucket) bucket.push(asset)
      else index.set(tagId, [asset])
    }
  }
  return index
}

/**
 * Assets sharing at least one tag with `asset`, excluding `asset` itself,
 * ranked by descending shared-tag overlap count (ties keep input order).
 * `limit` caps the result length when provided.
 */
export function relatedByTags(
  asset: Asset,
  all: readonly Asset[],
  limit?: number,
): Asset[] {
  const tags = new Set(asset.tags)
  const scored = all
    .map((candidate, index) => ({
      candidate,
      index,
      score: candidate.tags.reduce((n, id) => (tags.has(id) ? n + 1 : n), 0),
    }))
    .filter((entry) => entry.candidate.id !== asset.id && entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.candidate)
  return limit === undefined ? scored : scored.slice(0, limit)
}

/**
 * The derived timeline: every dated asset (has `year_start`) unioned with the
 * optional `timeline_events`, sorted ascending by year. Asset entries carry an
 * `href`/`type` back to their detail page; context events do not.
 */
export function deriveTimeline(
  assets: readonly Asset[],
  events: readonly TimelineEvent[] = [],
): TimelineEntry[] {
  const assetEntries: TimelineEntry[] = assets
    .filter((a): a is Asset & { year_start: number } => a.year_start !== undefined)
    .map((a) => ({
      id: a.id,
      year: a.year_start,
      title: a.title,
      href: a.href,
      type: a.type,
    }))
  const eventEntries: TimelineEntry[] = events.map((e) => ({
    id: e.id,
    year: e.year,
    title: e.title,
  }))
  return [...assetEntries, ...eventEntries].sort((a, b) => a.year - b.year)
}

/**
 * The homepage map markers: every asset with both `lat` and `lng`, carrying its
 * `type` (icon), sneak-peek `imageUrl`/`excerpt`, and primary tag's `theme` (an
 * empty theme when untagged or the tag is unknown) for theme filtering.
 */
export function deriveMapMarkers(
  assets: readonly Asset[],
  tagsById: TagsById,
): MapMarker[] {
  return assets
    .filter(
      (a): a is Asset & { lat: number; lng: number } =>
        a.lat !== undefined && a.lng !== undefined,
    )
    .map((a) => {
      const tag = a.tags[0] ? tagsById[a.tags[0]] : undefined
      return {
        id: a.id,
        title: a.title,
        href: a.href,
        lat: a.lat,
        lng: a.lng,
        type: a.type,
        imageUrl: a.imageUrl,
        excerpt: a.excerpt,
        theme: tag?.theme ?? '',
      }
    })
}
