import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabelaProdutos } from './tabela-produtos'
import type { Product } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockProdutos: Product[] = [
  {
    id: '1',
    tenant_id: 'tenant-1',
    name: 'Camiseta Básica',
    code: 'CAM-001',
    price: 49.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    tenant_id: 'tenant-1',
    name: 'Calça Jeans',
    code: null,
    price: 129.99,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    tenant_id: 'tenant-1',
    name: 'Tênis Esportivo',
    code: 'TEN-500',
    price: 299.0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

// ============================================================================
// TESTS
// ============================================================================

describe('TabelaProdutos', () => {
  // --------------------------------------------------------------------------
  // Empty state
  // --------------------------------------------------------------------------
  describe('empty state', () => {
    it('deve exibir mensagem quando não há produtos', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={[]} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Nenhum produto cadastrado')).toBeInTheDocument()
      expect(screen.getByText('Adicione produtos para vincular às suas vendas')).toBeInTheDocument()
    })

    it('não deve renderizar tabela quando vazia', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={[]} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Table rendering
  // --------------------------------------------------------------------------
  describe('table rendering', () => {
    it('deve renderizar tabela com produtos', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('deve exibir cabeçalhos corretos', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Código')).toBeInTheDocument()
      expect(screen.getByText('Nome')).toBeInTheDocument()
      expect(screen.getByText('Valor')).toBeInTheDocument()
      expect(screen.getByText('Ações')).toBeInTheDocument()
    })

    it('deve exibir dados de todos os produtos', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Camiseta Básica')).toBeInTheDocument()
      expect(screen.getByText('CAM-001')).toBeInTheDocument()
      expect(screen.getByText('Calça Jeans')).toBeInTheDocument()
      expect(screen.getByText('Tênis Esportivo')).toBeInTheDocument()
      expect(screen.getByText('TEN-500')).toBeInTheDocument()
    })

    it('deve exibir valores formatados em reais', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('R$ 49,90')).toBeInTheDocument()
      expect(screen.getByText('R$ 129,99')).toBeInTheDocument()
      expect(screen.getByText('R$ 299,00')).toBeInTheDocument()
    })

    it('deve exibir "—" para produtos sem código', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('deve renderizar botões de ação para cada produto', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesEditar = screen.getAllByTitle('Editar produto')
      const botoesExcluir = screen.getAllByTitle('Excluir produto')

      expect(botoesEditar).toHaveLength(3)
      expect(botoesExcluir).toHaveLength(3)
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

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesEditar = screen.getAllByTitle('Editar produto')
      await user.click(botoesEditar[0])

      expect(onEditar).toHaveBeenCalledTimes(1)
      expect(onEditar).toHaveBeenCalledWith(mockProdutos[0])
    })

    it('deve chamar onExcluir ao clicar no botão de excluir', async () => {
      const user = userEvent.setup()
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesExcluir = screen.getAllByTitle('Excluir produto')
      await user.click(botoesExcluir[1])

      expect(onExcluir).toHaveBeenCalledTimes(1)
      expect(onExcluir).toHaveBeenCalledWith(mockProdutos[1])
    })

    it('deve passar o produto correto para cada callback', async () => {
      const user = userEvent.setup()
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaProdutos produtos={mockProdutos} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesEditar = screen.getAllByTitle('Editar produto')
      const botoesExcluir = screen.getAllByTitle('Excluir produto')

      // Editar primeiro produto
      await user.click(botoesEditar[0])
      expect(onEditar).toHaveBeenLastCalledWith(mockProdutos[0])

      // Excluir terceiro produto
      await user.click(botoesExcluir[2])
      expect(onExcluir).toHaveBeenLastCalledWith(mockProdutos[2])
    })
  })
})
