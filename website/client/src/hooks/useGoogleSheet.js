import { useState, useEffect } from 'react'
import { fetchGoogleSheet } from '../utils/googleSheets'

/**
 * Custom hook for fetching data from Google Sheets
 *
 * @param {string} sheetUrl - The published CSV URL from Google Sheets
 * @param {Object} options - Optional configuration
 * @param {boolean} options.enabled - Whether to fetch data (default: true)
 * @param {Function} options.transform - Transform function for the data
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useGoogleSheet(sheetUrl, options = {}) {
  const { enabled = true, transform = (data) => data } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    if (!sheetUrl || !enabled) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetchGoogleSheet(sheetUrl)
      setData(transform(result))
    } catch (err) {
      setError(err)
      console.error('Error fetching Google Sheet:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [sheetUrl, enabled])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

export default useGoogleSheet
