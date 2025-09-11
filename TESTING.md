# OrdoHub Testing Guide

## 🧪 Configuração de Testes

Este projeto utiliza **Vitest** como framework de testes, configurado com suporte completo para TypeScript, React e JSX.

## 📁 Estrutura de Testes

```
src/
├── shared/
│   └── config/
│       └── test/
│           ├── setup.ts      # Configuração global dos testes
│           ├── mocks.ts      # Mocks de bibliotecas
│           ├── utils.ts      # Utilitários para testes
│           └── example.test.tsx # Exemplo de testes
├── components/
│   └── __tests__/           # Testes de componentes
├── hooks/
│   └── __tests__/           # Testes de hooks
└── utils/
    └── __tests__/           # Testes de utilitários
```

## 🚀 Scripts Disponíveis

### Executar Testes

```bash
# Executar todos os testes
npm run test

# Executar em modo watch (desenvolvimento)
npm run test:watch

# Executar com coverage
npm run test:coverage

# Executar apenas testes alterados
npm run test:changed

# Executar testes de uma pasta específica
npm run test src/components

# Executar teste específico
npm run test example.test.tsx
```

### Coverage e Relatórios

```bash
# Gerar relatório de coverage completo
npm run test:coverage

# Abrir relatório HTML no navegador
npm run test:coverage:open

# Executar testes em modo CI
npm run test:ci
```

## 🛠️ Configuração

### Vitest Config
- **Ambiente**: jsdom (para testes de React)
- **Coverage**: v8 (mais rápido e preciso)
- **Thresholds**: 75-95% de cobertura
- **Path Aliases**: Sincronizados com Vite e TypeScript

### Setup Global
- **DOM APIs**: Mocked (ResizeObserver, IntersectionObserver)
- **Storage**: localStorage/sessionStorage mockado
- **Fetch**: Mock global disponível
- **Testing Library**: Configurado com cleanup automático

### Mocks Disponíveis
- **React Router**: Navegação mockada
- **Framer Motion**: Animações simplificadas
- **React Query**: Cliente de API mockado
- **Zustand**: Store mockado
- **React Hook Form**: Formulários mockados

## 📝 Exemplos de Testes

### Testando Componentes

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Testando Hooks

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter Hook', () => {
  it('should start with initial value', () => {
    const { result } = renderHook(() => useCounter(5))
    
    expect(result.current.count).toBe(5)
  })

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

### Testando Async/Promises

```typescript
describe('Async Operations', () => {
  it('should handle async data fetching', async () => {
    const mockData = { id: 1, name: 'Test' }
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    })
    
    const result = await fetchUserData(1)
    
    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith('/api/users/1')
  })

  it('should handle errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
    
    await expect(fetchUserData(1)).rejects.toThrow('Network error')
  })
})
```

### Testando com Context

```typescript
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from './ThemeContext'
import { ThemedButton } from './ThemedButton'

const renderWithTheme = (component: React.ReactNode, theme = 'light') => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('ThemedButton', () => {
  it('should apply correct theme classes', () => {
    renderWithTheme(<ThemedButton>Test</ThemedButton>, 'dark')
    
    expect(screen.getByRole('button')).toHaveClass('dark-theme')
  })
})
```

### Snapshot Testing

```typescript
describe('Component Snapshots', () => {
  it('should match snapshot', () => {
    const { container } = render(<MyComponent prop="value" />)
    
    expect(container.firstChild).toMatchSnapshot()
  })
})
```

### Testando LocalStorage

```typescript
describe('LocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should save data to localStorage', () => {
    const data = { user: 'test' }
    
    saveToStorage('userData', data)
    
    expect(localStorage.getItem('userData')).toBe(JSON.stringify(data))
  })
})
```

### Performance Testing

```typescript
describe('Performance', () => {
  it('should complete within time limit', () => {
    const start = performance.now()
    
    // Operação que deve ser rápida
    heavyComputation()
    
    const duration = performance.now() - start
    expect(duration).toBeLessThan(100) // 100ms
  })
})
```

## 🔧 Configuração Personalizada

### Adicionando Novos Mocks

```typescript
// src/shared/config/test/mocks.ts
vi.mock('nova-biblioteca', () => ({
  funcaoMockada: vi.fn(),
  ComponenteMockado: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-component">{children}</div>
  ),
}))
```

### Custom Render

```typescript
// src/shared/config/test/utils.ts
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider>
        <QueryClient>
          <Router>
            {children}
          </Router>
        </QueryClient>
      </ThemeProvider>
    )
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}
```

## 📊 Coverage Thresholds

O projeto está configurado com os seguintes thresholds de coverage:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 85%
- **Lines**: 80%

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de import**: Verifique os path aliases no `vitest.config.ts`
2. **DOM APIs não encontradas**: Adicione mocks no `setup.ts`
3. **Testes lentos**: Use `--reporter=verbose` para debug
4. **Coverage baixo**: Execute `npm run test:coverage` para ver detalhes

### Debug de Testes

```typescript
import { debug } from '@testing-library/react'

it('should debug component', () => {
  const { debug } = render(<MyComponent />)
  
  debug() // Imprime o DOM atual
  debug(screen.getByRole('button')) // Debug elemento específico
})
```

## 🎯 Boas Práticas

1. **Arrange, Act, Assert**: Organize teus testes claramente
2. **Um conceito por teste**: Cada teste deve verificar uma coisa
3. **Nomes descritivos**: Use nomes que expliquem o que está sendo testado
4. **Mock apenas o necessário**: Evite over-mocking
5. **Cleanup**: Use `beforeEach`/`afterEach` para limpeza
6. **User-centric**: Teste como o usuário interage
7. **Error scenarios**: Teste casos de erro também

## 📚 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event API](https://testing-library.com/docs/user-event/intro)

---

**OrdoHub** - Sistema de Gestão Familiar 👨‍👩‍👧‍👦
