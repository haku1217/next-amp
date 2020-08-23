import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import { listContentFiles, readContentFile } from '../lib/content-loader'
import path from 'path'

export const config = { amp: true }

type Props = {
  title: string
  description: string
  githubUrl: string
  posts: {
    link: string
    title: string
    date: string
  }[]
}
const Index: NextPage<Props> = ({ title, description, githubUrl, posts }) => {
  return (
    <>
      <Layout siteTitle={title} siteDescription={description} githubUrl={githubUrl}>
        <div className="container">
          <div className="list">
            <BlogList posts={posts} />
          </div>
        </div>
      </Layout>
      <style jsx>
        {`
          .container {
            margin-right: auto;
            margin-left: auto;
            max-width: 960px;
          }
          .list {
            margin: 10px 20px;
          }
        `}
      </style>
    </>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const posts = await Promise.all(
    listContentFiles().map(async (filename) => {
      const post = await readContentFile({ slug: path.parse(filename).name })
      return {
        link: `blog/${path.parse(filename).name}`,
        title: post.title,
        date: post.published
      }
    })
  )
  const configData = await import('../data/config.json')
  return {
    props: {
      title: configData.title,
      description: configData.description,
      githubUrl: configData.repositoryUrl,
      posts: posts
    }
  }
}
