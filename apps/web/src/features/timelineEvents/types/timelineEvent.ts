import type { TimelineEvent } from '@/shared/relationships'

export type { TimelineEvent } from '@/shared/relationships'

/** Raw CSV row — every cell is a string. */
export interface TimelineEventRow {
  id: string
  year: string
  title: string
  description: string
}

/** Map a raw CSV row to the shared `TimelineEvent` domain shape. */
export const toTimelineEvent = (row: TimelineEventRow): TimelineEvent => ({
  id: row.id,
  year: Number(row.year),
  title: row.title,
  description: row.description || undefined,
})
