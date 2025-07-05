import React from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Text } from './Text'
import { Heading } from './Heading'
import { cn } from '../../lib/utils'
import { useLanguage } from '@/components/LanguageProvider'

interface NewsletterProps {
  title?: string
  description?: string
  buttonText?: string
  placeholder?: string
  onSubmit?: (email: string) => void
  className?: string
}

const Newsletter = React.forwardRef<HTMLDivElement, NewsletterProps>(
  ({
    title,
    description,
    buttonText,
    placeholder,
    onSubmit,
    className,
    ...props
  }, ref) => {
    const { t } = useLanguage();
    const [email, setEmail] = React.useState('')
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = React.useState('')

    // Use translation keys as defaults if not provided
    const finalTitle = title || t("newsletter.title");
    const finalDescription = description || t("newsletter.description");
    const finalButtonText = buttonText || t("newsletter.buttonText");
    const finalPlaceholder = placeholder || t("newsletter.placeholder");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!email) return
      setStatus('loading')
      setErrorMsg('')
      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        const data = await res.json()
        if (res.ok && data.success) {
          setStatus('success')
          setEmail('')
        } else {
          setStatus('error')
          setErrorMsg(data.error || data.message || t('newsletter.error'))
        }
      } catch (error: any) {
        setStatus('error')
        setErrorMsg(error.message || t('newsletter.error'))
      }
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-lg bg-lightTeal p-6 md:p-8', className)}
        {...props}
      >
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" size="h3" className="mb-4">
            {finalTitle}
          </Heading>
          <Text className="mb-8" textColor="muted">
            {finalDescription}
          </Text>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-4">
            <Input
              type="email"
              placeholder={finalPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0"
            >
              {status === 'loading' ? t("newsletter.processing") : finalButtonText}
            </Button>
          </form>
          {status === 'success' && (
            <Text textColor="olive">{t("newsletter.success")}</Text>
          )}
          {status === 'error' && (
            <Text textColor="muted">{errorMsg || t("newsletter.error")}</Text>
          )}
        </div>
      </div>
    )
  }
)
Newsletter.displayName = 'Newsletter'

export { Newsletter } 