import slugify from 'slugify'

export interface LexicalNode {
  type: string
  version?: number
  tag?: string
  format?: number | string
  text?: string
  url?: string
  listType?: 'bullet' | 'number' | 'check'
  start?: number
  fields?: Record<string, unknown>
  value?: unknown
  relationTo?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

export interface LexicalDocument {
  root?: {
    type?: string
    children?: LexicalNode[]
    [key: string]: unknown
  }
}

export function extractPlainText(doc: unknown): string {
  if (!doc || typeof doc !== 'object') return ''
  const lexical = doc as LexicalDocument
  const parts: string[] = []

  const walk = (nodes?: LexicalNode[]) => {
    if (!Array.isArray(nodes)) return
    for (const node of nodes) {
      if (typeof node.text === 'string') {
        parts.push(node.text)
      }
      if (Array.isArray(node.children)) {
        walk(node.children)
      }
      if (
        node.type === 'paragraph' ||
        node.type === 'heading' ||
        node.type === 'listitem'
      ) {
        parts.push(' ')
      }
    }
  }

  walk(lexical.root?.children)
  return parts.join('').replace(/\s+/g, ' ').trim()
}

export function estimateReadingTime(doc: unknown): number {
  const text = extractPlainText(doc)
  return Math.max(1, Math.round(text.length / 6 / 200 + 1))
}

export interface HeadingItem {
  id: string
  tag: 'h1' | 'h2' | 'h3' | 'h4'
  text: string
}

export function makeHeadingId(text: string, index: number): string {
  const base = slugify(text, { lower: true, strict: true, locale: 'hu' })
  return base ? `h-${base}-${index}` : `h-${index}`
}

export function extractHeadings(doc: unknown): HeadingItem[] {
  if (!doc || typeof doc !== 'object') return []
  const lexical = doc as LexicalDocument
  const children = lexical.root?.children
  if (!Array.isArray(children)) return []

  const headings: HeadingItem[] = []
  children.forEach((node, idx) => {
    if (
      node.type === 'heading' &&
      (node.tag === 'h1' ||
        node.tag === 'h2' ||
        node.tag === 'h3' ||
        node.tag === 'h4')
    ) {
      const text = extractNodeText(node)
      if (text) {
        headings.push({
          id: makeHeadingId(text, idx),
          tag: node.tag,
          text,
        })
      }
    }
  })

  return headings
}

export function extractNodeText(node: LexicalNode): string {
  if (typeof node.text === 'string') return node.text
  if (!Array.isArray(node.children)) return ''
  return node.children.map(extractNodeText).join('')
}
