'use client'

import * as React from 'react'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { cn } from 'cn'

// DropdownMenu = MenuRoot
const DropdownMenu = MenuPrimitive.Root

// DropdownMenuTrigger: uses the same render-prop API as dashboard.tsx.
const DropdownMenuTrigger = MenuPrimitive.Trigger

// DropdownMenuContent: wraps Positioner + Popup for a styled dropdown.
function DropdownMenuContent({
  className,
  align = 'start',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'end' | 'center'
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner align={align}>
        <MenuPrimitive.Popup
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md',
            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

// DropdownMenuItem
function DropdownMenuItem({
  className,
  variant,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: 'destructive' }) {
  return (
    <MenuPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        variant === 'destructive' &&
          'text-destructive focus:bg-destructive/10 focus:text-destructive',
        className
      )}
      {...props}
    >
      {children}
    </MenuPrimitive.Item>
  )
}

// DropdownMenuSeparator
function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      aria-hidden
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
