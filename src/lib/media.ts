export interface MediaLike {
  id?: number | string
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  filename?: string | null
}

export function getMediaUrl(
  media: MediaLike | number | string | null | undefined,
): string | undefined {
  if (!media || typeof media === 'number' || typeof media === 'string') {
    return undefined
  }
  return media.url ?? undefined
}

export function getMediaDimensions(
  media: MediaLike | number | string | null | undefined,
): { width: number; height: number } {
  if (!media || typeof media === 'number' || typeof media === 'string') {
    return { width: 1000, height: 500 }
  }
  return {
    width: media.width ?? 1000,
    height: media.height ?? 500,
  }
}
