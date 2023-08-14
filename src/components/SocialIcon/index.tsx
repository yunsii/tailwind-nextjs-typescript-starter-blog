import clsx from 'clsx'

const components = {
  mail: clsx('i-bi--envelope-fill'),
  github: clsx('i-bi--github'),
  juejin: clsx('i-social--juejin'),
  facebook: clsx('i-bi--facebook'),
  youtube: clsx('i-bi--youtube'),
  linkedin: clsx('i-bi--linkedin'),
  twitter: clsx('i-bi--twitter'),
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

  const iconClassName = components[kind]

  return (
    <a
      className='text-sm text-gray-500 transition hover:text-gray-600'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      <span className='sr-only'>{kind}</span>
      <span
        className={clsx(
          iconClassName,
          `fill-current text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400`,
        )}
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      />
    </a>
  )
}

export default SocialIcon
