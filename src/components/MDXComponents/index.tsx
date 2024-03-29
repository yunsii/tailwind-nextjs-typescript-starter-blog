import 'katex/dist/katex.css'

import { useMDXComponent } from 'next-contentlayer/hooks'

import type { MDXComponents } from 'mdx/types'
import type { Author, Blog } from 'contentlayer/generated'
import Image from '../Image'

import CustomLink from '../Link'
import { BlogNewsletterForm } from '../NewsletterForm'
import Pre from '../Pre'
import TOCInline from '../TOCInline'
import Ruby from '../Ruby'

import styles from './prism.module.scss'
import { getLayout } from '@/layouts/dynamic'
import { coreContent } from '@/lib/utils/contentlayer'

import type { Layout } from '@/layouts/constants'

interface MDXLayout {
  layout: Layout
  content: Blog | Author
  [key: string]: unknown
}

function Wrapper({ layout, ...rest }: MDXLayout) {
  const Layout = getLayout(layout)
  return <Layout {...(rest as any)} />
}

// https://mdxjs.com/table-of-components/#components
export const customMDXComponents: MDXComponents = {
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,

  // 自定义 JSX 替换组件
  Image,
  TOCInline,
  BlogNewsletterForm,
  Ruby,
}

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
