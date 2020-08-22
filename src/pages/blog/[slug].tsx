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
