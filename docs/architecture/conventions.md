# 📝 Convenções de Código

## 📋 Índice

- [🎯 Princípios Gerais](#-princípios-gerais)
- [📁 Estrutura de Arquivos](#-estrutura-de-arquivos)
- [🏷️ Nomenclatura](#️-nomenclatura)
- [📦 Imports e Exports](#-imports-e-exports)
- [⚛️ React e JSX](#️-react-e-jsx)
- [🔷 TypeScript](#-typescript)
- [🎨 Estilização](#-estilização)
- [🧪 Testes](#-testes)
- [📝 Comentários e Documentação](#-comentários-e-documentação)
- [🔧 Configurações](#-configurações)

## 🎯 Princípios Gerais

### 1. **KISS (Keep It Simple, Stupid)**
- Prefira soluções simples e diretas
- Evite over-engineering
- Código legível é melhor que código "inteligente"

### 2. **DRY (Don't Repeat Yourself)**
- Extraia lógica repetida em funções/hooks
- Use constantes para valores reutilizados
- Crie componentes reutilizáveis

### 3. **SOLID Principles**
- **S**ingle Responsibility: Uma função/componente, uma responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Subtipos devem ser substituíveis por seus tipos base
- **I**nterface Segregation: Interfaces específicas são melhores que genéricas
- **D**ependency Inversion: Dependa de abstrações, não de implementações

## 📁 Estrutura de Arquivos

### Organização por Feature
```
src/modules/tasks/
├── components/           # Componentes específicos
│   ├── TaskCard/
│   │   ├── TaskCard.tsx
│   │   ├── TaskCard.test.tsx
│   │   ├── TaskCard.stories.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/               # Hooks específicos
├── services/            # Lógica de negócio
├── types/              # Tipos específicos
├── utils/              # Utilitários específicos
└── index.ts            # Export principal
```

### Arquivos de Componente
```
ComponentName/
├── ComponentName.tsx      # Componente principal
├── ComponentName.test.tsx # Testes
├── ComponentName.stories.tsx # Storybook (opcional)
├── ComponentName.module.css # Estilos (se necessário)
└── index.ts              # Export
```

## 🏷️ Nomenclatura

### Arquivos e Pastas
```typescript
// ✅ Pastas: kebab-case
src/modules/task-management/
src/shared/ui/components/data-display/

// ✅ Componentes: PascalCase
TaskCard.tsx
UserProfile.tsx
NavigationMenu.tsx

// ✅ Hooks: camelCase com prefixo 'use'
useTasks.ts
useAuth.ts
useLocalStorage.ts

// ✅ Utilitários: camelCase
formatDate.ts
validateEmail.ts
calculateTotal.ts

// ✅ Tipos: PascalCase
User.ts
Task.ts
ApiResponse.ts

// ✅ Constantes: UPPER_SNAKE_CASE
API_ENDPOINTS.ts
DEFAULT_VALUES.ts
ERROR_MESSAGES.ts
```

### Variáveis e Funções
```typescript
// ✅ Variáveis: camelCase
const userName = 'john_doe'
const isLoading = false
const taskList = []

// ✅ Constantes: UPPER_SNAKE_CASE ou camelCase para locais
const API_BASE_URL = 'https://api.ordohub.com'
const defaultOptions = { timeout: 5000 }

// ✅ Funções: camelCase, verbos descritivos
const getUserById = (id: string) => { ... }
const handleFormSubmit = (data: FormData) => { ... }
const validateInput = (input: string) => { ... }

// ✅ Componentes: PascalCase, substantivos
const TaskCard = () => { ... }
const UserProfile = () => { ... }
const NavigationMenu = () => { ... }

// ✅ Hooks: camelCase com prefixo 'use'
const useTasks = () => { ... }
const useAuth = () => { ... }
const useLocalStorage = () => { ... }
```

### Eventos e Handlers
```typescript
// ✅ Props de evento: onVerb
interface ButtonProps {
  onClick: () => void
  onSubmit: (data: FormData) => void
  onError: (error: Error) => void
}

// ✅ Handlers: handleVerb
const handleClick = () => { ... }
const handleSubmit = (data: FormData) => { ... }
const handleError = (error: Error) => { ... }

// ✅ Estados booleanos: is/has/can/should
const [isLoading, setIsLoading] = useState(false)
const [hasError, setHasError] = useState(false)
const [canEdit, setCanEdit] = useState(true)
```

## 📦 Imports e Exports

### Ordem dos Imports
```typescript
// 1. React e bibliotecas externas
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

// 2. Imports internos (app, modules, entities)
import { useAuth } from '@/modules/auth'
import { Task } from '@/entities/task'

// 3. Imports compartilhados (shared)
import { Button } from '@/components/buttons'
import { formatDate } from '@/utils/date'

// 4. Imports relativos
import { TaskCard } from './TaskCard'
import './TaskList.css'
```

### Exports
```typescript
// ✅ Named exports (preferível)
export const TaskCard = () => { ... }
export const TaskList = () => { ... }

// ✅ Default export para páginas principais
const TaskPage = () => { ... }
export default TaskPage

// ✅ Re-exports em index.ts
export { TaskCard } from './TaskCard'
export { TaskList } from './TaskList'
export type { TaskCardProps } from './TaskCard'

// ✅ Export de tipos
export type { Task, TaskStatus, CreateTaskDto } from './types'
```

### Path Mapping
```typescript
// ✅ Use absolute imports
import { Button } from '@/components/buttons'
import { useAuth } from '@/modules/auth'
import { Task } from '@/entities/task'

// ❌ Evite relative imports longos
import { Button } from '../../../shared/ui/components/buttons'
```

## ⚛️ React e JSX

### Componentes Funcionais
```typescript
// ✅ Função nomeada com interface
interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  className?: string
}

export const TaskCard = ({ task, onEdit, className }: TaskCardProps) => {
  // hooks
  const [isEditing, setIsEditing] = useState(false)
  
  // handlers
  const handleEdit = () => {
    setIsEditing(true)
    onEdit(task)
  }
  
  // render
  return (
    <div className={clsx('task-card', className)}>
      <h3>{task.title}</h3>
      <button onClick={handleEdit}>Edit</button>
    </div>
  )
}
```

### Hooks Pattern
```typescript
// ✅ Custom hooks para lógica reutilizável
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await taskApi.getAll()
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])
  
  return { tasks, isLoading, refetch: fetchTasks }
}
```

### Conditional Rendering
```typescript
// ✅ Ternário para alternativas simples
{isLoading ? <Spinner /> : <TaskList tasks={tasks} />}

// ✅ && para renderização condicional
{error && <ErrorMessage error={error} />}
{tasks.length > 0 && <TaskCount count={tasks.length} />}

// ✅ Early return para lógica complexa
if (isLoading) return <Spinner />
if (error) return <ErrorMessage error={error} />
if (tasks.length === 0) return <EmptyState />

return <TaskList tasks={tasks} />
```

### Props Destructuring
```typescript
// ✅ Destructuring com default values
const TaskCard = ({ 
  task, 
  onEdit = () => {}, 
  className = '',
  isEditable = true 
}: TaskCardProps) => {
  // ...
}

// ✅ Rest props para componentes wrapper
const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button 
      className={clsx('btn', className)} 
      {...rest}
    >
      {children}
    </button>
  )
}
```

## 🔷 TypeScript

### Interfaces vs Types
```typescript
// ✅ Interfaces para objetos e props de componentes
interface User {
  id: string
  name: string
  email: string
}

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
}

// ✅ Types para unions, primitivos e computed types
type TaskStatus = 'pending' | 'completed' | 'cancelled'
type UserRole = 'admin' | 'user' | 'guest'
type ApiResponse<T> = {
  data: T
  status: 'success' | 'error'
  message?: string
}
```

### Generics
```typescript
// ✅ Generics para reutilização
interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

const useApi = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  
  return { data, setData }
}

// ✅ Constraints para generics
interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>
  create(entity: Omit<T, 'id'>): Promise<T>
  update(id: string, entity: Partial<T>): Promise<T>
}
```

### Utility Types
```typescript
// ✅ Use utility types do TypeScript
type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
type UpdateTaskDto = Partial<Pick<Task, 'title' | 'description' | 'status'>>
type TaskKeys = keyof Task
type TaskValues = Task[keyof Task]

// ✅ Required/Optional fields
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

type RequiredUser = Required<User> // todas as propriedades obrigatórias
type PartialUser = Partial<User>   // todas as propriedades opcionais
```

### Type Guards
```typescript
// ✅ Type guards para validação
export const isTask = (obj: unknown): obj is Task => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'status' in obj
  )
}

// ✅ Uso em funções
const processTask = (data: unknown) => {
  if (!isTask(data)) {
    throw new Error('Invalid task data')
  }
  
  // data é tipado como Task aqui
  return data.title.toUpperCase()
}
```

## 🎨 Estilização

### Tailwind CSS
```typescript
// ✅ Use clsx para conditional classes
const TaskCard = ({ task, isSelected }: TaskCardProps) => {
  return (
    <div 
      className={clsx(
        'p-4 rounded-lg border',
        'transition-colors duration-200',
        {
          'bg-blue-50 border-blue-200': isSelected,
          'bg-white border-gray-200': !isSelected,
          'opacity-50': task.status === 'completed'
        }
      )}
    >
      {/* content */}
    </div>
  )
}

// ✅ Extraia classes complexas em variáveis
const cardClasses = {
  base: 'p-4 rounded-lg border transition-colors duration-200',
  selected: 'bg-blue-50 border-blue-200',
  default: 'bg-white border-gray-200',
  completed: 'opacity-50'
}
```

### CSS Modules (quando necessário)
```typescript
// TaskCard.module.css
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.card--selected {
  background-color: var(--primary-50);
  border-color: var(--primary-200);
}

// TaskCard.tsx
import styles from './TaskCard.module.css'

const TaskCard = ({ isSelected }: TaskCardProps) => {
  return (
    <div 
      className={clsx(
        styles.card,
        { [styles['card--selected']]: isSelected }
      )}
    >
      {/* content */}
    </div>
  )
}
```

## 🧪 Testes

### Nomenclatura de Testes
```typescript
// ✅ Describe blocks descritivos
describe('TaskCard', () => {
  describe('when task is completed', () => {
    it('should display completion checkmark', () => {
      // test
    })
    
    it('should apply completed styling', () => {
      // test
    })
  })
  
  describe('when edit button is clicked', () => {
    it('should call onEdit with task data', () => {
      // test
    })
  })
})
```

### Test Structure (AAA Pattern)
```typescript
it('should update task status when checkbox is clicked', () => {
  // Arrange
  const task = { id: '1', title: 'Test Task', status: 'pending' }
  const onUpdate = vi.fn()
  
  // Act
  render(<TaskCard task={task} onUpdate={onUpdate} />)
  fireEvent.click(screen.getByRole('checkbox'))
  
  // Assert
  expect(onUpdate).toHaveBeenCalledWith({
    ...task,
    status: 'completed'
  })
})
```

### Mocking
```typescript
// ✅ Mock de módulos
vi.mock('@/modules/auth', () => ({
  useAuth: vi.fn(() => ({
    user: { id: '1', name: 'Test User' },
    isAuthenticated: true
  }))
}))

// ✅ Mock de APIs
vi.mock('@/entities/task/api', () => ({
  taskApi: {
    getAll: vi.fn(() => Promise.resolve(mockTasks)),
    create: vi.fn((task) => Promise.resolve({ ...task, id: '123' }))
  }
}))
```

## 📝 Comentários e Documentação

### JSDoc para Funções Públicas
```typescript
/**
 * Formata uma data para exibição no formato brasileiro
 * @param date - Data a ser formatada
 * @param options - Opções de formatação
 * @returns String formatada ou '-' se data inválida
 * 
 * @example
 * formatDate(new Date(), { includeTime: true })
 * // '11/09/2024 às 14:30'
 */
export const formatDate = (
  date: Date | string, 
  options: FormatOptions = {}
): string => {
  // implementação
}
```

### Comentários em Código
```typescript
// ✅ Explique o "porquê", não o "o quê"
const TaskCard = ({ task }: TaskCardProps) => {
  // Usamos useCallback para evitar re-renders desnecessários
  // quando o componente pai re-renderiza
  const handleEdit = useCallback(() => {
    onEdit(task)
  }, [task, onEdit])
  
  // TODO: Implementar drag and drop
  // FIXME: Corrigir problema de performance com listas grandes
  // NOTE: Esta implementação será refatorada na próxima sprint
  
  return (
    <div className="task-card">
      {/* Renderização condicional baseada no status */}
      {task.status === 'completed' && <CheckIcon />}
    </div>
  )
}
```

### README para Módulos
```markdown
# Tasks Module

## Responsabilidades
- Gerenciamento de tarefas domésticas
- Interface para criação, edição e exclusão
- Integração com sistema de notificações

## Componentes Principais
- `TaskCard` - Exibição individual de tarefa
- `TaskList` - Lista de tarefas
- `TaskForm` - Formulário de criação/edição

## Hooks
- `useTasks` - Gerenciamento de estado das tarefas
- `useTaskForm` - Lógica do formulário
```

## 🔧 Configurações

### ESLint Rules Customizadas
```json
// .eslintrc.cjs
{
  "rules": {
    // Força uso de interfaces para props de componentes
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    
    // Evita any
    "@typescript-eslint/no-explicit-any": "error",
    
    // Força nomeação consistente
    "naming-convention": [
      "error",
      {
        "selector": "variableLike",
        "format": ["camelCase", "PascalCase", "UPPER_CASE"]
      }
    ]
  }
}
```

### Prettier Config
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Git Commit Convention
```bash
# Formato: <type>(<scope>): <description>

feat(tasks): add drag and drop functionality
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
refactor(components): extract common button logic
test(tasks): add unit tests for TaskCard
chore(deps): update react to v18.3.1
```

### Branch Naming
```bash
# Formato: <type>/<short-description>

feature/task-drag-drop
bugfix/login-redirect
hotfix/security-vulnerability
chore/update-dependencies
docs/api-documentation
```

---

Seguindo essas convenções, mantemos o código do OrdoHub consistente, legível e fácil de manter conforme o projeto cresce.
