import React from 'react'
import { cn } from '@/lib/utils'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn('space-y-6', className)}
        {...props}
      />
    )
  }
)
Form.displayName = 'Form'

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      />
    )
  }
)
FormField.displayName = 'FormField'

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: 'error' | 'success' | 'info'
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, type = 'error', ...props }, ref) => {
    const typeClasses = {
      error: 'text-red-500',
      success: 'text-green-500',
      info: 'text-blue-500',
    }

    return (
      <p
        ref={ref}
        className={cn('text-sm', typeClasses[type], className)}
        {...props}
      />
    )
  }
)
FormMessage.displayName = 'FormMessage'

export { Form, FormField, FormMessage } 