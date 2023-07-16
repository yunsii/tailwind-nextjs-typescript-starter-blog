import dynamic from 'next/dynamic'

const DynamicAuthorLayout = dynamic(() => import('./AuthorLayout'))
const DynamicPostLayout = dynamic(() => import('./PostLayout'))
const DynamicPostSimple = dynamic(() => import('./PostSimple'))

export const mdxDynamicLayouts = {
  AuthorLayout: DynamicAuthorLayout,
  PostLayout: DynamicPostLayout,
  PostSimple: DynamicPostSimple,
}

export type DynamicLayout = keyof typeof mdxDynamicLayouts
