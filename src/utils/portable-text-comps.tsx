import { PortableTextReactComponents } from '@portabletext/react'
import { PortableActionButton } from '~/components/ActionButton'

import PostCodeBlock from '~/components/post-components/PostCodeBlock'
import PostImage from '~/components/post-components/PostImage'

export const aboutPageComponents = {
  types: {
    code: PostCodeBlock,
    image: PostImage,
    actionButton: PortableActionButton,
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-4xl font-extrabold leading-none tracking-tight py-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold py-4 mt-8">{children}</h3>
    ),
    normal: ({ children }) => <p className="py-2">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside">{children}</ul>
    ),
  },
} satisfies Partial<PortableTextReactComponents>

export const postPageComponents = {
  types: { code: PostCodeBlock, image: PostImage },
} satisfies Partial<PortableTextReactComponents>
