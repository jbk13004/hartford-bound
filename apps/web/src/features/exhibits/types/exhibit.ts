/** Raw CSV row — every cell is a string. */
export interface ExhibitCollectionRow {
  id: string
  title: string
  dates: string
  image: string
  active: string
}

export interface ExhibitCollection {
  id: string
  title: string
  dates: string
  image: string
  active: boolean
}

const toBool = (value: string): boolean => /^(true|yes|1)$/i.test(value.trim())

export const toExhibitCollection = (row: ExhibitCollectionRow): ExhibitCollection => ({
  id: row.id,
  title: row.title,
  dates: row.dates,
  image: row.image,
  active: toBool(row.active),
})
