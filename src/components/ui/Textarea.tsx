import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex w-full rounded-md border border-hazelnut/30 bg-water px-3 py-2 text-sm transition-colors placeholder:text-hazelnut/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/20 focus-visible:border-leaf disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'min-h-[80px]',
        sm: 'min-h-[60px]',
        lg: 'min-h-[120px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants } 