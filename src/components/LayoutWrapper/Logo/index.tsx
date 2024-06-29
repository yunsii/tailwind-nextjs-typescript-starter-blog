import LogoSvg from 'data/logo.svg'

import { withLazyFramerMotion } from '../../LazyFramerMotion/hoc'

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

const WrapLogo = withLazyFramerMotion(Logo, {
  fallback: <LogoSvg height={44} />,
})

export default WrapLogo
