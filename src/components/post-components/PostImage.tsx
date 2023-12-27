import { PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import { Image as SanityImage } from 'sanity'

import { urlForImage } from '~/lib/sanity.image'

interface ImageBlock extends SanityImage {
  maxWidth?: number
  maxHeight?: number
}

const PostImage: PortableTextComponent<SanityImage> = ({ value }) => {
  console.log(value.asset)
  return (
    <Image src={urlForImage(value).url()} height={100} width={100} alt="" />
  )
}

export default PostImage
