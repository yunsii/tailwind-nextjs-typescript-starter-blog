import clsx from 'clsx'

import { defineMenu } from '@/defines/menu'

export default defineMenu([
  { href: '/blog', title: 'Blog', icon: clsx('before:i-bx--bxl-blogger') },
  { href: '/tags', title: 'Tags', icon: clsx('before:i-bx--bxs-bookmarks') },
  { href: '/projects', title: 'Projects', icon: clsx('before:i-bx--bxs-bulb') },
  { href: '/about', title: 'About', icon: clsx('before:i-bx--bxs-meteor') },
])
