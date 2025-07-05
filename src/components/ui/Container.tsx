import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'sm' | 'lg' | 'fluid'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      default: 'max-w-7xl',
      sm: 'max-w-3xl',
      lg: 'max-w-5xl',
      fluid: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = 'Container'

export { Container } 