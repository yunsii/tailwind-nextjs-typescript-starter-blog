import LazyFramerMotion from '.'

import type { LazyFramerMotionChildrenProps, LazyFramerMotionProps } from '.'

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
