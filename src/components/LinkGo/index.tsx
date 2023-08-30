import Link from 'next/link'
import React from 'react'
import { tw } from 'tagged-classnames-free'

import type { LinkProps } from 'next/link'

export interface ILinkGoProps extends LinkProps {
  className?: string
  children?: React.ReactNode
}

const LinkGo: React.FC<ILinkGoProps> = (props) => {
  const { children, className, ...rest } = props
  return (
    <Link
      {...rest}
      className={tw`
        group text-primary inline-flex items-center hover:text-primary-hover
        ${className}
      `}
    >
      <span>{children}</span>
      <span className='i-iconamoon--arrow-right-1 ml-1 translate-x-0 text-xl transition-all group-hover:translate-x-1' />
    </Link>
  )
}

export default LinkGo
