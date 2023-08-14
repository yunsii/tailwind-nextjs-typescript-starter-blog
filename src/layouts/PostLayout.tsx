import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { BlogSEO } from '@/components/SEO'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Tag from '@/components/Tag'
import Comments from '@/components/comments'
import metadata from 'data/metadata'

import type { CoreContent } from '@/lib/utils/contentlayer'
import type { ReactNode } from 'react'
import type { Author, Blog } from 'contentlayer/generated'

const editUrl = (fileName: string) =>
  `${metadata.siteRepo}/blob/master/data/${fileName}`
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${metadata.siteUrl}/${slug}`,
  )}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Author>[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: Props) {
  const { path, date, title, tags, filePath } = content

  return (
    <div className='mx-auto'>
      <BlogSEO
        url={`${metadata.siteUrl}/${path}`}
        authorDetails={authorDetails}
        {...content}
      />
      <ScrollTopAndComment />
      <article>
        <div className='xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'>
          <header className='pt-6 xl:pb-6'>
            <div className='space-y-1 text-center'>
              <dl className='space-y-10'>
                <div>
                  <dt className='sr-only'>Published on</dt>
                  <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        metadata.locale,
                        postDateTemplate,
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className='pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700'>
              <dt className='sr-only'>Authors</dt>
              <dd>
                <ul className='flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8'>
                  {authorDetails.map((author) => (
                    <li
                      className='flex items-center space-x-2'
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt='avatar'
                          className='h-10 w-10 rounded-full'
                        />
                      )}
                      <dl className='whitespace-nowrap text-sm font-medium leading-5'>
                        <dt className='sr-only'>Name</dt>
                        <dd className='text-gray-900 dark:text-gray-100'>
                          {author.name}
                        </dd>
                        <dt className='sr-only'>Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                            >
                              {author.twitter.replace(
                                'https://twitter.com/',
                                '@',
                              )}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
              <div className='prose max-w-none pb-8 pt-10 dark:prose-dark'>
                {children}
              </div>
              <div className='pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300'>
                <Link href={discussUrl(path)} rel='nofollow'>
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>{'View on GitHub'}</Link>
              </div>
              <Comments frontMatter={content} />
            </div>
            <footer>
              <div className='divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y'>
                {tags && (
                  <div className='py-4 xl:py-8'>
                    <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                      Tags
                    </h2>
                    <div className='mt-2 flex flex-wrap gap-y-3'>
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className='flex justify-between py-4 xl:block xl:space-y-8 xl:py-8'>
                    {prev && (
                      <div>
                        <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                          Previous Article
                        </h2>
                        <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                          Next Article
                        </h2>
                        <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className='pt-4 xl:pt-8'>
                <Link
                  href='/blog'
                  className='flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                >
                  <span className='i-iconamoon--arrow-left-1 mr-1 text-xl' />
                  Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  )
}
