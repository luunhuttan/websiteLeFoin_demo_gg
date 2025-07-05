import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const selectVariants = cva(
  'flex w-full rounded-md border border-hazelnut/30 bg-water px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/20 focus-visible:border-leaf disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-11',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <select
        className={cn(selectVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = 'Select'

export { Select, selectVariants } 