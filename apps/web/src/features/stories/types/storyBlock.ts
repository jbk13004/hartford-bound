/** The kinds of body block a story can hold. */
export type StoryBlockType = 'text' | 'heading' | 'quote' | 'photo'

/** Raw CSV row — every cell is a string. */
export interface StoryBlockRow {
  story_id: string
  sort_order: string
  type: string
  text: string
  image_url: string
  caption: string
}

/** Domain model: one block of a story's rich body. */
export interface StoryBlock {
  story_id: string
  sort_order: number
  type: StoryBlockType
  text: string
  /** Flickr static URL (only for `type = photo`). */
  image_url: string
  caption: string
}

const TYPES: readonly StoryBlockType[] = ['text', 'heading', 'quote', 'photo']

const toType = (value: string): StoryBlockType =>
  (TYPES as readonly string[]).includes(value) ? (value as StoryBlockType) : 'text'

/** Map a raw CSV row to the typed domain model. */
export const toStoryBlock = (row: StoryBlockRow): StoryBlock => ({
  story_id: row.story_id,
  sort_order: Number(row.sort_order?.trim()) || 0,
  type: toType(row.type),
  text: row.text,
  image_url: row.image_url,
  caption: row.caption,
})
