import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

export const config = { amp: true }

type Props = {
  title: string
  description: string
}
const imgSrc = 'https://placekitten.com/1000/1000'
const Index: NextPage<Props> = ({ title, description }) => {
  return (
    <Layout siteTitle={title} siteDescription={description}>
      <p>
        {title}
        <br />
        {description}
        Welcome to the <amp-img alt="ニャンコ" src={imgSrc} width="1000" height="1000" layout="responsive"></amp-img>
      </p>
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
