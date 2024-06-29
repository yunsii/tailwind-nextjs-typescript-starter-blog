import type { Author, Blog } from 'contentlayer/generated'
import type { Layout } from '@/layouts/constants'

import { getLayout } from '@/layouts/dynamic'

interface MDXLayout {
  layout: Layout
  content: Blog | Author
  [key: string]: unknown
}

export function Wrapper({ layout, ...rest }: MDXLayout) {
  const Layout = getLayout(layout)
  return <Layout {...(rest as any)} />
}
