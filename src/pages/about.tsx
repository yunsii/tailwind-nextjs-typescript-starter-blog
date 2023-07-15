import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps: GetStaticProps<{
  authorDetails: {
    mdxSource: string
    frontMatter: Awaited<ReturnType<typeof getFileBySlug>>['frontMatter']
  }
}> = async () => {
  const authorDetails = await getFileBySlug('authors', 'default')
  const { mdxSource, frontMatter } = authorDetails
  return { props: { authorDetails: { mdxSource, frontMatter } } }
}

export default function About({
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
