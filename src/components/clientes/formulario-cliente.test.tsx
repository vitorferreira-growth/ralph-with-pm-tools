import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioCliente } from './formulario-cliente'
import type { CustomerWithSeller, Seller } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockCliente: CustomerWithSeller = {
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
}

const mockVendedores: Seller[] = [
  {
    id: 'seller-1',
    tenant_id: 'tenant-1',
    name: 'Carlos Vendedor',
    email: 'carlos@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'seller-2',
    tenant_id: 'tenant-1',
    name: 'Maria Vendedora',
    email: 'maria@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

// ============================================================================
// TESTS
// ============================================================================

describe('FormularioCliente', () => {
  // --------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------
  describe('rendering', () => {
    it('não deve renderizar quando fechado', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={false}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('deve renderizar dialog quando aberto', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('deve exibir título "Novo Cliente" no modo criação', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByText('Novo Cliente')).toBeInTheDocument()
      expect(screen.getByText('Preencha as informações do novo cliente')).toBeInTheDocument()
    })

    it('deve exibir título "Editar Cliente" no modo edição', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
          cliente={mockCliente}
        />
      )

      expect(screen.getByText('Editar Cliente')).toBeInTheDocument()
      expect(screen.getByText('Atualize as informações do cliente')).toBeInTheDocument()
    })

    it('deve exibir todos os campos do formulário', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByLabelText(/Nome/)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
      expect(screen.getByLabelText('WhatsApp')).toBeInTheDocument()
      expect(screen.getByLabelText('Endereço')).toBeInTheDocument()
      expect(screen.getByLabelText('Cidade')).toBeInTheDocument()
      expect(screen.getByLabelText('Estado')).toBeInTheDocument()
      expect(screen.getByLabelText('CEP')).toBeInTheDocument()
      expect(screen.getByLabelText('Data de nascimento')).toBeInTheDocument()
      expect(screen.getByLabelText('Vendedor responsável')).toBeInTheDocument()
    })

    it('deve preencher campos com dados do cliente no modo edição', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
          cliente={mockCliente}
        />
      )

      expect(screen.getByLabelText(/Nome/)).toHaveValue('Ana Silva')
      expect(screen.getByLabelText(/Email/)).toHaveValue('ana@example.com')
      expect(screen.getByLabelText('WhatsApp')).toHaveValue('(11) 99999-9999')
      expect(screen.getByLabelText('Endereço')).toHaveValue('Rua das Flores, 123')
      expect(screen.getByLabelText('Cidade')).toHaveValue('São Paulo')
      expect(screen.getByLabelText('CEP')).toHaveValue('01234-567')
      expect(screen.getByLabelText('Data de nascimento')).toHaveValue('1990-01-15')
    })

    it('deve exibir botão "Adicionar" no modo criação', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument()
    })

    it('deve exibir botão "Salvar" no modo edição', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
          cliente={mockCliente}
        />
      )

      expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------
  describe('validation', () => {
    it('deve exibir erro quando nome está vazio', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/^Email/), 'teste@example.com')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      // Check for validation error (Zod error message)
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve exibir erro quando email está vazio', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/^Nome/), 'João Silva')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      // Check for validation error (Zod error message)
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve exibir múltiplos erros quando campos obrigatórios estão vazios', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      // Should show errors for both required fields
      const errors = screen.getAllByText(/obrigatório|mínimo/i)
      expect(errors.length).toBeGreaterThanOrEqual(2)
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve validar formato de CEP inválido', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/^Nome/), 'João Silva')
      await user.type(screen.getByLabelText(/^Email/), 'joao@example.com')
      await user.type(screen.getByLabelText('CEP'), '123')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      // Check for validation error (Zod error message)
      expect(screen.getByText(/CEP inválido/i)).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })
  })

  // --------------------------------------------------------------------------
  // Form submission
  // --------------------------------------------------------------------------
  describe('form submission', () => {
    it('deve chamar onSalvar com dados mínimos corretos', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockCliente)

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/Nome/), 'João Silva')
      await user.type(screen.getByLabelText(/Email/), 'Joao@Example.com')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith(
          expect.objectContaining({
            nome: 'João Silva',
            email: 'joao@example.com', // Lowercase
          })
        )
      })
    })

    it('deve fechar dialog após salvar com sucesso', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockCliente)

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/Nome/), 'João Silva')
      await user.type(screen.getByLabelText(/Email/), 'joao@example.com')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onFechar).toHaveBeenCalled()
      })
    })

    it('não deve fechar dialog se onSalvar retornar null', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(null)

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/Nome/), 'João Silva')
      await user.type(screen.getByLabelText(/Email/), 'joao@example.com')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalled()
      })

      expect(onFechar).not.toHaveBeenCalled()
    })

    it('deve fazer trim nos dados antes de enviar', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockCliente)

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/Nome/), '  João Silva  ')
      await user.type(screen.getByLabelText(/Email/), '  joao@example.com  ')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith(
          expect.objectContaining({
            nome: 'João Silva',
            email: 'joao@example.com',
          })
        )
      })
    })

    it('deve formatar CEP removendo caracteres não numéricos', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockCliente)

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/Nome/), 'João Silva')
      await user.type(screen.getByLabelText(/Email/), 'joao@example.com')
      await user.type(screen.getByLabelText('CEP'), '01234-567')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith(
          expect.objectContaining({
            cep: '01234567',
          })
        )
      })
    })

    it('deve enviar campos opcionais como null quando vazios', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockCliente)

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.type(screen.getByLabelText(/Nome/), 'João Silva')
      await user.type(screen.getByLabelText(/Email/), 'joao@example.com')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith(
          expect.objectContaining({
            whatsapp: null,
            endereco: null,
            cidade: null,
            estado: null,
            cep: null,
            dataNascimento: null,
            vendedorId: null,
          })
        )
      })
    })
  })

  // --------------------------------------------------------------------------
  // Dialog actions
  // --------------------------------------------------------------------------
  describe('dialog actions', () => {
    it('deve chamar onFechar ao clicar em Cancelar', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(onFechar).toHaveBeenCalled()
    })

    it('deve limpar campos quando dialog é reaberto', async () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      const { rerender } = render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      // Fechar dialog
      rerender(
        <FormularioCliente
          aberto={false}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      // Reabrir dialog
      rerender(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
        />
      )

      expect(screen.getByLabelText(/Nome/)).toHaveValue('')
      expect(screen.getByLabelText(/Email/)).toHaveValue('')
    })
  })

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  describe('loading state', () => {
    it('deve desabilitar campos quando carregando', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
          carregando={true}
        />
      )

      expect(screen.getByLabelText(/Nome/)).toBeDisabled()
      expect(screen.getByLabelText(/Email/)).toBeDisabled()
      expect(screen.getByLabelText('WhatsApp')).toBeDisabled()
      expect(screen.getByLabelText('Endereço')).toBeDisabled()
      expect(screen.getByLabelText('Cidade')).toBeDisabled()
      expect(screen.getByLabelText('CEP')).toBeDisabled()
      expect(screen.getByLabelText('Data de nascimento')).toBeDisabled()
    })

    it('deve desabilitar botão de submit quando carregando', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
          carregando={true}
        />
      )

      expect(screen.getByRole('button', { name: 'Adicionar' })).toBeDisabled()
    })
  })

  // --------------------------------------------------------------------------
  // Client without optional fields
  // --------------------------------------------------------------------------
  describe('client without optional fields', () => {
    it('deve preencher campos vazios corretamente no modo edição', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      const clienteMinimo: CustomerWithSeller = {
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
      }

      render(
        <FormularioCliente
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          vendedores={mockVendedores}
          cliente={clienteMinimo}
        />
      )

      expect(screen.getByLabelText(/Nome/)).toHaveValue('Bruno Costa')
      expect(screen.getByLabelText(/Email/)).toHaveValue('bruno@example.com')
      expect(screen.getByLabelText('WhatsApp')).toHaveValue('')
      expect(screen.getByLabelText('Endereço')).toHaveValue('')
      expect(screen.getByLabelText('Cidade')).toHaveValue('')
      expect(screen.getByLabelText('CEP')).toHaveValue('')
      expect(screen.getByLabelText('Data de nascimento')).toHaveValue('')
    })
  })
})
