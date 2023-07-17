import { slug } from 'github-slugger'

import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { getAllTags } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import metadata from 'data/metadata'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

// TODO: refactor into contentlayer once compute over all docs is enabled

export const getStaticProps: GetStaticProps<{
  tags: Record<string, number>
}> = async () => {
  const tags = await getAllTags(allBlogs)

  return { props: { tags } }
}

export default function Tags({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO
        title={`Tags - ${metadata.author}`}
        description='Things I blog about'
      />
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            Tags
          </h1>
        </div>
        <div className='flex max-w-lg flex-wrap'>
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className='mb-2 mr-5 mt-2'>
                <Tag text={t} />
                <Link
                  href={`/tags/${slug(t)}`}
                  className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
