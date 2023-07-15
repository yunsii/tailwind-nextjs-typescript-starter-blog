import { load } from 'js-yaml'
import { visit } from 'unist-util-visit'
import { get } from 'lodash-es'

import type { Node } from 'unist-util-visit'
import type { Plugin } from 'unified'

const extractFrontmatter: Plugin = () => {
  return (tree, file) => {
    visit(tree, 'yaml', (node: Node) => {
      file.data.frontmatter = load(get(node, 'value'))
    })
  }
}

export default extractFrontmatter
