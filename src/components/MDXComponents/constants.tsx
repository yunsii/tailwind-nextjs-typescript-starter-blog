import Image from '../Image'
import CustomLink from '../Link'
import { BlogNewsletterForm } from '../NewsletterForm'
import Pre from '../Pre'
import TOCInline from '../TOCInline'
import Ruby from '../Ruby'

import { Wrapper } from './Wrapper'

import type { MDXComponents } from 'mdx/types'

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
