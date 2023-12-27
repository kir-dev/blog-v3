import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig, SanityDocument } from 'sanity'
import { DefaultDocumentNodeResolver, deskTool } from 'sanity/desk'
import { Iframe, IframeOptions } from 'sanity-plugin-iframe-pane'

import { apiVersion, dataset, projectId } from '~/lib/sanity.api'
import { schema } from '~/schemas'

const url = {
  origin: 'same-origin',
  preview: (doc: SanityDocument) =>
    doc?.slug?.['current']
      ? `/${doc._type}/${doc.slug['current']}`
      : new Error('Missing slug'),
  draftMode: '/api/draft',
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url,
            reload: { button: true },
          } satisfies IframeOptions)
          .title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}

export default defineConfig({
  basePath: '/studio',
  name: 'kir-dev-blog-v3',
  title: 'Kir-Dev Blog v3',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({
      defaultDocumentNode,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],
})
