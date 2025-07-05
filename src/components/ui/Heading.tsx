import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva('font-serif font-bold text-olive', {
  variants: {
    size: {
      h1: 'text-4xl md:text-5xl lg:text-6xl',
      h2: 'text-3xl md:text-4xl lg:text-5xl',
      h3: 'text-2xl md:text-3xl lg:text-4xl',
      h4: 'text-xl md:text-2xl lg:text-3xl',
      h5: 'text-lg md:text-xl lg:text-2xl',
      h6: 'text-base md:text-lg lg:text-xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'h2',
    align: 'left',
  },
})

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, align, as, ...props }, ref) => {
    const Comp = as || (size?.toString().replace('h', 'h') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2'

    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ size, align, className }))}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'

export { Heading, headingVariants } 