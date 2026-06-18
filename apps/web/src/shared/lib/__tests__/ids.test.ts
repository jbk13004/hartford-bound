import { describe, it, expect } from 'vitest'
import { splitIds, splitList, splitTags } from '../ids'

describe('splitList', () => {
  it('trims whitespace, drops empties, preserves order', () => {
    expect(splitList(' a , b ,c ')).toEqual(['a', 'b', 'c'])
    expect(splitList('a, ,,b')).toEqual(['a', 'b'])
  })

  it('returns [] for blank or empty input', () => {
    expect(splitList('')).toEqual([])
    expect(splitList('   ')).toEqual([])
  })

  it('honours a custom separator', () => {
    expect(splitList('a|b|c', '|')).toEqual(['a', 'b', 'c'])
  })
})

describe('splitIds', () => {
  it('parses a comma-separated id column', () => {
    expect(splitIds('addie-brown, james-mars')).toEqual(['addie-brown', 'james-mars'])
  })

  it('returns [] for a blank cell', () => {
    expect(splitIds('')).toEqual([])
  })
})

describe('splitTags', () => {
  it('parses a comma-separated tags column, order preserved (primary first)', () => {
    expect(splitTags('migration, labor, race')).toEqual(['migration', 'labor', 'race'])
  })

  it('returns [] for a blank cell', () => {
    expect(splitTags('   ')).toEqual([])
  })
})
