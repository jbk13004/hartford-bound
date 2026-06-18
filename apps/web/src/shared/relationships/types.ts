import type { TagTheme } from '@/features/tags'

/**
 * The generic shape every feature's domain model projects onto so the shared
 * relationship/derived-view layer can treat stories, maps, exhibits, and
 * archive items uniformly (see `docs/data-model.md` → "Everything is an asset").
 *
 * Each feature owns its own rich domain model; it builds an `Asset` view of it
 * (id, title, type, href, year range, tags, optional coords/image) only when
 * feeding this layer.
 */
export type AssetType = 'story' | 'map' | 'exhibit' | 'archive'

export interface Asset {
  id: string
  title: string
  type: AssetType
  /** In-app route to this asset's detail page, e.g. `/stories/addie-brown`. */
  href: string
  year_start?: number
  year_end?: number
  /** Tag ids; the first is the primary tag (drives color/theme). */
  tags: readonly string[]
  lat?: number
  lng?: number
  /** A Flickr static image URL (raw, as authored). */
  imageUrl?: string
  /** Convenience: the primary tag id (`tags[0]`), if any. */
  primaryTag?: string
}

/** A non-asset timeline context beat (from the optional `timeline_events` sheet). */
export interface TimelineEvent {
  id: string
  year: number
  title: string
  description?: string
}

/** A timeline entry — either a dated asset or a context event. */
export interface TimelineEntry {
  id: string
  year: number
  title: string
  /** Present for asset-derived entries; absent for context events. */
  href?: string
  type?: AssetType
}

/** A homepage map marker derived from an asset that has coordinates. */
export interface MapMarker {
  id: string
  title: string
  href: string
  lat: number
  lng: number
  /** Primary tag's display color (or a fallback). */
  color: string
  /** Primary tag's theme rollup, for theme filtering. */
  theme: TagTheme
}
