# 🏗️ Padrões de Arquitetura

## Princípios Fundamentais

### 1. Feature Sliced Design (FSD)
O OrdoHub segue os princípios do Feature Sliced Design, organizando o código por funcionalidades e camadas:

- **Camadas**: app, pages, modules, entities, shared, infrastructure
- **Slices**: Funcionalidades específicas (auth, tasks, calendar, etc.)
- **Segments**: Partes técnicas (components, hooks, services, types, utils)

### 2. Clean Architecture
- **Dependências apontam para dentro**
- **Regras de negócio isoladas**
- **Infraestrutura como detalhe**
- **Independência de frameworks**

### 3. Domain-Driven Design (DDD)
- **Entidades** representam conceitos do domínio
- **Linguagem ubíqua** entre desenvolvedores e stakeholders
- **Contextos bem definidos** para cada módulo

## Estrutura por Camadas

### 🎯 App Layer (`src/app/`)
**Responsabilidade**: Configuração global da aplicação

```typescript
// src/app/providers/index.ts
export const AppProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
)
```

### 📄 Pages Layer (`src/pages/`)
**Responsabilidade**: Componentes de página e roteamento

```typescript
// src/pages/tasks/list/index.ts
export { TaskListPage } from './TaskListPage'

// src/pages/tasks/list/TaskListPage.tsx
export const TaskListPage = () => {
  const { tasks } = useTasks()
  return <TaskList tasks={tasks} />
}
```

### 🧩 Modules Layer (`src/modules/`)
**Responsabilidade**: Lógica de negócio específica

```typescript
// src/modules/tasks/hooks/useTasks.ts
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskApi.getAll()
  })
}

// src/modules/tasks/components/TaskCard.tsx
export const TaskCard = ({ task }: TaskCardProps) => {
  // Implementação do componente
}
```

### 🎯 Entities Layer (`src/entities/`)
**Responsabilidade**: Modelos de domínio e operações

```typescript
// src/entities/task/model/Task.ts
export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  assigneeId: string
  dueDate: Date
}

// src/entities/task/api/taskApi.ts
export const taskApi = {
  getAll: () => api.get<Task[]>('/tasks'),
  create: (task: CreateTaskDto) => api.post<Task>('/tasks', task),
  update: (id: string, task: UpdateTaskDto) => api.put<Task>(`/tasks/${id}`, task)
}
```

### 🔄 Shared Layer (`src/shared/`)
**Responsabilidade**: Código reutilizável

```typescript
// src/shared/ui/components/Button.tsx
export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button 
      className={cn(buttonVariants({ variant }))} 
      {...props}
    >
      {children}
    </button>
  )
}

// src/shared/hooks/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Implementação do hook
}
```

### 🔧 Infrastructure Layer (`src/infrastructure/`)
**Responsabilidade**: Integrações externas

```typescript
// src/infrastructure/api/client.ts
export const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 10000
})

// src/infrastructure/storage/localStorage.ts
export const localStorage = {
  get: <T>(key: string): T | null => {
    // Implementação
  },
  set: <T>(key: string, value: T): void => {
    // Implementação
  }
}
```

## Fluxo de Dados

### 1. Unidirecional
```
User Action → Page → Module → Entity → Infrastructure → External API
                ↓        ↓        ↓           ↓
              State ← Store ← Cache ← Response
```

### 2. Gerenciamento de Estado

#### Estado Local (Componente)
```typescript
const [isLoading, setIsLoading] = useState(false)
```

#### Estado Compartilhado (Zustand)
```typescript
// src/app/store/authStore.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}))
```

#### Estado Servidor (TanStack Query)
```typescript
const { data: tasks, isLoading, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: taskApi.getAll
})
```

## Convenções de Nomenclatura

### Arquivos e Pastas
- **Pastas**: `kebab-case` (task-list, user-profile)
- **Componentes**: `PascalCase` (TaskCard.tsx, UserProfile.tsx)
- **Hooks**: `camelCase` começando com `use` (useTasks.ts, useAuth.ts)
- **Utilitários**: `camelCase` (formatDate.ts, validateEmail.ts)
- **Constantes**: `UPPER_SNAKE_CASE` (API_ENDPOINTS.ts, ROUTES.ts)

### Exports
```typescript
// ✅ Named exports (preferível)
export const TaskCard = () => { ... }
export const useTasks = () => { ... }

// ✅ Default export para páginas
export default TaskListPage

// ✅ Re-exports em index.ts
export { TaskCard } from './TaskCard'
export { TaskList } from './TaskList'
```

### TypeScript
```typescript
// ✅ Interfaces para props e objetos
interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
}

// ✅ Types para unions e primitivos
type TaskStatus = 'pending' | 'completed' | 'cancelled'

// ✅ Prefixos para DTOs
interface CreateTaskDto {
  title: string
  description?: string
}
```

## Padrões de Componentes

### 1. Componente Básico
```typescript
interface ComponentProps {
  // props
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // hooks
  // handlers
  // render
  return <div>...</div>
}
```

### 2. Componente com Children
```typescript
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('container', className)}>
      {children}
    </div>
  )
}
```

### 3. Componente Composto
```typescript
export const Card = ({ children }: CardProps) => {
  return <div className="card">{children}</div>
}

Card.Header = ({ children }: CardHeaderProps) => {
  return <div className="card-header">{children}</div>
}

Card.Body = ({ children }: CardBodyProps) => {
  return <div className="card-body">{children}</div>
}
```

## Padrões de Hooks

### 1. Hook de Estado
```typescript
export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  
  return { count, increment, decrement, reset }
}
```

### 2. Hook de API
```typescript
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
```

## Testes

### 1. Testes de Componentes
```typescript
describe('TaskCard', () => {
  it('should render task title', () => {
    const task = { id: '1', title: 'Test Task' }
    render(<TaskCard task={task} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })
  
  it('should call onEdit when edit button is clicked', () => {
    const onEdit = vi.fn()
    const task = { id: '1', title: 'Test Task' }
    
    render(<TaskCard task={task} onEdit={onEdit} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    
    expect(onEdit).toHaveBeenCalledWith(task)
  })
})
```

### 2. Testes de Hooks
```typescript
describe('useTasks', () => {
  it('should return tasks data', async () => {
    const mockTasks = [{ id: '1', title: 'Task 1' }]
    vi.mocked(taskApi.getAll).mockResolvedValue(mockTasks)
    
    const { result } = renderHook(() => useTasks())
    
    await waitFor(() => {
      expect(result.current.data).toEqual(mockTasks)
    })
  })
})
```

## Performance

### 1. Lazy Loading
```typescript
// Páginas
const TaskListPage = lazy(() => import('./pages/tasks/list'))

// Componentes
const TaskCard = lazy(() => import('./components/TaskCard'))
```

### 2. Memoização
```typescript
// Componentes
export const TaskCard = memo(({ task }: TaskCardProps) => {
  // ...
})

// Valores computados
const expensiveTasks = useMemo(() => {
  return tasks.filter(task => task.priority === 'high')
}, [tasks])

// Callbacks
const handleEdit = useCallback((task: Task) => {
  // ...
}, [])
```

### 3. Otimização de Re-renders
```typescript
// Evitar objetos inline
const style = { color: 'red' } // ❌
const STYLE = { color: 'red' } // ✅

// Usar React.memo com comparação customizada
export const TaskCard = memo(({ task }: TaskCardProps) => {
  // ...
}, (prevProps, nextProps) => {
  return prevProps.task.id === nextProps.task.id
})
```

## Segurança

### 1. Sanitização
```typescript
import DOMPurify from 'dompurify'

export const SafeHTML = ({ html }: { html: string }) => {
  const sanitizedHTML = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
}
```

### 2. Validação
```typescript
import { z } from 'zod'

const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  dueDate: z.date().min(new Date())
})

export const validateCreateTask = (data: unknown) => {
  return createTaskSchema.safeParse(data)
}
```

### 3. Autorização
```typescript
export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user } = useAuth()
  
  if (!user || !hasRole(user, requiredRole)) {
    return <Navigate to="/login" />
  }
  
  return <>{children}</>
}
```

---

Estes padrões garantem consistência, manutenibilidade e escalabilidade do código do OrdoHub.
