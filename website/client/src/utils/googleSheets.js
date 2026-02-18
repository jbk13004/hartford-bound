import Papa from 'papaparse'

/**
 * Fetches data from a Google Sheet published as CSV
 *
 * To use this:
 * 1. Open your Google Sheet
 * 2. Go to File > Share > Publish to web
 * 3. Select the sheet tab you want
 * 4. Choose "Comma-separated values (.csv)" format
 * 5. Click Publish and copy the URL
 *
 * @param {string} sheetUrl - The published CSV URL from Google Sheets
 * @returns {Promise<Array>} - Array of row objects with headers as keys
 */
export async function fetchGoogleSheet(sheetUrl) {
  try {
    const response = await fetch(sheetUrl)
    const csvText = await response.text()

    const { data, errors } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    })

    if (errors.length > 0) {
      console.warn('CSV parsing warnings:', errors)
    }

    return data
  } catch (error) {
    console.error('Error fetching Google Sheet:', error)
    throw error
  }
}

/**
 * Fetches data from a specific sheet tab by GID
 *
 * @param {string} spreadsheetId - The Google Sheets spreadsheet ID
 * @param {string} gid - The sheet tab GID (found in URL after #gid=)
 * @returns {Promise<Array>} - Array of row objects with headers as keys
 */
export async function fetchSheetByGid(spreadsheetId, gid = '0') {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`
  return fetchGoogleSheet(url)
}

/**
 * Utility function to get an item by ID from sheet data
 *
 * @param {Array} data - Array of row objects from Google Sheets
 * @param {string} id - The ID to search for
 * @param {string} idColumn - The column name containing IDs (default: 'id')
 * @returns {Object|null} - The matching row or null if not found
 */
export function getItemById(data, id, idColumn = 'id') {
  return data.find((item) => item[idColumn] === id) || null
}

/**
 * Utility function to filter items by a column value
 *
 * @param {Array} data - Array of row objects from Google Sheets
 * @param {string} column - The column name to filter by
 * @param {string} value - The value to match
 * @returns {Array} - Filtered array of matching rows
 */
export function filterByColumn(data, column, value) {
  return data.filter((item) => item[column] === value)
}

/**
 * Google Sheets URL configuration
 * Update these with your actual published sheet URLs
 */
export const SHEET_URLS = {
  // Example format - replace with your actual URLs
  // stories: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/export?format=csv&gid=0',
  // maps: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/export?format=csv&gid=123456',
  // timeline: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/export?format=csv&gid=789012',
  // archive: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/export?format=csv&gid=345678',
}

export default {
  fetchGoogleSheet,
  fetchSheetByGid,
  getItemById,
  filterByColumn,
  SHEET_URLS,
}
