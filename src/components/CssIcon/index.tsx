import React from 'react'
import { clsx } from 'clsx'

export interface ICssIconProps {
  className?: string
  style?: React.CSSProperties
}

const CssIcon: React.FC<ICssIconProps> = (props) => {
  const { className, style } = props
  return <span className={className} style={style} />
}

export default CssIcon

export function createCssIcon(icon: string) {
  return function Icon(props: ICssIconProps) {
    const { className, ...rest } = props
    return <CssIcon {...rest} className={clsx(icon, className)} />
  }
}
