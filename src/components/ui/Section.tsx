import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'default' | 'sm' | 'lg'
  background?: 'default' | 'straw' | 'cream'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, size = 'default', background = 'default', ...props }, ref) => {
    const sizeClasses = {
      default: 'py-12 md:py-16 lg:py-20',
      sm: 'py-8 md:py-12 lg:py-16',
      lg: 'py-16 md:py-20 lg:py-24',
    }

    const backgroundClasses = {
      default: 'bg-water',
      straw: 'bg-goldenSand',
      cream: 'bg-lightTeal',
    }

    return (
      <section
        ref={ref}
        className={cn(
          sizeClasses[size],
          backgroundClasses[background],
          className
        )}
        {...props}
      />
    )
  }
)
Section.displayName = 'Section'

export { Section } 