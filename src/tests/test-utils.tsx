// OrdoHub - Test Utils
// Utilitários avançados para testes com providers e mocks

import React, { ReactElement, ReactNode } from 'react'
import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

// =================== TYPES ===================

export interface TestUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'member' | 'child'
  familyId: string
  createdAt: string
  updatedAt: string
}

export interface TestFamily {
  id: string
  name: string
  description?: string
  ownerId: string
  members: string[]
  createdAt: string
  updatedAt: string
}

export interface TestTask {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate?: string
  assignedTo: string[]
  createdBy: string
  familyId: string
  category: string
  tags: string[]
  completed: boolean
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface SupabaseClientMock {
  auth: {
    getSession: ReturnType<typeof vi.fn>
    getUser: ReturnType<typeof vi.fn>
    signUp: ReturnType<typeof vi.fn>
    signInWithPassword: ReturnType<typeof vi.fn>
    signOut: ReturnType<typeof vi.fn>
    onAuthStateChange: ReturnType<typeof vi.fn>
  }
  from: ReturnType<typeof vi.fn>
  storage: {
    from: ReturnType<typeof vi.fn>
  }
  rpc: ReturnType<typeof vi.fn>
}

export interface RenderWithProvidersOptions
  extends Omit<RenderOptions, 'wrapper'> {
  // Router options
  withRouter?: boolean
  initialEntries?: string[]
  routerType?: 'browser' | 'memory'

  // Query Client options
  withQueryClient?: boolean
  queryClient?: QueryClient

  // Zustand stores options
  withStores?: boolean
  initialStoreState?: Record<string, any>

  // Supabase options
  withSupabase?: boolean
  supabaseClient?: SupabaseClientMock
}

// =================== SUPABASE MOCK ===================

export const createMockSupabaseClient = (): SupabaseClientMock => {
  const mockClient: SupabaseClientMock = {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: null },
        error: null,
      }),
      getUser: vi.fn().mockResolvedValue({
        data: { user: null },
        error: null,
      }),
      signUp: vi.fn().mockResolvedValue({
        data: { user: null, session: null },
        error: null,
      }),
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { user: null, session: null },
        error: null,
      }),
      signOut: vi.fn().mockResolvedValue({
        error: null,
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      gt: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lt: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      like: vi.fn().mockReturnThis(),
      ilike: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      contains: vi.fn().mockReturnThis(),
      containedBy: vi.fn().mockReturnThis(),
      rangeGt: vi.fn().mockReturnThis(),
      rangeGte: vi.fn().mockReturnThis(),
      rangeLt: vi.fn().mockReturnThis(),
      rangeLte: vi.fn().mockReturnThis(),
      rangeAdjacent: vi.fn().mockReturnThis(),
      overlaps: vi.fn().mockReturnThis(),
      textSearch: vi.fn().mockReturnThis(),
      match: vi.fn().mockReturnThis(),
      not: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      filter: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      abortSignal: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: null,
        status: 200,
        statusText: 'OK',
      }),
      maybeSingle: vi.fn().mockResolvedValue({
        data: null,
        error: null,
        status: 200,
        statusText: 'OK',
      }),
    }),
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({
          data: {
            path: 'test-path',
            id: 'test-id',
            fullPath: 'test-full-path',
          },
          error: null,
        }),
        download: vi.fn().mockResolvedValue({
          data: new Blob(),
          error: null,
        }),
        list: vi.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
        remove: vi.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
        createSignedUrl: vi.fn().mockResolvedValue({
          data: { signedUrl: 'https://example.com/signed-url' },
          error: null,
        }),
        createSignedUrls: vi.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/public-url' },
        }),
      }),
    },
    rpc: vi.fn().mockResolvedValue({
      data: null,
      error: null,
      status: 200,
      statusText: 'OK',
    }),
  }

  return mockClient
}

// =================== ROUTER MOCKS ===================

export const createMockRouter = () => ({
  navigate: vi.fn(),
  location: {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  },
  params: {},
  searchParams: new URLSearchParams(),
})

// Mock do React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    }),
    useParams: () => ({}),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  }
})

// =================== ZUSTAND STORE MOCKS ===================

export interface AuthStoreState {
  user: TestUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: TestUser) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export interface TaskStoreState {
  tasks: TestTask[]
  isLoading: boolean
  selectedTask: TestTask | null
  setTasks: (tasks: TestTask[]) => void
  addTask: (task: TestTask) => void
  updateTask: (id: string, updates: Partial<TestTask>) => void
  removeTask: (id: string) => void
  setSelectedTask: (task: TestTask | null) => void
  setLoading: (loading: boolean) => void
}

export interface FamilyStoreState {
  family: TestFamily | null
  members: TestUser[]
  isLoading: boolean
  setFamily: (family: TestFamily) => void
  setMembers: (members: TestUser[]) => void
  addMember: (member: TestUser) => void
  removeMember: (memberId: string) => void
  setLoading: (loading: boolean) => void
}

// Mock stores factory
export const createMockStores = (initialState?: Record<string, any>) => {
  const authStore = {
    user: initialState?.auth?.user || null,
    isAuthenticated: initialState?.auth?.isAuthenticated || false,
    isLoading: initialState?.auth?.isLoading || false,
    login: vi.fn((user: TestUser) => {
      authStore.user = user
      authStore.isAuthenticated = true
    }),
    logout: vi.fn(() => {
      authStore.user = null
      authStore.isAuthenticated = false
    }),
    setLoading: vi.fn((loading: boolean) => {
      authStore.isLoading = loading
    }),
  }

  const taskStore = {
    tasks: initialState?.tasks?.tasks || [],
    isLoading: initialState?.tasks?.isLoading || false,
    selectedTask: initialState?.tasks?.selectedTask || null,
    setTasks: vi.fn((tasks: TestTask[]) => {
      taskStore.tasks = tasks
    }),
    addTask: vi.fn((task: TestTask) => {
      taskStore.tasks.push(task)
    }),
    updateTask: vi.fn((id: string, updates: Partial<TestTask>) => {
      const index = taskStore.tasks.findIndex(t => t.id === id)
      if (index !== -1) {
        taskStore.tasks[index] = { ...taskStore.tasks[index], ...updates }
      }
    }),
    removeTask: vi.fn((id: string) => {
      taskStore.tasks = taskStore.tasks.filter(t => t.id !== id)
    }),
    setSelectedTask: vi.fn((task: TestTask | null) => {
      taskStore.selectedTask = task
    }),
    setLoading: vi.fn((loading: boolean) => {
      taskStore.isLoading = loading
    }),
  }

  const familyStore = {
    family: initialState?.family?.family || null,
    members: initialState?.family?.members || [],
    isLoading: initialState?.family?.isLoading || false,
    setFamily: vi.fn((family: TestFamily) => {
      familyStore.family = family
    }),
    setMembers: vi.fn((members: TestUser[]) => {
      familyStore.members = members
    }),
    addMember: vi.fn((member: TestUser) => {
      familyStore.members.push(member)
    }),
    removeMember: vi.fn((memberId: string) => {
      familyStore.members = familyStore.members.filter(m => m.id !== memberId)
    }),
    setLoading: vi.fn((loading: boolean) => {
      familyStore.isLoading = loading
    }),
  }

  return { authStore, taskStore, familyStore }
}

// Mock Zustand
vi.mock('zustand', () => ({
  create: vi.fn(storeCreator => {
    if (typeof storeCreator === 'function') {
      const mockState = {}
      const mockSet = vi.fn(updates => {
        Object.assign(
          mockState,
          typeof updates === 'function' ? updates(mockState) : updates
        )
      })
      const mockGet = vi.fn(() => mockState)

      return () => storeCreator(mockSet, mockGet, mockState)
    }
    return () => storeCreator
  }),
  subscribeWithSelector: vi.fn(fn => fn),
}))

// =================== QUERY CLIENT ===================

export const createTestQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    // Removido logger - não é suportado no QueryClient v5
  })
}

// =================== PROVIDERS WRAPPER ===================

interface TestProvidersProps {
  children: ReactNode
  queryClient?: QueryClient
  routerType?: 'browser' | 'memory'
  initialEntries?: string[]
  supabaseClient?: SupabaseClientMock
  stores?: Record<string, any>
}

const TestProviders: React.FC<TestProvidersProps> = ({
  children,
  queryClient,
  routerType = 'memory',
  initialEntries = ['/'],
  supabaseClient,
  stores,
}) => {
  // QueryClient wrapper
  let wrappedChildren = children
  if (queryClient) {
    wrappedChildren = (
      <QueryClientProvider client={queryClient}>
        {wrappedChildren}
      </QueryClientProvider>
    )
  }

  // Router wrapper
  if (routerType === 'browser') {
    wrappedChildren = <BrowserRouter>{wrappedChildren}</BrowserRouter>
  } else {
    wrappedChildren = (
      <MemoryRouter initialEntries={initialEntries}>
        {wrappedChildren}
      </MemoryRouter>
    )
  }

  // Supabase context (se existir)
  if (supabaseClient) {
    // Context seria adicionado aqui quando implementado
    // wrappedChildren = (
    //   <SupabaseProvider value={supabaseClient}>
    //     {wrappedChildren}
    //   </SupabaseProvider>
    // )
  }

  // Zustand stores context (se existir)
  if (stores) {
    // Context seria adicionado aqui quando implementado
    // wrappedChildren = (
    //   <StoreProvider stores={stores}>
    //     {wrappedChildren}
    //   </StoreProvider>
    // )
  }

  return <>{wrappedChildren}</>
}

// =================== RENDER WITH PROVIDERS ===================

export const renderWithProviders = (
  ui: ReactElement,
  options: RenderWithProvidersOptions = {}
): RenderResult => {
  const {
    withRouter = true,
    initialEntries = ['/'],
    routerType = 'memory',
    withQueryClient = true,
    queryClient = withQueryClient ? createTestQueryClient() : undefined,
    withSupabase = false,
    supabaseClient = withSupabase ? createMockSupabaseClient() : undefined,
    withStores = false,
    initialStoreState,
    ...renderOptions
  } = options

  const stores = withStores ? createMockStores(initialStoreState) : undefined

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <TestProviders
      queryClient={withQueryClient ? queryClient : undefined}
      routerType={withRouter ? routerType : undefined}
      initialEntries={withRouter ? initialEntries : undefined}
      supabaseClient={supabaseClient}
      stores={stores}
    >
      {children}
    </TestProviders>
  )

  const result = render(ui, { wrapper: Wrapper, ...renderOptions })

  return {
    ...result,
    // Adicionar utilitários extras ao resultado
    rerender: (ui: React.ReactNode) =>
      result.rerender(
        <TestProviders
          queryClient={withQueryClient ? queryClient : undefined}
          routerType={withRouter ? routerType : undefined}
          initialEntries={withRouter ? initialEntries : undefined}
          supabaseClient={supabaseClient}
          stores={stores}
        >
          {ui}
        </TestProviders>
      ),
  }
}

// =================== MOCK DATA FACTORIES ===================

export const createMockUser = (
  overrides: Partial<TestUser> = {}
): TestUser => ({
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

export const createMockFamily = (
  overrides: Partial<TestFamily> = {}
): TestFamily => ({
  id: 'test-family-id',
  name: 'Test Family',
  description: 'A test family for testing purposes',
  ownerId: 'test-user-id',
  members: ['test-user-id'],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

export const createMockTask = (
  overrides: Partial<TestTask> = {}
): TestTask => ({
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
  completedAt: undefined,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

// =================== HELPER FUNCTIONS ===================

// Simular delay de rede
export const waitFor = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

// Mock de resposta da API
export const createMockApiResponse = <T,>(data: T, status = 200) => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
  headers: {},
  config: {},
})

// Mock de erro da API
export const createMockApiError = (message = 'API Error', status = 500) => ({
  response: {
    data: { message },
    status,
    statusText: 'Error',
  },
  message,
  isAxiosError: true,
})

// Limpar todos os mocks
export const clearAllMocks = () => {
  vi.clearAllMocks()
  vi.restoreAllMocks()
}

// Setup de localStorage para testes
export const setupLocalStorageMock = () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      }),
      length: Object.keys(store).length,
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
    }
  })()

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })

  return localStorageMock
}

// Setup de sessionStorage para testes
export const setupSessionStorageMock = () => {
  const sessionStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      }),
      length: Object.keys(store).length,
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
    }
  })()

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
    writable: true,
  })

  return sessionStorageMock
}

// Setup de fetch mock
export const setupFetchMock = () => {
  const fetchMock = vi.fn()
  global.fetch = fetchMock
  return fetchMock
}

// Utilitário para debug de componentes
export const debugComponent = (component: HTMLElement) => {
  console.log('=== COMPONENT DEBUG ===')
  console.log('Tag Name:', component.tagName)
  console.log('Class Name:', component.className)
  console.log('Text Content:', component.textContent)
  console.log('Inner HTML:', component.innerHTML)
  console.log('Children Count:', component.children.length)
  console.log('========================')
}

// Re-exportar utilities do testing library
export * from '@testing-library/react'
export { userEvent } from '@testing-library/user-event'

// Export render padrão como renderWithProviders
export { renderWithProviders as render }

// =================== OBSERVER MOCKS ===================

// Mock do IntersectionObserver
export const setupIntersectionObserverMock = () => {
  const mockIntersectionObserver = vi.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  })

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  })

  return mockIntersectionObserver
}

// Mock do ResizeObserver
export const setupResizeObserverMock = () => {
  const mockResizeObserver = vi.fn()
  mockResizeObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: mockResizeObserver,
  })

  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: mockResizeObserver,
  })

  return mockResizeObserver
}

// =================== DRAG & DROP MOCKS ===================

export const createMockDragEvent = (
  type: string,
  dataTransfer?: Partial<DataTransfer>
) => {
  const event = new Event(type, { bubbles: true, cancelable: true }) as any

  event.dataTransfer = {
    setData: vi.fn(),
    getData: vi.fn(),
    clearData: vi.fn(),
    setDragImage: vi.fn(),
    effectAllowed: 'all',
    dropEffect: 'move',
    files: [],
    items: [],
    types: [],
    ...dataTransfer,
  }

  return event
}

// =================== NOTIFICATION MOCKS ===================

export const setupNotificationMock = () => {
  const mockNotification = vi.fn() as any
  mockNotification.permission = 'granted'
  mockNotification.requestPermission = vi.fn().mockResolvedValue('granted')

  Object.defineProperty(global, 'Notification', {
    writable: true,
    configurable: true,
    value: mockNotification,
  })

  return mockNotification
}

// =================== WEBSOCKET MOCKS ===================

export const createMockWebSocket = () => {
  const mockWS = {
    send: vi.fn(),
    close: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    readyState: 1, // OPEN
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
    onopen: null,
    onclose: null,
    onmessage: null,
    onerror: null,
    url: 'ws://localhost:8080',
    protocol: '',
    bufferedAmount: 0,
    extensions: '',
    binaryType: 'blob' as 'blob' | 'arraybuffer',
  }

  Object.defineProperty(global, 'WebSocket', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation(() => mockWS),
  })

  return mockWS
}

// =================== PERFORMANCE MOCKS ===================

export const setupPerformanceMock = () => {
  const performanceMock = {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
    navigation: {
      type: 0,
      redirectCount: 0,
    },
    timing: {
      navigationStart: Date.now(),
      loadEventEnd: Date.now(),
    },
  }

  Object.defineProperty(global, 'performance', {
    writable: true,
    configurable: true,
    value: performanceMock,
  })

  return performanceMock
}

// =================== CUSTOM MATCHERS ===================

// Extensão para expectativas customizadas
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeInTheDocument(): T
      toHaveClass(className: string): T
      toHaveStyle(style: Record<string, any>): T
      toBeVisible(): T
      toBeDisabled(): T
      toHaveValue(value: string | number): T
      toHaveDisplayValue(value: string): T
      toBeChecked(): T
      toHaveFocus(): T
      toHaveAttribute(attr: string, value?: string): T
    }
  }
}

// =================== SETUP COMPLETO ===================

// Função para setup completo de teste
export const setupTestEnvironment = () => {
  // Setup de todos os mocks básicos
  setupLocalStorageMock()
  setupSessionStorageMock()
  setupIntersectionObserverMock()
  setupResizeObserverMock()
  setupNotificationMock()
  setupPerformanceMock()

  // Função para cleanup manual (afterEach deve ser chamado nos testes)
  const cleanup = () => {
    clearAllMocks()
    // Limpar localStorage e sessionStorage
    localStorage.clear()
    sessionStorage.clear()
  }

  return {
    cleanup,
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    IntersectionObserver: window.IntersectionObserver,
    ResizeObserver: window.ResizeObserver,
    Notification: window.Notification,
    performance: window.performance,
  }
}
