import {
  PortableText,
  PortableTextBlock,
  PortableTextComponent,
} from '@portabletext/react'
import { useEffect, useState } from 'react'
import YouTubePlayer from 'react-player/youtube'
import { aboutPageComponents } from '~/utils/portable-text-comps'

interface PortableProps {
  url: string
  body?: PortableTextBlock[]
}

export const PortableYoutubeEmbed: PortableTextComponent<PortableProps> = ({
  value,
}) => {
  const { url, body } = value
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return url ? (
    <div className="flex flex-col md:flex-row md:gap-10 justify-center">
      {body && body.length && (
        <div className="w-full">
          <PortableText value={body} components={aboutPageComponents} />
        </div>
      )}
      <div className="w-full md:w-[40rem] mb-4 py-3">
        {isClient ? (
          <YouTubePlayer
            controls
            url={url}
            width="100%"
            height="100%"
            style={{ aspectRatio: '16/9' }}
          />
        ) : null}
      </div>
    </div>
  ) : null
}
