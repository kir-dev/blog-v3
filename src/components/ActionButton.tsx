import { ArrowRightIcon } from '@heroicons/react/24/solid'
import React, { FC, PropsWithChildren } from 'react'
import { Link } from '~/i18n/navigation'
import { cn } from '~/lib/cn'

interface Props {
  href: string
  newTab?: boolean
  className?: string
  icon?: React.ReactNode
}

const ActionButton: FC<PropsWithChildren<Props>> = ({
  children,
  href,
  newTab,
  className,
  icon,
}) => {
  const isExternal =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('#')

  const inner = (
    <div
      className={cn(
        'h-14 w-auto cursor-pointer',
        'inline-flex flex-row gap-3 items-center font-bold no-underline relative',
        'after:content-[""] after:block after:absolute after:h-1 after:left-0 after:right-0 after:bottom-2 after:bg-primary after:transition-left',
        'hover:text-primary hover:after:left-full duration-100 hover:duration-100',
        className,
      )}
    >
      {children}
      {icon ?? <ArrowRightIcon className="h-4 w-4" />}
    </div>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} target={newTab ? '_blank' : undefined}>
      {inner}
    </Link>
  )
}

export default ActionButton
