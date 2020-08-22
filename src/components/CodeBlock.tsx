import { FC } from 'react'
// syntax highlight の styleはお好み、自分は JetBrains 信者なので darcula 推し
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type Props = {
  value: string
  language?: string
}

const CodeBlock: FC<Props> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={darcula}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
