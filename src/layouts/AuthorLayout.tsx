import type { Author } from 'contentlayer/generated'

import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/SocialIcon'

interface Props {
  children: React.ReactNode
  content: Omit<Author, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    juejin,
  } = content

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className='divide-y divide-gray-200 dark:divide-gray-600'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            About
          </h1>
        </div>
        <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
          <div className='flex flex-col items-center pt-8'>
            {avatar && (
              <Image
                src={avatar}
                alt='avatar'
                width={192}
                height={192}
                className='h-48 w-48 rounded-full'
              />
            )}
            <h3 className='pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight'>
              {name}
            </h3>
            <div className='text-gray-500 dark:text-gray-400'>{occupation}</div>
            <div className='text-gray-500 dark:text-gray-400'>{company}</div>
            <div className='flex space-x-3 pt-6'>
              <SocialIcon kind='mail' href={`mailto:${email}`} />
              <SocialIcon kind='github' href={github} />
              <SocialIcon kind='juejin' href={juejin} />
              <SocialIcon kind='linkedin' href={linkedin} />
              <SocialIcon kind='twitter' href={twitter} />
            </div>
          </div>
          <div className='prose max-w-none py-8 dark:prose-dark xl:col-span-2'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
