import { Avatar, Card, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { FC, ReactEventHandler, useEffect, useState } from 'react'

import { urlForImage } from '~/lib/sanity.image'
import { Member } from '~/lib/sanity.queries'

type Props = {
  member: Member
}

const getAdaptiveImageUrl = (
  member: Member,
  overlayShown: boolean,
  theme?: string,
) => {
  if (theme === 'dark') {
    return overlayShown && member.darkHoverImage
      ? urlForImage(member.darkHoverImage)?.url()
      : urlForImage(member.darkImage)?.url()
  } else {
    return overlayShown
      ? member.hoverImage
        ? urlForImage(member.hoverImage)?.url()
        : urlForImage(member.darkHoverImage)?.url()
      : member.mainImage
        ? urlForImage(member.mainImage)?.url()
        : urlForImage(member.darkImage)?.url()
  }
}

export const MemberAvatarCard: FC<Props> = ({ member }) => {
  const defaultAvatarUrl = urlForImage(member.mainImage)?.url()
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl)
  const [showAvatar, setShowAvatar] = useState(false)
  const [overlayShown, setOverlayShown] = useState(false)
  const onOverlayEnter = () => setOverlayShown(true)
  const onOverlayLeave = () => setOverlayShown(false)
  const { theme } = useTheme()
  // const openPekUrl = () => window.open(`${environment.pekUrl}/profiles/${member.pekUsername}`)

  const onError: ReactEventHandler<HTMLImageElement> = (e) => {
    setShowAvatar(true)
  }

  useEffect(() => {
    setAvatarUrl(getAdaptiveImageUrl(member, overlayShown, theme))
  }, [setAvatarUrl, member, overlayShown, theme])

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none w-full bg-foreground/10"
      onMouseEnter={onOverlayEnter}
      onMouseLeave={onOverlayLeave}
    >
      {showAvatar ? (
        <div className="w-full h-[180px] sm:h-[300px] justify-center items-center flex">
          <Avatar
            size="lg"
            classNames={{ base: 'h-24 w-24' }}
            name={member.name}
            showFallback
            fallback={
              <div className="text-2xl">
                {member.name
                  .match(/(^\S\S?|\s\S)?/g)
                  .map((v) => v.trim())
                  .join('')
                  .match(/(^\S|\S$)?/g)
                  .join('')
                  .toLocaleUpperCase()}
              </div>
            }
          />
        </div>
      ) : (
          <Image
            alt={`${member.name} profile picture`}
            className="object-contain"
            height={500}
            width={500}
            src={avatarUrl}
            onError={onError}
          />
      )}
      <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_4px)] shadow-small ml-0.5 z-10">
        <div
          className="flex-1 text-small text-white text-center sm:text-start"
          style={{ textShadow: '1px 1px 1px #000000, 2px 2px 4px #000000' }}
        >
          {member.name}
        </div>
        <div className="hidden sm:flex justify-self-end text-[0.6rem] tracking-tighter uppercase text-white bg-black/30 py-1 px-2 rounded-2xl">
          {member.rank ?? 'újonc'}
        </div>
      </CardFooter>
    </Card>
  )
}
