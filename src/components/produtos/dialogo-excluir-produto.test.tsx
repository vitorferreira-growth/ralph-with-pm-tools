import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DialogoExcluirProduto } from './dialogo-excluir-produto'
import type { Product } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockProduto: Product = {
  id: '1',
  tenant_id: 'tenant-1',
  name: 'Camiseta Básica',
  code: 'CAM-001',
  price: 49.9,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

// ============================================================================
// TESTS
// ============================================================================

describe('DialogoExcluirProduto', () => {
  // --------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------
  describe('rendering', () => {
    it('não deve renderizar quando produto é null', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={null}
          excluindo={false}
        />
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('não deve renderizar quando fechado', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={false}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
          excluindo={false}
        />
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('deve renderizar dialog quando aberto com produto', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
          excluindo={false}
        />
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('deve exibir título de confirmação', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
          excluindo={false}
        />
      )

      expect(screen.getByText('Excluir produto?')).toBeInTheDocument()
    })

    it('deve exibir nome do produto na mensagem', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
          excluindo={false}
        />
      )

      expect(screen.getByText('Camiseta Básica')).toBeInTheDocument()
      expect(screen.getByText(/Esta ação não pode ser desfeita/)).toBeInTheDocument()
    })

    it('deve exibir botões Cancelar e Excluir', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
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
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
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
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
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
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
          excluindo={true}
        />
      )

      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled()
    })

    it('deve desabilitar botão Excluir quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
          excluindo={true}
        />
      )

      expect(screen.getByRole('button', { name: /excluindo/i })).toBeDisabled()
    })

    it('deve exibir texto "Excluindo..." quando excluindo', () => {
      const onFechar = vi.fn()
      const onConfirmar = vi.fn()

      render(
        <DialogoExcluirProduto
          aberto={true}
          onFechar={onFechar}
          onConfirmar={onConfirmar}
          produto={mockProduto}
          excluindo={true}
        />
      )

      expect(screen.getByText('Excluindo...')).toBeInTheDocument()
    })
  })
})
