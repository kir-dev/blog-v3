import { Link } from '@nextui-org/react'
import { PortableTextReactComponents } from '@portabletext/react'
import { paddingCalculator, tocSerializer } from './toc.serializer'

export const afszTocSerializer = {
  types: {
    ...tocSerializer.types,
    block: ({ value }) => {
      const { style, _key, children } = value
      return /^h3/.test(style ?? 'normal') ? (
        <li className={paddingCalculator(style)}>
          <Link href={`#h${_key}`}>
            {children.map((child) => child.text).join('')}
          </Link>
        </li>
      ) : null
    },
  },
  list: () => null,
  marks: {},
} satisfies Partial<PortableTextReactComponents>
