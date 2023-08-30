import { cls } from 'tagged-classnames-free'

import { defineMenu } from '@/defines/menu'

export default defineMenu([
  { href: '/blog', title: 'Blog', icon: cls`before:i-bx--bxl-blogger` },
  { href: '/tags', title: 'Tags', icon: cls`before:i-bx--bxs-bookmarks` },
  { href: '/projects', title: 'Projects', icon: cls`before:i-bx--bxs-bulb` },
  { href: '/about', title: 'About', icon: cls`before:i-bx--bxs-meteor` },
])
