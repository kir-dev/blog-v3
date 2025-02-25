import { PortableTextReactComponents } from '@portabletext/react'
import config from 'next-seo.config'
import Link from 'next/link'
import { PortableActionButton } from '~/components/ActionButton'
import { PortableYoutubeEmbed } from '~/components/YoutubeEmbed'
import PostCodeBlock from '~/components/post-components/PostCodeBlock'
import PostImage from '~/components/post-components/PostImage'

export const commonSerializer = {
  types: {
    code: PostCodeBlock,
    image: PostImage,
    actionButton: PortableActionButton,
    youtubeEmbed: PortableYoutubeEmbed,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-6xl font-extrabold leading-none tracking-tight py-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-4xl font-extrabold leading-none tracking-tight py-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold py-4 mt-8">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold py-4 mt-4">{children}</h4>
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
        <Link
          href={isInternal ? `${url.pathname}${url.hash}` : value?.href}
          target={isInternal ? undefined : '_blank'}
          className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
        >
          {children}
        </Link>
      )
    },
  },
} satisfies Partial<PortableTextReactComponents>
