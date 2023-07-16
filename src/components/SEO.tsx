import Head from 'next/head'
import { useRouter } from 'next/router'
import { ArticleJsonLd, NextSeo } from 'next-seo'

import siteMetadata from 'data/siteMetadata'

import type { CoreContent } from '@/lib/utils/contentlayer'
import type { Authors, Blog } from 'contentlayer/generated'

interface PageSEOProps {
  title: string
  description?: string
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
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

export const TagSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
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
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

interface BlogSeoProps extends CoreContent<Blog> {
  authorDetails?: CoreContent<Authors>[]
  url: string
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}: BlogSeoProps) => {
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      'url': `${siteMetadata.siteUrl}${img}`,
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
  } else {
    authorList = {
      '@type': 'Person',
      'name': siteMetadata.author,
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
        description={summary}
        publisherName={siteMetadata.author}
        publisherLogo={`${siteMetadata.siteUrl}${siteMetadata.siteLogo}`}
      />
    </>
  )
}
