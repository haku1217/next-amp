import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false
library.add(fab)

type Props = {
  github: string
}
const Footer: FC<Props> = ({ github }) => (
  <footer className="footer">
    <nav className="nav" role="navigation" aria-label="main navigation">
      <a href={github} target="_blank">
        <span className="icon">
          <FontAwesomeIcon
            title="github"
            icon={['fab', 'github']}
            style={{ height: '40px', width: '40px', verticalAlign: 'bottom', color: '#ffffff' }}
          />
        </span>
      </a>
    </nav>
    <style jsx>
      {`
        .footer {
          margin-top: auto;
          background-color: #000000;
          text-align: center;
        }
      `}
    </style>
  </footer>
)

export default Footer
