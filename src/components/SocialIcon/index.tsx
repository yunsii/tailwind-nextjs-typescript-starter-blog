const components = {
  mail: cls`i-bi--envelope-fill`,
  github: cls`i-bi--github`,
  juejin: cls`i-social--juejin`,
  facebook: cls`i-bi--facebook`,
  youtube: cls`i-bi--youtube`,
  linkedin: cls`i-bi--linkedin`,
  twitter: cls`i-bi--twitter`,
}

export interface SocialIconProps {
  kind: keyof typeof components
  href?: string
  /** unit: rem */
  size?: number
}

function SocialIcon({ kind, href, size = 2 }: SocialIconProps) {
  if (
    !href
    || (kind === 'mail'
    // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-unused-capturing-group, regexp/no-misleading-capturing-group
    && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
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
        className={tw`
          ${iconClassName}
          fill-current text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400
        `}
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      />
    </a>
  )
}

export default SocialIcon
