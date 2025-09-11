// OrdoHub - Test Mocks Configuration
// Mocks globais para bibliotecas e módulos externos

import React from 'react'
import { vi } from 'vitest'

// Mock React Router DOM
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
      key: 'default'
    }),
    useParams: () => ({}),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
    BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
    MemoryRouter: ({ children }: { children: React.ReactNode }) => children,
    Route: ({ children }: { children: React.ReactNode }) => children,
    Routes: ({ children }: { children: React.ReactNode }) => children,
  }
})

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    button: 'button',
    section: 'section',
    article: 'article',
    header: 'header',
    footer: 'footer',
    main: 'main',
    aside: 'aside',
    nav: 'nav',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    select: 'select',
    option: 'option',
    label: 'label',
    fieldset: 'fieldset',
    legend: 'legend',
    ul: 'ul',
    ol: 'ol',
    li: 'li',
    dl: 'dl',
    dt: 'dt',
    dd: 'dd',
    table: 'table',
    thead: 'thead',
    tbody: 'tbody',
    tfoot: 'tfoot',
    tr: 'tr',
    th: 'th',
    td: 'td',
    caption: 'caption',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    a: 'a',
    img: 'img',
    svg: 'svg',
    path: 'path',
    circle: 'circle',
    rect: 'rect',
    line: 'line',
    polygon: 'polygon',
    polyline: 'polyline',
    ellipse: 'ellipse',
    g: 'g',
    defs: 'defs',
    use: 'use',
    text: 'text',
    tspan: 'tspan',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useMotionValue: () => ({
    get: vi.fn(),
    set: vi.fn(),
    onChange: vi.fn(),
    destroy: vi.fn(),
  }),
  useTransform: () => ({
    get: vi.fn(),
    set: vi.fn(),
    onChange: vi.fn(),
    destroy: vi.fn(),
  }),
  useSpring: () => ({
    get: vi.fn(),
    set: vi.fn(),
    onChange: vi.fn(),
    destroy: vi.fn(),
  }),
  useDragControls: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
  useAnimationControls: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
}))

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({
    data: undefined,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: true,
    refetch: vi.fn(),
  })),
  useMutation: vi.fn(() => ({
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    data: undefined,
    reset: vi.fn(),
  })),
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
    getQueryData: vi.fn(),
    removeQueries: vi.fn(),
    clear: vi.fn(),
  })),
  QueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
    getQueryData: vi.fn(),
    removeQueries: vi.fn(),
    clear: vi.fn(),
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock Zustand
vi.mock('zustand', () => ({
  create: vi.fn((fn) => fn),
  subscribeWithSelector: vi.fn((fn) => fn),
}))

// Mock React Hook Form
vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => fn),
    formState: { errors: {}, isValid: true, isSubmitting: false },
    reset: vi.fn(),
    setValue: vi.fn(),
    getValue: vi.fn(),
    watch: vi.fn(),
    control: {},
    getValues: vi.fn(() => ({})),
    setError: vi.fn(),
    clearErrors: vi.fn(),
    trigger: vi.fn(),
  })),
  Controller: ({ render }: any) => render({ field: { onChange: vi.fn(), value: '' } }),
  useController: vi.fn(() => ({
    field: { onChange: vi.fn(), value: '', name: 'test' },
    fieldState: { error: undefined },
  })),
  useWatch: vi.fn(),
  useFormContext: vi.fn(() => ({
    register: vi.fn(),
    formState: { errors: {} },
    setValue: vi.fn(),
    getValue: vi.fn(),
    control: {},
  })),
  FormProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock React Hot Toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
    promise: vi.fn(),
    custom: vi.fn(),
  },
  Toaster: () => null,
}))

// Mock React Icons
vi.mock('react-icons/hi', () => ({
  HiHome: () => 'HiHome',
  HiUser: () => 'HiUser',
  HiCog: () => 'HiCog',
  HiPlus: () => 'HiPlus',
  HiX: () => 'HiX',
  HiCheck: () => 'HiCheck',
  HiExclamation: () => 'HiExclamation',
  HiInformationCircle: () => 'HiInformationCircle',
}))

vi.mock('react-icons/hi2', () => ({
  HomeIcon: () => 'HomeIcon',
  UserIcon: () => 'UserIcon',
  CogIcon: () => 'CogIcon',
  PlusIcon: () => 'PlusIcon',
  XMarkIcon: () => 'XMarkIcon',
  CheckIcon: () => 'CheckIcon',
  ExclamationTriangleIcon: () => 'ExclamationTriangleIcon',
  InformationCircleIcon: () => 'InformationCircleIcon',
}))

// Mock Socket.IO Client
vi.mock('socket.io-client', () => ({
  io: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    connected: false,
  })),
}))

// Mock React DnD
vi.mock('react-dnd', () => ({
  useDrag: vi.fn(() => [
    {},
    vi.fn(),
    vi.fn(),
  ]),
  useDrop: vi.fn(() => [
    {},
    vi.fn(),
  ]),
  DndProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {},
}))

// Mock Date-fns
vi.mock('date-fns', () => ({
  format: vi.fn((_date, formatStr) => `formatted-${formatStr}`),
  parseISO: vi.fn((dateStr) => new Date(dateStr)),
  isValid: vi.fn(() => true),
  addDays: vi.fn((date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)),
  subDays: vi.fn((date, days) => new Date(date.getTime() - days * 24 * 60 * 60 * 1000)),
  startOfDay: vi.fn((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())),
  endOfDay: vi.fn((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)),
  isSameDay: vi.fn(() => true),
  differenceInDays: vi.fn(() => 0),
}))

// Mock Axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
      request: vi.fn(),
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() },
      },
    })),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    request: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
  },
}))

// Mock UUID
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'test-uuid-v4'),
  v1: vi.fn(() => 'test-uuid-v1'),
}))

// Mock React Error Boundary
vi.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children, fallback }: any) => {
    try {
      return children
    } catch (error) {
      return fallback({ error })
    }
  },
  withErrorBoundary: (Component: any) => Component,
  useErrorHandler: () => vi.fn(),
}))

// Mock React Use
vi.mock('react-use', () => ({
  useLocalStorage: vi.fn(() => [null, vi.fn(), vi.fn()]),
  useSessionStorage: vi.fn(() => [null, vi.fn(), vi.fn()]),
  useDebounce: vi.fn(),
  useThrottle: vi.fn(),
  useToggle: vi.fn(() => [false, vi.fn()]),
  useBoolean: vi.fn(() => [false, { toggle: vi.fn(), setTrue: vi.fn(), setFalse: vi.fn() }]),
  useCounter: vi.fn(() => [0, { inc: vi.fn(), dec: vi.fn(), reset: vi.fn(), set: vi.fn() }]),
  usePrevious: vi.fn(),
  useUpdateEffect: vi.fn(),
  useMount: vi.fn(),
  useUnmount: vi.fn(),
  useWindowSize: vi.fn(() => ({ width: 1024, height: 768 })),
  useKeyPress: vi.fn(() => false),
  useHover: vi.fn(() => [vi.fn(), false]),
}))

console.log('🎭 Test mocks loaded successfully')
