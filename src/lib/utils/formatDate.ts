import metadata from 'data/metadata'

const formatDate = (
  date: string,
  locale: Intl.LocalesArgument = metadata.locale,
) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(locale, options)

  return now
}

export default formatDate
