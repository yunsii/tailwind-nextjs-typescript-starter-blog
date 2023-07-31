import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import SunSvg from '@/assets/theme/sun.svg'
import MoonSvg from '@/assets/theme/moon.svg'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const updateTheme = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // ref: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#controlling_animations_with_javascript
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // Fallback for browsers that don’t support this API:
    if (!('startViewTransition' in document)) {
      updateTheme()
      return
    }

    // Get the click position, or fallback to the middle of the screen
    const x = event.clientX ?? innerWidth / 2
    const y = event.clientY ?? innerHeight / 2
    // Get the distance to the furthest corner
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )

    const $document = document as Document & {
      startViewTransition(callback?: () => void | Promise<void>): any
    }

    // Create a transition:
    const transition = $document.startViewTransition(() => {
      updateTheme()
    })

    // Wait for the pseudo-elements to be created:
    transition.ready.then(() => {
      // Animate the root’s new view
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0 at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in',
          // Specify which pseudo-element to animate
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4'
      onClick={handleClick}
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
