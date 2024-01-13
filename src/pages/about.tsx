import { allAuthors } from 'contentlayer/generated'
import type { Author } from 'contentlayer/generated'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { Layout } from '@/layouts/constants'

const DEFAULT_LAYOUT = Layout.AuthorDefault

export const getStaticProps: GetStaticProps<{ author: Author }> = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')

  if (!author) {
    return {
      notFound: true,
    }
  }

  return { props: { author } }
}

export default function About({
  author,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MDXLayoutRenderer
      layout={author.layout || DEFAULT_LAYOUT}
      content={author}
    />
  )
}
