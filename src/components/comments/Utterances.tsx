import { useTheme } from 'next-themes'
import metadata from 'data/metadata'

function Utterances() {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme
    = theme === 'dark' || resolvedTheme === 'dark'
      ? metadata.comment?.utterancesConfig?.darkTheme
      : metadata.comment?.utterancesConfig?.theme

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', metadata.comment?.utterancesConfig?.repo || '')
    script.setAttribute(
      'issue-term',
      metadata.comment?.utterancesConfig?.issueTerm || '',
    )
    script.setAttribute(
      'label',
      metadata.comment?.utterancesConfig?.label || '',
    )
    script.setAttribute('theme', commentsTheme || '')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) {
      comments.appendChild(script)
    }

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) {
        comments.innerHTML = ''
      }
    }
  }, [commentsTheme])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.utterances-frame')
    if (!iframe) {
      return
    }
    LoadComments()
  }, [LoadComments])

  // Added `relative` to fix a weird bug with `utterances-frame` position
  return (
    <div className='py-6 text-center text-gray-700 dark:text-gray-300'>
      {enableLoadComments && (
        <button type='button' onClick={LoadComments}>Load Comments</button>
      )}
      <div className='utterances-frame relative' id={COMMENTS_ID} />
    </div>
  )
}

export default Utterances
