import Link from '@/components/Link'

import type { MenuItem } from '@/defines/menu'

export interface IMenuMobileItemProps {
  link: MenuItem
  onClick?: () => void
}

const MenuMobileItem: React.FC<IMenuMobileItemProps> = (props) => {
  const { link, onClick } = props

  return (
    <Link
      href={link.href}
      className={tw`
        flex items-center px-10 py-4 text-2xl
        font-bold tracking-widest text-gray-900 dark:text-gray-100
        ${link.icon}
      `}
      onClick={onClick}
    >
      <span className='ml-1'>{link.title}</span>
    </Link>
  )
}

export default MenuMobileItem
