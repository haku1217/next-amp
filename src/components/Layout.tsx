import { FC, ReactNode } from 'react'
import Meta from './Meta'
import Header from './Header'

type Props = {
  children: ReactNode
  siteTitle: string
  siteDescription?: string
}
const Layout: FC<Props> = ({ children, siteTitle, siteDescription }) => (
  <section className="layout">
    <Meta siteTitle={siteTitle} siteDescription={siteDescription ? siteDescription : ''} />
    <Header siteTitle={siteTitle} />
    <div className="content">{children}</div>
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
