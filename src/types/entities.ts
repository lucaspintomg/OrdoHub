// Entity Types for OrdoHub (exported without namespace for direct use)

// User Types
export interface User {
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

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'pt-BR' | 'en-US' | 'es-ES'
  notifications: NotificationSettings
  timezone: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  inApp: boolean
  taskReminders: boolean
  eventReminders: boolean
  familyUpdates: boolean
}

// Task Types
export interface Task {
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

export interface TaskCategory {
  id: string
  name: string
  color: string
  icon: string
}

// Financial Types
export interface Expense {
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

export interface ExpenseCategory {
  id: string
  name: string
  color: string
  icon: string
  budget?: number
}

export interface PaymentMethod {
  id: string
  name: string
  type: 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'other'
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  endDate?: string
}

// Family Types
export interface Family {
  id: string
  name: string
  description?: string
  members: FamilyMember[]
  settings: FamilySettings
  createdAt: string
  updatedAt: string
}

export interface FamilyMember {
  userId: string
  role: 'admin' | 'parent' | 'child' | 'guest'
  joinedAt: string
  permissions: Permission[]
}

export interface FamilySettings {
  currency: string
  timezone: string
  language: string
  allowChildrenToCreateTasks: boolean
  requireApprovalForExpenses: boolean
  maxExpenseAmountWithoutApproval: number
}

export interface Permission {
  resource: 'tasks' | 'expenses' | 'calendar' | 'inventory' | 'family'
  actions: ('create' | 'read' | 'update' | 'delete')[]
}

// Calendar Types
export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate?: string
  allDay: boolean
  location?: string
  attendees: EventAttendee[]
  familyId: string
  createdBy: string
  category: EventCategory
  recurrence?: RecurrenceRule
  reminders: EventReminder[]
  createdAt: string
  updatedAt: string
}

export interface EventAttendee {
  userId: string
  status: 'pending' | 'accepted' | 'declined' | 'tentative'
  respondedAt?: string
}

export interface EventCategory {
  id: string
  name: string
  color: string
  icon: string
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  endDate?: string
  daysOfWeek?: number[]
  dayOfMonth?: number
}

export interface EventReminder {
  minutes: number
  method: 'email' | 'push' | 'in_app'
}

// Shared Types
export interface Attachment {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedBy: string
  uploadedAt: string
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
  timestamp: string
  pagination?: PaginationInfo
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: string
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Form and UI Types
export interface FormState<T = Record<string, unknown>> {
  data: T
  errors: Record<string, string>
  isLoading: boolean
  isValid: boolean
  isDirty: boolean
  touchedFields: Set<string>
}

export interface FilterOptions {
  search?: string
  category?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  assignedTo?: string
  tags?: string[]
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

export interface PaginationOptions {
  page: number
  limit: number
}
