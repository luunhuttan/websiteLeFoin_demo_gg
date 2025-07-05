import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva('text-brown', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    textColor: {
      default: 'text-brown',
      muted: 'text-brown/60',
      olive: 'text-olive',
      moss: 'text-moss',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    align: 'left',
    textColor: 'default',
  },
})

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, align, textColor, as = 'p', ...props }, ref) => {
    const Comp = as

    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, weight, align, textColor, className }))}
        {...props}
      />
    )
  }
)
Text.displayName = 'Text'

export { Text, textVariants } 