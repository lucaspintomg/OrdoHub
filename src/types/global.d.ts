/// <reference types="vite/client" />

// Vite Client Types
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_WEBSOCKET_URL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global Types for OrdoHub
declare global {
  namespace OrdoHub {
    // User Types
    interface User {
      id: string
      email: string
      name: string
      avatar?: string
      role: 'admin' | 'parent' | 'child' | 'guest'
      familyId: string
      preferences: UserPreferences
      createdAt: string
      updatedAt: string
    }

    interface UserPreferences {
      theme: 'light' | 'dark' | 'system'
      language: 'pt-BR' | 'en-US' | 'es-ES'
      notifications: NotificationSettings
      timezone: string
    }

    interface NotificationSettings {
      email: boolean
      push: boolean
      inApp: boolean
      taskReminders: boolean
      eventReminders: boolean
      familyUpdates: boolean
    }

    // Task Types
    interface Task {
      id: string
      title: string
      description?: string
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
      priority: 'low' | 'medium' | 'high' | 'urgent'
      assignedTo?: string
      createdBy: string
      familyId: string
      category: TaskCategory
      dueDate?: string
      completedAt?: string
      estimatedDuration?: number
      actualDuration?: number
      tags: string[]
      attachments: Attachment[]
      createdAt: string
      updatedAt: string
    }

    interface TaskCategory {
      id: string
      name: string
      color: string
      icon: string
    }

    // Financial Types
    interface Expense {
      id: string
      amount: number
      currency: string
      description: string
      category: ExpenseCategory
      paymentMethod: PaymentMethod
      paidBy: string
      familyId: string
      date: string
      isRecurring: boolean
      recurringPattern?: RecurringPattern
      tags: string[]
      attachments: Attachment[]
      createdAt: string
      updatedAt: string
    }

    interface ExpenseCategory {
      id: string
      name: string
      color: string
      icon: string
      budget?: number
    }

    interface PaymentMethod {
      id: string
      name: string
      type: 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'other'
    }

    interface RecurringPattern {
      frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
      interval: number
      endDate?: string
    }

    // Family Types
    interface Family {
      id: string
      name: string
      description?: string
      members: FamilyMember[]
      settings: FamilySettings
      createdAt: string
      updatedAt: string
    }

    interface FamilyMember {
      userId: string
      role: 'admin' | 'parent' | 'child' | 'guest'
      joinedAt: string
      permissions: Permission[]
    }

    interface FamilySettings {
      currency: string
      timezone: string
      language: string
      allowChildrenToCreateTasks: boolean
      requireApprovalForExpenses: boolean
      maxExpenseAmountWithoutApproval: number
    }

    interface Permission {
      resource: 'tasks' | 'expenses' | 'calendar' | 'inventory' | 'family'
      actions: ('create' | 'read' | 'update' | 'delete')[]
    }

    // Common Types
    interface Attachment {
      id: string
      filename: string
      url: string
      size: number
      mimeType: string
      uploadedBy: string
      uploadedAt: string
    }

    // API Response Types
    interface ApiResponse<T = unknown> {
      success: boolean
      data?: T
      message?: string
      errors?: Record<string, string[]>
      meta?: {
        page?: number
        limit?: number
        total?: number
        totalPages?: number
      }
    }

    interface ApiError {
      message: string
      code: string
      statusCode: number
      details?: unknown
    }

    // Form Types
    interface FormState<T = Record<string, unknown>> {
      data: T
      errors: Record<keyof T, string>
      isSubmitting: boolean
      isValid: boolean
    }

    // Filter and Search Types
    interface FilterOptions {
      search?: string
      status?: string[]
      category?: string[]
      dateRange?: {
        start: string
        end: string
      }
      assignedTo?: string[]
      priority?: string[]
      tags?: string[]
    }

    interface SortOptions {
      field: string
      direction: 'asc' | 'desc'
    }

    interface PaginationOptions {
      page: number
      limit: number
    }

    // Event Types
    interface CalendarEvent {
      id: string
      title: string
      description?: string
      startDate: string
      endDate: string
      isAllDay: boolean
      location?: string
      familyId: string
      createdBy: string
      attendees: string[]
      reminders: EventReminder[]
      category: EventCategory
      createdAt: string
      updatedAt: string
    }

    interface EventReminder {
      type: 'email' | 'push' | 'popup'
      minutesBefore: number
    }

    interface EventCategory {
      id: string
      name: string
      color: string
    }
  }
}

export {}
