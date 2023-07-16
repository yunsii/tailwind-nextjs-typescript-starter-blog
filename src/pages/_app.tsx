import '@/css/prism.css'
import '@/css/tailwind.css'
import '@fontsource/inter/variable-full.css'
import 'katex/dist/katex.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import LayoutWrapper from '@/components/LayoutWrapper'
import Analytics from '@/components/analytics'
import siteMetadata from 'data/siteMetadata'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
