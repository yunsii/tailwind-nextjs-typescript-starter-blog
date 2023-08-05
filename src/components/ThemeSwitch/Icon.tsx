import SunSvg from '@/assets/theme/sun.svg'
import MoonSvg from '@/assets/theme/moon.svg'

export interface IconProps {
  dark?: boolean
}

export function Icon(props: IconProps) {
  const { dark } = props

  return dark ? (
    <MoonSvg className='dark:text-gray-100' />
  ) : (
    <SunSvg className='text-gray-900' />
  )
}
