// OrdoHub - Test Utilities
// Utilitários globais para facilitar a escrita de testes

import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { vi } from 'vitest'

// Types
export interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
  withRouter?: boolean
  withQueryClient?: boolean
}

// Custom render function (simplified for TypeScript)
export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const { ...renderOptions } = options
  return render(ui, renderOptions)
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { userEvent }

// Export custom render as default render
export { customRender as render }

// Mock factory functions
export const createMockUser = (overrides?: Partial<any>) => ({
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'member',
  familyId: 'test-family-id',
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
  ...overrides,
})

export const createMockFamily = (overrides?: Partial<any>) => ({
  id: 'test-family-id',
  name: 'Test Family',
  description: 'A test family',
  ownerId: 'test-user-id',
  members: [createMockUser()],
  settings: {
    theme: 'light',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    notifications: true,
  },
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
  ...overrides,
})

export const createMockTask = (overrides?: Partial<any>) => ({
  id: 'test-task-id',
  title: 'Test Task',
  description: 'A test task description',
  status: 'pending',
  priority: 'medium',
  dueDate: new Date('2024-12-31').toISOString(),
  assignedTo: ['test-user-id'],
  createdBy: 'test-user-id',
  familyId: 'test-family-id',
  category: 'general',
  tags: ['test'],
  completed: false,
  completedAt: null,
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
  ...overrides,
})

export const createMockHousehold = (overrides?: Partial<any>) => ({
  id: 'test-household-id',
  name: 'Test House',
  address: '123 Test Street',
  familyId: 'test-family-id',
  rooms: [
    {
      id: 'test-room-id',
      name: 'Living Room',
      type: 'living_room',
      color: '#3B82F6',
      icon: 'home',
    }
  ],
  settings: {
    defaultRoom: 'test-room-id',
    taskReminders: true,
    maintenanceAlerts: true,
  },
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
  ...overrides,
})

export const createMockShoppingList = (overrides?: Partial<any>) => ({
  id: 'test-shopping-list-id',
  name: 'Test Shopping List',
  description: 'A test shopping list',
  items: [
    {
      id: 'test-item-id',
      name: 'Test Item',
      quantity: 1,
      unit: 'pieces',
      category: 'grocery',
      priority: 'medium',
      checked: false,
      addedBy: 'test-user-id',
      notes: 'Test notes',
    }
  ],
  familyId: 'test-family-id',
  createdBy: 'test-user-id',
  shared: true,
  archived: false,
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
  ...overrides,
})

// Test helpers
export const waitForLoadingToFinish = () => 
  new Promise(resolve => setTimeout(resolve, 0))

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

export const mockSessionStorage = () => {
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

export const mockFetch = (response: any, ok = true) => {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 400,
    statusText: ok ? 'OK' : 'Bad Request',
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
    blob: vi.fn().mockResolvedValue(new Blob()),
    arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
  })
}

export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })
  
  Object.defineProperty(window, 'IntersectionObserver', {
    value: mockIntersectionObserver,
    writable: true,
  })
  
  return mockIntersectionObserver
}

export const mockResizeObserver = () => {
  const mockResizeObserver = vi.fn()
  mockResizeObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })
  
  Object.defineProperty(window, 'ResizeObserver', {
    value: mockResizeObserver,
    writable: true,
  })
  
  return mockResizeObserver
}

// API Mock helpers
export const createMockApiResponse = <T>(data: T, success = true) => ({
  data: success ? data : null,
  error: success ? null : 'Mock error',
  success,
  message: success ? 'Success' : 'Error occurred',
  timestamp: new Date().toISOString(),
})

export const createMockPaginatedResponse = <T>(
  items: T[], 
  page = 1, 
  limit = 10,
  total?: number
) => ({
  data: items,
  pagination: {
    page,
    limit,
    total: total ?? items.length,
    totalPages: Math.ceil((total ?? items.length) / limit),
    hasNext: page * limit < (total ?? items.length),
    hasPrev: page > 1,
  },
  success: true,
  message: 'Success',
  timestamp: new Date().toISOString(),
})

// Debug helpers
export const debugElement = (element: HTMLElement) => {
  console.log('Element:', element.outerHTML)
  console.log('Text Content:', element.textContent)
  console.log('Children:', element.children)
}

export const debugComponent = (component: ReactElement) => {
  const { container } = render(component)
  console.log('Component HTML:', container.innerHTML)
  return container
}

console.log('🛠️ Test utilities loaded successfully')
