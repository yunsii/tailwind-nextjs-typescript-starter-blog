import clsx from 'clsx'

import Link from '@/components/Link'

import type { MenuItem } from '@/defines/menu'

export function renderMenuMobileItem(link: MenuItem, onClick?: () => void) {
  return (
    <Link
      href={link.href}
      className={clsx(
        'text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100',
        'flex px-4 py-4',
      )}
      onClick={onClick}
    >
      {link.title}
    </Link>
  )
}
