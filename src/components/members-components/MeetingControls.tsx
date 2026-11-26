'use client'

import {
  ChatBubbleBottomCenterTextIcon,
  ComputerDesktopIcon,
  EllipsisVerticalIcon,
  HandRaisedIcon,
  InformationCircleIcon,
  MicrophoneIcon,
  PhoneXMarkIcon,
  UsersIcon,
  VideoCameraSlashIcon,
} from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { Badge } from '~/components/ui/Badge'

const classNameGray = 'bg-neutral-500 hover:bg-neutral-800'
const classNameRed = 'bg-red-500 hover:bg-red-600'

const actionIcons = [
  {
    key: 'microphone',
    align: 'center',
    icon: MicrophoneIcon,
    className: classNameGray,
  },
  {
    key: 'video',
    align: 'center',
    icon: VideoCameraSlashIcon,
    className: classNameRed,
  },
  {
    key: 'hand',
    align: 'center',
    icon: HandRaisedIcon,
    className: `${classNameGray} hidden lg:flex`,
  },
  {
    key: 'desktop',
    align: 'center',
    icon: ComputerDesktopIcon,
    className: `${classNameGray} hidden lg:flex`,
  },
  {
    key: 'ellipsis',
    align: 'center',
    icon: EllipsisVerticalIcon,
    className: `${classNameGray} hidden lg:flex`,
  },
  {
    key: 'phone',
    align: 'center',
    icon: PhoneXMarkIcon,
    className: classNameRed,
  },
  { key: 'info', align: 'right', icon: InformationCircleIcon },
  { key: 'users', align: 'right', icon: UsersIcon, showBadge: true },
  { key: 'chat', align: 'right', icon: ChatBubbleBottomCenterTextIcon },
]

type Props = {
  numberOfActives: number
}

export const MeetingControls: FC<Props> = ({ numberOfActives }) => {
  const [showControls, setShowControls] = useState(true)
  const t = useTranslations('Members')

  return (
    <div
      className={
        `${showControls ? 'grid' : 'hidden'} md:grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ` +
        `z-20 bottom-0 left-0 fixed items-center sm:relative w-full ` +
        `bg-background sm:bg-none py-4 px-1 md:px-10 sm:my-10 sm:rounded-lg`
      }
    >
      <div className="px-4 text-lg sm:text-2xl font-extrabold tracking-tighter text-center sm:text-start">
        {t('meetingTitle')}
      </div>
      <div className="flex flex-row gap-2 justify-self-center">
        {actionIcons
          .filter((a) => a.align === 'center')
          .map((a) => (
            <button
              key={a.key}
              type="button"
              aria-label={t('nonFuncButton')}
              className={`inline-flex items-center justify-center rounded-full p-0 h-12 w-12 transition-colors ${a.className}`}
              onClick={
                a.icon === PhoneXMarkIcon
                  ? () => setShowControls(false)
                  : undefined
              }
            >
              <a.icon className="h-5 w-5 text-gray-50" />
            </button>
          ))}
      </div>
      <div className="flex-row gap-2 justify-self-end hidden md:flex">
        {actionIcons
          .filter((a) => a.align === 'right')
          .map((a) => {
            const button = (
              <button
                key={a.showBadge ? undefined : a.key}
                type="button"
                aria-label={t('nonFuncButton')}
                className={`inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-default/50 transition-colors ${a.className ?? ''}`}
              >
                <a.icon className="h-5 w-5" />
              </button>
            )
            return a.showBadge ? (
              <Badge color="default" content={numberOfActives} key={a.key}>
                {button}
              </Badge>
            ) : (
              button
            )
          })}
      </div>
    </div>
  )
}
