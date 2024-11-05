import { formatDate } from '../src/utils/date'

describe('formatDate', () => {
  it('should return "No Date" if the input is an empty string', () => {
    expect(formatDate('')).toBe('No Date')
  })

  it('should return "No Date" if the input is an invalid date string', () => {
    expect(formatDate('invalid-date')).toBe('No Date')
  })

  it('should format a valid date string correctly', () => {
    expect(formatDate('2023-10-05')).toBe('October 5')
  })

  it('should format another valid date string correctly', () => {
    expect(formatDate('2022-01-01')).toBe('January 1')
  })
})
