import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { coreContent } from '@/lib/utils/contentlayer'
import { mdxDynamicLayouts } from '@/layouts/dynamic'

import Image from './Image'
import CustomLink from './Link'
import { BlogNewsletterForm } from './NewsletterForm'
import Pre from './Pre'
import TOCInline from './TOCInline'

import type { MDXComponents } from 'mdx/types'
import type { DynamicLayout } from '@/layouts/dynamic'
import type { Author, Blog } from 'contentlayer/generated'

interface MDXLayout {
  layout: DynamicLayout
  content: Blog | Author
  [key: string]: unknown
}

const Wrapper = ({ layout, ...rest }: MDXLayout) => {
  const Layout = mdxDynamicLayouts[layout]
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
}

interface Props {
  layout: string
  content: Blog | Author
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, content, ...rest }: Props) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return (
    <MDXLayout
      layout={layout}
      content={mainContent}
      components={customMDXComponents}
      {...rest}
    />
  )
}
