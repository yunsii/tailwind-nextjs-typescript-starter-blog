import { getMDXComponent } from 'mdx-bundler/client'
import React, { useMemo } from 'react'

import Image from './Image'
import CustomLink from './Link'
import { BlogNewsletterForm } from './NewsletterForm'
import Pre from './Pre'
import TOCInline from './TOCInline'

import type { ComponentMap } from 'mdx-bundler/client'

const Wrapper: React.ComponentType<{ layout: string }> = ({
  layout,
  ...rest
}) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
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
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
