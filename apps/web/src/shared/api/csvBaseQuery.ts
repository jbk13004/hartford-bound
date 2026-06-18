import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import Papa from 'papaparse'

/** A single CSV row keyed by (trimmed) header — every value is a string. */
export type CsvRow = Record<string, string>

export interface CsvError {
  status: number | 'PARSING_ERROR' | 'FETCH_ERROR'
  data: string
}

/**
 * Shared RTK Query base query for the published-CSV data layer.
 *
 * Every endpoint fetches a CSV URL and PapaParses it identically — fetch, parse
 * and error-normalization live here once; endpoints stay declarative
 * (`query: () => SHEET_URLS.stories`) and own only the row -> domain mapping via
 * `transformResponse`. This is the real implementation: there is no backend, the
 * CSV fetch *is* the data source. Parse semantics match the original
 * googleSheets.js (header rows, skip empty lines, trimmed headers; parse
 * warnings are non-fatal and logged).
 */
export const csvBaseQuery: BaseQueryFn<string, CsvRow[], CsvError> = async (url) => {
  try {
    const res = await fetch(url)
    if (!res.ok) return { error: { status: res.status, data: res.statusText } }
    const { data, errors } = Papa.parse<CsvRow>(await res.text(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    })
    if (errors.length) console.warn('CSV parsing warnings:', errors)
    return { data }
  } catch (e) {
    return { error: { status: 'FETCH_ERROR', data: String(e) } }
  }
}
