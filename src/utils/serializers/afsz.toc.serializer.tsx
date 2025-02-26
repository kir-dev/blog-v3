import { PortableTextReactComponents } from '@portabletext/react'
import Link from 'next/link'
import { paddingCalculator, tocSerializer } from './toc.serializer'

export const afszTocSerializer = {
  types: {
    ...tocSerializer.types,
    block: ({ value }) => {
      const { style, _key, children } = value
      return /^h3/.test(style ?? 'normal') ? (
        <li className={paddingCalculator(style)}>
          <Link
            href={`#h${_key}`}
            className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
          >
            {children.map((child) => child.text).join('')}
          </Link>
        </li>
      ) : null
    },
  },
  list: () => null,
  marks: {},
} satisfies Partial<PortableTextReactComponents>
