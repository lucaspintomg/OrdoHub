import React, { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'compact' | 'hover'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, variant = 'default', padding = 'md', className, ...props },
    ref
  ) => {
    const baseClasses =
      'bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-200 dark:border-neutral-700'

    const variantClasses = {
      default: '',
      compact: '',
      hover: 'hover:shadow-card-hover transition-shadow duration-200',
    }

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={clsx(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header Component
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, title, subtitle, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex items-start justify-between', className)}
        {...props}
      >
        <div className='flex-1'>
          {title && (
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1'>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && <div className='ml-4 flex-shrink-0'>{action}</div>}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// Card Content Component
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  // Extensão para props futuras se necessário
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('mt-4', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

// Card Footer Component
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  // Extensão para props futuras se necessário
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
}
