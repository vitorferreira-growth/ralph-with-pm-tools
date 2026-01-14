import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabelaVendedores } from './tabela-vendedores'
import type { Seller } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockVendedores: Seller[] = [
  {
    id: '1',
    tenant_id: 'tenant-1',
    name: 'Ana Silva',
    email: 'ana@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    tenant_id: 'tenant-1',
    name: 'Bruno Costa',
    email: 'bruno@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

// ============================================================================
// TESTS
// ============================================================================

describe('TabelaVendedores', () => {
  // --------------------------------------------------------------------------
  // Empty state
  // --------------------------------------------------------------------------
  describe('empty state', () => {
    it('deve exibir mensagem quando não há vendedores', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaVendedores vendedores={[]} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Nenhum vendedor cadastrado')).toBeInTheDocument()
      expect(screen.getByText('Adicione sua equipe de vendas')).toBeInTheDocument()
    })

    it('não deve renderizar tabela quando vazia', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaVendedores vendedores={[]} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Table rendering
  // --------------------------------------------------------------------------
  describe('table rendering', () => {
    it('deve renderizar tabela com vendedores', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(
        <TabelaVendedores vendedores={mockVendedores} onEditar={onEditar} onExcluir={onExcluir} />
      )

      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('deve exibir cabeçalhos corretos', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(
        <TabelaVendedores vendedores={mockVendedores} onEditar={onEditar} onExcluir={onExcluir} />
      )

      expect(screen.getByText('Nome')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Ações')).toBeInTheDocument()
    })

    it('deve exibir dados de todos os vendedores', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(
        <TabelaVendedores vendedores={mockVendedores} onEditar={onEditar} onExcluir={onExcluir} />
      )

      expect(screen.getByText('Ana Silva')).toBeInTheDocument()
      expect(screen.getByText('ana@example.com')).toBeInTheDocument()
      expect(screen.getByText('Bruno Costa')).toBeInTheDocument()
      expect(screen.getByText('bruno@example.com')).toBeInTheDocument()
    })

    it('deve renderizar botões de ação para cada vendedor', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(
        <TabelaVendedores vendedores={mockVendedores} onEditar={onEditar} onExcluir={onExcluir} />
      )

      const botoesEditar = screen.getAllByTitle('Editar vendedor')
      const botoesExcluir = screen.getAllByTitle('Excluir vendedor')

      expect(botoesEditar).toHaveLength(2)
      expect(botoesExcluir).toHaveLength(2)
    })
  })

  // --------------------------------------------------------------------------
  // Actions
  // --------------------------------------------------------------------------
  describe('actions', () => {
    it('deve chamar onEditar ao clicar no botão de editar', async () => {
      const user = userEvent.setup()
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(
        <TabelaVendedores vendedores={mockVendedores} onEditar={onEditar} onExcluir={onExcluir} />
      )

      const botoesEditar = screen.getAllByTitle('Editar vendedor')
      await user.click(botoesEditar[0])

      expect(onEditar).toHaveBeenCalledTimes(1)
      expect(onEditar).toHaveBeenCalledWith(mockVendedores[0])
    })

    it('deve chamar onExcluir ao clicar no botão de excluir', async () => {
      const user = userEvent.setup()
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(
        <TabelaVendedores vendedores={mockVendedores} onEditar={onEditar} onExcluir={onExcluir} />
      )

      const botoesExcluir = screen.getAllByTitle('Excluir vendedor')
      await user.click(botoesExcluir[1])

      expect(onExcluir).toHaveBeenCalledTimes(1)
      expect(onExcluir).toHaveBeenCalledWith(mockVendedores[1])
    })

    it('deve passar o vendedor correto para cada callback', async () => {
      const user = userEvent.setup()
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(
        <TabelaVendedores vendedores={mockVendedores} onEditar={onEditar} onExcluir={onExcluir} />
      )

      const botoesEditar = screen.getAllByTitle('Editar vendedor')
      const botoesExcluir = screen.getAllByTitle('Excluir vendedor')

      // Editar primeiro vendedor
      await user.click(botoesEditar[0])
      expect(onEditar).toHaveBeenLastCalledWith(mockVendedores[0])

      // Excluir segundo vendedor
      await user.click(botoesExcluir[1])
      expect(onExcluir).toHaveBeenLastCalledWith(mockVendedores[1])
    })
  })
})
