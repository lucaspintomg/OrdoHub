// Export all type definitions

// Component Types
export * from '../../types/components'

// Entity Types (User, Task, Family, etc.)
export * from '../../types/entities'

// Re-export global types directly instead of using OrdoHub namespace
export * from '../../types/global'

// Import specific types for internal use
import type { Task, Expense, User, Family } from '../../types/entities'

// Common utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type WithId<T> = T & { id: string }

export type WithTimestamps<T> = T & {
  createdAt: string
  updatedAt: string
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

// Form validation types
export type ValidationRule<T = unknown> = {
  required?: boolean | string
  min?: number | string
  max?: number | string
  pattern?: RegExp | string
  validate?: (value: T) => boolean | string
  custom?: (value: T) => Promise<boolean | string>
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>
}

// API types
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestConfig = {
  method?: HTTPMethod
  headers?: Record<string, string>
  params?: Record<string, unknown>
  timeout?: number
  retries?: number
}

// State management types
export type StoreSlice<T> = (
  set: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void,
  get: () => T
) => T

export type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

// Event types
export type EventMap = {
  'task:created': { task: Task }
  'task:updated': { task: Task }
  'task:deleted': { taskId: string }
  'expense:created': { expense: Expense }
  'expense:updated': { expense: Expense }
  'expense:deleted': { expenseId: string }
  'user:updated': { user: User }
  'family:updated': { family: Family }
}

export type EventListener<T extends keyof EventMap> = (data: EventMap[T]) => void

// Route types
export type RouteParams = Record<string, string>
export type QueryParams = Record<string, string | string[] | undefined>

// Theme types
export type ColorMode = 'light' | 'dark' | 'system'
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Media query types
export type MediaQuery = `(min-width: ${string})` | `(max-width: ${string})`

// Animation types
export type TransitionConfig = {
  duration?: number
  delay?: number
  easing?: string
  property?: string
}

// File upload types
export type FileUploadConfig = {
  maxSize: number
  allowedTypes: string[]
  multiple?: boolean
  directory?: string
}

export type UploadProgress = {
  loaded: number
  total: number
  percentage: number
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type NotificationConfig = {
  type: NotificationType
  title: string
  message?: string
  duration?: number
  persistent?: boolean
  actions?: Array<{
    label: string
    action: () => void
  }>
}

// Feature flag types
export type FeatureFlag = {
  enabled: boolean
  rolloutPercentage?: number
  variants?: Record<string, unknown>
}

export type FeatureFlags = Record<string, FeatureFlag>

// Analytics types
export type AnalyticsEvent = {
  name: string
  properties?: Record<string, unknown>
  timestamp?: number
  userId?: string
}

// Error boundary types
export type ErrorInfo = {
  componentStack: string
  errorBoundary?: string
}
