import { type ReactNode, useEffect, useRef, useState } from 'react'
import { cls } from 'tagged-classnames-free'

import menu from 'data/menu'
import metadata from 'data/metadata'

import Footer from '../Footer'
import Link from '../Link'
import ThemeSwitch from '../ThemeSwitch'

import Logo from './Logo'
import MenuButton from './MenuButton'
import MenuMobile from './MenuMobile'

import type { MenuButtonAction } from './MenuButton'

interface Props {
  className?: string
  children: ReactNode
}

const LayoutWrapper = ({ className = '', children }: Props) => {
  const [open, setOpen] = useState(false)
  const [triggerCenter, setTriggerCenter] = useState<{
    x: number
    y: number
  }>()
  const menuButtonActionRef = useRef<MenuButtonAction>(null)

  useEffect(() => {
    const target = menuButtonActionRef.current?.getTrigger()
    if (!target) {
      return
    }
    const clientRect = target.getBoundingClientRect()

    setTriggerCenter({
      x: Math.round(clientRect.x + clientRect.width / 2),
      y: Math.round(clientRect.y + clientRect.height / 2),
    })
  }, [])

  return (
    <div
      className={`${className} mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0`}
    >
      <div className='flex h-screen flex-col justify-between'>
        <header className='relative z-20 flex items-center justify-between py-10'>
          <div>
            <Link href='/' aria-label={metadata.headerTitle}>
              <div
                className='flex items-center justify-between'
                onMouseDown={(event) => {
                  // 单点击可触发路由跳转，长按不会，可能内部的 Drag 事件做了处理
                  event.stopPropagation()
                  event.preventDefault()
                }}
              >
                <div className='flex items-center sm:mr-3'>
                  <Logo />
                </div>
                {typeof metadata.headerTitle === 'string' ? (
                  <div className='hidden text-2xl font-semibold sm:block'>
                    {metadata.headerTitle}
                  </div>
                ) : (
                  metadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className='flex items-center text-base leading-5'>
            <div className='hidden sm:block'>
              {menu.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cls`
                    p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4
                  `}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MenuButton
              ref={menuButtonActionRef}
              open={open}
              onChange={setOpen}
            />
          </div>
        </header>
        <MenuMobile
          open={open}
          onChange={setOpen}
          triggerCenter={triggerCenter}
        />
        <main className='mb-auto'>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutWrapper
