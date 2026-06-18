/** Top-level theme rollup a tag belongs to (blank → no theme). */
export type TagTheme = 'race' | 'migration' | 'mobility' | ''

/** Raw CSV row — every cell is a string. */
export interface TagRow {
  id: string
  label: string
  theme: string
  color: string
  description: string
}

/** Domain model consumed by components and selectors. */
export interface Tag {
  id: string
  label: string
  theme: TagTheme
  /** Hex token, e.g. `#72B591`. An asset's color = its primary tag's color. */
  color: string
  description: string
}

const THEMES: readonly TagTheme[] = ['race', 'migration', 'mobility', '']

const toTheme = (value: string): TagTheme =>
  (THEMES as readonly string[]).includes(value) ? (value as TagTheme) : ''

/** Map a raw CSV row to the typed domain model. */
export const toTag = (row: TagRow): Tag => ({
  id: row.id,
  label: row.label,
  theme: toTheme(row.theme),
  color: row.color,
  description: row.description,
})
