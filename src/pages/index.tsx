import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

export const config = { amp: true }

type Props = {
  title: string
  description: string
}
const Index: NextPage<Props> = ({ title, description }) => {
  return (
    <Layout siteTitle={title} siteDescription={description}>
      <BlogList />
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const configData = await import('../data/config.json')
  return {
    props: {
      title: configData.title,
      description: configData.description
    }
  }
}
