import 'heti/umd/heti.min.css'

import { BlogSEO } from '@/components/SEO'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import Link from '@/components/Link'
import metadata from 'data/metadata'

import styles from './index.module.scss'

import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from '@/lib/utils/contentlayer'

interface Props {
  content: CoreContent<Blog>
  children: React.ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export default function HetiLayout(props: React.PropsWithChildren<Props>) {
  const { content, next, prev, children } = props
  const { slug, date, title } = content

  // 尝试使用 autoSpacing 功能，貌似不生效
  // useEffect(() => {
  //   const Heti = require('heti/js/heti-addon').default
  //   const heti = new Heti('.heti')
  //   heti.autoSpacing() // 自动进行中西文混排美化和标点挤压
  // }, [])

  return (
    <div className='mx-auto'>
      <BlogSEO url={`${metadata.siteUrl}/blog/${slug}`} {...content} />
      <ScrollTopAndComment />
      <article
        lang='zh'
        className={`heti heti--classic ${styles['heti-custom']} mx-auto`}
      >
        <header>
          <div className='space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700'>
            <dl>
              <div>
                <dt className='sr-only'>发表于</dt>
                <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                  <time dateTime={date}>{formatDate(date, 'zh')}</time>
                </dd>
              </div>
            </dl>
            <div>
              <h1>{title}</h1>
            </div>
          </div>
        </header>
        <div className='max-w-none pb-8 pt-10'>{children}</div>
        <Comments frontMatter={content} />
        <footer>
          <div className='flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base'>
            {prev && (
              <div className='pt-4 xl:pt-8'>
                <Link
                  href={`/blog/${prev.slug}`}
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                >
                  &larr; {prev.title}
                </Link>
              </div>
            )}
            {next && (
              <div className='pt-4 xl:pt-8'>
                <Link
                  href={`/blog/${next.slug}`}
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                >
                  {next.title} &rarr;
                </Link>
              </div>
            )}
          </div>
        </footer>
      </article>
    </div>
  )
}
