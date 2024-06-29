import type { SVGMotionProps } from 'framer-motion'
import type { LazyFramerMotionChildrenProps } from '@/components/LazyFramerMotion'

import { useRuntimeComponent } from '@/hooks/framer-motion'

export function LazyIcon(
  props: LazyFramerMotionChildrenProps & { open?: boolean },
) {
  const { m, open } = props

  const Path = useRuntimeComponent((props: SVGMotionProps<SVGPathElement>) => (
    <m.path
      fill='transparent'
      strokeWidth='3'
      stroke='currentColor'
      strokeLinecap='round'
      {...props}
    />
  ))

  return (
    <m.svg
      initial={false}
      animate={open ? 'open' : 'closed'}
      viewBox='-1.5 -2 24 24'
    >
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d='M 2 9.423 L 20 9.423'
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </m.svg>
  )
}
