import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import SunSvg from '@/assets/theme/sun.svg'
import MoonSvg from '@/assets/theme/moon.svg'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4'
      onClick={() =>
        setTheme(
          theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark',
        )
      }
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <SunSvg className='text-gray-900 dark:text-gray-100' />
      ) : (
        <MoonSvg className='text-gray-900 dark:text-gray-100' />
      )}
    </button>
  )
}

export default ThemeSwitch
