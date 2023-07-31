import Github from '@/assets/social-icons/github.svg'
import Juejin from '@/assets/social-icons/juejin.svg'
import Linkedin from '@/assets/social-icons/linkedin.svg'
import Mail from '@/assets/social-icons/mail.svg'
import Twitter from '@/assets/social-icons/twitter.svg'
import Youtube from '@/assets/social-icons/youtube.svg'
import Facebook from '@/assets/social-icons/facebook.svg'

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
  ) {
    return null
  }

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
        className={`fill-current text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400`}
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      />
    </a>
  )
}

export default SocialIcon
