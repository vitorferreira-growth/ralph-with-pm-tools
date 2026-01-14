import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DialogoExcluirVendedor } from './dialogo-excluir-vendedor'
import type { Seller } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockVendedor: Seller = {
  id: '1',
  tenant_id: 'tenant-1',
  name: 'Ana Silva',
  email: 'ana@example.com',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

// ============================================================================
// TESTS
// ============================================================================

describe('DialogoExcluirVendedor', () => {
  // --------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------
  describe('rendering', () => {
    it('não deve renderizar quando vendedor é null', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={null}
          excluindo={false}
        />
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('não deve renderizar quando fechado', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={false}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={false}
        />
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('deve renderizar dialog quando aberto com vendedor', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={false}
        />
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('deve exibir título de confirmação', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={false}
        />
      )

      expect(screen.getByText('Excluir vendedor?')).toBeInTheDocument()
    })

    it('deve exibir nome do vendedor na mensagem', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={false}
        />
      )

      expect(screen.getByText('Ana Silva')).toBeInTheDocument()
      expect(
        screen.getByText(/Esta ação não pode ser desfeita/)
      ).toBeInTheDocument()
    })

    it('deve exibir botões Cancelar e Excluir', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
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
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={false}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(onFechar).toHaveBeenCalled()
    })

    it('deve chamar onConfirmar ao clicar em Excluir', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={false}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Excluir' }))

      expect(onConfirmar).toHaveBeenCalled()
    })
  })

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  describe('loading state', () => {
    it('deve desabilitar botão Cancelar quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={true}
        />
      )

      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled()
    })

    it('deve desabilitar botão Excluir quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={true}
        />
      )

      expect(screen.getByRole('button', { name: /excluindo/i })).toBeDisabled()
    })

    it('deve exibir texto "Excluindo..." quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirVendedor
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          vendedor={mockVendedor}
          excluindo={true}
        />
      )

      expect(screen.getByText('Excluindo...')).toBeInTheDocument()
    })
  })
})
