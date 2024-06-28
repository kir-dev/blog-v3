'use client'

import { PortableText } from 'next-sanity'
import { useState } from 'react'
import { urlForImage } from '~/lib/sanity.image'
import { CMSCHFeature } from '~/lib/sanity.types'
import { afszSerializer } from '~/utils/serializers/afsz.serializer'

export default function CmschFeatureButton({ item }: { item: CMSCHFeature }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <button
      key={item._id}
      className={`flex flex-col h-full justify-center gap-4 border-foreground-500 border-1 rounded-lg p-8 transition-all duration-300 aspect-square w-80`}
      style={
        isOpen
          ? {}
          : {
              backgroundImage: `url(${
                (item.mainImage ? urlForImage(item.mainImage)?.url() : '') ?? ''
              })` as string,
            }
      }
      onClick={() => setIsOpen(!isOpen)}
    >
      <h3 className="text-xl font-bold">{item.title}</h3>
      {isOpen && (
        <PortableText
          value={item.description ?? []}
          components={afszSerializer}
        />
      )}
    </button>
  )
}
