import Link from 'next/link'
import { FC } from 'react'
import Head from 'next/head'

type Props = {
  siteTitle: string
}
const Header: FC<Props> = ({ siteTitle }) => (
  <header className="header">
    <nav className="nav" role="navigation" aria-label="main navigation">
      <a href="/">
        <h1>{siteTitle}</h1>
      </a>
    </nav>
    <style jsx>
      {`
        h1 {
          margin-bottom: 0;
        }
        h1:hover {
          cursor: pointer;
        }
        nav {
          padding: 1.5rem 1.25rem;
          border-bottom: 1px solid #ebebeb;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: center;
        }
        @media (min-width: 768px) {
          .header {
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
          }
          .nav {
            padding: 2rem;
            width: 30vw;
            height: 100%;
            border-right: 1px solid #ebebeb;
            border-bottom: none;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}
    </style>
  </header>
)

export default Header
