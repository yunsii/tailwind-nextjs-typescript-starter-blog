import React, { useRef } from 'react'
import { cls } from 'tagged-classnames-free'

import LazyFramerMotion from '../../LazyFramerMotion'

import { LazyIcon } from './lazy'

export interface MenuButtonAction {
  getTrigger: () => HTMLButtonElement | null
}

export interface MenuButtonProps {
  open?: boolean
  onChange?: (_open: boolean) => void
}

function MenuButton(props: MenuButtonProps, ref: React.Ref<MenuButtonAction>) {
  const { open, onChange } = props

  const fallbackRef = useRef<HTMLButtonElement>(null)
  const renderRef = useRef<HTMLButtonElement>(null)

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    'type': 'button',
    'className': cls`ml-1 mr-1 h-6 w-6 rounded sm:hidden`,
    'aria-label': 'Toggle Menu',
    'onClick': () => {
      onChange?.(!open)
    },
  }

  React.useImperativeHandle(ref, () => {
    return {
      getTrigger: () => {
        return renderRef.current || fallbackRef.current
      },
    }
  })

  return (
    <LazyFramerMotion
      fallback={
        <button ref={fallbackRef} {...buttonProps}>
          {open ? (
            <span className='i-custom--close h-full w-full' />
          ) : (
            <span className='i-custom--menu h-full w-full' />
          )}
        </button>
      }
    >
      {(_props) => {
        return (
          <button ref={renderRef} {...buttonProps}>
            <LazyIcon {..._props} open={open} />
          </button>
        )
      }}
    </LazyFramerMotion>
  )
}

export default React.forwardRef<MenuButtonAction, MenuButtonProps>(MenuButton)
