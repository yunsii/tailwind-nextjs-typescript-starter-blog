import '@/css/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import LayoutWrapper from '@/components/LayoutWrapper'
import metadata from 'data/metadata'
import Analytics from '@/components/Analytics'

import type { AppProps } from 'next/app'

import SvgSprite from '~svg-sprite/symbol'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={metadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <Analytics />
      <SvgSprite />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
