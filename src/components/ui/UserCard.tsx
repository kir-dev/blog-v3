import React from 'react'
import { cn } from '~/lib/cn'

interface UserCardProps {
  name: string
  description?: string | null
  avatarSrc?: string
  fallback: string
}

export function UserCard({
  name,
  description,
  avatarSrc,
  fallback,
}: UserCardProps) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-default flex items-center justify-center text-xs font-semibold text-foreground">
        {avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-small font-medium text-foreground">{name}</span>
        {description && (
          <span className="text-tiny text-foreground-400">{description}</span>
        )}
      </div>
    </div>
  )
}
