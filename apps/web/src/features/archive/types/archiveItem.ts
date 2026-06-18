/** Raw CSV row — every cell is a string. */
export interface ArchiveItemRow {
  id: string
  title: string
  category: string
  date: string
  thumbnail: string
}

/** Domain model (1:1 with the row here — kept distinct for consistency with the template). */
export interface ArchiveItem {
  id: string
  title: string
  category: string
  date: string
  thumbnail: string
}

export const toArchiveItem = (row: ArchiveItemRow): ArchiveItem => ({
  id: row.id,
  title: row.title,
  category: row.category,
  date: row.date,
  thumbnail: row.thumbnail,
})
