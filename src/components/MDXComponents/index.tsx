import 'katex/dist/katex.css'

import { useMDXComponent } from 'next-contentlayer/hooks'

import styles from './prism.module.scss'
import { customMDXComponents } from './constants'

import type { Author, Blog } from 'contentlayer/generated'
import type { Layout } from '@/layouts/constants'

import { coreContent } from '@/lib/utils/contentlayer'

interface Props {
  layout: Layout | `${Layout}`
  content: Blog | Author
  [key: string]: unknown
}

export function MDXLayoutRenderer({ layout, content, ...rest }: Props) {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return (
    <div className={styles['mdx-wrapper']}>
      <MDXLayout
        layout={layout}
        content={mainContent}
        components={customMDXComponents}
        {...rest}
      />
    </div>
  )
}
