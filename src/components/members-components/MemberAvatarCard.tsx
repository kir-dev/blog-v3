import { Avatar, Card, CardFooter } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FC, ReactEventHandler, useEffect, useState } from 'react'

import { urlForImage } from '~/lib/sanity.image'
import { Member } from '~/lib/sanity.types'
import { getAdaptiveImageUrl } from '~/utils/adaptive-member-image'

type Props = {
  member: Member
}

export const MemberAvatarCard: FC<Props> = ({ member }) => {
  const defaultAvatarUrl = member.mainImage
    ? urlForImage(member.mainImage)?.url()
    : ''
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl)
  const [showAvatar, setShowAvatar] = useState(false)
  const [overlayShown, setOverlayShown] = useState(false)
  const onOverlayEnter = () => setOverlayShown(true)
  const onOverlayLeave = () => setOverlayShown(false)
  const { theme } = useTheme()
  const t = useTranslations('Members')

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
            name={`${member.lastName} ${member.firstName}`}
            showFallback
            fallback={
              <div className="text-2xl">
                {member.lastName[0]}
                {member.firstName[0]}
              </div>
            }
          />
        </div>
      ) : (
        <Image
          alt={t('imageAlt', {
            firstName: member.firstName,
            lastName: member.lastName,
          })}
          className="object-contain"
          height={500}
          width={500}
          src={avatarUrl ?? ''}
          onError={onError}
        />
      )}
      <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_4px)] shadow-small ml-0.5 z-10">
        <div
          className="flex-1 text-small text-white text-center sm:text-start"
          style={{ textShadow: '1px 1px 1px #000000, 2px 2px 4px #000000' }}
        >
          {t('nameFormat', {
            firstName: member.firstName,
            lastName: member.lastName,
          })}
        </div>
        <div className="hidden sm:flex justify-self-end text-[0.6rem] tracking-tighter uppercase text-white bg-black/30 py-1 px-2 rounded-2xl">
          {t(`rank.${member.rank ?? 'rookie'}`)}
        </div>
      </CardFooter>
    </Card>
  )
}
