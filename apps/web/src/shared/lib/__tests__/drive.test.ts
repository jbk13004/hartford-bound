import { describe, it, expect } from 'vitest'
import { driveDownloadUrl, driveViewUrl, parseDriveUrl } from '../drive'

describe('parseDriveUrl', () => {
  it('parses the /file/d/<id>/ share form', () => {
    expect(
      parseDriveUrl('https://drive.google.com/file/d/1AbCdEf_123/view?usp=sharing'),
    ).toEqual({ fileId: '1AbCdEf_123' })
  })

  it('parses the ?id=<id> form', () => {
    expect(
      parseDriveUrl('https://drive.google.com/uc?export=download&id=1AbCdEf_123'),
    ).toEqual({ fileId: '1AbCdEf_123' })
  })

  it('parses the open?id=<id> form', () => {
    expect(parseDriveUrl('https://drive.google.com/open?id=1AbCdEf_123')).toEqual({
      fileId: '1AbCdEf_123',
    })
  })

  it('returns null for blank or unrecognized links', () => {
    expect(parseDriveUrl('')).toBeNull()
    expect(parseDriveUrl('   ')).toBeNull()
    expect(parseDriveUrl('https://example.com/file')).toBeNull()
  })
})

describe('driveDownloadUrl', () => {
  it('builds the direct-download URL', () => {
    expect(driveDownloadUrl('1AbCdEf_123')).toBe(
      'https://drive.google.com/uc?export=download&id=1AbCdEf_123',
    )
  })
})

describe('driveViewUrl', () => {
  it('builds the view-page fallback URL', () => {
    expect(driveViewUrl('1AbCdEf_123')).toBe(
      'https://drive.google.com/file/d/1AbCdEf_123/view',
    )
  })
})
