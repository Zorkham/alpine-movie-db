/**
 * Formats a given date string into a more readable format.
 *
 * @param date - The date string to format.
 * @returns A formatted date string in the format "Month Day" (e.g., "January 1").
 *          If the input date is invalid or not provided, returns "No Date".
 */
export const formatDate = (date: string): string => {
  if (!date) {
    return 'No Date'
  }

  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return 'No Date'
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })
}
