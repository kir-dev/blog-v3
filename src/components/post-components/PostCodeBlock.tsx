import { PortableTextComponent } from '@portabletext/react'
import Refractor from 'react-refractor'

interface CodeBlock {
  _type: 'code'
  code: string
  language?: string
}

const PostCodeBlock: PortableTextComponent<CodeBlock> = ({
  value: { code, language },
}) => {
  return <Refractor language={language} value={code} />
}

export default PostCodeBlock
