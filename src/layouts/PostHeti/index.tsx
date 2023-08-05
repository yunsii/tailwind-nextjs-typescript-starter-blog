import 'heti/umd/heti.min.css'

import { useEffect, useRef, useState } from 'react'

import { BlogSEO } from '@/components/SEO'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import Link from '@/components/Link'
import metadata from 'data/metadata'
import ArrowRight from '@/assets/arrow-right.svg'
import ArrowLeft from '@/assets/arrow-left.svg'

import styles from './index.module.scss'
import { autoSpacing } from './helpers'

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
  const [layoutPolished, setLayoutPolished] = useState(false)
  const addonRef = useRef(false)

  useEffect(() => {
    if (addonRef.current) {
      return
    }
    addonRef.current = true

    autoSpacing().finally(() => {
      setLayoutPolished(true)
    })
  }, [])

  return (
    <div className={`mx-auto ${layoutPolished ? 'block' : 'hidden'}`}>
      <BlogSEO url={`${metadata.siteUrl}/blog/${slug}`} {...content} />
      <ScrollTopAndComment />
      <article
        lang='zh'
        className={`heti heti--classic ${styles['heti-custom']} mx-auto text-[#161823] dark:text-[#a3a3a3]`}
      >
        <header>
          <div className='space-y-1 border-b border-gray-200 pb-4 text-center dark:border-gray-700'>
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
      </article>
      <footer>
        <div className='flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base'>
          {prev && (
            <div className='pt-4 xl:pt-8'>
              <Link
                href={`/blog/${prev.slug}`}
                className='flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              >
                <ArrowLeft className='mr-2 w-6 scale-75' />
                {prev.title}
              </Link>
            </div>
          )}
          {next && (
            <div className='pt-4 xl:pt-8'>
              <Link
                href={`/blog/${next.slug}`}
                className='flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              >
                {next.title}
                <ArrowRight className='ml-2 w-6 scale-75' />
              </Link>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
