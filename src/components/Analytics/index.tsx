/* eslint-disable react-dom/no-missing-iframe-sandbox */
import Analytics from 'analytics'
import googleTagManager from '@analytics/google-tag-manager'
import metadata from 'data/metadata'

import { IS_DEV } from '@/helpers/env'
import { idleQueue } from '@/helpers/idle'

export default function _Analytics() {
  const initRef = useRef()

  useEffect(() => {
    if (IS_DEV) {
      return
    }
    if (initRef.current) {
      return
    }

    idleQueue.pushTask(() => {
      const plugins = []

      if (metadata.analytics?.gtmContainerId) {
        plugins.push(
          googleTagManager({
            containerId: metadata.analytics?.gtmContainerId,
          }),
        )
      }

      const analytics = Analytics({
        // More analytic plugins: https://github.com/DavidWells/analytics#analytic-plugins
        plugins,
      })

      window.analytics = analytics
    })
  }, [])

  return (
    <>
      {/* <!-- Google Tag Manager (noscript) --> */}
      {/* If you do not use GTM, you can remove below code completely */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${metadata.analytics?.gtmContainerId}`}
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
    </>
  )
}
