'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FC, ReactEventHandler, useEffect, useState } from 'react'
import { getMediaUrl } from '~/lib/media'
import type { Member } from '~/payload-types'
import { getAdaptiveImageUrl } from '~/utils/adaptive-member-image'

type Props = {
  member: Member
}

export const MemberAvatarCard: FC<Props> = ({ member }) => {
  const defaultAvatarUrl =
    getMediaUrl(member.darkImage) ?? getMediaUrl(member.mainImage) ?? ''
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    defaultAvatarUrl,
  )
  const [showAvatar, setShowAvatar] = useState(false)
  const [overlayShown, setOverlayShown] = useState(false)
  const { resolvedTheme } = useTheme()
  const t = useTranslations('Members')

  const onError: ReactEventHandler<HTMLImageElement> = () => {
    setShowAvatar(true)
  }

  useEffect(() => {
    setShowAvatar(false)
    setAvatarUrl(getAdaptiveImageUrl(member, overlayShown, resolvedTheme))
  }, [member, overlayShown, resolvedTheme])

  return (
    <div
      className="relative overflow-hidden rounded-large border-none w-full bg-foreground/10 flex items-center justify-center"
      onMouseEnter={() => setOverlayShown(true)}
      onMouseLeave={() => setOverlayShown(false)}
    >
      {showAvatar || !avatarUrl ? (
        <div className="w-full h-[180px] sm:h-[300px] justify-center items-center flex">
          <div className="h-24 w-24 rounded-full bg-default flex items-center justify-center text-2xl font-semibold">
            {member.lastName[0]}
            {member.firstName[0]}
          </div>
        </div>
      ) : (
        <Image
          alt={t('imageAlt', {
            firstName: member.firstName,
            lastName: member.lastName,
          })}
          className="object-cover w-full h-full"
          height={500}
          width={500}
          sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 320px"
          src={avatarUrl}
          onError={onError}
        />
      )}
      <div className="flex items-center justify-between backdrop-blur-md bg-white/10 border-white/20 border-1 overflow-hidden py-1.5 px-3 absolute rounded-large bottom-1 left-1 right-1 shadow-small z-10">
        <div
          className="flex-1 text-small text-white text-center sm:text-start truncate"
          style={{ textShadow: '1px 1px 1px #000000, 2px 2px 4px #000000' }}
        >
          {t('nameFormat', {
            firstName: member.firstName,
            lastName: member.lastName,
          })}
        </div>
        <div className="hidden sm:flex justify-self-end text-[0.6rem] tracking-tighter uppercase text-white bg-black/30 py-1 px-2 rounded-2xl whitespace-nowrap">
          {t(`rank.${member.rank ?? 'rookie'}`)}
        </div>
      </div>
    </div>
  )
}
