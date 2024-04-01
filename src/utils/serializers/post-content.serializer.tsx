import { PortableTextReactComponents } from '@portabletext/react'
import { FC, PropsWithChildren } from 'react'
import { commonSerializer } from './common.serializer'

const InnerHeading: FC<PropsWithChildren<{ _key: string }>> = ({
  children,
  _key,
}) => (
  <>
    <a className="invisible relative top-[-5rem] block" id={`h${_key}`} />
    {children}{' '}
    <a href={`#h${_key}`} aria-hidden="true" tabIndex={-1}>
      🔗
    </a>
  </>
)

export const postContentSerializer: Partial<PortableTextReactComponents> = {
  ...commonSerializer,
  block: {
    ...commonSerializer.block,
    h1: ({ children, value: { _key } }) => (
      <h1 className="text-6xl font-extrabold leading-none tracking-tight py-4">
        <InnerHeading _key={_key}>{children}</InnerHeading>
      </h1>
    ),
    h2: ({ children, value: { _key } }) => (
      <h2 className="text-4xl font-extrabold leading-none tracking-tight py-4 mt-8">
        <InnerHeading _key={_key}>{children}</InnerHeading>
      </h2>
    ),
    h3: ({ children, value: { _key } }) => (
      <h3 className="text-2xl font-bold py-4 mt-8">
        <InnerHeading _key={_key}>{children}</InnerHeading>
      </h3>
    ),
    h4: ({ children, value: { _key } }) => (
      <h4 className="text-xl font-bold py-4 mt-4">
        <InnerHeading _key={_key}>{children}</InnerHeading>
      </h4>
    ),
    normal: ({ children }) => <p className="py-4">{children}</p>,
  },
} satisfies Partial<PortableTextReactComponents>
