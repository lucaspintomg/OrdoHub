import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Input,
  Badge,
} from './shared/ui/components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <div className='min-h-screen bg-white dark:bg-neutral-900 transition-colors'>
      {/* Header */}
      <header className='border-b border-neutral-200 dark:border-neutral-700'>
        <div className='container-fluid py-4'>
          <div className='flex-between'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex-center'>
                <span className='text-white font-bold text-sm'>O</span>
              </div>
              <h1 className='text-xl font-heading font-bold text-neutral-900 dark:text-neutral-100'>
                OrdoHub
              </h1>
            </div>
            <Button size='sm'>Entrar</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container-fluid py-12'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Hero Section */}
          <div className='mb-12'>
            <h2 className='text-4xl md:text-6xl font-heading font-bold mb-6'>
              <span className='text-gradient'>Hub Universal</span>
              <br />
              <span className='text-neutral-900 dark:text-neutral-100'>
                de Gestão Doméstica
              </span>
            </h2>
            <p className='text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8'>
              Organize sua casa, família e vida de forma colaborativa e
              inteligente. Tudo em um só lugar, acessível para toda a família.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg'>Começar Agora</Button>
              <Button variant='outline' size='lg'>
                Saber Mais
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            <Card variant='hover'>
              <div className='w-12 h-12 bg-task-pending/10 rounded-lg flex-center mb-4'>
                <span className='text-task-pending text-xl'>📋</span>
              </div>
              <h3 className='text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                Gestão de Tarefas
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Organize e distribua tarefas domésticas entre os membros da
                família
              </p>
              <div className='mt-4 flex gap-2'>
                <Badge variant='primary' size='sm'>
                  Novo
                </Badge>
                <Badge variant='success' size='sm'>
                  Popular
                </Badge>
              </div>
            </Card>

            <Card variant='hover'>
              <div className='w-12 h-12 bg-expense-home/10 rounded-lg flex-center mb-4'>
                <span className='text-expense-home text-xl'>💰</span>
              </div>
              <h3 className='text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                Controle Financeiro
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Monitore gastos domésticos e planeje o orçamento familiar
              </p>
              <div className='mt-4'>
                <Badge variant='warning' size='sm'>
                  Em desenvolvimento
                </Badge>
              </div>
            </Card>

            <Card variant='hover'>
              <div className='w-12 h-12 bg-secondary-500/10 rounded-lg flex-center mb-4'>
                <span className='text-secondary-600 text-xl'>📅</span>
              </div>
              <h3 className='text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                Calendário Familiar
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Sincronize eventos, compromissos e atividades da família
              </p>
            </Card>

            <Card variant='hover'>
              <div className='w-12 h-12 bg-accent-500/10 rounded-lg flex-center mb-4'>
                <span className='text-accent-600 text-xl'>🏠</span>
              </div>
              <h3 className='text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                Inventário Doméstico
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Controle de estoque e lista de compras inteligente
              </p>
            </Card>

            <Card variant='hover'>
              <div className='w-12 h-12 bg-family-parent/10 rounded-lg flex-center mb-4'>
                <span className='text-family-parent text-xl'>👨‍👩‍👧‍👦</span>
              </div>
              <h3 className='text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                Perfis Familiares
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Diferentes níveis de acesso para cada membro da família
              </p>
            </Card>

            <Card variant='hover'>
              <div className='w-12 h-12 bg-primary-500/10 rounded-lg flex-center mb-4'>
                <span className='text-primary-600 text-xl'>📊</span>
              </div>
              <h3 className='text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
                Relatórios & Insights
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Análises detalhadas para otimizar a gestão doméstica
              </p>
            </Card>
          </div>

          {/* Component Demo Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
            {/* Counter Demo */}
            <Card>
              <CardHeader
                title='Demo Counter'
                subtitle='Teste os componentes do design system'
              />
              <CardContent>
                <div className='flex-center space-x-4'>
                  <Button
                    variant='outline'
                    onClick={() => setCount(count => count - 1)}
                  >
                    -
                  </Button>
                  <span className='text-2xl font-bold text-primary-600 min-w-[3rem] text-center'>
                    {count}
                  </span>
                  <Button onClick={() => setCount(count => count + 1)}>
                    +
                  </Button>
                </div>
                <div className='mt-4 flex justify-center gap-2'>
                  <Button
                    variant='secondary'
                    size='sm'
                    onClick={() => setCount(0)}
                  >
                    Reset
                  </Button>
                  <Button
                    variant='accent'
                    size='sm'
                    onClick={() => setCount(100)}
                  >
                    Set 100
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Demo */}
            <Card>
              <CardHeader
                title='Form Demo'
                subtitle='Teste os inputs e validação'
              />
              <CardContent>
                <div className='space-y-4'>
                  <Input
                    label='Email'
                    type='email'
                    placeholder='Digite seu email'
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    leftIcon={
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                        />
                      </svg>
                    }
                  />
                  <Input
                    label='Senha'
                    type='password'
                    placeholder='Digite sua senha'
                    helperText='Mínimo 8 caracteres'
                  />
                  <div className='flex gap-2'>
                    <Button variant='primary' className='flex-1'>
                      Entrar
                    </Button>
                    <Button variant='ghost' className='flex-1'>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Button Variants Demo */}
          <Card className='max-w-3xl mx-auto'>
            <CardHeader
              title='Button Variants'
              subtitle='Todas as variações de botões disponíveis'
            />
            <CardContent>
              <div className='space-y-6'>
                {/* Primary buttons */}
                <div>
                  <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3'>
                    Primary & Secondary
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    <Button variant='primary' size='sm'>
                      Primary SM
                    </Button>
                    <Button variant='primary' size='md'>
                      Primary MD
                    </Button>
                    <Button variant='primary' size='lg'>
                      Primary LG
                    </Button>
                    <Button variant='secondary' size='md'>
                      Secondary
                    </Button>
                    <Button variant='accent' size='md'>
                      Accent
                    </Button>
                  </div>
                </div>

                {/* Outline & Ghost */}
                <div>
                  <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3'>
                    Outline & Ghost
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    <Button variant='outline' size='md'>
                      Outline
                    </Button>
                    <Button variant='ghost' size='md'>
                      Ghost
                    </Button>
                    <Button variant='danger' size='md'>
                      Danger
                    </Button>
                    <Button variant='primary' size='md' isLoading>
                      Loading
                    </Button>
                  </div>
                </div>

                {/* With icons */}
                <div>
                  <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3'>
                    With Icons
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    <Button
                      variant='primary'
                      leftIcon={
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 4v16m8-8H4'
                          />
                        </svg>
                      }
                    >
                      Add Item
                    </Button>
                    <Button
                      variant='outline'
                      rightIcon={
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className='border-t border-neutral-200 dark:border-neutral-700 mt-16'>
        <div className='container-fluid py-8'>
          <div className='text-center text-neutral-600 dark:text-neutral-400'>
            <p>&copy; 2024 OrdoHub. Feito com React + Vite + Tailwind CSS</p>
            <div className='mt-2 flex justify-center gap-2'>
              <Badge variant='primary' size='sm'>
                React
              </Badge>
              <Badge variant='secondary' size='sm'>
                TypeScript
              </Badge>
              <Badge variant='success' size='sm'>
                Tailwind
              </Badge>
              <Badge variant='warning' size='sm'>
                Vite
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
