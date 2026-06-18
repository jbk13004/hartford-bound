/**
 * Format an asset's display dates. Uses the curator's `dates_label` override
 * when set; otherwise formats the year range (`1841 — 1870`, or just `1841`
 * when there's no end year). Blank everything → empty string.
 */
export function formatDates(
  dates_label: string,
  year_start?: number,
  year_end?: number,
): string {
  if (dates_label?.trim()) return dates_label.trim()
  if (year_start === undefined) return ''
  return year_end === undefined ? String(year_start) : `${year_start} — ${year_end}`
}
