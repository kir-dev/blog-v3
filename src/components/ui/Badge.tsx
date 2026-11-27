import React from 'react'
import { cn } from '~/lib/cn'

type BadgeColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger'

interface BadgeProps {
  content?: React.ReactNode
  color?: BadgeColor
  placement?: 'top-right' | 'bottom-right'
  className?: string
  badgeClassName?: string
  children: React.ReactNode
}

const colorClasses: Record<BadgeColor, string> = {
  default: 'bg-default text-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-success text-success-foreground',
  danger: 'bg-danger text-danger-foreground',
}

export function Badge({
  content,
  color = 'default',
  placement = 'top-right',
  className,
  badgeClassName,
  children,
}: BadgeProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {children}
      {content !== undefined && content !== null && content !== '' && (
        <span
          className={cn(
            'absolute z-10 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap shadow-small',
            placement === 'bottom-right'
              ? 'bottom-1 right-1'
              : '-top-1.5 -right-1.5',
            colorClasses[color],
            badgeClassName,
          )}
        >
          {content}
        </span>
      )}
    </div>
  )
}
