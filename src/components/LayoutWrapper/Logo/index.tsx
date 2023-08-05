import LogoSvg from 'data/logo.svg?svgr'

import LazyFramerMotion from '../../LazyFramerMotion'

import { LazyLogo } from './lazy'

export default function Logo() {
  return (
    <LazyFramerMotion fallback={<LogoSvg height={44} />}>
      {(props) => {
        return <LazyLogo {...props} />
      }}
    </LazyFramerMotion>
  )
}
