import { mkdirSync } from 'fs'
import path from 'path'

import { slug } from 'github-slugger'

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../data/siteMetadata'

import { escape } from './html-escaper'
import { writeXml } from './_helpers/xml'

// TODO: refactor into contentlayer once compute over all docs is enabled
export async function getAllTags() {
  const tagCount = {}
  // Iterate through each post, putting all found tags into `tags`
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}

const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${
        siteMetadata.author
      })</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
        siteMetadata.siteUrl
      }/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`

async function generate() {
  // RSS for blog post
  if (allBlogs.length > 0) {
    const rss = generateRss(allBlogs)
    writeXml(rss, './public/feed.xml')
  }

  // RSS for tags
  // TODO: use AllTags from contentlayer when computed docs is ready
  if (allBlogs.length > 0) {
    const tags = await getAllTags()
    for (const tag of Object.keys(tags)) {
      const filteredPosts = allBlogs.filter(
        (post) =>
          post.draft !== true && post.tags.map((t) => slug(t)).includes(tag),
      )
      const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeXml(rss, path.join(rssPath, 'feed.xml'))
    }
  }
}

generate()
