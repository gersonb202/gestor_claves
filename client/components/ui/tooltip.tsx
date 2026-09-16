'use client'

import * as React from 'react'
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { cn } from 'cn'

// TooltipProvider: @base-ui/react manages its own provider via TooltipRoot,
// so this is just a passthrough wrapper for API compatibility.
function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// Tooltip = TooltipRoot
const Tooltip = TooltipPrimitive.Root

// TooltipTrigger: exposes the same render-prop API that dashboard.tsx uses.
const TooltipTrigger = TooltipPrimitive.Trigger

// TooltipContent: wraps Positioner + Popup for a ready-to-use styled popup.
function TooltipContent({
  className,
  children,
  side = 'top',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side={side}>
        <TooltipPrimitive.Popup
          className={cn(
            'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
            className
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
