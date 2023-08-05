import React from 'react'

import { useFramerMotion } from '@/hooks/framer-motion'

import type { MergedFramerMotionModules } from '@/hooks/framer-motion'

export interface LazyFramerMotionChildrenProps {
  modules: MergedFramerMotionModules
  fallback: React.ReactNode
}

export interface ILazyFramerMotionProps {
  fallback: React.ReactNode
  children: (props: LazyFramerMotionChildrenProps) => JSX.Element
}

const LazyFramerMotion: React.FC<ILazyFramerMotionProps> = (props) => {
  const { fallback, children } = props
  const { ready, modules } = useFramerMotion()

  if (ready) {
    return children({ modules, fallback })
  }

  return <>{fallback}</>
}

export default LazyFramerMotion
