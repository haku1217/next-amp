import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Analytics from '../components/GA'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Analytics />
    <DefaultSeo
      twitter={{
        cardType: 'summary',
        site: '@harusora12ma'
      }}
    />
    <Component {...pageProps} />
  </>
)

export default App
