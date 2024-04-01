import { urlForImage } from '~/lib/sanity.image'
import { Member } from '~/lib/sanity.types'

export const getAdaptiveImageUrl = (
  member: Member,
  overlayShown: boolean,
  theme?: string,
) => {
  if (theme === 'dark') {
    return overlayShown && member.darkHoverImage
      ? urlForImage(member.darkHoverImage)?.url()
      : member.darkImage && urlForImage(member.darkImage)?.url()
  } else {
    return overlayShown
      ? member.hoverImage
        ? urlForImage(member.hoverImage)?.url()
        : member.darkHoverImage && urlForImage(member.darkHoverImage)?.url()
      : member.mainImage
        ? urlForImage(member.mainImage)?.url()
        : member.darkImage && urlForImage(member.darkImage)?.url()
  }
}
