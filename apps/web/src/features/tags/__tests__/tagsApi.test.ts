import { describe, it, expect } from 'vitest'
import { makeStore } from '@/app/store'
import { tagsApi } from '../api/tagsApi'

describe('tagsApi', () => {
  it('fetches CSV (via MSW) and maps rows to Tag domain objects', async () => {
    const store = makeStore()
    const result = await store.dispatch(tagsApi.endpoints.getTags.initiate())

    expect(result.isSuccess).toBe(true)
    const tags = result.data ?? []
    expect(tags).toHaveLength(3)

    expect(tags[0]).toMatchObject({
      id: 'migration',
      label: 'Migration',
      theme: 'migration',
      color: '#72B591',
    })
    // Blank theme stays an empty string (valid TagTheme).
    expect(tags[1]).toMatchObject({ id: 'labor', theme: '', color: '#D1D35E' })
  })

  it('getTagById returns the matching mapped tag', async () => {
    const store = makeStore()
    const result = await store.dispatch(tagsApi.endpoints.getTagById.initiate('race'))
    expect(result.data?.label).toBe('Race')
    expect(result.data?.theme).toBe('race')
  })
})
