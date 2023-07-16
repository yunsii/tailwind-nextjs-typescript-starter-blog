import path from 'node:path'

import globby from 'globby'

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../data/siteMetadata'

import { writeXml } from './_helpers/xml'

import type { Blog } from '../.contentlayer/generated'

const outputFilePath = path.join(process.cwd(), 'public', 'sitemap.xml')

async function generate() {
  const contentPages = (allBlogs as Blog[])
    .filter((x) => !x.draft && !x.canonicalUrl)
    .map((x) => `/${x._raw.flattenedPath}`)
  const pages = await globby([
    'src/pages/*.(js|tsx)',
    'public/tags/**/*.xml',
    '!src/pages/_*.(js|tsx)',
    '!src/pages/api',
    '!src/pages/404.(js|tsx)',
    '!src/pages/500.(js|tsx)',
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .concat(contentPages)
              .map((page) => {
                const path = page
                  .replace('src/pages/', '/')
                  .replace('public/', '/')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '')
                const route = path === '/index' ? '' : path
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  await writeXml(sitemap, outputFilePath)
}

generate()
