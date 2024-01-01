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
import { Badge, Button } from '@nextui-org/react'
import { FC, useState } from 'react'

const classNameGray = 'bg-neutral-500 hover:bg-neutral-800'
const classNameRed = 'bg-red-500 hover:bg-red-600'

const actionIcons = [
  {
    align: 'center',
    icon: MicrophoneIcon,
    className: classNameGray,
  },
  {
    align: 'center',
    icon: VideoCameraSlashIcon,
    className: classNameRed,
  },
  {
    align: 'center',
    icon: HandRaisedIcon,
    className: `${classNameGray} hidden lg:flex`,
  },
  {
    align: 'center',
    icon: ComputerDesktopIcon,
    className: `${classNameGray} hidden lg:flex`,
  },
  {
    align: 'center',
    icon: EllipsisVerticalIcon,
    className: `${classNameGray} hidden lg:flex`,
  },
  {
    align: 'center',
    icon: PhoneXMarkIcon,
    className: classNameRed,
  },
  { align: 'right', icon: InformationCircleIcon },
  { align: 'right', icon: UsersIcon, showBadge: true },
  { align: 'right', icon: ChatBubbleBottomCenterTextIcon },
]

type Props = {
  numberOfActives: number
}

export const MeetingControls: FC<Props> = ({ numberOfActives }) => {
  const [showControls, setShowControls] = useState(true)
  return (
    <div
      className={
        `${
          showControls ? 'grid' : 'hidden'
        } md:grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ` +
        `z-20 bottom-0 left-0 fixed items-center sm:relative w-full ` +
        `bg-background sm:bg-none py-4 px-1 md:px-10 sm:my-10 sm:rounded-lg`
      }
    >
      <div className="px-4 text-lg sm:text-2xl font-extrabold tracking-tighter text-center sm:text-start">
        Kir-Dev gyűlés
      </div>

      <div className="flex flex-row gap-2 justify-self-center">
        {actionIcons
          .filter((a) => a.align === 'center')
          .map((a) => (
            <Button
              key={a.icon.toString()}
              size="sm"
              isIconOnly
              aria-label="Non-functional button"
              className={'rounded-full p-0 h-12 w-12 ' + a.className}
              onClick={
                a.icon === PhoneXMarkIcon && (() => setShowControls(false))
              }
            >
              <a.icon className="h-5 w-5 text-gray-50" />
            </Button>
          ))}
      </div>
      <div className="flex-row gap-2 justify-self-end hidden md:flex">
        {actionIcons
          .filter((a) => a.align === 'right')
          .map((a) => {
            const button = (
              <Button
                key={a.icon.toString()}
                size="sm"
                variant="light"
                isIconOnly
                aria-label="Non-functional button"
                className={a.className}
              >
                <a.icon className="h-5 w-5" />
              </Button>
            )
            return a.showBadge ? (
              <Badge color="default" content={numberOfActives}>
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
