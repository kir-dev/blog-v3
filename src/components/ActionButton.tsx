import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { PortableTextComponent } from '@portabletext/react'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

interface Props {
  href: string
  newTab?: boolean
  className?: string
  icon?: JSX.Element
}

const ActionButton: FC<PropsWithChildren<Props>> = ({
  children,
  href,
  newTab,
  className,
  icon,
}) => (
  <Link href={href} target={newTab ? '_blank' : '_self'}>
    <div
      className={
        `h-14 w-auto cursor-pointer ` +
        `inline-flex flex-row gap-3 items-center font-bold text-decoration-none relative ` +
        `after:content-[""] after:block after:absolute after:h-1 after:left-0 after:right-0 after:bottom-2 after:bg-primary after:transition-left ` +
        `hover:text-primary hover:after:left-full ` +
        className
      }
    >
      {children}
      {icon ?? <ArrowRightIcon className="h-4 w-4" />}
    </div>
  </Link>
)

export default ActionButton

interface PortableProps {
  text: string
  href: string
}

export const PortableActionButton: PortableTextComponent<PortableProps> = ({
  value,
}) => {
  const { text, href } = value
  return href ? (
    <div>
      <ActionButton href={href} newTab={href.startsWith('http')}>
        {text}
      </ActionButton>
    </div>
  ) : null
}
