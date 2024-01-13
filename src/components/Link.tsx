import Link from 'next/link'

export interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function CustomLink({ href, ...rest }: CustomLinkProps) {
  const isInternalLink = href && href.startsWith('/')

  if (isInternalLink) {
    return <Link href={href} {...rest} />
  }

  return <a target='_blank' rel='noopener noreferrer' href={href} {...rest} />
}

export default CustomLink
