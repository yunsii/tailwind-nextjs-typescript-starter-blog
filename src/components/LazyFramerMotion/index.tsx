import React from 'react'

import { useFramerMotion } from '@/hooks/framer-motion'

import type { FramerMotionModules } from '@/hooks/framer-motion'

export interface LazyFramerMotionChildrenProps {
  modules: FramerMotionModules
  fallback: React.ReactNode
}

export interface ILazyFramerMotionProps {
  fallbackOnly?: boolean
  fallback: React.ReactNode
  children: (props: LazyFramerMotionChildrenProps) => JSX.Element
}

const LazyFramerMotion: React.FC<ILazyFramerMotionProps> = (props) => {
  const { fallback, fallbackOnly, children } = props
  const { ready, modules } = useFramerMotion()

  if (ready && !fallbackOnly) {
    return children({ modules, fallback })
  }

  return <>{fallback}</>
}

export default LazyFramerMotion
