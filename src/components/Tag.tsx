import { slug } from 'github-slugger'
import Link from 'next/link'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`} className='btn-link uppercase'>
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
