import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

import Link from './Link'

export default function Footer() {
  return (
    <footer>
      <div className='mt-16 flex flex-col items-center'>
        <div className='mb-3 flex space-x-4'>
          <SocialIcon
            kind='mail'
            href={`mailto:${siteMetadata.email}`}
            size={1.5}
          />
          <SocialIcon kind='github' href={siteMetadata.github} size={1.5} />
          <SocialIcon kind='juejin' href={siteMetadata.juejin} size={1.5} />
          <SocialIcon kind='facebook' href={siteMetadata.facebook} size={1.5} />
          <SocialIcon kind='youtube' href={siteMetadata.youtube} size={1.5} />
          <SocialIcon kind='linkedin' href={siteMetadata.linkedin} size={1.5} />
          <SocialIcon kind='twitter' href={siteMetadata.twitter} size={1.5} />
        </div>
        <div className='mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400'>
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href='/'>{siteMetadata.title}</Link>
        </div>
        <div className='mb-8 text-sm text-gray-500 dark:text-gray-400'>
          <Link href='https://github.com/yunsii/tailwind-nextjs-typescript-starter-blog'>
            Tailwind Nextjs Typescript Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
