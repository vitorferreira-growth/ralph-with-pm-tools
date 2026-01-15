import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabelaClientes } from './tabela-clientes'
import type { CustomerWithSeller } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockClientes: CustomerWithSeller[] = [
  {
    id: '1',
    tenant_id: 'tenant-1',
    seller_id: 'seller-1',
    name: 'Ana Silva',
    email: 'ana@example.com',
    whatsapp: '11999999999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zip_code: '01234567',
    birth_date: '1990-01-15',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    seller: {
      id: 'seller-1',
      tenant_id: 'tenant-1',
      name: 'Carlos Vendedor',
      email: 'carlos@example.com',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  },
  {
    id: '2',
    tenant_id: 'tenant-1',
    seller_id: null,
    name: 'Bruno Costa',
    email: 'bruno@example.com',
    whatsapp: null,
    address: null,
    city: null,
    state: null,
    zip_code: null,
    birth_date: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    seller: null,
  },
  {
    id: '3',
    tenant_id: 'tenant-1',
    seller_id: null,
    name: 'Carla Lima',
    email: 'carla@example.com',
    whatsapp: '21988888888',
    address: null,
    city: 'Rio de Janeiro',
    state: null,
    zip_code: null,
    birth_date: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    seller: null,
  },
]

// ============================================================================
// TESTS
// ============================================================================

describe('TabelaClientes', () => {
  // --------------------------------------------------------------------------
  // Empty state
  // --------------------------------------------------------------------------
  describe('empty state', () => {
    it('deve exibir mensagem quando não há clientes', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={[]} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Nenhum cliente cadastrado')).toBeInTheDocument()
      expect(screen.getByText('Comece adicionando seu primeiro cliente')).toBeInTheDocument()
    })

    it('não deve renderizar tabela quando vazia', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={[]} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Table rendering
  // --------------------------------------------------------------------------
  describe('table rendering', () => {
    it('deve renderizar tabela com clientes', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('deve exibir cabeçalhos corretos', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Nome')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('WhatsApp')).toBeInTheDocument()
      expect(screen.getByText('Cidade')).toBeInTheDocument()
      expect(screen.getByText('Vendedor')).toBeInTheDocument()
      expect(screen.getByText('Ações')).toBeInTheDocument()
    })

    it('deve exibir dados de todos os clientes', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Ana Silva')).toBeInTheDocument()
      expect(screen.getByText('ana@example.com')).toBeInTheDocument()
      expect(screen.getByText('Bruno Costa')).toBeInTheDocument()
      expect(screen.getByText('bruno@example.com')).toBeInTheDocument()
      expect(screen.getByText('Carla Lima')).toBeInTheDocument()
      expect(screen.getByText('carla@example.com')).toBeInTheDocument()
    })

    it('deve formatar WhatsApp corretamente', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      // Ana tem whatsapp 11999999999 -> (11) 99999-9999
      expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument()
      // Carla tem whatsapp 21988888888 -> (21) 98888-8888
      expect(screen.getByText('(21) 98888-8888')).toBeInTheDocument()
    })

    it('deve exibir traço quando WhatsApp é null', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      // Bruno não tem whatsapp, deve mostrar —
      const rows = screen.getAllByRole('row')
      const brunoRow = rows.find((row) => row.textContent?.includes('Bruno Costa'))
      expect(brunoRow).toHaveTextContent('—')
    })

    it('deve exibir cidade/estado formatado', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      // Ana tem cidade e estado: São Paulo/SP
      expect(screen.getByText('São Paulo/SP')).toBeInTheDocument()
      // Carla tem só cidade: Rio de Janeiro
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument()
    })

    it('deve exibir nome do vendedor responsável', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      expect(screen.getByText('Carlos Vendedor')).toBeInTheDocument()
    })

    it('deve renderizar botões de ação para cada cliente', () => {
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesEditar = screen.getAllByTitle('Editar cliente')
      const botoesExcluir = screen.getAllByTitle('Excluir cliente')

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

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesEditar = screen.getAllByTitle('Editar cliente')
      await user.click(botoesEditar[0])

      expect(onEditar).toHaveBeenCalledTimes(1)
      expect(onEditar).toHaveBeenCalledWith(mockClientes[0])
    })

    it('deve chamar onExcluir ao clicar no botão de excluir', async () => {
      const user = userEvent.setup()
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesExcluir = screen.getAllByTitle('Excluir cliente')
      await user.click(botoesExcluir[1])

      expect(onExcluir).toHaveBeenCalledTimes(1)
      expect(onExcluir).toHaveBeenCalledWith(mockClientes[1])
    })

    it('deve passar o cliente correto para cada callback', async () => {
      const user = userEvent.setup()
      const onEditar = vi.fn()
      const onExcluir = vi.fn()

      render(<TabelaClientes clientes={mockClientes} onEditar={onEditar} onExcluir={onExcluir} />)

      const botoesEditar = screen.getAllByTitle('Editar cliente')
      const botoesExcluir = screen.getAllByTitle('Excluir cliente')

      // Editar primeiro cliente
      await user.click(botoesEditar[0])
      expect(onEditar).toHaveBeenLastCalledWith(mockClientes[0])

      // Excluir terceiro cliente
      await user.click(botoesExcluir[2])
      expect(onExcluir).toHaveBeenLastCalledWith(mockClientes[2])
    })
  })
})
