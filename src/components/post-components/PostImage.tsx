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
      height={calculatedHeight ?? 100}
      width={calculatedWidth ?? 100}
      alt=""
    />
  )
}

export default PostImage
