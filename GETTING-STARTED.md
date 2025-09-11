# 🚀 Guia de Início Rápido - OrdoHub

## ✅ Estrutura Completa Criada!

A estrutura completa de pastas do OrdoHub foi criada com sucesso! 🎉

### 📁 O que foi criado:

- ✅ **164 diretórios** organizados por funcionalidade
- ✅ **164 arquivos `index.ts`** para exports limpos
- ✅ **Documentação completa** da arquitetura
- ✅ **Path mappings** configurados no TypeScript e Vite
- ✅ **Convenções de código** documentadas

## 🛠️ Como usar a estrutura:

### 1. **Criar um novo componente**
```bash
# Exemplo: Componente TaskCard
# Arquivo: src/modules/tasks/components/TaskCard.tsx

import { Task } from '@/entities/task'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
}

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <button onClick={() => onEdit(task)}>Edit</button>
    </div>
  )
}

# Export no index.ts
# Arquivo: src/modules/tasks/components/index.ts
export { TaskCard } from './TaskCard'
```

### 2. **Criar uma nova página**
```bash
# Exemplo: Página de lista de tarefas
# Arquivo: src/pages/tasks/list/TaskListPage.tsx

import { useTasks } from '@/modules/tasks'
import { TaskCard } from '@/modules/tasks/components'

export const TaskListPage = () => {
  const { tasks, isLoading } = useTasks()
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={handleEdit} />
      ))}
    </div>
  )
}

# Export no index.ts
# Arquivo: src/pages/tasks/list/index.ts
export { TaskListPage } from './TaskListPage'
```

### 3. **Criar uma entidade**
```bash
# Exemplo: Entidade Task
# Arquivo: src/entities/task/types/index.ts

export interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'completed' | 'cancelled'
  assigneeId: string
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateTaskDto = Partial<Pick<Task, 'title' | 'description' | 'status'>>

# Arquivo: src/entities/task/api/index.ts
import { api } from '@/infrastructure/api'
import { Task, CreateTaskDto, UpdateTaskDto } from '../types'

export const taskApi = {
  getAll: () => api.get<Task[]>('/tasks'),
  getById: (id: string) => api.get<Task>(`/tasks/${id}`),
  create: (data: CreateTaskDto) => api.post<Task>('/tasks', data),
  update: (id: string, data: UpdateTaskDto) => api.put<Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`)
}
```

### 4. **Criar um hook personalizado**
```bash
# Exemplo: Hook para gerenciar tarefas
# Arquivo: src/modules/tasks/hooks/useTasks.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from '@/entities/task/api'
import { CreateTaskDto } from '@/entities/task/types'

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getAll,
    staleTime: 5 * 60 * 1000 // 5 minutes
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

# Export no index.ts
# Arquivo: src/modules/tasks/hooks/index.ts
export { useTasks, useCreateTask } from './useTasks'
```

### 5. **Usar Path Mappings**
```typescript
// ✅ CORRETO - Use imports absolutos
import { Button } from '@/components/buttons'
import { useAuth } from '@/modules/auth'
import { Task } from '@/entities/task'
import { formatDate } from '@/utils/date'
import { API_ENDPOINTS } from '@/constants/api'

// ❌ EVITE - Imports relativos longos
import { Button } from '../../../shared/ui/components/buttons'
import { useAuth } from '../../modules/auth'
```

## 🎯 Próximos Passos Recomendados:

### 1. **Sistema de Design Base** (Prioridade Alta)
```bash
# Crie componentes básicos em:
src/shared/ui/components/buttons/Button.tsx
src/shared/ui/components/inputs/Input.tsx
src/shared/ui/components/layout/Container.tsx
```

### 2. **Configuração de Rotas** (Prioridade Alta)
```bash
# Configure o router em:
src/app/router/AppRouter.tsx
src/app/router/routes.ts
```

### 3. **Store Global** (Prioridade Média)
```bash
# Configure o Zustand em:
src/app/store/authStore.ts
src/app/store/appStore.ts
```

### 4. **API Client** (Prioridade Média)
```bash
# Configure o cliente HTTP em:
src/infrastructure/api/client.ts
src/infrastructure/api/interceptors.ts
```

### 5. **Primeiros Módulos** (Prioridade Baixa)
```bash
# Implemente módulos na ordem:
1. src/modules/auth/ (autenticação)
2. src/modules/tasks/ (tarefas)
3. src/modules/calendar/ (calendário)
```

## 📝 Scripts Úteis:

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build           # Build de produção
npm run preview         # Preview do build

# Qualidade
npm run lint            # Verificar código
npm run format          # Formatar código
npm run type-check      # Verificar tipos

# Testes
npm run test            # Executar testes
npm run test:ui         # Interface de testes
npm run test:coverage   # Cobertura

# Utilitários
npm run setup:folders   # Recriar estrutura de pastas
npm run clean          # Limpar build
```

## 📚 Documentação:

- 📁 [Estrutura de Pastas](./docs/architecture/folder-structure.md) - Detalhes da arquitetura
- 🏗️ [Padrões](./docs/architecture/patterns.md) - Padrões de desenvolvimento
- 📝 [Convenções](./docs/architecture/conventions.md) - Convenções de código

## 💡 Dicas:

1. **Sempre use path mappings** para imports
2. **Mantenha a separação de responsabilidades** entre camadas
3. **Crie testes** para componentes importantes
4. **Use TypeScript** para tudo
5. **Documente** funcionalidades complexas
6. **Siga as convenções** estabelecidas

---

**🎉 Estrutura pronta! Agora é só começar a desenvolver o OrdoHub!**

Para qualquer dúvida, consulte a documentação ou os exemplos de código acima.
