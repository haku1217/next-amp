import { FC, ReactNode } from 'react'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: ReactNode
  siteTitle: string
  githubUrl: string
  siteDescription?: string
}
const Layout: FC<Props> = ({ children, siteTitle, siteDescription, githubUrl }) => (
  <section className="layout">
    <Meta siteTitle={siteTitle} siteDescription={siteDescription ? siteDescription : ''} />
    <Header siteTitle={siteTitle} />
    <div className="content">{children}</div>
    <Footer github={githubUrl}/>
    <style jsx>
      {`
        .layout {
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content {
          flex-grow: 1;
        }
      `}
    </style>
  </section>
)

export default Layout
