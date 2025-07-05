import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'group relative overflow-hidden rounded-lg bg-water shadow-md transition-all hover:shadow-lg',
  {
    variants: {
      variant: {
        default: '',
        featured: 'md:col-span-2 lg:col-span-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  href?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, href, children, ...props }, ref) => {
    const cardContent = (
      <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
        {children}
      </div>
    )

    if (href) {
      return <Link href={href}>{cardContent}</Link>
    }

    return cardContent
  }
)
Card.displayName = 'Card'

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  width?: number
  height?: number
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, width, height, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative aspect-[16/9] overflow-hidden', className)} {...props}>
        <Image
          src={src}
          alt={alt}
          fill={!width || !height}
          width={width}
          height={height}
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
    )
  }
)
CardImage.displayName = 'CardImage'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-4', className)} {...props} />
    )
  }
)
CardContent.displayName = 'CardContent'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'font-serif text-xl font-bold text-leaf group-hover:text-amber',
          className
        )}
        {...props}
      />
    )
  }
)
CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('mt-2 text-sm text-hazelnut/80', className)}
        {...props}
      />
    )
  }
)
CardDescription.displayName = 'CardDescription'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 flex items-center gap-4', className)}
        {...props}
      />
    )
  }
)
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  cardVariants,
} 