import Head from 'next/head'
import { useRouter } from 'next/router'
import { ArticleJsonLd, NextSeo } from 'next-seo'

import metadata from 'data/metadata'

import type { Author, Blog } from 'contentlayer/generated'
import type { CoreContent } from '@/lib/utils/contentlayer'

interface PageSEOProps {
  title: string
  description?: string
}

export function PageSEO({ title, description }: PageSEOProps) {
  const ogImageUrl = metadata.siteUrl + metadata.socialBanner
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        images: [{ url: ogImageUrl }],
      }}
    />
  )
}

export function TagSEO({ title, description }: PageSEOProps) {
  const ogImageUrl = metadata.siteUrl + metadata.socialBanner
  const router = useRouter()
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          images: [{ url: ogImageUrl }],
        }}
      />
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title={`${description} - RSS feed`}
          href={`${metadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

interface BlogSeoProps extends CoreContent<Blog> {
  authorDetails?: CoreContent<Author>[]
  url: string
}

export function BlogSEO({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl = url,
}: BlogSeoProps) {
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const imagesArr
    = images.length === 0
      ? [metadata.socialBanner]
      : typeof images === 'string'
        ? [images]
        : images

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      'url': `${metadata.siteUrl}${img}`,
    }
  })

  let authorList
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        '@type': 'Person',
        'name': author.name,
      }
    })
  }
  else {
    authorList = {
      '@type': 'Person',
      'name': metadata.author,
    }
  }

  return (
    <>
      <NextSeo
        title={title}
        description={summary}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          images: featuredImages,
        }}
        canonical={canonicalUrl}
        twitter={{
          cardType: 'summary_large_image',
          site: 'https://twitter.com/Twitter',
        }}
      />
      <Head>
        {date && (
          <meta property='article:published_time' content={publishedAt} />
        )}
        {lastmod && (
          <meta property='article:modified_time' content={modifiedAt} />
        )}
      </Head>
      <ArticleJsonLd
        url={url}
        title={title}
        images={featuredImages.map((item) => item.url)}
        datePublished={publishedAt}
        dateModified={modifiedAt}
        authorName={authorList}
        description={summary || ''}
        publisherName={metadata.author}
        publisherLogo={`${metadata.siteUrl}${metadata.siteLogo}`}
      />
    </>
  )
}
