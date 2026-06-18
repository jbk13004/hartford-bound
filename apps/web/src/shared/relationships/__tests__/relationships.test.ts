import { describe, it, expect } from 'vitest'
import {
  buildReverseIndex,
  decadeOf,
  deriveMapMarkers,
  deriveTimeline,
  relatedByTags,
  resolveIds,
  type Asset,
} from '../index'
import type { TagsById } from '@/features/tags'

const asset = (over: Partial<Asset> & Pick<Asset, 'id'>): Asset => ({
  title: over.id,
  type: 'story',
  href: `/stories/${over.id}`,
  tags: [],
  ...over,
})

const ASSETS: Asset[] = [
  asset({ id: 'a', tags: ['migration', 'labor'], year_start: 1937, lat: 41.7, lng: -72.7 }),
  asset({ id: 'b', tags: ['labor'], year_start: 1920, type: 'map', href: '/maps/b' }),
  asset({ id: 'c', tags: ['migration', 'race'], year_start: 1955, lat: 41.8, lng: -72.6 }),
  asset({ id: 'd', tags: [] }),
]

const TAGS_BY_ID: TagsById = {
  migration: { id: 'migration', label: 'Migration', theme: 'migration', color: '#72B591', description: '' },
  labor: { id: 'labor', label: 'Labor', theme: '', color: '#D1D35E', description: '' },
  race: { id: 'race', label: 'Race', theme: 'race', color: '#C26B5A', description: '' },
}

describe('decadeOf', () => {
  it('floors year_start to its decade', () => {
    expect(decadeOf(1937)).toBe(1930)
    expect(decadeOf(1920)).toBe(1920)
  })
  it('returns undefined for an undated asset', () => {
    expect(decadeOf(undefined)).toBeUndefined()
  })
})

describe('resolveIds', () => {
  it('resolves ids against a lookup and drops misses', () => {
    const byId = { x: 1, y: 2 }
    expect(resolveIds(['x', 'z', 'y'], byId)).toEqual([1, 2])
  })
})

describe('buildReverseIndex', () => {
  it('indexes each asset under every one of its tags', () => {
    const index = buildReverseIndex(ASSETS)
    expect(index.get('labor')?.map((a) => a.id)).toEqual(['a', 'b'])
    expect(index.get('migration')?.map((a) => a.id)).toEqual(['a', 'c'])
    expect(index.get('race')?.map((a) => a.id)).toEqual(['c'])
    expect(index.get('nonexistent')).toBeUndefined()
  })
})

describe('relatedByTags', () => {
  it('ranks by shared-tag overlap, excludes self and zero-overlap', () => {
    // 'a' shares migration+labor; 'c' shares migration (1); 'b' shares labor (1).
    const related = relatedByTags(ASSETS[0], ASSETS)
    expect(related.map((a) => a.id)).not.toContain('a')
    expect(related.map((a) => a.id)).not.toContain('d')
    // c and b both overlap by 1; order is stable (input order).
    expect(related.map((a) => a.id)).toEqual(['b', 'c'])
  })

  it('honours the limit', () => {
    expect(relatedByTags(ASSETS[0], ASSETS, 1)).toHaveLength(1)
  })
})

describe('deriveTimeline', () => {
  it('unions dated assets with events, sorted ascending by year', () => {
    const timeline = deriveTimeline(ASSETS, [
      { id: 'founded', year: 1635, title: 'Hartford Founded' },
    ])
    expect(timeline.map((e) => e.year)).toEqual([1635, 1920, 1937, 1955])
    // Undated asset 'd' is excluded.
    expect(timeline.map((e) => e.id)).not.toContain('d')
    // Asset entries link back; context events don't.
    expect(timeline.find((e) => e.id === 'a')?.href).toBe('/stories/a')
    expect(timeline.find((e) => e.id === 'founded')?.href).toBeUndefined()
  })
})

describe('deriveMapMarkers', () => {
  it('keeps only assets with coords, colored by primary tag', () => {
    const markers = deriveMapMarkers(ASSETS, TAGS_BY_ID)
    expect(markers.map((m) => m.id)).toEqual(['a', 'c'])
    expect(markers[0]).toMatchObject({ color: '#72B591', theme: 'migration', href: '/stories/a' })
    expect(markers[1]).toMatchObject({ color: '#72B591', theme: 'migration' })
  })
})
