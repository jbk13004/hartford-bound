/**
 * Parsing helpers for the multi-value columns in the published-CSV data layer.
 *
 * Relationships and tags are authored as comma-separated id lists in a single
 * cell (see `docs/data-model.md`). These split that one string into a clean
 * array: whitespace trimmed, empty entries dropped, author order preserved.
 */

/** Split a delimited cell into a trimmed, non-empty list (author order kept). */
export const splitList = (value: string, separator = ','): string[] =>
  value ? value.split(separator).map((part) => part.trim()).filter(Boolean) : []

/** Parse a comma-separated `*_ids` column (e.g. `map_ids`) into id strings. */
export const splitIds = (value: string): string[] => splitList(value)

/** Parse a comma-separated `tags` column into tag-id strings. */
export const splitTags = (value: string): string[] => splitList(value)
