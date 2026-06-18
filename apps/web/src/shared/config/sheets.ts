/**
 * Data sources for the published-CSV data layer.
 *
 * Each entry defaults to the seed CSV bundled in `public/data/` (prefixed with
 * Vite's BASE_URL so it resolves under the `/hartford-bound/` Pages base too),
 * so the site works with zero external configuration. To switch any feature to
 * live data, set its `VITE_SHEETS_*_URL` env var to a published Google Sheets
 * CSV URL — no code changes required.
 */
const seed = (name: string): string => `${import.meta.env.BASE_URL}data/${name}.csv`

export const SHEET_URLS = {
  stories: import.meta.env.VITE_SHEETS_STORIES_URL ?? seed('stories'),
  timeline: import.meta.env.VITE_SHEETS_TIMELINE_URL ?? seed('timeline'),
} as const
