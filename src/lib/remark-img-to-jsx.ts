import fs from 'node:fs'
import process from 'node:process'

import sizeOf from 'image-size'
import { visit } from 'unist-util-visit'
import { get, set } from 'lodash-es'

import type { Literal, Node, Parent } from 'unist'

type ImageNode = Parent & {
  url: string
  alt: string
  name: string
  attributes: (Literal & { name: string })[]
}

export default function remarkImgToJsx() {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node) => {
        return (
          node.type === 'paragraph'
          && (get(node, 'children') || []).some((n: Node) => n.type === 'image')
        )
      },
      (node) => {
        const imageNode = ((get(node, 'children') || []).find(
          (n: Node) => n.type === 'image',
        ) || null) as ImageNode | null

        if (!imageNode) {
          return
        }

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

          // Convert original node to next/image
          imageNode.type = 'mdxJsxFlowElement'
          imageNode.name = 'Image'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            {
              type: 'mdxJsxAttribute',
              name: 'height',
              value: dimensions.height,
            },
          ]

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          set(node, 'children', [imageNode])
        }
      },
    )
  }
}
