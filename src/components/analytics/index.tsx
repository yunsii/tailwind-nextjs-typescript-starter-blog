import metadata from 'data/metadata'

import GA from './GoogleAnalytics'
import Plausible from './Plausible'
import SimpleAnalytics from './SimpleAnalytics'
import Umami from './Umami'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (...args: any[]) => void
    sa_event?: (...args: any[]) => void
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return (
    <>
      {isProduction && metadata.analytics?.plausibleDataDomain && <Plausible />}
      {isProduction && metadata.analytics?.simpleAnalytics && (
        <SimpleAnalytics />
      )}
      {isProduction && metadata.analytics?.umamiWebsiteId && <Umami />}
      {isProduction && metadata.analytics?.googleAnalyticsId && <GA />}
    </>
  )
}

export default Analytics
