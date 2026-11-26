import { getMediaUrl } from '~/lib/media'
import type { Member } from '~/payload-types'

export const getAdaptiveImageUrl = (
  member: Member,
  overlayShown: boolean,
  theme?: string,
): string | undefined => {
  if (theme === 'dark') {
    return overlayShown && member.darkHoverImage
      ? getMediaUrl(member.darkHoverImage)
      : getMediaUrl(member.darkImage) ?? getMediaUrl(member.mainImage)
  } else {
    return overlayShown
      ? member.hoverImage
        ? getMediaUrl(member.hoverImage)
        : getMediaUrl(member.darkHoverImage)
      : member.mainImage
        ? getMediaUrl(member.mainImage)
        : getMediaUrl(member.darkImage)
  }
}
