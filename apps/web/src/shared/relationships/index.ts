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
import { FALLBACK_TAG_COLOR } from '@/features/tags'
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
  // IMPLEMENTOR: for each asset, push it under every id in `asset.tags`.
  void assets
  return new Map()
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
  // IMPLEMENTOR: score each other asset by count of shared tag ids, drop zeros
  // and self, sort by score desc (stable), then slice to `limit` if given.
  void asset
  void all
  void limit
  return []
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
  // IMPLEMENTOR: map dated assets → TimelineEntry (year = year_start), map
  // events → TimelineEntry (no href), concat, sort ascending by year.
  void assets
  void events
  return []
}

/**
 * The homepage map markers: every asset with both `lat` and `lng`, carrying its
 * primary tag's color + theme (falling back to {@link FALLBACK_TAG_COLOR} and an
 * empty theme when untagged or the tag is unknown).
 */
export function deriveMapMarkers(
  assets: readonly Asset[],
  tagsById: TagsById,
): MapMarker[] {
  // IMPLEMENTOR: filter to assets with lat & lng; resolve primary tag (tags[0])
  // → color/theme via tagsById, fall back to FALLBACK_TAG_COLOR / '' theme.
  void assets
  void tagsById
  void FALLBACK_TAG_COLOR
  return []
}
