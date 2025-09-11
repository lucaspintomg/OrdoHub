# 🧪 OrdoHub Test Utils

Utilitários avançados para testes do OrdoHub com suporte completo para providers, mocks e helpers.

## 📋 Índice

- [Instalação](#instalação)
- [Configuração Básica](#configuração-básica)
- [Render com Providers](#render-com-providers)
- [Mock do Supabase](#mock-do-supabase)
- [Mock do Router](#mock-do-router)
- [Mock de Stores Zustand](#mock-de-stores-zustand)
- [Factory Functions](#factory-functions)
- [Helper Functions](#helper-functions)
- [Exemplos Avançados](#exemplos-avançados)

## 🚀 Instalação

Os test-utils já estão incluídos no projeto. Para usar em seus testes:

```typescript
import { 
  renderWithProviders, 
  createMockUser,
  createMockSupabaseClient 
} from '@/tests/test-utils'
```

## ⚙️ Configuração Básica

### Teste Simples

```typescript
import { renderWithProviders } from '@/tests/test-utils'

it('should render component', () => {
  const { getByText } = renderWithProviders(<MyComponent />)
  expect(getByText('Hello World')).toBeInTheDocument()
})
```

### Teste sem Providers

```typescript
const { getByText } = renderWithProviders(<MyComponent />, {
  withRouter: false,
  withQueryClient: false,
  withStores: false,
  withSupabase: false
})
```

## 🔄 Render com Providers

### Opções Disponíveis

```typescript
interface RenderWithProvidersOptions {
  // Router
  withRouter?: boolean              // default: true
  initialEntries?: string[]         // default: ['/']
  routerType?: 'browser' | 'memory' // default: 'memory'
  
  // Query Client
  withQueryClient?: boolean         // default: true
  queryClient?: QueryClient
  
  // Zustand Stores
  withStores?: boolean              // default: false
  initialStoreState?: Record<string, any>
  
  // Supabase
  withSupabase?: boolean            // default: false
  supabaseClient?: SupabaseClientMock
}
```

### Exemplos de Uso

#### Com React Router

```typescript
// Memory Router (padrão)
const { getByText } = renderWithProviders(<MyComponent />, {
  withRouter: true,
  initialEntries: ['/tasks', '/dashboard']
})

// Browser Router
const { getByText } = renderWithProviders(<MyComponent />, {
  withRouter: true,
  routerType: 'browser'
})
```

#### Com React Query

```typescript
import { createTestQueryClient } from '@/tests/test-utils'

const customQueryClient = createTestQueryClient()

const { getByText } = renderWithProviders(<MyComponent />, {
  withQueryClient: true,
  queryClient: customQueryClient
})
```

#### Com Stores Zustand

```typescript
const { getByText } = renderWithProviders(<MyComponent />, {
  withStores: true,
  initialStoreState: {
    auth: {
      user: createMockUser(),
      isAuthenticated: true,
      isLoading: false
    },
    tasks: {
      tasks: [createMockTask()],
      isLoading: false
    }
  }
})
```

## 🗄️ Mock do Supabase

### Criando Mock Client

```typescript
import { createMockSupabaseClient } from '@/tests/test-utils'

const supabase = createMockSupabaseClient()
```

### Mock de Autenticação

```typescript
// Mock login bem-sucedido
supabase.auth.signInWithPassword.mockResolvedValue({
  data: { 
    user: createMockUser(), 
    session: { access_token: 'mock-token' } 
  },
  error: null
})

// Mock erro de login
supabase.auth.signInWithPassword.mockResolvedValue({
  data: { user: null, session: null },
  error: { message: 'Invalid credentials' }
})

// Teste
const result = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'wrong-password'
})
```

### Mock de Database

```typescript
// Mock query de SELECT
supabase.from.mockReturnValue({
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockResolvedValue({
    data: [createMockTask(), createMockTask()],
    error: null
  })
})

// Mock INSERT
supabase.from.mockReturnValue({
  insert: vi.fn().mockResolvedValue({
    data: [createMockTask()],
    error: null
  })
})

// Uso
const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .eq('family_id', 'test-family-id')
```

### Mock de Storage

```typescript
// Mock upload de arquivo
supabase.storage.from.mockReturnValue({
  upload: vi.fn().mockResolvedValue({
    data: { path: 'uploads/file.jpg', id: 'file-id' },
    error: null
  }),
  getPublicUrl: vi.fn().mockReturnValue({
    data: { publicUrl: 'https://example.com/file.jpg' }
  })
})

// Uso
const { data } = await supabase.storage
  .from('avatars')
  .upload('user-avatar.jpg', file)
```

### Mock de RPC

```typescript
supabase.rpc.mockResolvedValue({
  data: { total_tasks: 5, completed_tasks: 3 },
  error: null
})

// Uso
const { data } = await supabase.rpc('get_task_statistics', {
  family_id: 'test-family-id'
})
```

## 🧭 Mock do Router

### Router Mock Básico

```typescript
import { createMockRouter } from '@/tests/test-utils'

const router = createMockRouter()

// Verificar navegação
router.navigate('/tasks')
expect(router.navigate).toHaveBeenCalledWith('/tasks')
```

### Mock de Hooks do Router

Os hooks são automaticamente mockados:

```typescript
// useNavigate
const navigate = useNavigate() // Retorna vi.fn()

// useLocation
const location = useLocation() // Retorna { pathname: '/', search: '', ... }

// useParams
const params = useParams() // Retorna {}

// useSearchParams
const [searchParams, setSearchParams] = useSearchParams() // Retorna [URLSearchParams, vi.fn()]
```

## 🏪 Mock de Stores Zustand

### Stores Disponíveis

```typescript
// Auth Store
interface AuthStoreState {
  user: TestUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: TestUser) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

// Task Store
interface TaskStoreState {
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

// Family Store
interface FamilyStoreState {
  family: TestFamily | null
  members: TestUser[]
  isLoading: boolean
  setFamily: (family: TestFamily) => void
  setMembers: (members: TestUser[]) => void
  addMember: (member: TestUser) => void
  removeMember: (memberId: string) => void
  setLoading: (loading: boolean) => void
}
```

### Criando Mock Stores

```typescript
import { createMockStores } from '@/tests/test-utils'

const stores = createMockStores({
  auth: {
    user: createMockUser(),
    isAuthenticated: true,
    isLoading: false
  },
  tasks: {
    tasks: [createMockTask()],
    isLoading: false,
    selectedTask: null
  },
  family: {
    family: createMockFamily(),
    members: [createMockUser()],
    isLoading: false
  }
})

// Verificar ações
stores.authStore.login(createMockUser())
expect(stores.authStore.login).toHaveBeenCalled()
```

## 🏭 Factory Functions

### createMockUser

```typescript
const user = createMockUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  avatar: 'https://example.com/avatar.jpg'
})
```

### createMockFamily

```typescript
const family = createMockFamily({
  name: 'Smith Family',
  description: 'A lovely family',
  members: ['user1', 'user2', 'user3']
})
```

### createMockTask

```typescript
const task = createMockTask({
  title: 'Complete project',
  status: 'in-progress',
  priority: 'high',
  dueDate: '2024-12-31T23:59:59.000Z',
  assignedTo: ['user1', 'user2'],
  tags: ['urgent', 'project']
})
```

## 🛠️ Helper Functions

### Storage Mocks

```typescript
import { setupLocalStorageMock, setupSessionStorageMock } from '@/tests/test-utils'

// localStorage
const localStorage = setupLocalStorageMock()
localStorage.setItem('theme', 'dark')
expect(localStorage.getItem('theme')).toBe('dark')

// sessionStorage
const sessionStorage = setupSessionStorageMock()
sessionStorage.setItem('token', 'abc123')
expect(sessionStorage.getItem('token')).toBe('abc123')
```

### API Mocks

```typescript
import { 
  createMockApiResponse, 
  createMockApiError,
  setupFetchMock 
} from '@/tests/test-utils'

// Response mock
const response = createMockApiResponse({ id: 1, name: 'Test' }, 200)

// Error mock
const error = createMockApiError('Not Found', 404)

// Fetch mock
const fetchMock = setupFetchMock()
fetchMock.mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ success: true })
})
```

### Utility Functions

```typescript
import { 
  waitFor, 
  clearAllMocks,
  debugComponent 
} from '@/tests/test-utils'

// Aguardar
await waitFor(100) // Aguarda 100ms

// Limpar mocks
clearAllMocks() // Limpa todos os vi.fn() calls

// Debug componente
const element = screen.getByTestId('my-component')
debugComponent(element) // Imprime informações do elemento
```

### Observer Mocks

```typescript
import { 
  setupIntersectionObserverMock,
  setupResizeObserverMock 
} from '@/tests/test-utils'

// Intersection Observer
const intersectionObserver = setupIntersectionObserverMock()

// Resize Observer
const resizeObserver = setupResizeObserverMock()
```

### Event Mocks

```typescript
import { createMockDragEvent } from '@/tests/test-utils'

const dragEvent = createMockDragEvent('dragstart', {
  setData: vi.fn(),
  getData: vi.fn(),
  files: [new File(['test'], 'test.txt')]
})
```

## 🚀 Exemplos Avançados

### Teste de Componente com Autenticação

```typescript
import { renderWithProviders, createMockUser, createMockSupabaseClient } from '@/tests/test-utils'

describe('Protected Component', () => {
  it('should show content when authenticated', () => {
    const user = createMockUser({ role: 'admin' })
    const supabase = createMockSupabaseClient()
    
    supabase.auth.getUser.mockResolvedValue({
      data: { user },
      error: null
    })

    const { getByText } = renderWithProviders(<ProtectedComponent />, {
      withSupabase: true,
      supabaseClient: supabase,
      withStores: true,
      initialStoreState: {
        auth: {
          user,
          isAuthenticated: true,
          isLoading: false
        }
      }
    })

    expect(getByText('Welcome, Admin!')).toBeInTheDocument()
  })
})
```

### Teste de Form com Validação

```typescript
import { renderWithProviders, setupLocalStorageMock } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'

describe('Task Form', () => {
  it('should save draft to localStorage', async () => {
    const localStorage = setupLocalStorageMock()
    const user = userEvent.setup()

    const { getByLabelText, getByText } = renderWithProviders(<TaskForm />)

    // Preencher form
    await user.type(getByLabelText('Task Title'), 'My New Task')
    await user.type(getByLabelText('Description'), 'Task description')

    // Simular auto-save
    await waitFor(1000)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'task-draft',
      expect.stringContaining('My New Task')
    )
  })
})
```

### Teste de Integration com API

```typescript
import { 
  renderWithProviders, 
  createMockSupabaseClient,
  createMockTask,
  waitFor 
} from '@/tests/test-utils'

describe('Task List Integration', () => {
  it('should load and display tasks', async () => {
    const supabase = createMockSupabaseClient()
    const mockTasks = [
      createMockTask({ title: 'Task 1' }),
      createMockTask({ title: 'Task 2', id: 'task-2' })
    ]

    // Mock API response
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: mockTasks,
        error: null
      })
    })

    const { getByText } = renderWithProviders(<TaskList />, {
      withQueryClient: true,
      withSupabase: true,
      supabaseClient: supabase
    })

    // Aguardar carregamento
    await waitFor(100)

    expect(getByText('Task 1')).toBeInTheDocument()
    expect(getByText('Task 2')).toBeInTheDocument()
  })
})
```

### Teste de Drag and Drop

```typescript
import { renderWithProviders, createMockDragEvent } from '@/tests/test-utils'

describe('Task Board', () => {
  it('should handle task drag and drop', () => {
    const { getByTestId } = renderWithProviders(<TaskBoard />)

    const taskElement = getByTestId('task-1')
    const dropZone = getByTestId('column-done')

    // Simular drag
    const dragEvent = createMockDragEvent('dragstart')
    taskElement.dispatchEvent(dragEvent)

    // Simular drop
    const dropEvent = createMockDragEvent('drop')
    dropZone.dispatchEvent(dropEvent)

    expect(getByTestId('task-1')).toBeInTheDocument()
  })
})
```

## 📝 Boas Práticas

1. **Use clearAllMocks()** no beforeEach para evitar interferência entre testes
2. **Prefira mocks específicos** em vez de mocks globais quando possível
3. **Use factory functions** para criar dados consistentes
4. **Teste cenários de erro** além dos cenários de sucesso
5. **Mantenha testes isolados** - cada teste deve ser independente
6. **Use waitFor()** para operações assíncronas
7. **Mock apenas o necessário** - evite over-mocking

## 🐛 Troubleshooting

### Erro: "Cannot find module"
- Verifique se o path alias `@/tests/test-utils` está configurado
- Use import relativo se necessário: `import { ... } from './test-utils'`

### Erro: "QueryClient not found"
- Certifique-se de usar `withQueryClient: true` ou fornecer um queryClient customizado

### Erro: "Router hooks not working"
- Verifique se `withRouter: true` está habilitado
- Para testes unitários simples, use `withRouter: false`

### Erro: "localStorage is not defined"
- Use `setupLocalStorageMock()` antes de acessar localStorage nos testes

### Erro: "Supabase methods not mocked"
- Crie um mock client com `createMockSupabaseClient()` e configure os métodos necessários

---

**OrdoHub Test Utils** - Testes robustos e confiáveis para toda a família! 👨‍👩‍👧‍👦
