import {
  BlocksFeature,
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'codeBlock',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'Plain Text', value: 'text' },
        { label: 'Bash / Shell', value: 'bash' },
        { label: 'CSS', value: 'css' },
        { label: 'Dockerfile', value: 'docker' },
        { label: 'HTML / XML', value: 'markup' },
        { label: 'Java', value: 'java' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'JSON', value: 'json' },
        { label: 'Kotlin', value: 'kotlin' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Python', value: 'python' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'SQL', value: 'sql' },
        { label: 'TSX', value: 'tsx' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'YAML', value: 'yaml' },
      ],
    },
    {
      name: 'code',
      type: 'code',
      required: true,
    },
  ],
}

export const ActionButtonBlock: Block = {
  slug: 'actionButton',
  labels: {
    singular: 'Action Button',
    plural: 'Action Buttons',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
    },
  ],
}

const baseFeatures = [
  ParagraphFeature(),
  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  InlineCodeFeature(),
  BlockquoteFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  HorizontalRuleFeature(),
  LinkFeature({}),
  UploadFeature({
    collections: {
      media: {
        fields: [],
      },
    },
  }),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
]

const nestedRichTextEditor = lexicalEditor({
  features: () => [
    ...baseFeatures,
    BlocksFeature({
      blocks: [CodeBlock, ActionButtonBlock],
    }),
  ],
})

export const YoutubeEmbedBlock: Block = {
  slug: 'youtubeEmbed',
  labels: {
    singular: 'YouTube Embed',
    plural: 'YouTube Embeds',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'YouTube video URL',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body',
      editor: nestedRichTextEditor,
    },
  ],
}

export const blogLexicalEditor = lexicalEditor({
  features: () => [
    ...baseFeatures,
    BlocksFeature({
      blocks: [CodeBlock, ActionButtonBlock, YoutubeEmbedBlock],
    }),
  ],
})
