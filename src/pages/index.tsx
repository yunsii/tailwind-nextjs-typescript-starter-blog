import { allBlogs } from 'contentlayer/generated'
import metadata from 'data/metadata'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import NewsletterForm from '@/components/NewsletterForm'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import LinkGo from '@/components/LinkGo'

import type { CoreContent } from '@/lib/utils/contentlayer'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{
  posts: CoreContent<Blog>[]
}> = async () => {
  // TODO: move computation to get only the essential frontmatter to contentlayer.config
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={metadata.title} description={metadata.description} />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Latest
          </h1>
          <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
            {metadata.description}
          </p>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className='py-12'>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                    <dl>
                      <dt className='sr-only'>Published on</dt>
                      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className='space-y-5 xl:col-span-3'>
                      <div className='space-y-6'>
                        <div>
                          <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                            <Link
                              href={`/blog/${slug}`}
                              className='text-gray-900 dark:text-gray-100'
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className='mt-2 flex flex-wrap'>
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                          {summary}
                        </div>
                      </div>
                      <div className='text-base font-medium leading-6'>
                        <LinkGo
                          href={`/blog/${slug}`}
                          aria-label={`Read now of "${title}"`}
                        >
                          {/* Read more is bad practice, ref: https://developer.chrome.com/docs/lighthouse/seo/link-text */}
                          Read now
                        </LinkGo>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className='flex justify-end text-base font-medium leading-6'>
          <LinkGo href='/blog' aria-label='all posts'>
            All Posts
          </LinkGo>
        </div>
      )}
      {metadata?.newsletter?.provider && (
        <div className='flex items-center justify-center pt-4'>
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
