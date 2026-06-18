/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  LIVE DATA — the one file a non-developer edits to put the site online.    ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * The whole site is driven by Google Sheets, one sheet per table below. To go
 * live with a sheet:
 *
 *   1. In Google Sheets: File → Share → Publish to web → choose the tab,
 *      format "Comma-separated values (.csv)", and copy the published URL.
 *   2. Set that URL as the matching `VITE_SHEETS_<KEY>_URL` env var (e.g. in a
 *      `.env` file or the deploy workflow). Leave it unset to keep using the
 *      bundled example CSV in `public/data/<name>.csv`.
 *
 * Precedence per entry:  env var (`VITE_SHEETS_<KEY>_URL`)  →  seed CSV in
 * `public/data/`. Switching to live data needs no code change.
 *
 * Drive note: archive download files (the `download_url` column) must be shared
 * "Anyone with the link" in Google Drive, or the download will fail.
 */

/** Bundled seed CSV in `public/data/` (BASE_URL-prefixed for the Pages base). */
const seed = (name: string): string => `${import.meta.env.BASE_URL}data/${name}.csv`

export const SHEET_URLS = {
  // ── Stories ────────────────────────────────────────────────────────────────
  /** Story rows (card + detail metadata; body lives in `storyBlocks`). */
  stories: import.meta.env.VITE_SHEETS_STORIES_URL ?? seed('stories'),
  /** Rich story body, one block per row, ordered by `sort_order`. */
  storyBlocks: import.meta.env.VITE_SHEETS_STORY_BLOCKS_URL ?? seed('story_blocks'),

  // ── Maps & collections ──────────────────────────────────────────────────────
  /** Individual historical map images (the canonical map table). */
  maps: import.meta.env.VITE_SHEETS_MAPS_URL ?? seed('maps'),
  /** Curated thematic groupings of maps (the Maps landing-page cards). */
  collections: import.meta.env.VITE_SHEETS_COLLECTIONS_URL ?? seed('collections'),

  // ── Exhibits ─────────────────────────────────────────────────────────────────
  /** Exhibit rows (metadata + story/map links). */
  exhibits: import.meta.env.VITE_SHEETS_EXHIBITS_URL ?? seed('exhibits'),
  /** Exhibit slideshow panels, one per row, ordered by `sort_order`. */
  exhibitPanels: import.meta.env.VITE_SHEETS_EXHIBIT_PANELS_URL ?? seed('exhibit_panels'),

  // ── Archive ──────────────────────────────────────────────────────────────────
  /** Browsable archive grid items (Flickr preview + optional Drive download). */
  archive: import.meta.env.VITE_SHEETS_ARCHIVE_URL ?? seed('archive'),

  // ── Tags (controlled vocabulary) ─────────────────────────────────────────────
  /** The shared tag vocabulary — drives asset colors/themes and tag filters. */
  tags: import.meta.env.VITE_SHEETS_TAGS_URL ?? seed('tags'),

  // ── Timeline ─────────────────────────────────────────────────────────────────
  /**
   * Optional context beats that are NOT assets (e.g. "1635 — Hartford Founded").
   * The timeline itself is derived from every dated asset; this only adds extras.
   */
  timeline: import.meta.env.VITE_SHEETS_TIMELINE_URL ?? seed('timeline'),
} as const
