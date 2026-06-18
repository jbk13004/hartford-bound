export type TimelineEventType = 'story' | 'map'

/** Raw CSV row — every cell is a string. */
export interface TimelineEventRow {
  id: string
  year: string
  title: string
  description: string
  type: string
  linkId: string
}

export interface TimelineEvent {
  id: number
  year: number
  title: string
  description: string
  type: TimelineEventType
  /** Slug linking to a story or map detail route. */
  linkId: string
}

const toType = (value: string): TimelineEventType => (value === 'map' ? 'map' : 'story')

export const toTimelineEvent = (row: TimelineEventRow): TimelineEvent => ({
  id: Number(row.id),
  year: Number(row.year),
  title: row.title,
  description: row.description,
  type: toType(row.type),
  linkId: row.linkId,
})
