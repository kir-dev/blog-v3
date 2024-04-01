import { ClipboardIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import { PortableTextComponent } from '@portabletext/react'
import { useState } from 'react'
import Refractor from 'react-refractor'

interface CodeBlock {
  _type: 'code'
  code: string
  language?: string
}

const PostCodeBlock: PortableTextComponent<CodeBlock> = ({
  value: { code, language },
}) => {
  const [showSavedIcon, setShowSavedIcon] = useState(false)
  let modLang = ''
  switch (language) {
    case 'sh':
      modLang = 'bash'
      break
    case 'powershell':
      modLang = 'bash'
      break
    case 'dockerfile':
      modLang = 'bash'
      break
    default:
      modLang = language
  }
  return (
    <div className="relative">
      <Button
        isIconOnly
        color="default"
        aria-label="Copy to clipboard"
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2"
        onClick={() => {
          navigator.clipboard.writeText(code)
          setShowSavedIcon(true)
          setTimeout(() => {
            setShowSavedIcon(false)
          }, 1500)
        }}
      >
        {showSavedIcon ? (
          <DocumentCheckIcon className="w-4 h-4 text-success" />
        ) : (
          <ClipboardIcon className="w-4 h-4" />
        )}
      </Button>
      <Refractor language={modLang} value={code} />
    </div>
  )
}

export default PostCodeBlock
