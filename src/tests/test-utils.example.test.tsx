// OrdoHub - Test Utils Example
// Exemplo de como usar os utilitários de teste

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  renderWithProviders,
  createMockUser,
  createMockTask,
  createMockFamily,
  createMockSupabaseClient,
  createMockRouter,
  setupLocalStorageMock,
  clearAllMocks,
  createMockApiResponse,
  createMockApiError,
  waitForTime,
} from './test-utils'

// Exemplo de componente para testar
function TaskCard({
  task,
  onComplete,
}: {
  task: { id: string; title: string; completed: boolean }
  onComplete: (id: string) => void
}) {
  return (
    <div data-testid={`task-${task.id}`}>
      <h3>{task.title}</h3>
      <button onClick={() => onComplete(task.id)} disabled={task.completed}>
        {task.completed ? 'Completed' : 'Mark Complete'}
      </button>
    </div>
  )
}

describe('Test Utils Examples', () => {
  beforeEach(() => {
    clearAllMocks()
  })

  describe('Basic Component Testing', () => {
    it('should render task card with basic providers', () => {
      const mockTask = createMockTask({
        title: 'Test Task',
        completed: false,
      })

      const mockOnComplete = vi.fn()

      const { getByTestId, getByText } = renderWithProviders(
        <TaskCard task={mockTask} onComplete={mockOnComplete} />,
        {
          withRouter: false,
          withQueryClient: false,
        }
      )

      expect(getByTestId(`task-${mockTask.id}`)).toBeInTheDocument()
      expect(getByText('Test Task')).toBeInTheDocument()
      expect(getByText('Mark Complete')).toBeInTheDocument()
    })

    it('should handle task completion', async () => {
      const mockTask = createMockTask({
        title: 'Complete Me',
        completed: false,
      })

      const mockOnComplete = vi.fn()

      const { getByText } = renderWithProviders(
        <TaskCard task={mockTask} onComplete={mockOnComplete} />,
        {
          withRouter: false,
          withQueryClient: false,
        }
      )

      const completeButton = getByText('Mark Complete')
      completeButton.click()

      expect(mockOnComplete).toHaveBeenCalledWith(mockTask.id)
    })
  })

  describe('Providers Testing', () => {
    it('should render with all providers enabled', () => {
      const mockUser = createMockUser({
        name: 'John Doe',
        role: 'admin',
      })

      const mockTask = createMockTask({
        title: 'Admin Task',
        createdBy: mockUser.id,
      })

      const { getByText } = renderWithProviders(
        <TaskCard task={mockTask} onComplete={vi.fn()} />,
        {
          withRouter: true,
          withQueryClient: true,
          withStores: true,
          initialStoreState: {
            auth: {
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
            },
          },
        }
      )

      expect(getByText('Admin Task')).toBeInTheDocument()
    })

    it('should render with memory router', () => {
      const mockTask = createMockTask()

      const { getByText } = renderWithProviders(
        <TaskCard task={mockTask} onComplete={vi.fn()} />,
        {
          withRouter: true,
          routerType: 'memory',
          initialEntries: ['/tasks'],
        }
      )

      expect(getByText(mockTask.title)).toBeInTheDocument()
    })

    it('should render with custom query client', () => {
      const mockTask = createMockTask()

      const { getByText } = renderWithProviders(
        <TaskCard task={mockTask} onComplete={vi.fn()} />,
        {
          withQueryClient: true,
          // queryClient será criado automaticamente se não fornecido
        }
      )

      expect(getByText(mockTask.title)).toBeInTheDocument()
    })
  })

  describe('Mock Data Factories', () => {
    it('should create mock user with defaults', () => {
      const user = createMockUser()

      expect(user).toEqual({
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        avatar: 'https://example.com/avatar.jpg',
        role: 'member',
        familyId: 'test-family-id',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      })
    })

    it('should create mock user with overrides', () => {
      const user = createMockUser({
        name: 'Custom User',
        role: 'admin',
        email: 'admin@example.com',
      })

      expect(user.name).toBe('Custom User')
      expect(user.role).toBe('admin')
      expect(user.email).toBe('admin@example.com')
      expect(user.id).toBe('test-user-id') // Default preserved
    })

    it('should create mock family', () => {
      const family = createMockFamily({
        name: 'Smith Family',
        members: ['user1', 'user2', 'user3'],
      })

      expect(family.name).toBe('Smith Family')
      expect(family.members).toHaveLength(3)
      expect(family.ownerId).toBe('test-user-id')
    })

    it('should create mock task with custom data', () => {
      const task = createMockTask({
        title: 'Custom Task',
        status: 'in-progress',
        priority: 'high',
        assignedTo: ['user1', 'user2'],
      })

      expect(task.title).toBe('Custom Task')
      expect(task.status).toBe('in-progress')
      expect(task.priority).toBe('high')
      expect(task.assignedTo).toHaveLength(2)
    })
  })

  describe('Supabase Mock', () => {
    it('should create mock supabase client', () => {
      const supabase = createMockSupabaseClient()

      expect(supabase.auth.getSession).toBeDefined()
      expect(supabase.auth.signInWithPassword).toBeDefined() // Correct method name
      expect(supabase.from).toBeDefined()
      expect(supabase.storage.from).toBeDefined()
      expect(supabase.rpc).toBeDefined()
    })

    it('should mock auth methods', async () => {
      const supabase = createMockSupabaseClient()

      // Mock a successful sign in
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: createMockUser(),
          session: { access_token: 'mock-token' },
        },
        error: null,
      })

      const result = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password',
      })

      expect(result.data.user).toBeDefined()
      expect(result.error).toBeNull()
    })

    it('should mock database queries', async () => {
      const supabase = createMockSupabaseClient()
      const mockTasks = [createMockTask(), createMockTask({ id: 'task-2' })]

      // Mock database query
      supabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({
          data: mockTasks,
          error: null,
        }),
      })

      const tasksQuery = supabase.from('tasks')
      const result = await tasksQuery
        .select('*')
        .eq('family_id', 'test-family-id')

      expect(result.data).toHaveLength(2)
      expect(result.error).toBeNull()
    })
  })

  describe('Router Mock', () => {
    it('should create mock router', () => {
      const router = createMockRouter()

      expect(router.navigate).toBeDefined()
      expect(router.location.pathname).toBe('/')
      expect(router.params).toEqual({})
    })
  })

  describe('Helper Functions', () => {
    it('should wait for specified time', async () => {
      const start = Date.now()
      await waitForTime(100)
      const end = Date.now()

      expect(end - start).toBeGreaterThanOrEqual(95) // Allow small timing variation
    })

    it('should create mock API response', () => {
      const data = { id: 1, name: 'Test' }
      const response = createMockApiResponse(data, 200)

      expect(response.data).toEqual(data)
      expect(response.status).toBe(200)
      expect(response.statusText).toBe('OK')
    })

    it('should create mock API error', () => {
      const error = createMockApiError('Not Found', 404)

      expect(error.response.data.message).toBe('Not Found')
      expect(error.response.status).toBe(404)
      expect(error.isAxiosError).toBe(true)
    })

    it('should setup localStorage mock', () => {
      const localStorage = setupLocalStorageMock()

      localStorage.setItem('test-key', 'test-value')
      expect(localStorage.getItem('test-key')).toBe('test-value')

      localStorage.removeItem('test-key')
      expect(localStorage.getItem('test-key')).toBeNull()

      expect(localStorage.setItem).toHaveBeenCalled()
      expect(localStorage.removeItem).toHaveBeenCalled()
    })
  })

  describe('Store Mocks', () => {
    it('should work with mocked stores (when implemented)', () => {
      // Esta funcionalidade será ativada quando os stores reais forem implementados
      // Por enquanto, apenas testamos que a função existe
      expect(renderWithProviders).toBeDefined()
    })
  })

  describe('Integration Tests', () => {
    it('should handle complex testing scenario', async () => {
      // Setup mocks
      const localStorage = setupLocalStorageMock()
      const supabase = createMockSupabaseClient()

      // Mock data
      const user = createMockUser({ name: 'Integration User' })
      const task = createMockTask({
        title: 'Integration Task',
        createdBy: user.id,
      })

      // Mock API responses
      supabase.auth.getUser.mockResolvedValue({
        data: { user },
        error: null,
      })

      // Setup localStorage
      localStorage.setItem(
        'user-preferences',
        JSON.stringify({ theme: 'dark' })
      )

      // Simulate accessing localStorage to test the mock
      const preferences = localStorage.getItem('user-preferences')
      expect(preferences).toBe('{"theme":"dark"}')

      // Render component with all providers
      const { getByText } = renderWithProviders(
        <TaskCard task={task} onComplete={vi.fn()} />,
        {
          withRouter: true,
          withQueryClient: true,
          withSupabase: true,
          supabaseClient: supabase,
          withStores: true,
          initialStoreState: {
            auth: { user, isAuthenticated: true },
          },
        }
      )

      // Verify rendering
      expect(getByText('Integration Task')).toBeInTheDocument()

      // Verify mocks were called during test execution
      expect(localStorage.getItem).toHaveBeenCalledWith('user-preferences')
    })
  })
})
