import { XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { cn } from '~/lib/cn'

interface ChipProps {
  children: React.ReactNode
  size?: 'sm' | 'md'
  color?: 'default' | 'primary'
  onClose?: () => void
  className?: string
}

export function Chip({
  children,
  size = 'md',
  color = 'default',
  onClose,
  className,
}: ChipProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-normal',
        size === 'sm' ? 'h-6 px-2.5 text-xs' : 'min-h-7 px-3 py-1 text-sm',
        color === 'primary'
          ? 'bg-primary text-primary-foreground'
          : 'bg-default/70 text-foreground',
        className,
      )}
    >
      <span className="flex items-center gap-1">{children}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-1 rounded-full p-0.5 opacity-80 hover:opacity-100 transition-opacity"
        >
          <XMarkIcon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
