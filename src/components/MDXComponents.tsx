import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { coreContent } from '@/lib/utils/contentlayer'
import { mdxDynamicLayouts } from '@/layouts/dynamic'

import Image from './Image'
import CustomLink from './Link'
import { BlogNewsletterForm } from './NewsletterForm'
import Pre from './Pre'
import TOCInline from './TOCInline'

import type { DynamicLayout } from '@/layouts/dynamic'
import type { ComponentMap } from 'mdx-bundler/client'
import type { Authors, Blog } from 'contentlayer/generated'

interface MDXLayout {
  layout: DynamicLayout
  content: Blog | Authors
  [key: string]: unknown
}

const Wrapper = ({ layout, ...rest }: MDXLayout) => {
  const Layout = mdxDynamicLayouts[layout]
  return <Layout {...(rest as any)} />
}

// https://mdxjs.com/table-of-components/#components
export const MDXComponents: ComponentMap = {
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
  content: Blog | Authors
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, content, ...rest }: Props) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return (
    <MDXLayout
      layout={layout}
      content={mainContent}
      components={MDXComponents}
      {...rest}
    />
  )
}
