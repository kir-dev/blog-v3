import React from 'react'
import { Link } from '~/i18n/navigation'
import type { MediaLike } from '~/lib/media'
import {
  extractNodeText,
  makeHeadingId,
  type LexicalDocument,
  type LexicalNode,
} from '~/lib/rich-text'
import { siteConfig } from '~/lib/site-config'
import ActionButton from './ActionButton'
import PostCodeBlock from './post-components/PostCodeBlock'
import PostImage from './post-components/PostImage'
import { YoutubeEmbed } from './YoutubeEmbed'

export type RichTextVariant = 'common' | 'post' | 'afsz' | 'frontAlert'

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16

function resolveHref(rawHref: string): {
  href: string
  isInternal: boolean
  explicitLocale?: 'hu' | 'en'
} {
  const trimmed = rawHref.trim()
  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return { href: trimmed.replace(/^mailto:\s+/, 'mailto:'), isInternal: false }
  }
  const stripLocalePrefix = (p: string) => {
    const match = p.match(/^\/(hu|en)(\/.*|$)/)
    if (match) {
      return {
        href: match[2] || '/',
        isInternal: true,
        explicitLocale: match[1] as 'hu' | 'en',
      }
    }
    return { href: p, isInternal: true }
  }
  if (trimmed.startsWith('/')) {
    return stripLocalePrefix(trimmed)
  }
  if (trimmed.startsWith('#')) {
    return { href: trimmed, isInternal: true }
  }
  try {
    const url = new URL(trimmed)
    const canonicalHost = new URL(siteConfig.canonical).hostname
    if (
      url.hostname === canonicalHost ||
      url.hostname === 'kir-dev.hu' ||
      url.hostname === 'www.kir-dev.hu'
    ) {
      return stripLocalePrefix(`${url.pathname}${url.search}${url.hash}`)
    }
    return { href: trimmed, isInternal: false }
  } catch {
    return { href: trimmed, isInternal: false }
  }
}

function renderLink(
  hrefRaw: string,
  children: React.ReactNode,
  variant: RichTextVariant,
  key: string,
) {
  const { href, isInternal, explicitLocale } = resolveHref(hrefRaw)
  const className =
    variant === 'frontAlert'
      ? 'underline'
      : 'relative inline-flex items-center text-primary no-underline hover:opacity-80 transition-opacity'

  if (isInternal && !href.startsWith('#')) {
    return (
      <Link
        key={key}
        href={href}
        locale={explicitLocale}
        className={className}
      >
        {children}
      </Link>
    )
  }

  const openNewTab =
    !isInternal &&
    !href.startsWith('mailto:') &&
    !href.startsWith('tel:') &&
    variant !== 'frontAlert'

  return (
    <a
      key={key}
      href={href}
      target={openNewTab ? '_blank' : undefined}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </a>
  )
}

function renderTextNode(
  node: LexicalNode,
  variant: RichTextVariant,
  key: string,
): React.ReactNode {
  let content: React.ReactNode = node.text ?? ''
  const format = typeof node.format === 'number' ? node.format : 0

  if (format & IS_CODE) {
    content = (
      <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
        {content}
      </code>
    )
  }
  if (format & IS_BOLD) {
    content =
      variant === 'afsz' ? (
        <span className="text-orange-600 font-bold">{content}</span>
      ) : (
        <strong>{content}</strong>
      )
  }
  if (format & IS_ITALIC) {
    content =
      variant === 'afsz' ? (
        <em className="italic" id="szukseges">
          {content}
        </em>
      ) : (
        <em>{content}</em>
      )
  }
  if (format & IS_UNDERLINE) {
    content = <u>{content}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    content = <s>{content}</s>
  }

  return <React.Fragment key={key}>{content}</React.Fragment>
}

function renderNodes(
  nodes: LexicalNode[] | undefined,
  variant: RichTextVariant,
  keyPrefix: string,
  topLevel = false,
): React.ReactNode {
  if (!Array.isArray(nodes)) return null

  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`

    if (node.type === 'text') {
      return renderTextNode(node, variant, key)
    }

    if (node.type === 'linebreak') {
      return <br key={key} />
    }

    if (node.type === 'link' || node.type === 'autolink') {
      const fields = (node.fields ?? {}) as { url?: string }
      const href = fields.url ?? node.url ?? ''
      const children = renderNodes(node.children, variant, key)
      if (!href) return <React.Fragment key={key}>{children}</React.Fragment>
      return renderLink(href, children, variant, key)
    }

    if (node.type === 'paragraph') {
      const children = renderNodes(node.children, variant, key)
      if (variant === 'frontAlert') {
        return <span key={key}>{children}</span>
      }
      return (
        <p key={key} className={variant === 'post' ? 'py-4' : 'py-2'}>
          {children}
        </p>
      )
    }

    if (node.type === 'heading') {
      const children = renderNodes(node.children, variant, key)
      const headingText = extractNodeText(node)
      const headingId = topLevel ? makeHeadingId(headingText, index) : undefined

      const wrapPostHeading = (inner: React.ReactNode) =>
        variant === 'post' && headingId ? (
          <>
            <a
              className="invisible relative top-[-5rem] block"
              id={headingId}
            />
            {inner}{' '}
            <a href={`#${headingId}`} aria-hidden="true" tabIndex={-1}>
              🔗
            </a>
          </>
        ) : (
          inner
        )

      switch (node.tag) {
        case 'h1':
          return (
            <h1
              key={key}
              className="text-6xl font-extrabold leading-none tracking-tight py-4"
            >
              {wrapPostHeading(children)}
            </h1>
          )
        case 'h2':
          return (
            <h2
              key={key}
              className={`text-4xl font-extrabold leading-none tracking-tight py-4 ${
                variant === 'post' ? 'mt-8' : ''
              }`}
            >
              {wrapPostHeading(children)}
            </h2>
          )
        case 'h3':
          return (
            <h3
              key={key}
              id={variant === 'afsz' ? headingId : undefined}
              className="text-2xl font-bold py-4 mt-8"
            >
              {wrapPostHeading(children)}
            </h3>
          )
        case 'h4':
        default:
          return (
            <h4 key={key} className="text-xl font-bold py-4 mt-4">
              {wrapPostHeading(children)}
            </h4>
          )
      }
    }

    if (node.type === 'quote') {
      return (
        <blockquote
          key={key}
          className="border-l-4 border-primary border-opacity-50 pl-4 py-1 my-2"
        >
          {renderNodes(node.children, variant, key)}
        </blockquote>
      )
    }

    if (node.type === 'list') {
      const children = renderNodes(node.children, variant, key)
      if (node.listType === 'number') {
        return (
          <ol key={key} className="list-decimal list-inside my-2 space-y-1">
            {children}
          </ol>
        )
      }
      return (
        <ul
          key={key}
          className={`list-disc list-inside my-2 space-y-1 ${
            variant === 'afsz' ? 'custom-list' : ''
          }`}
        >
          {children}
        </ul>
      )
    }

    if (node.type === 'listitem') {
      return <li key={key}>{renderNodes(node.children, variant, key)}</li>
    }

    if (node.type === 'horizontalrule') {
      return <hr key={key} className="my-6 border-foreground/20" />
    }

    if (node.type === 'upload') {
      return <PostImage key={key} media={node.value as MediaLike} />
    }

    if (node.type === 'block') {
      const fields = (node.fields ?? {}) as Record<string, unknown>
      const blockType = fields.blockType as string | undefined

      if (blockType === 'codeBlock') {
        return (
          <PostCodeBlock
            key={key}
            code={String(fields.code ?? '')}
            language={fields.language ? String(fields.language) : undefined}
          />
        )
      }

      if (blockType === 'actionButton') {
        const href = String(fields.href ?? '')
        const text = String(fields.text ?? '')
        if (!href) return null
        return (
          <div key={key}>
            <ActionButton href={href} newTab={href.startsWith('http')}>
              {text}
            </ActionButton>
          </div>
        )
      }

      if (blockType === 'youtubeEmbed') {
        const url = String(fields.url ?? '')
        const nestedBody = fields.body as LexicalDocument | undefined
        const hasNestedContent = Boolean(
          nestedBody?.root?.children && nestedBody.root.children.length > 0,
        )
        return (
          <YoutubeEmbed key={key} url={url}>
            {hasNestedContent ? (
              <RichText data={nestedBody} variant="common" />
            ) : null}
          </YoutubeEmbed>
        )
      }
    }

    if (Array.isArray(node.children)) {
      return (
        <React.Fragment key={key}>
          {renderNodes(node.children, variant, key)}
        </React.Fragment>
      )
    }

    return null
  })
}

interface RichTextProps {
  data: unknown
  variant?: RichTextVariant
}

export const RichText: React.FC<RichTextProps> = ({
  data,
  variant = 'common',
}) => {
  if (!data || typeof data !== 'object') return null
  const doc = data as LexicalDocument
  if (!Array.isArray(doc.root?.children)) return null
  return <>{renderNodes(doc.root.children, variant, 'rt', true)}</>
}

export default RichText
