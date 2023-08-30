import dynamic from 'next/dynamic'

import type { Layout } from './constants'

const DynamicAuthorDefault = dynamic(() => import('./AuthorLayout'))
const DynamicPostDefault = dynamic(() => import('./PostLayout'))
const DynamicPostSimple = dynamic(() => import('./PostSimple'))
const DynamicPostHeti = dynamic(() => import('./PostHeti'))

const _dynamicLayout = {
  AuthorDefault: DynamicAuthorDefault,
  PostDefault: DynamicPostDefault,
  PostSimple: DynamicPostSimple,
  PostHeti: DynamicPostHeti,
} satisfies Record<Layout, React.ComponentType<any>>

export function getLayout(layout: Layout) {
  return _dynamicLayout[layout]
}
