/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Mapbox GL access token. Public (inlined into the bundle) — protect with a URL-restricted token. */
  readonly VITE_MAPBOX_TOKEN: string
  /** Optional overrides for the bundled seed CSVs in public/data/ (set to a published Google Sheets CSV URL). */
  readonly VITE_SHEETS_STORIES_URL?: string
  readonly VITE_SHEETS_MAPS_URL?: string
  readonly VITE_SHEETS_TIMELINE_URL?: string
  readonly VITE_SHEETS_ARCHIVE_URL?: string
  readonly VITE_SHEETS_EXHIBITS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
