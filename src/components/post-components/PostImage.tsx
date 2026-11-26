import Image from 'next/image'
import React from 'react'
import { getMediaDimensions, getMediaUrl, type MediaLike } from '~/lib/media'

interface Props {
  media: MediaLike | number | string | null | undefined
  alt?: string
}

const PostImage: React.FC<Props> = ({ media, alt }) => {
  const src = getMediaUrl(media)
  if (!src) return null
  const { width, height } = getMediaDimensions(media)
  const resolvedAlt =
    alt ??
    (typeof media === 'object' && media?.alt ? media.alt : '')

  return (
    <Image
      src={src}
      height={height}
      width={width}
      alt={resolvedAlt}
      className="object-contain max-w-full max-h-[75vh] py-4 mx-auto h-auto w-auto"
    />
  )
}

export default PostImage
