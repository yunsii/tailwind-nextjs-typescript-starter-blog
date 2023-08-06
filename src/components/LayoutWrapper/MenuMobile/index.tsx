import clsx from 'clsx'
import React from 'react'

import menu from 'data/menu'

import LazyFramerMotion from '../../LazyFramerMotion'

import { LazyMenu } from './lazy'
import { renderMenuMobileItem } from './helpers'

import type { LazyMenuProps } from './lazy'

export default function MenuMobile(props: LazyMenuProps) {
  const { open, onChange } = props

  const bgClassName = clsx(
    'fixed inset-0 pt-32',
    'bg-gray-200 backdrop-blur-lg duration-300 ease-in-out dark:bg-gray-800',
  )

  return (
    <LazyFramerMotion
      // fallbackOnly
      fallback={
        <nav className={open ? 'fixed inset-0 z-10 block sm:hidden' : 'hidden'}>
          <ul className={bgClassName}>
            {menu.map((link) => {
              return (
                <li key={link.title}>
                  {renderMenuMobileItem(link, () => {
                    onChange?.(false)
                  })}
                </li>
              )
            })}
          </ul>
        </nav>
      }
    >
      {(_props) => {
        return <LazyMenu {..._props} {...props} />
      }}
    </LazyFramerMotion>
  )
}
