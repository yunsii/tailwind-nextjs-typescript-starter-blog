import menu from 'data/menu'
import Logo from 'data/logo.svg'
import metadata from 'data/metadata'

import Footer from './Footer'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
      <div className='flex h-screen flex-col justify-between'>
        <header className='flex items-center justify-between py-10'>
          <div>
            <Link href='/' aria-label={metadata.headerTitle}>
              <div className='flex items-center justify-between'>
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
                  className='p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4'
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className='mb-auto'>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutWrapper
