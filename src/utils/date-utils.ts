export function formatDate(
  date: string,
  locales: Intl.LocalesArgument = 'hu-HU',
) {
  return new Date(date).toLocaleDateString(locales, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateEasy(
  date: string,
  locales: Intl.LocalesArgument = 'hu-HU',
) {
  return new Date(date).toLocaleDateString(locales, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}
