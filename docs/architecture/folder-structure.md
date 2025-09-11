# 🏗️ Arquitetura de Pastas do OrdoHub

## 📋 Visão Geral

O OrdoHub segue uma arquitetura modular e escalável, organizando o código em camadas bem definidas que promovem:
- **Separação de responsabilidades**
- **Reutilização de código**
- **Facilidade de manutenção**
- **Escalabilidade**
- **Testabilidade**

## 📁 Estrutura de Diretórios

### `src/app/` - Configuração da Aplicação
Contém a configuração central da aplicação, providers globais e setup inicial.

```
src/app/
├── providers/     # Providers React (Context, Query, Auth, etc.)
├── router/        # Configuração de rotas
├── store/         # Store global (Zustand)
├── layout/        # Layouts da aplicação
├── hooks/         # Hooks específicos da aplicação
└── types/         # Tipos globais da aplicação
```

### `src/pages/` - Páginas da Aplicação
Páginas e rotas da aplicação organizadas por funcionalidade.

```
src/pages/
├── home/              # Página inicial
├── auth/              # Páginas de autenticação
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── dashboard/         # Dashboard principal
├── tasks/             # Páginas de tarefas
│   ├── create/
│   ├── edit/
│   └── list/
├── calendar/          # Calendário
├── finances/          # Finanças
│   ├── expenses/
│   ├── budget/
│   └── reports/
├── inventory/         # Inventário
│   ├── items/
│   └── categories/
├── family/            # Família
│   ├── members/
│   └── roles/
├── settings/          # Configurações
│   ├── profile/
│   ├── notifications/
│   └── preferences/
├── help/              # Ajuda
└── not-found/         # 404
```

### `src/modules/` - Módulos Funcionais
Módulos de funcionalidades específicas com toda a lógica de negócio.

```
src/modules/
├── auth/              # Autenticação
├── tasks/             # Gestão de tarefas
├── calendar/          # Calendário e eventos
├── finances/          # Gestão financeira
├── inventory/         # Inventário doméstico
├── family/            # Gestão familiar
└── notifications/     # Sistema de notificações

Cada módulo contém:
├── components/        # Componentes específicos
├── hooks/            # Hooks do módulo
├── services/         # Serviços e API calls
├── types/            # Tipos TypeScript
└── utils/            # Utilitários específicos
```

### `src/entities/` - Entidades de Negócio
Definições de entidades de domínio e suas operações.

```
src/entities/
├── user/              # Usuário
├── task/              # Tarefa
├── family/            # Família
├── expense/           # Despesa
├── budget/            # Orçamento
├── inventory-item/    # Item do inventário
├── notification/      # Notificação
└── calendar-event/    # Evento do calendário

Cada entidade contém:
├── model/            # Modelos de dados
├── api/              # Chamadas de API
└── types/            # Definições de tipos
```

### `src/shared/` - Código Compartilhado
Recursos compartilhados entre diferentes partes da aplicação.

```
src/shared/
├── ui/                # Sistema de Design
│   ├── components/    # Componentes reutilizáveis
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── feedback/
│   │   ├── data-display/
│   │   ├── overlays/
│   │   ├── inputs/
│   │   └── buttons/
│   ├── icons/         # Ícones
│   ├── styles/        # Estilos globais
│   └── themes/        # Temas
├── hooks/             # Hooks reutilizáveis
│   ├── api/
│   ├── ui/
│   ├── form/
│   └── auth/
├── utils/             # Utilitários
│   ├── date/
│   ├── format/
│   ├── validation/
│   ├── storage/
│   ├── api/
│   └── constants/
├── constants/         # Constantes
│   ├── routes/
│   ├── api/
│   ├── ui/
│   └── permissions/
├── types/             # Tipos compartilhados
│   ├── api/
│   ├── ui/
│   ├── entities/
│   └── common/
├── lib/               # Bibliotecas configuradas
│   ├── api/
│   ├── storage/
│   ├── validation/
│   ├── date/
│   └── auth/
└── config/            # Configurações
    ├── api/
    ├── app/
    └── theme/
```

### `src/infrastructure/` - Infraestrutura
Camada de infraestrutura e integrações externas.

```
src/infrastructure/
├── api/               # Cliente API
│   ├── client/
│   ├── endpoints/
│   ├── interceptors/
│   └── types/
├── storage/           # Armazenamento
│   ├── local/
│   ├── session/
│   └── secure/
├── auth/              # Autenticação
│   ├── providers/
│   ├── guards/
│   └── utils/
├── websocket/         # WebSocket
│   ├── client/
│   ├── events/
│   └── handlers/
├── monitoring/        # Monitoramento
│   ├── analytics/
│   ├── errors/
│   └── performance/
├── database/          # Database (se necessário)
│   ├── models/
│   ├── migrations/
│   └── seeders/
└── cache/             # Cache
    ├── providers/
    └── strategies/
```

## 🎯 Princípios da Arquitetura

### 1. **Separation of Concerns**
- Cada camada tem responsabilidades bem definidas
- Módulos isolados e independentes
- Baixo acoplamento entre componentes

### 2. **Feature Sliced Design**
- Organização por funcionalidades
- Reutilização de código
- Facilita a manutenção

### 3. **Clean Architecture**
- Dependências apontam para dentro
- Regras de negócio isoladas
- Infraestrutura como detalhe

### 4. **Domain-Driven Design**
- Entidades representam o domínio
- Linguagem ubíqua
- Contextos bem definidos

## 🚀 Como Usar

### Importações
Use imports absolutos com path mapping configurado no TypeScript:

```typescript
// ✅ Correto
import { Button } from '@/shared/ui/components/buttons'
import { useAuth } from '@/modules/auth/hooks'
import { TaskEntity } from '@/entities/task'

// ❌ Evite
import { Button } from '../../../shared/ui/components/buttons'
```

### Fluxo de Dados
1. **Pages** chamam **Modules**
2. **Modules** usam **Entities** e **Shared**
3. **Entities** definem o domínio
4. **Infrastructure** fornece implementações

### Exemplo de Fluxo
```
Page (TaskListPage) 
  ↓
Module (tasks/hooks/useTasks)
  ↓
Entity (task/api/taskApi)
  ↓
Infrastructure (api/client)
```

## 📝 Convenções

### Nomenclatura
- **Pastas**: kebab-case (`task-list`)
- **Arquivos**: kebab-case para pastas, PascalCase para componentes
- **Exports**: Use index.ts para exports limpos

### Arquivos index.ts
Cada pasta contém um `index.ts` para facilitar imports:

```typescript
// src/modules/tasks/index.ts
export * from './hooks'
export * from './components'
export * from './services'
export * from './types'
```

### Estrutura de Componentes
```typescript
// TaskCard.tsx
interface TaskCardProps {
  // props
}

export const TaskCard: React.FC<TaskCardProps> = ({ ... }) => {
  // implementação
}

// index.ts
export { TaskCard } from './TaskCard'
```

## 🔧 Scripts Úteis

- `npm run setup:folders` - Regenera a estrutura de pastas
- `npm run dev` - Inicia desenvolvimento
- `npm run build` - Build de produção
- `npm run test` - Executa testes
- `npm run lint` - Verifica código

## 📚 Próximos Passos

1. Implementar sistema de design base
2. Configurar roteamento
3. Implementar autenticação
4. Criar primeiros módulos
5. Configurar testes
6. Implementar CI/CD

---

Esta arquitetura foi projetada para crescer com o projeto, mantendo a organização e facilidade de manutenção conforme novas funcionalidades são adicionadas ao OrdoHub.
