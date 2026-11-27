import React from 'react'
import { extractHeadings } from '~/lib/rich-text'

const paddingCalculator = (tag: 'h1' | 'h2' | 'h3' | 'h4') => {
  switch (tag) {
    case 'h2':
      return 'pl-4'
    case 'h3':
      return 'pl-8'
    case 'h4':
      return 'pl-12'
    default:
      return 'pl-0'
  }
}

interface Props {
  data: unknown
}

export const TableOfContents: React.FC<Props> = ({ data }) => {
  const headings = extractHeadings(data)
  if (headings.length === 0) return null

  return (
    <ul className="mb-8 list-disc list-inside ml-2">
      {headings.map((h) => (
        <li key={h.id} className={paddingCalculator(h.tag)}>
          <a
            href={`#${h.id}`}
            className="relative inline-flex items-center text-primary no-underline hover:opacity-80 transition-opacity"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
