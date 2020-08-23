import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import CodeBlock from '../../components/CodeBlock'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { readContentFile, listContentFiles } from '../../lib/content-loader'
import path from 'path'

export const config = { amp: true }
type Props = {
  siteTitle: string
  frontmatter: string
  markdownBody: string
  githubUrl: string
}

const BlogTemplate: NextPage<Props> = ({ siteTitle, frontmatter, markdownBody, githubUrl }) => {
  return (
    <>
      <Layout siteTitle={siteTitle} githubUrl={githubUrl}>
        <div className="container">
          <article className="article">
            <h1>{frontmatter}</h1>
            <div>
              <ReactMarkdown source={markdownBody} renderers={{ code: CodeBlock }} />
            </div>
          </article>
          <amp-social-share type="twitter" />
          <amp-social-share type="hatena_bookmark" data-share-endpoint="http://b.hatena.ne.jp/entry/CANONICAL_URL" />
        </div>
      </Layout>

      <style jsx>{`
        .container {
          margin-right: auto;
          margin-left: auto;
          max-width: 960px;
        }
        .article {
          margin: 10px 20px;
        }
        amp-social-share[type='hatena_bookmark'] {
          display: inline-block;
          position: relative;
          width: 60px;
          height: 44px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' rx='101.9' ry='101.9' fill='%2300a4de'/%3E%3Cg fill='%23fff'%3E%3Cpath d='M278.2,258.1q-13.6-15.2-37.8-17c14.4-3.9,24.8-9.6,31.4-17.3s9.8-17.8,9.8-30.7A55,55,0,0,0,275,166a48.8,48.8,0,0,0-19.2-18.6c-7.3-4-16-6.9-26.2-8.6s-28.1-2.4-53.7-2.4H113.6V363.6h64.2q38.7,0,55.8-2.6c11.4-1.8,20.9-4.8,28.6-8.9a52.5,52.5,0,0,0,21.9-21.4c5.1-9.2,7.7-19.9,7.7-32.1C291.8,281.7,287.3,268.2,278.2,258.1Zm-107-71.4h13.3q23.1,0,31,5.2c5.3,3.5,7.9,9.5,7.9,18s-2.9,14-8.5,17.4-16.1,5-31.4,5H171.2V186.7Zm52.8,130.3c-6.1,3.7-16.5,5.5-31.1,5.5H171.2V273h22.6c15,0,25.4,1.9,30.9,5.7s8.4,10.4,8.4,20S230.1,313.4,223.9,317.1Z'/%3E%3Cpath d='M357.6,306.1a28.8,28.8,0,1,0,28.8,28.8A28.8,28.8,0,0,0,357.6,306.1Z'/%3E%3Crect x='332.6' y='136.4' width='50' height='151.52'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </>
  )
}
export default BlogTemplate

export const getStaticProps: GetStaticProps<any, any> = async ({ params }) => {
  const { slug } = params
  const data = await readContentFile({ slug: slug })
  const config = await import(`../../data/config.json`)
  return {
    props: {
      frontmatter: data.title,
      markdownBody: data.content,
      siteTitle: config.title,
      githubUrl: config.repositoryUrl
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => ({
    params: {
      slug: path.parse(filename).name
    }
  }))
  return { paths, fallback: false }
}
