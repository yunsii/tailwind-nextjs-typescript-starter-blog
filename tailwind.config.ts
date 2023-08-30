// HMR enabled by nextjs

import path from 'node:path'

import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import { addDynamicIconSelectors } from 'tailwindcss-plugin-iconify'
import { getLocalIconSets } from 'tailwindcss-plugin-iconify/dist/extensions/local-icon-sets'

import type { PluginAPI } from 'tailwindcss/types/config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './data/**/*.{ts,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.teal,
        gray: colors.neutral,
      },
      typography: (theme: PluginAPI['theme']) => ({
        DEFAULT: {
          css: {
            'color': theme('colors.gray.700'),
            'a': {
              'color': theme('colors.primary.700'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              'code': { color: theme('colors.primary.400') },
            },
            'h1': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            'h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            'h3': {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            'pre': {
              backgroundColor: theme('colors.gray.800'),
            },
            'code': {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'details': {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'hr': { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            'strong': { color: theme('colors.gray.600') },
            'blockquote': {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            'color': theme('colors.gray.300'),
            'a': {
              'color': theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              'code': { color: theme('colors.primary.400') },
            },
            'h1': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            'h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            'h3': {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            'pre': {
              backgroundColor: theme('colors.gray.800'),
            },
            'code': {
              backgroundColor: theme('colors.gray.800'),
            },
            'details': {
              backgroundColor: theme('colors.gray.800'),
            },
            'hr': { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            'strong': { color: theme('colors.gray.100') },
            'thead': {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            'tbody': {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            'blockquote': {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwind-scrollbar')({ nocompatible: true }),
    addDynamicIconSelectors({
      prefix: 'i',
      iconSets: getLocalIconSets({
        define: {
          custom: {
            path: path.join(__dirname, './src/assets'),
            options: {
              includeSubDirs: false,
            },
          },
          social: {
            path: path.join(__dirname, './src/assets/social-icons'),
            options: {
              includeSubDirs: false,
            },
          },
        },
      }),
      preprocessSets: ['bi', 'bx', 'iconamoon', 'svg-spinners', 'mdi'],
    }),
    plugin(({ addComponents }) => {
      // https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227#issuecomment-1269592872
      addComponents({
        '.text-primary': {
          '@apply text-primary-700 dark:text-primary-500 transition-colors': {},
        },
        '.text-primary-hover': {
          '@apply text-primary-600 dark:text-primary-400': {},
        },
        '.btn-primary': {
          '@apply text-primary rounded border border-primary-700 hover:bg-primary-700 hover:text-white [&:not(:last-child)]:mr-3':
            {},
          '@apply dark:border-primary-500 dark:hover:bg-primary-500 dark:hover:text-white':
            {},
          '@apply transition-colors': {},
        },
        '.btn-link': {
          '@apply btn-primary px-2 py-1 text-sm font-medium transition-colors':
            {},
        },
      })
    }),
  ],
}

export default config
