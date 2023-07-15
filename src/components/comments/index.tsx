import dynamic from 'next/dynamic'

import siteMetadata from 'data/siteMetadata'

import type { PostFrontMatter } from '@/types/PostFrontMatter'

interface Props {
  frontMatter: PostFrontMatter
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
  const commentProvider = siteMetadata?.comment.provider
  if (!commentProvider) {
    return <></>
  }
  return (
    <div id='comment'>
      {siteMetadata.comment && siteMetadata.comment.provider === 'giscus' && (
        <GiscusComponent />
      )}
      {siteMetadata.comment &&
        siteMetadata.comment.provider === 'utterances' && (
          <UtterancesComponent />
        )}
      {siteMetadata.comment && siteMetadata.comment.provider === 'disqus' && (
        <DisqusComponent frontMatter={frontMatter} />
      )}
    </div>
  )
}

export default Comments
