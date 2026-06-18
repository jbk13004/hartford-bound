export type MapColorScheme = 'green' | 'blue' | 'yellow'

/* ── Map collections (the cards on the Maps landing page) ───────────────── */

export interface MapCollectionRow {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string
  image: string
  colorScheme: string
}

export interface MapCollection {
  id: string
  title: string
  subtitle: string
  description: string
  tags: readonly string[]
  image: string
  colorScheme: MapColorScheme
}

/* ── Atlas items (the dense grid of individual map layers) ──────────────── */

export interface AtlasItemRow {
  id: string
  title: string
  tag: string
  decade: string
  image: string
}

export interface AtlasItem {
  id: string
  title: string
  tag: string
  decade: string
  image: string
}

const COLOR_SCHEMES: readonly MapColorScheme[] = ['green', 'blue', 'yellow']

const toColorScheme = (value: string): MapColorScheme =>
  (COLOR_SCHEMES as readonly string[]).includes(value) ? (value as MapColorScheme) : 'blue'

const splitList = (value: string): string[] =>
  value ? value.split(',').map((part) => part.trim()).filter(Boolean) : []

export const toMapCollection = (row: MapCollectionRow): MapCollection => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  description: row.description,
  tags: splitList(row.tags),
  image: row.image,
  colorScheme: toColorScheme(row.colorScheme),
})

export const toAtlasItem = (row: AtlasItemRow): AtlasItem => ({
  id: row.id,
  title: row.title,
  tag: row.tag,
  decade: row.decade,
  image: row.image,
})
