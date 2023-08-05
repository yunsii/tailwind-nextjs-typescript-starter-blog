import Link from 'next/link'
import React from 'react'
import { clsx } from 'clsx'

import ArrowRight from '@/assets/arrow-right.svg'

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
      className={clsx(
        'group text-primary inline-flex items-center hover:text-primary-hover',
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className='ml-1 h-6 w-6 translate-x-0 scale-75 transition-all group-hover:translate-x-1' />
    </Link>
  )
}

export default LinkGo
