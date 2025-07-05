import React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/20 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-amber text-white hover:bg-goldenSand',
        outline: 'border border-leaf text-leaf hover:bg-leaf hover:text-water',
        ghost: 'text-leaf hover:bg-leaf/10',
        link: 'text-amber underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonBaseProps = VariantProps<typeof buttonVariants>

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
  asChild?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    if (asChild && href) {
      const linkProps = { ...props, className: cn(buttonVariants({ variant, size, className })) } as React.ComponentPropsWithoutRef<typeof Link>
      const { href: _removed, ...rest } = linkProps
      return <Link href={href} {...rest} />
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants } 