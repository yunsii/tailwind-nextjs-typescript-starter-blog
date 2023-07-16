import { mkdirSync } from 'fs'
import path from 'path'

import { encode } from 'html-entities'
import { slug } from 'github-slugger'

import { allBlogs as _allBlogs } from '../.contentlayer/generated/index.mjs'
import metadata from '../data/metadata'

import { writeXml } from './_helpers/xml'

import type { Blog } from 'contentlayer/generated'

const allBlogs = _allBlogs as Blog[]

// TODO: refactor into contentlayer once compute over all docs is enabled
export async function getAllTags() {
  const tagCount: Record<string, number> = {}
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

const generateRssItem = (post: Record<string, any>) => `
  <item>
    <guid>${metadata.siteUrl}/blog/${post.slug}</guid>
    <title>${encode(post.title)}</title>
    <link>${metadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${encode(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${metadata.email} (${metadata.author})</author>
    ${
      post.tags &&
      post.tags.map((t: string) => `<category>${t}</category>`).join('')
    }
  </item>
`

const generateRss = (posts: Blog[], page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${encode(metadata.title)}</title>
      <link>${metadata.siteUrl}/blog</link>
      <description>${encode(metadata.description)}</description>
      <language>${metadata.language}</language>
      <managingEditor>${metadata.email} (${metadata.author})</managingEditor>
      <webMaster>${metadata.email} (${metadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
        metadata.siteUrl
      }/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`

async function generate() {
  // RSS for blog post
  if (allBlogs.length > 0) {
    const rss = generateRss(allBlogs as Blog[])
    writeXml(rss, './public/feed.xml')
  }

  // RSS for tags
  // TODO: use AllTags from contentlayer when computed docs is ready
  if (allBlogs.length > 0) {
    const tags = await getAllTags()
    for (const tag of Object.keys(tags)) {
      const filteredPosts = allBlogs.filter(
        (post) =>
          post.draft !== true && post.tags?.map((t) => slug(t)).includes(tag),
      )
      const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeXml(rss, path.join(rssPath, 'feed.xml'))
    }
  }
}

generate()
