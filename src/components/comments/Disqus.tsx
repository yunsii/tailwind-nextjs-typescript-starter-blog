import metadata from 'data/metadata'

import type { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface Props {
  frontMatter: CoreContent<Blog>
}

const Disqus = ({ frontMatter }: Props) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)

  const COMMENTS_ID = 'disqus_thread'

  function LoadComments() {
    setEnabledLoadComments(false)

    window.disqus_config = function (this: any) {
      this.page.url = window.location.href
      this.page.identifier = frontMatter.slug
    }
    if (window.DISQUS === undefined) {
      const script = document.createElement('script')
      script.src = `https://${metadata.comment?.disqusConfig?.shortname}.disqus.com/embed.js`
      script.setAttribute('data-timestamp', `${new Date().valueOf()}`)
      script.setAttribute('crossorigin', 'anonymous')
      script.async = true
      document.body.appendChild(script)
    } else {
      window.DISQUS.reset({ reload: true })
    }
  }

  return (
    <div className='pb-6 pt-6 text-center text-gray-700 dark:text-gray-300'>
      {enableLoadComments && (
        <button onClick={LoadComments}>Load Comments</button>
      )}
      <div className='disqus-frame' id={COMMENTS_ID} />
    </div>
  )
}

export default Disqus
