import { Link } from '@nextui-org/react'
import { PortableTextReactComponents } from '@portabletext/react'

const paddingCalculator = (style: 'h2' | 'h3' | 'h4') => {
  switch (style) {
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

export const tocSerializer = {
  types: {
    block: ({ value }) => {
      const { style, _key, children } = value
      return /^h\d/.test(style ?? 'normal') ? (
        <li className={paddingCalculator(style)}>
          <Link href={`#h${_key}`}>
            {children.map((child) => child.text).join('')}
          </Link>
        </li>
      ) : null
    },

    // ignore other block types
    code: () => null,
    image: () => null,
    actionButton: () => null,
    youtubeEmbed: () => null,
  },
  list: () => null,
  marks: {},
} satisfies Partial<PortableTextReactComponents>
