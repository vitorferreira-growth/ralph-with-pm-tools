import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DialogoExcluirCliente } from './dialogo-excluir-cliente'
import type { CustomerWithSeller } from '@/types/database'

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

// ============================================================================
// TESTS
// ============================================================================

describe('DialogoExcluirCliente', () => {
  // --------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------
  describe('rendering', () => {
    it('não deve renderizar quando cliente é null', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={null}
          excluindo={false}
        />
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('deve renderizar dialog quando aberto com cliente', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={false}
        />
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('deve exibir título correto', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={false}
        />
      )

      expect(screen.getByText('Excluir cliente?')).toBeInTheDocument()
    })

    it('deve exibir mensagem de confirmação com nome do cliente', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={false}
        />
      )

      expect(screen.getByText(/Tem certeza que deseja excluir/)).toBeInTheDocument()
      expect(screen.getByText('Ana Silva')).toBeInTheDocument()
      expect(screen.getByText(/Esta ação não pode ser desfeita/)).toBeInTheDocument()
    })

    it('deve exibir botões de Cancelar e Excluir', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={false}
        />
      )

      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Actions
  // --------------------------------------------------------------------------
  describe('actions', () => {
    it('deve chamar onFechar ao clicar em Cancelar', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={false}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(onFechar).toHaveBeenCalledTimes(1)
    })

    it('deve chamar onConfirmar ao clicar em Excluir', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={false}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Excluir' }))

      expect(onConfirmar).toHaveBeenCalledTimes(1)
    })
  })

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  describe('loading state', () => {
    it('deve exibir "Excluindo..." quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={true}
        />
      )

      expect(screen.getByText('Excluindo...')).toBeInTheDocument()
    })

    it('deve desabilitar botão Cancelar quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={true}
        />
      )

      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled()
    })

    it('deve desabilitar botão de Excluir quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirCliente
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          cliente={mockCliente}
          excluindo={true}
        />
      )

      expect(screen.getByRole('button', { name: /Excluindo/ })).toBeDisabled()
    })
  })
})
