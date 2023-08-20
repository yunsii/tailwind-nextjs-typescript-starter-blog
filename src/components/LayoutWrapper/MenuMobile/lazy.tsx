import clsx from 'clsx'
import React, { useEffect, useMemo, useRef } from 'react'

import menu from 'data/menu'

import { renderMenuMobileItem } from './helpers'

import type { Variants } from 'framer-motion'
import type { LazyFramerMotionChildrenProps } from '@/components/LazyFramerMotion'

const ulVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

export interface LazyMenuProps {
  open?: boolean
  onChange?: (_open: boolean) => void
  triggerCenter: {
    x: number
    y: number
  }
}

export function LazyMenu(props: LazyFramerMotionChildrenProps & LazyMenuProps) {
  const { m, open, onChange, triggerCenter } = props
  const navRef = useRef<HTMLElement>(null)

  const bgVariants = useMemo(() => {
    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(triggerCenter.x, window.innerWidth - triggerCenter.x),
        Math.max(triggerCenter.y, window.innerHeight - triggerCenter.y),
      ),
    )

    return {
      open: {
        clipPath: `circle(${endRadius * 2 + 200}px at ${triggerCenter.x}px ${
          triggerCenter.y
        }px)`,
        transition: {
          type: 'spring',
          stiffness: 20,
          restDelta: 2,
        },
      },
      closed: {
        clipPath: `circle(0 at ${triggerCenter.x}px ${triggerCenter.y}px)`,
        transition: {
          delay: 0.5,
          type: 'spring',
          stiffness: 400,
          damping: 40,
        },
      },
    } as Variants
  }, [triggerCenter.x, triggerCenter.y])

  useEffect(() => {
    if (open === true) {
      return
    }
    // onAnimationEnd 回调有问题，推测跟 https://github.com/framer/motion/issues/2029 有关
    // 通过此法绕过。
    const timer = window.setTimeout(() => {
      if (navRef.current) {
        navRef.current.classList.remove('block')
        navRef.current.classList.add('hidden')
      }
    }, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [open])

  return (
    <m.nav
      ref={navRef}
      initial={false}
      animate={open ? 'open' : 'closed'}
      onAnimationStart={() => {
        if (navRef.current) {
          navRef.current.classList.remove('hidden')
          navRef.current.classList.add('block')
        }
      }}
      className={'fixed inset-0 z-10 sm:hidden'}
    >
      <m.div
        className={clsx(
          'absolute inset-0',
          'bg-gray-200 backdrop-blur-lg duration-300 ease-in-out dark:bg-gray-800',
        )}
        variants={bgVariants}
      />
      <m.ul variants={ulVariants} className='absolute inset-0 pt-32'>
        {menu.map((link) => (
          <m.li
            key={link.title}
            variants={menuItemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {renderMenuMobileItem(link, () => {
              onChange?.(false)
            })}
          </m.li>
        ))}
      </m.ul>
    </m.nav>
  )
}
