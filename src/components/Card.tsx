import Image from './Image'
import Link from './Link'
import LinkGo from './LinkGo'

export interface CardProps {
  title: string
  description: string
  imgSrc: string
  href: string
}

function Card(props: CardProps) {
  const { title, description, imgSrc, href } = props

  return (
    <div className='md p-4 md:w-1/2' style={{ maxWidth: '544px' }}>
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc
        && (href
          ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className='object-cover object-center md:h-36 lg:h-48'
                width={544}
                height={306}
              />
            </Link>
            )
          : (
            <Image
              alt={title}
              src={imgSrc}
              className='object-cover object-center md:h-36 lg:h-48'
              width={544}
              height={306}
            />
            ))}
        <div className='p-6'>
          <h2 className='mb-3 text-2xl font-bold leading-8 tracking-tight'>
            {href
              ? (
                <Link href={href} aria-label={`Link to ${title}`}>
                  {title}
                </Link>
                )
              : (
                  title
                )}
          </h2>
          <p className='prose mb-3 max-w-none text-gray-500 dark:text-gray-400'>
            {description}
          </p>
          {href && (
            <LinkGo
              href={href}
              className='text-primary text-base font-medium leading-6 hover:text-primary-hover'
              aria-label={`Link to ${title}`}
            >
              Learn more
            </LinkGo>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
