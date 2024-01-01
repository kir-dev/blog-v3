import React from 'react'

type Props = {
  text?: string
  name?: string
  noPrompt?: boolean
  noCaret?: boolean
}

export const Line: React.FC<Props> = ({
  text,
  name,
  noPrompt = false,
  noCaret = false,
}) => (
  <>
    {!noPrompt && (
      <span className="text-primary-400 dark:text-primary-300">
        kirdev@sch:
        <span className="text-primary-500">~$ </span>
      </span>
    )}
    <span className="text-foreground text-opacity-50">{name ?? ''}</span>
    {text}
    {!noCaret && (
      <span className="inline-block w-2 mb-[-3px] border-b-3 border-solid border-primary-500" />
    )}
  </>
)
