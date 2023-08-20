import { useRef } from 'react'

import LogoSvg from 'data/logo.svg'

import { withLazyFramerMotion } from '../../LazyFramerMotion'

import type { LazyFramerMotionChildrenProps } from '../../LazyFramerMotion'

export interface LogoProps extends LazyFramerMotionChildrenProps {}

function Logo(props: LogoProps) {
  const { m, fallbackDom } = props
  const constraintsRef = useRef(null)

  return (
    <m.div ref={constraintsRef}>
      <m.div drag dragConstraints={constraintsRef}>
        {fallbackDom}
      </m.div>
    </m.div>
  )
}

export default withLazyFramerMotion(Logo, {
  fallback: <LogoSvg height={44} />,
})
