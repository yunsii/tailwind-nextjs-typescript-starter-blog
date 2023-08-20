import React, { useMemo, useRef } from 'react'
import { omit, omitBy } from 'lodash-es'
import { isValidMotionProp, type motion } from 'framer-motion'

import { useFramerMotion } from '@/hooks/framer-motion'

import { htmlElements, svgElements } from './support-elements'

import type { FramerMotionModules } from '@/hooks/framer-motion'

export interface LazyFramerMotionAction<Dom extends HTMLElement = any> {
  getDom: () => Dom | null
}

export interface LazyFramerMotionChildrenProps<Dom extends HTMLElement = any>
  extends Omit<FramerMotionModules, 'motion'> {
  m: typeof motion
  domRef: React.RefObject<Dom>
  fallbackDom: React.ReactNode
}

export interface LazyFramerMotionFallbackProps<Dom extends HTMLElement = any> {
  m: typeof motion
  domRef: React.RefObject<Dom>
}

export interface LazyFramerMotionProps<Dom extends HTMLElement = any> {
  /**
   * Render fallback only, you can use it for:
   *
   * - Debug for fallback dom
   * - No others modules deps, except `motion` module
   */
  fallbackOnly?: boolean
  fallback?:
    | React.ReactNode
    | ((props: LazyFramerMotionFallbackProps<Dom>) => React.ReactNode)
  actionRef?: React.RefObject<LazyFramerMotionAction<Dom>>
  children?: (props: LazyFramerMotionChildrenProps) => JSX.Element
}

function LazyFramerMotion<Dom extends HTMLElement = any>(
  props: LazyFramerMotionProps,
) {
  const { fallback, fallbackOnly, actionRef, children } = props
  const { ready, modules } = useFramerMotion()

  const fallbackRef = useRef<Dom>(null)
  const renderRef = useRef<Dom>(null)

  React.useImperativeHandle(actionRef, () => {
    return {
      getDom: () => {
        return renderRef.current || fallbackRef.current
      },
    }
  })

  const m: typeof motion = useMemo(() => {
    if (ready) {
      return modules.motion
    }

    const fallbackMotion = {} as typeof motion

    ;[...htmlElements, ...svgElements].forEach((item) => {
      const component = React.forwardRef<any, any>((_props, ref) => {
        const props: any = omitBy(_props, (_, key) => {
          if (key === 'style') {
            return false
          }
          return isValidMotionProp(key)
        })

        return React.createElement(item, { ref, ...props })
      })
      component.displayName = item

      fallbackMotion[item] = component as any
    })

    return fallbackMotion
  }, [modules?.motion, ready])

  const restModules = omit(modules, 'motion')
  const fallbackDom =
    typeof fallback === 'function'
      ? fallback?.({ m, domRef: fallbackRef })
      : fallback

  if (ready && !fallbackOnly) {
    return (
      <>{children?.({ ...restModules, m, domRef: renderRef, fallbackDom })}</>
    )
  }

  return <>{fallbackDom}</>
}

export default LazyFramerMotion

export function withLazyFramerMotion<
  Props extends LazyFramerMotionChildrenProps = LazyFramerMotionChildrenProps,
>(
  WrappedComponent: React.ComponentType<Props>,
  lazyFramerMotionProps: Omit<LazyFramerMotionProps, 'children' | 'actionRef'>,
) {
  const WithLazyFramerMotion = (
    extraProps: Omit<Props, keyof LazyFramerMotionChildrenProps> & {
      actionRef?: LazyFramerMotionProps['actionRef']
    },
  ) => {
    return (
      <LazyFramerMotion {...lazyFramerMotionProps}>
        {(props) => {
          const mergedProps = { ...extraProps, ...props } as Props
          return <WrappedComponent {...mergedProps} />
        }}
      </LazyFramerMotion>
    )
  }

  WithLazyFramerMotion.displayName = `WithLazyFramerMotion(${getDisplayName(
    WrappedComponent,
  )})`

  return WithLazyFramerMotion
}

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
