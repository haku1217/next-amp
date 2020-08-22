import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
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
