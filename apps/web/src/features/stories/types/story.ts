export type StoryVariant = 'blue' | 'yellow' | 'green'

/** Raw CSV row — every cell is a string, exactly as PapaParse returns it. */
export interface StoryRow {
  id: string
  title: string
  dates: string
  excerpt: string
  tags: string
  image: string
  alt: string
  variant: string
  subtitle: string
  body: string
}

/** Domain model consumed by components. */
export interface Story {
  id: string
  title: string
  dates: string
  excerpt: string
  tags: readonly string[]
  image: string
  alt: string
  variant: StoryVariant
  subtitle: string
  /** Article paragraphs for the detail page. */
  body: readonly string[]
}

const VARIANTS: readonly StoryVariant[] = ['blue', 'yellow', 'green']

const toVariant = (value: string): StoryVariant =>
  (VARIANTS as readonly string[]).includes(value) ? (value as StoryVariant) : 'blue'

/** Split a delimited cell into a trimmed, non-empty list. */
const splitList = (value: string, separator = ','): string[] =>
  value ? value.split(separator).map((part) => part.trim()).filter(Boolean) : []

/** Map a raw CSV row to the typed domain model. */
export const toStory = (row: StoryRow): Story => ({
  id: row.id,
  title: row.title,
  dates: row.dates,
  excerpt: row.excerpt,
  tags: splitList(row.tags),
  image: row.image,
  alt: row.alt,
  variant: toVariant(row.variant),
  subtitle: row.subtitle,
  body: splitList(row.body, '|'),
})
