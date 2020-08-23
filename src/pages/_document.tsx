import Document, { DocumentInitialProps, Head, Html, Main, NextScript, DocumentContext } from 'next/document'

class BaseDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initalProps = await Document.getInitialProps(ctx)
    return { ...initalProps }
  }
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content="技術メモの置き場" />
          <meta name="theme-color" content="#fff" />
          <link rel="icon" type="mage/x-icon" href="/favicons/favicon.ico" />
          <link rel="apple-touch-icon" href="/android-chrome-512x512.png" />
          <script
            async
            custom-element="amp-install-serviceworker"
            src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"
          ></script>
        </Head>
        <body>
          <amp-install-serviceworker
            src="/service-worker.js"
            layout="nodisplay"
          ></amp-install-serviceworker>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default BaseDocument
