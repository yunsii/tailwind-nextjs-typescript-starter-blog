import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'
import { get } from 'lodash-es'

import type { Node } from 'unist-util-visit'
import type { Parent } from 'unist'

export default function remarkTocHeadings(options) {
  return (tree: Parent) =>
    visit(tree, 'heading', (node: Node) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: `#${slug(textContent)}`,
        depth: get(node, 'depth'),
      })
    })
}
