import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders OrdoHub title', () => {
    render(<App />)
    expect(screen.getByText('OrdoHub')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<App />)
    expect(
      screen.getByText('Organize sua casa, família e vida de forma colaborativa e inteligente. Tudo em um só lugar, acessível para toda a família.')
    ).toBeInTheDocument()
  })
})
