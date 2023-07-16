import dynamic from 'next/dynamic'

import metadata from 'data/metadata'

import type { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
interface Props {
  frontMatter: CoreContent<Blog>
}

const UtterancesComponent = dynamic(
  () => {
    return import('@/components/comments/Utterances')
  },
  { ssr: false },
)
const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false },
)
const DisqusComponent = dynamic(
  () => {
    return import('@/components/comments/Disqus')
  },
  { ssr: false },
)

const Comments = ({ frontMatter }: Props) => {
  const commentProvider = metadata?.comment?.provider
  if (!commentProvider) {
    return <></>
  }
  return (
    <div id='comment'>
      {metadata.comment && metadata.comment.provider === 'giscus' && (
        <GiscusComponent />
      )}
      {metadata.comment && metadata.comment.provider === 'utterances' && (
        <UtterancesComponent />
      )}
      {metadata.comment && metadata.comment.provider === 'disqus' && (
        <DisqusComponent frontMatter={frontMatter} />
      )}
    </div>
  )
}

export default Comments
