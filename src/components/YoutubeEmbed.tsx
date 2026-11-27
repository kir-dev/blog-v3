import React from 'react'

function getYoutubeEmbedUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl)
    let videoId: string | null = null
    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1)
    } else if (parsed.pathname.startsWith('/embed/')) {
      videoId = parsed.pathname.split('/')[2] ?? null
    } else if (parsed.pathname.startsWith('/shorts/')) {
      videoId = parsed.pathname.split('/')[2] ?? null
    } else {
      videoId = parsed.searchParams.get('v')
    }
    if (!videoId) return null
    return `https://www.youtube-nocookie.com/embed/${videoId}`
  } catch {
    return null
  }
}

interface Props {
  url: string
  children?: React.ReactNode
}

export const YoutubeEmbed: React.FC<Props> = ({ url, children }) => {
  const embedUrl = getYoutubeEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <div className="flex flex-col md:flex-row md:gap-10 justify-center items-start my-4">
      {children ? <div className="w-full">{children}</div> : null}
      <div className="w-full md:w-[40rem] shrink-0 mb-4 py-3">
        <div className="relative w-full overflow-hidden rounded-lg aspect-video">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
