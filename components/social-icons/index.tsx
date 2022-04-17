import Facebook from './facebook.svg'
import Github from './github.svg'
import Juejin from './juejin.svg'
import Linkedin from './linkedin.svg'
import Mail from './mail.svg'
import Twitter from './twitter.svg'
import Youtube from './youtube.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  juejin: Juejin,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

export interface SocialIconProps {
  kind: keyof typeof components
  href?: string
  /** unit: rem */
  size?: number
}

const SocialIcon = ({ kind, href, size = 2 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null

  const SocialSvg = components[kind] as React.ComponentType<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  return (
    <a
      className='text-sm text-gray-500 transition hover:text-gray-600'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      <span className='sr-only'>{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400`}
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      />
    </a>
  )
}

export default SocialIcon
