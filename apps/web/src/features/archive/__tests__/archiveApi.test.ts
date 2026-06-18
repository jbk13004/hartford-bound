import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { archiveApi } from '../api/archiveApi'
import { archiveToAsset } from '../types/archiveItem'

describe('archiveApi', () => {
  it('maps rows to ArchiveItem domain objects (tags, year range, download link)', async () => {
    const store = makeStore()
    const result = await store.dispatch(archiveApi.endpoints.getArchiveItems.initiate())

    const items = result.data ?? []
    expect(items).toHaveLength(4)
    expect(items[0]).toMatchObject({
      id: 'albany-storefronts',
      category: 'photographs',
      year_start: 1920,
      tags: ['migration', 'community'],
      download_url: '',
    })
    expect(items[1].download_url).toContain('drive.google.com')
  })

  it('projects an archive item onto the generic Asset shape', async () => {
    const store = makeStore()
    const result = await store.dispatch(archiveApi.endpoints.getArchiveItems.initiate())
    const asset = archiveToAsset((result.data ?? [])[0])

    expect(asset).toMatchObject({
      id: 'albany-storefronts',
      type: 'archive',
      href: '/archive/albany-storefronts',
      primaryTag: 'migration',
    })
  })
})
