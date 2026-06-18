/** Raw CSV row — every cell is a string, exactly as PapaParse returns it. */
export interface ExhibitPanelRow {
  exhibit_id: string
  sort_order: string
  label: string
  title: string
  body: string
  image_url: string
  caption: string
}

/** Domain model: one slideshow panel of an exhibit. */
export interface ExhibitPanel {
  /** FK → `exhibits.id`. */
  exhibit_id: string
  sort_order: number
  /** Small kicker, e.g. `Part 1: The Arrival`. */
  label: string
  title: string
  body: string
  /** Flickr static URL. */
  image_url: string
  caption: string
}

/** Map a raw CSV row to the typed domain model. */
export const toExhibitPanel = (row: ExhibitPanelRow): ExhibitPanel => ({
  exhibit_id: row.exhibit_id,
  sort_order: Number(row.sort_order?.trim()) || 0,
  label: row.label,
  title: row.title,
  body: row.body,
  image_url: row.image_url,
  caption: row.caption,
})
