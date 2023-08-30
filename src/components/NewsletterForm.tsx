import metadata from 'data/metadata'

const NewsletterForm = ({ title = 'Subscribe to the newsletter' }) => {
  const inputElRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`/api/${metadata.newsletter?.provider}`, {
      body: JSON.stringify({
        email: inputElRef.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error: resError } = await res.json()
    if (resError) {
      setError(true)
      setMessage(
        'Your e-mail address is invalid or you are already subscribed!',
      )
      return
    }

    if (inputElRef.current) {
      inputElRef.current.value = ''
    }
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <div>
      <div className='pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100'>
        {title}
      </div>
      <form className='flex flex-col sm:flex-row' onSubmit={subscribe}>
        <div>
          <label className='sr-only' htmlFor='email-input'>
            Email address
          </label>
          <input
            autoComplete='email'
            className='w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black'
            id='email-input'
            name='email'
            placeholder={
              subscribed ? "You're subscribed !  🎉" : 'Enter your email'
            }
            ref={inputElRef}
            required
            type='email'
            disabled={subscribed}
          />
        </div>
        <div className='mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0'>
          <button
            className={`btn-primary w-full rounded-md px-4 py-2 font-medium sm:py-0 ${
              subscribed
                ? 'cursor-default hover:bg-white hover:text-primary-700'
                : ''
            } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
            type='submit'
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
      {error && (
        <div className='w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96'>
          {message}
        </div>
      )}
    </div>
  )
}

export default NewsletterForm

export interface BlogNewsletterFormProps {
  title: string
}

export const BlogNewsletterForm = (props: BlogNewsletterFormProps) => {
  const { title } = props

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8'>
        <NewsletterForm title={title} />
      </div>
    </div>
  )
}
