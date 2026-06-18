import { describe, it, expect, vi, afterEach } from 'vitest'
import { csvBaseQuery } from '../csvBaseQuery'

// csvBaseQuery only reads its first argument (the URL); api + extraOptions are unused.
const run = (url: string) => csvBaseQuery(url, {} as never, {} as never)

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('csvBaseQuery', () => {
  it('parses CSV, trimming headers and skipping empty lines', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => ' name , year \nAddie,1841\n\nJames,1790\n',
      }),
    )

    const result = await run('http://example.test/data.csv')

    expect(result.data).toEqual([
      { name: 'Addie', year: '1841' },
      { name: 'James', year: '1790' },
    ])
  })

  it('returns a normalized error for a non-ok response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' }),
    )

    const result = await run('http://example.test/missing.csv')

    expect(result.error).toEqual({ status: 404, data: 'Not Found' })
  })

  it('returns FETCH_ERROR when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))

    const result = await run('http://example.test/data.csv')

    expect(result.error?.status).toBe('FETCH_ERROR')
    expect(result.error?.data).toContain('network down')
  })
})
