import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-leaf/20',
  {
    variants: {
      variant: {
        default: 'bg-amber text-white hover:bg-goldenSand',
        outline: 'border border-leaf text-leaf hover:bg-leaf hover:text-water',
        secondary: 'bg-lightTeal text-leaf hover:bg-leaf/10',
        ghost: 'text-leaf hover:bg-leaf/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 