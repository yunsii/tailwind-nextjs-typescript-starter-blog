import { allAuthors, allBlogs } from 'contentlayer/generated'
import type { Author, Blog } from 'contentlayer/generated'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { coreContent, sortedBlogPost } from '@/lib/utils/contentlayer'

import type { CoreContent } from '@/lib/utils/contentlayer'

const DEFAULT_LAYOUT = 'PostDefault'

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  post: Blog
  authorDetails: CoreContent<Author>[]
  prev: CoreContent<Blog> | null
  next: CoreContent<Blog> | null
}> = async (ctx) => {
  const params = ctx.params as { slug: string[] }

  const slug = params.slug.join('/')
  const sortedPosts = sortedBlogPost(allBlogs)
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
  // TODO: Refactor this extraction of coreContent
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const post = sortedPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  const authorList = post.authors || ['default']
  const authorDetails = authorList
    .map((author) => {
      const authorResult = allAuthors.find((p) => p.slug === author)
      if (!authorResult) {
        return null
      }
      return coreContent(authorResult)
    })
    .filter(Boolean) as CoreContent<Author>[]

  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
    },
  }
}

export default function BlogDetail({
  post,
  authorDetails,

  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {'draft' in post && post.draft !== true
        ? (
          <MDXLayoutRenderer
            layout={post.layout || DEFAULT_LAYOUT}
            toc={post.toc}
            content={post}
            authorDetails={authorDetails}
            prev={prev}
            next={next}
          />
          )
        : (
          <div className='mt-24 text-center'>
            <PageTitle>
              Under Construction
              {' '}
              <span role='img' aria-label='roadwork sign'>
                🚧
              </span>
            </PageTitle>
          </div>
          )}
    </>
  )
}
