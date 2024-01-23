import { PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import { Image as SanityImage } from 'sanity'

import { urlForImage } from '~/lib/sanity.image'

interface ImageBlock extends SanityImage {
  preferredWidth?: number
  preferredHeight?: number
}

const PostImage: PortableTextComponent<ImageBlock> = ({ value }) => {
  const { preferredHeight, preferredWidth } = value
  const [, assetId, dimensions, format] =
    /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/.exec(value.asset?._ref)
  const [width, height] = dimensions?.split('x').map((v) => parseInt(v, 10))
  const calculatedHeight = preferredHeight ?? height
  const calculatedWidth = preferredWidth ?? width
  return (
    <Image
      src={urlForImage(value).url()}
      height={calculatedHeight ?? 500}
      width={calculatedWidth ?? 1000}
      alt=""
      className="object-contain max-w-full max-h-[75vh] py-4 mx-auto"
    />
  )
}

export default PostImage
