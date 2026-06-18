import { describe, it, expect } from 'vitest'
import { FALLBACK_TAG_COLOR, indexTags, tagColor } from '../hooks/usePrimaryTag'
import type { Tag } from '../types/tag'

const TAGS: Tag[] = [
  { id: 'migration', label: 'Migration', theme: 'migration', color: '#72B591', description: '' },
  { id: 'labor', label: 'Labor', theme: '', color: '#D1D35E', description: '' },
]

describe('tagColor', () => {
  const byId = indexTags(TAGS)

  it("resolves an asset's color from its primary (first) tag", () => {
    expect(tagColor(['migration', 'labor'], byId)).toBe('#72B591')
    expect(tagColor(['labor'], byId)).toBe('#D1D35E')
  })

  it('falls back when untagged or the primary tag is unknown', () => {
    expect(tagColor([], byId)).toBe(FALLBACK_TAG_COLOR)
    expect(tagColor(['nope'], byId)).toBe(FALLBACK_TAG_COLOR)
  })
})

describe('indexTags', () => {
  it('builds an id → tag lookup', () => {
    const byId = indexTags(TAGS)
    expect(byId.migration.label).toBe('Migration')
    expect(byId.labor.color).toBe('#D1D35E')
  })
})
