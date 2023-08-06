import React from 'react'

import { useFlubberInterpolate, useFramerMotion } from '@/hooks/framer-motion'

import type { MotionValue } from 'framer-motion'
import type { FramerMotionModules } from '@/hooks/framer-motion'

export const getIndex = (_: any, index: number) => index

export type UseFlubber = (
  progress: MotionValue<number>,
  paths: string[],
) => MotionValue<string>

export interface LazyFramerMotionChildrenProps {
  modules: FramerMotionModules
  useFlubber: UseFlubber
  fallback: React.ReactNode
}

export interface ILazyFramerMotionProps {
  fallbackOnly?: boolean
  fallback: React.ReactNode
  children: (props: LazyFramerMotionChildrenProps) => JSX.Element
}

const LazyFlubber: React.FC<ILazyFramerMotionProps> = (props) => {
  const { fallback, fallbackOnly, children } = props
  const { ready: modulesReady, modules } = useFramerMotion()
  const { ready: interpolateReady, interpolate } = useFlubberInterpolate()

  if (modulesReady && interpolateReady && !fallbackOnly) {
    const useFlubber = (progress: MotionValue<number>, paths: string[]) => {
      return modules.useTransform(progress, paths.map(getIndex), paths, {
        mixer: (a, b) => {
          return interpolate(a, b, { maxSegmentLength: 0.1 })
        },
      })
    }

    return children({ modules, fallback, useFlubber })
  }

  return <>{fallback}</>
}

export default LazyFlubber
