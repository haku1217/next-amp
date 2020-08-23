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
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default BaseDocument
