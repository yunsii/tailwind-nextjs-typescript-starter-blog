import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'
import { remark } from 'remark'

import type { Heading } from 'mdast'
import type { Toc } from '@/types/Toc'
import type { Plugin } from 'unified'

const remarkTocHeadings: Plugin = () => {
  return (tree, file) => {
    const toc: Toc = []
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node)
      toc.push({
        value: textContent,
        url: `#${slug(textContent)}`,
        depth: node.depth,
      })
    })
    file.data.toc = toc
  }
}

export default remarkTocHeadings

export async function extractTocHeadings(markdown: string) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown)
  return vfile.data.toc
}
