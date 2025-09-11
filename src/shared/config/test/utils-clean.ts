// OrdoHub - Test Utilities
// Utilitários e helpers para testes

import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { vi } from 'vitest'

// Types
export interface MockUser {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'member' | 'child'
  familyId: string
  createdAt: string
  updatedAt: string
}

export interface MockTask {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate: string
  assignedTo: string[]
  createdBy: string
  familyId: string
  category: string
  tags: string[]
  completed: boolean
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

// Simple render function
export const customRender = (
  ui: ReactElement,
  options?: RenderOptions
): RenderResult => {
  return render(ui, options)
}

// Re-export testing utilities
export { screen, waitFor, act } from '@testing-library/react'
export { userEvent }

// Mock Data Factory Functions
export const createMockUser = (overrides: Partial<MockUser> = {}): MockUser => ({
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'member',
  familyId: 'test-family-id',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

export const createMockTask = (overrides: Partial<MockTask> = {}): MockTask => ({
  id: 'test-task-id',
  title: 'Test Task',
  description: 'A test task description',
  status: 'pending',
  priority: 'medium',
  dueDate: '2024-12-31T00:00:00.000Z',
  assignedTo: ['test-user-id'],
  createdBy: 'test-user-id',
  familyId: 'test-family-id',
  category: 'general',
  tags: ['test'],
  completed: false,
  completedAt: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

// Mock API Response Helpers
export const createMockApiResponse = <T>(data: T, status = 200) => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
  headers: {},
  config: {},
})

export const createMockApiError = (message = 'API Error', status = 500) => ({
  response: {
    data: { message },
    status,
    statusText: 'Error',
  },
  message,
  isAxiosError: true,
})

// Test Helpers
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockConsole = () => {
  const originalConsole = { ...console }
  const mockConsoleLog = vi.fn()
  const mockConsoleError = vi.fn()
  const mockConsoleWarn = vi.fn()

  console.log = mockConsoleLog
  console.error = mockConsoleError
  console.warn = mockConsoleWarn

  return {
    mockConsoleLog,
    mockConsoleError,
    mockConsoleWarn,
    restore: () => {
      console.log = originalConsole.log
      console.error = originalConsole.error
      console.warn = originalConsole.warn
    },
  }
}

// Storage Mocking
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    length: Object.keys(store).length,
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  }
}

// Fetch Mocking
export const mockFetch = (response: any, status = 200) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
  })
}

// Debug Helpers
export const debugElement = (element: Element | null) => {
  if (element) {
    console.log('Element:', element.tagName)
    console.log('Classes:', element.className)
    console.log('Text Content:', element.textContent)
    console.log('HTML:', element.outerHTML)
  } else {
    console.log('Element not found')
  }
}

// Performance Testing
export const measurePerformance = async (fn: () => void | Promise<void>) => {
  const start = performance.now()
  await fn()
  const end = performance.now()
  return end - start
}

// Form Testing Helpers
export const fillForm = async (formData: Record<string, string>) => {
  const user = userEvent.setup()
  
  for (const [name, value] of Object.entries(formData)) {
    const input = document.querySelector(`[name="${name}"]`) as HTMLInputElement
    if (input) {
      await user.clear(input)
      await user.type(input, value)
    }
  }
}

// Cleanup Helpers
export const cleanup = () => {
  // Reset all mocks
  vi.clearAllMocks()
  vi.restoreAllMocks()
  
  // Clear localStorage/sessionStorage
  localStorage.clear()
  sessionStorage.clear()
  
  // Reset fetch
  if (global.fetch && vi.isMockFunction(global.fetch)) {
    (global.fetch as any).mockRestore?.()
  }
}
