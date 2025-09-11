// React Component Types for OrdoHub

import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from 'react'

// Polymorphic Component Helper Types
export type AsProp<C extends ElementType> = {
  as?: C
}

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = Record<string, never>,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = Record<string, never>,
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref']

// Common Component Props
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  'data-testid'?: string
}

// Size Variants
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Color Variants
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'

// Status Variants
export type StatusVariant =
  | 'default'
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'overdue'

// Button Variants
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'danger'

// Loading States
export interface LoadingState {
  isLoading: boolean
  loadingText?: string
}

// Error States
export interface ErrorState {
  hasError: boolean
  errorMessage?: string
  onRetry?: () => void
}

// Form Component Types
export interface FormFieldProps extends BaseComponentProps {
  label?: string
  helperText?: string
  errorMessage?: string
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
}

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  group?: string
}

// Modal and Dialog Types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  preventScroll?: boolean
}

// Table Component Types
export interface TableColumn<T = unknown> {
  key: string
  header: string
  accessor?: keyof T | ((row: T) => ReactNode)
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: T, index: number) => ReactNode
}

export interface TableProps<T = unknown> extends BaseComponentProps {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T, index: number) => void
  selectable?: boolean
  selectedRows?: T[]
  onSelectionChange?: (selectedRows: T[]) => void
}

// Navigation Types
export interface NavigationItem {
  id: string
  label: string
  href?: string
  icon?: ReactNode
  badge?: string | number
  children?: NavigationItem[]
  isActive?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: Record<string, string>
    secondary: Record<string, string>
    accent: Record<string, string>
    neutral: Record<string, string>
    success: Record<string, string>
    warning: Record<string, string>
    error: Record<string, string>
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  fontSize: Record<string, string>
  fontWeight: Record<string, string>
  boxShadow: Record<string, string>
  breakpoints: Record<string, string>
}

// Animation Types
export type AnimationVariant =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'bounce'
  | 'spin'
  | 'pulse'

export interface AnimationProps {
  animation?: AnimationVariant
  duration?: number
  delay?: number
  easing?: string
}

// Event Handler Types
export type ClickHandler = (event: React.MouseEvent) => void
export type ChangeHandler<T = string> = (value: T) => void
export type SubmitHandler<T = Record<string, unknown>> = (
  data: T
) => void | Promise<void>

// Conditional Props Helper
export type ConditionalProps<T, Condition> = Condition extends true
  ? T
  : Partial<T>

// Component State Types
export interface ComponentState {
  isVisible?: boolean
  isActive?: boolean
  isSelected?: boolean
  isFocused?: boolean
  isHovered?: boolean
  isPressed?: boolean
  isExpanded?: boolean
  isCollapsed?: boolean
}

// Responsive Prop Types
export type ResponsiveProp<T> =
  | T
  | {
      xs?: T
      sm?: T
      md?: T
      lg?: T
      xl?: T
    }

// Icon Types
export interface IconProps extends BaseComponentProps {
  size?: SizeVariant | number
  color?: string
  strokeWidth?: number
}

// Layout Types
export interface GridProps extends BaseComponentProps {
  columns?: ResponsiveProp<number>
  gap?: ResponsiveProp<SizeVariant>
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

export interface FlexProps extends BaseComponentProps {
  direction?: ResponsiveProp<
    'row' | 'column' | 'row-reverse' | 'column-reverse'
  >
  wrap?: ResponsiveProp<'nowrap' | 'wrap' | 'wrap-reverse'>
  align?: ResponsiveProp<'start' | 'center' | 'end' | 'stretch' | 'baseline'>
  justify?: ResponsiveProp<
    'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  >
  gap?: ResponsiveProp<SizeVariant>
}

// Data Fetching Types
export interface QueryOptions {
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
  staleTime?: number
  cacheTime?: number
  retry?: boolean | number
  retryDelay?: number
}

export interface MutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: TError, variables: TVariables) => void
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables
  ) => void
}
