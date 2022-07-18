import { SessionProvider as NextAuthProvider } from 'next-auth/react'

import { Header } from '../components/Header'

import NextNProgress from 'nextjs-progressbar'
import { AnimatePresence } from 'framer-motion'

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <NextAuthProvider session={pageProps.session}>
        <NextNProgress
          color='#EBA417'
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />

        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </AnimatePresence>
  )
}

export default MyApp
