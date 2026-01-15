import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioOportunidade } from './formulario-oportunidade'
import type { CustomerWithSeller, Product, Seller, OpportunityWithRelations } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockClientes: CustomerWithSeller[] = [
  {
    id: 'cliente-1',
    tenant_id: 'tenant-1',
    seller_id: null,
    name: 'João Silva',
    email: 'joao@test.com',
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
    id: 'cliente-2',
    tenant_id: 'tenant-1',
    seller_id: null,
    name: 'Maria Santos',
    email: 'maria@test.com',
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
]

const mockProdutos: Product[] = [
  {
    id: 'produto-1',
    tenant_id: 'tenant-1',
    name: 'Produto A',
    code: 'PA001',
    price: 100.0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'produto-2',
    tenant_id: 'tenant-1',
    name: 'Produto B',
    code: 'PB002',
    price: 250.5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'produto-3',
    tenant_id: 'tenant-1',
    name: 'Produto C',
    code: null,
    price: 75.0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

const mockVendedores: Seller[] = [
  {
    id: 'vendedor-1',
    tenant_id: 'tenant-1',
    name: 'Carlos Vendedor',
    email: 'carlos@test.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'vendedor-2',
    tenant_id: 'tenant-1',
    name: 'Ana Vendedora',
    email: 'ana@test.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

const mockOportunidade: OpportunityWithRelations = {
  id: 'oportunidade-1',
  tenant_id: 'tenant-1',
  customer_id: 'cliente-1',
  seller_id: 'vendedor-1',
  stage: 'negotiation',
  total_value: 350.5,
  notes: 'Notas da oportunidade',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  closed_at: null,
  customer: mockClientes[0],
  seller: mockVendedores[0],
  products: [
    {
      id: 'op-1',
      opportunity_id: 'oportunidade-1',
      product_id: 'produto-1',
      quantity: 2,
      unit_price: 100.0,
      created_at: '2024-01-01T00:00:00Z',
      product: mockProdutos[0],
    },
    {
      id: 'op-2',
      opportunity_id: 'oportunidade-1',
      product_id: 'produto-2',
      quantity: 1,
      unit_price: 150.5,
      created_at: '2024-01-01T00:00:00Z',
      product: mockProdutos[1],
    },
  ],
}

// ============================================================================
// TESTS
// ============================================================================

describe('FormularioOportunidade', () => {
  const mockOnFechar = vi.fn()
  const mockOnSalvar = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockOnSalvar.mockResolvedValue({ id: 'nova-oportunidade' })
  })

  // --------------------------------------------------------------------------
  // Rendering tests
  // --------------------------------------------------------------------------
  describe('Rendering', () => {
    it('should not render when closed', () => {
      render(
        <FormularioOportunidade
          aberto={false}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.queryByText('Nova Oportunidade')).not.toBeInTheDocument()
    })

    it('should render with create title when no oportunidade', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByText('Nova Oportunidade')).toBeInTheDocument()
      expect(
        screen.getByText('Preencha as informações da nova oportunidade de venda')
      ).toBeInTheDocument()
    })

    it('should render with edit title when oportunidade provided', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByText('Editar Oportunidade')).toBeInTheDocument()
      expect(screen.getByText('Atualize as informações da oportunidade')).toBeInTheDocument()
    })

    it('should render all form fields', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByText('Cliente')).toBeInTheDocument()
      expect(screen.getByText('Vendedor responsável')).toBeInTheDocument()
      expect(screen.getByText('Etapa')).toBeInTheDocument()
      expect(screen.getByText('Produtos')).toBeInTheDocument()
      expect(screen.getByText('Observações')).toBeInTheDocument()
    })

    it('should render cancel and submit buttons', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Criar Oportunidade' })).toBeInTheDocument()
    })

    it('should render Salvar button in edit mode', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Pre-filling tests (edit mode)
  // --------------------------------------------------------------------------
  describe('Edit mode pre-filling', () => {
    it('should pre-fill form fields with oportunidade data', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Notes should be pre-filled
      expect(screen.getByPlaceholderText(/notas ou observações/i)).toHaveValue(
        'Notas da oportunidade'
      )

      // Products should be displayed
      expect(screen.getByText('Produto A')).toBeInTheDocument()
      expect(screen.getByText('Produto B')).toBeInTheDocument()
    })

    it('should display product codes when available', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByText('PA001')).toBeInTheDocument()
      expect(screen.getByText('PB002')).toBeInTheDocument()
    })

    it('should display total value', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Total = (100 * 2) + (150.5 * 1) = 350.50
      expect(screen.getByText('R$ 350,50')).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Validation tests
  // --------------------------------------------------------------------------
  describe('Validation', () => {
    it('should show error when cliente not selected', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Criar Oportunidade' }))

      expect(screen.getByText('Selecione um cliente')).toBeInTheDocument()
      expect(mockOnSalvar).not.toHaveBeenCalled()
    })

    it('should show error when no products added', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Select cliente via the trigger
      const clienteTrigger = screen.getByRole('combobox', { name: /cliente/i })
      await user.click(clienteTrigger)
      const clienteOption = await screen.findByText('João Silva (joao@test.com)')
      await user.click(clienteOption)

      await user.click(screen.getByRole('button', { name: 'Criar Oportunidade' }))

      expect(screen.getByText('Adicione pelo menos um produto')).toBeInTheDocument()
      expect(mockOnSalvar).not.toHaveBeenCalled()
    })
  })

  // --------------------------------------------------------------------------
  // Product management tests
  // --------------------------------------------------------------------------
  describe('Product management', () => {
    it('should show empty state when no products selected', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByText('Nenhum produto adicionado')).toBeInTheDocument()
    })

    it('should add product when selecting and clicking add button', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Find the product select and add button
      const addButton = screen.getByRole('button', { name: '' }) // Plus icon button
      const productSelects = screen.getAllByRole('combobox')
      // The product select is after cliente, vendedor, etapa
      const produtoSelect = productSelects[3]

      await user.click(produtoSelect)
      const produtoOption = await screen.findByText(/Produto A - R\$ 100,00/)
      await user.click(produtoOption)

      await user.click(addButton)

      // Product should appear in list
      expect(screen.getByText('Produto A')).toBeInTheDocument()
      expect(screen.getByText('PA001')).toBeInTheDocument()

      // Empty state should be gone
      expect(screen.queryByText('Nenhum produto adicionado')).not.toBeInTheDocument()
    })

    it('should remove product when clicking remove button', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Get delete buttons
      const deleteButtons = screen.getAllByRole('button').filter((btn) => {
        return btn.querySelector('svg.lucide-trash-2')
      })

      expect(deleteButtons.length).toBe(2) // Two products

      // Click first delete button
      await user.click(deleteButtons[0])

      // Should only have one product now
      const remainingDeleteButtons = screen.getAllByRole('button').filter((btn) => {
        return btn.querySelector('svg.lucide-trash-2')
      })
      expect(remainingDeleteButtons.length).toBe(1)
    })

    it('should update quantity when changing input', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Find quantity inputs
      const quantityInputs = screen.getAllByLabelText('Qtd')
      expect(quantityInputs[0]).toHaveValue(2)

      // Change quantity
      await user.clear(quantityInputs[0])
      await user.type(quantityInputs[0], '5')

      expect(quantityInputs[0]).toHaveValue(5)
    })

    it('should calculate total correctly with multiple products', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Total should be (100 * 2) + (150.5 * 1) = 350.50
      expect(screen.getByText('R$ 350,50')).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Form submission tests
  // --------------------------------------------------------------------------
  describe('Form submission', () => {
    it('should call onSalvar with correct data when form is valid', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Salvar' }))

      await waitFor(() => {
        expect(mockOnSalvar).toHaveBeenCalledWith({
          clienteId: 'cliente-1',
          vendedorId: 'vendedor-1',
          etapa: 'negotiation',
          observacoes: 'Notas da oportunidade',
          produtos: [
            { produtoId: 'produto-1', quantidade: 2, precoUnitario: 100 },
            { produtoId: 'produto-2', quantidade: 1, precoUnitario: 150.5 },
          ],
        })
      })
    })

    it('should close dialog on successful save', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Salvar' }))

      await waitFor(() => {
        expect(mockOnFechar).toHaveBeenCalled()
      })
    })

    it('should not close dialog on failed save', async () => {
      const user = userEvent.setup()
      mockOnSalvar.mockResolvedValue(null)

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Salvar' }))

      await waitFor(() => {
        expect(mockOnSalvar).toHaveBeenCalled()
      })

      expect(mockOnFechar).not.toHaveBeenCalled()
    })

    it('should send null for vendedorId when none selected', async () => {
      const user = userEvent.setup()

      const oportunidadeSemVendedor: OpportunityWithRelations = {
        ...mockOportunidade,
        seller_id: null,
        seller: null,
      }

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={oportunidadeSemVendedor}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Salvar' }))

      await waitFor(() => {
        expect(mockOnSalvar).toHaveBeenCalledWith(
          expect.objectContaining({
            vendedorId: null,
          })
        )
      })
    })

    it('should trim observacoes and send null if empty', async () => {
      const user = userEvent.setup()

      const oportunidadeSemNotas: OpportunityWithRelations = {
        ...mockOportunidade,
        notes: '   ',
      }

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={oportunidadeSemNotas}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Salvar' }))

      await waitFor(() => {
        expect(mockOnSalvar).toHaveBeenCalledWith(
          expect.objectContaining({
            observacoes: null,
          })
        )
      })
    })
  })

  // --------------------------------------------------------------------------
  // Cancel button tests
  // --------------------------------------------------------------------------
  describe('Cancel button', () => {
    it('should call onFechar when clicking cancel', async () => {
      const user = userEvent.setup()

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(mockOnFechar).toHaveBeenCalled()
    })
  })

  // --------------------------------------------------------------------------
  // Loading state tests
  // --------------------------------------------------------------------------
  describe('Loading state', () => {
    it('should disable buttons when salvando', async () => {
      const user = userEvent.setup()
      mockOnSalvar.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ id: 'new' }), 1000))
      )

      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Salvar' }))

      // Should show loading text
      expect(screen.getByText('Salvando...')).toBeInTheDocument()

      // Cancel button should be disabled
      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled()
    })

    it('should disable form fields when carregando', () => {
      render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          carregando={true}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // All comboboxes should be disabled
      const comboboxes = screen.getAllByRole('combobox')
      comboboxes.forEach((combobox) => {
        expect(combobox).toBeDisabled()
      })
    })
  })

  // --------------------------------------------------------------------------
  // Reset form tests
  // --------------------------------------------------------------------------
  describe('Form reset', () => {
    it('should reset form fields when reopening', async () => {
      const { rerender } = render(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          oportunidade={mockOportunidade}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Should have products
      expect(screen.getByText('Produto A')).toBeInTheDocument()

      // Close
      rerender(
        <FormularioOportunidade
          aberto={false}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Reopen without oportunidade
      rerender(
        <FormularioOportunidade
          aberto={true}
          onFechar={mockOnFechar}
          onSalvar={mockOnSalvar}
          clientes={mockClientes}
          produtos={mockProdutos}
          vendedores={mockVendedores}
        />
      )

      // Should show empty state
      expect(screen.getByText('Nenhum produto adicionado')).toBeInTheDocument()
    })
  })
})
