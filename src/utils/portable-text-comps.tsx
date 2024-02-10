import { Link as UiLink } from '@nextui-org/react'
import { PortableTextReactComponents } from '@portabletext/react'
import { PortableActionButton } from '~/components/ActionButton'

import config from 'next-seo.config'
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
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary border-opacity-50 pl-4 py-1 my-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside">{children}</ul>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const url = new URL(value?.href)
      const isInternal = value?.href?.startsWith(config.canonical)
      return (
        <UiLink
          href={isInternal ? `${url.pathname}${url.hash}` : value?.href}
          isExternal={!isInternal}
          showAnchorIcon={!isInternal}
        >
          {children}
        </UiLink>
      )
    },
  },
} satisfies Partial<PortableTextReactComponents>

export const postPageComponents: Partial<PortableTextReactComponents> = {
  ...aboutPageComponents,
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-extrabold leading-none tracking-tight py-4 mt-8">
        {children}
      </h2>
    ),
    normal: ({ children }) => <p className="py-4">{children}</p>,
  },
} satisfies Partial<PortableTextReactComponents>
