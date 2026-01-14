import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioProduto } from './formulario-produto'
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

const mockProdutoSemCodigo: Product = {
  id: '2',
  tenant_id: 'tenant-1',
  name: 'Produto Sem Código',
  code: null,
  price: 100.0,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

// ============================================================================
// TESTS
// ============================================================================

describe('FormularioProduto', () => {
  // --------------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------------
  describe('rendering', () => {
    it('não deve renderizar quando fechado', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={false} onFechar={onFechar} onSalvar={onSalvar} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('deve renderizar dialog quando aberto', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('deve exibir título "Novo Produto" no modo criação', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      expect(screen.getByText('Novo Produto')).toBeInTheDocument()
      expect(screen.getByText('Preencha as informações do novo produto')).toBeInTheDocument()
    })

    it('deve exibir título "Editar Produto" no modo edição', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioProduto
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          produto={mockProduto}
        />
      )

      expect(screen.getByText('Editar Produto')).toBeInTheDocument()
      expect(screen.getByText('Atualize as informações do produto')).toBeInTheDocument()
    })

    it('deve exibir campos de nome, código e valor', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      expect(screen.getByLabelText('Nome')).toBeInTheDocument()
      expect(screen.getByLabelText('Código (opcional)')).toBeInTheDocument()
      expect(screen.getByLabelText('Valor (R$)')).toBeInTheDocument()
    })

    it('deve preencher campos com dados do produto no modo edição', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioProduto
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          produto={mockProduto}
        />
      )

      expect(screen.getByLabelText('Nome')).toHaveValue('Camiseta Básica')
      expect(screen.getByLabelText('Código (opcional)')).toHaveValue('CAM-001')
      expect(screen.getByLabelText('Valor (R$)')).toHaveValue('49,90')
    })

    it('deve deixar campo código vazio para produto sem código', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioProduto
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          produto={mockProdutoSemCodigo}
        />
      )

      expect(screen.getByLabelText('Código (opcional)')).toHaveValue('')
    })

    it('deve exibir botão "Adicionar" no modo criação', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument()
    })

    it('deve exibir botão "Salvar" no modo edição', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioProduto
          aberto={true}
          onFechar={onFechar}
          onSalvar={onSalvar}
          produto={mockProduto}
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

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Valor (R$)'), '10,00')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve exibir erro quando valor está vazio', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Teste')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      expect(screen.getByText('Valor inválido')).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve exibir erro quando valor é inválido', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Teste')
      await user.type(screen.getByLabelText('Valor (R$)'), 'abc')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      expect(screen.getByText('Valor inválido')).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve exibir erro quando valor é negativo', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Teste')
      await user.type(screen.getByLabelText('Valor (R$)'), '-10')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      expect(screen.getByText('Valor não pode ser negativo')).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve exibir múltiplos erros quando campos obrigatórios estão vazios', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
      expect(screen.getByText('Valor inválido')).toBeInTheDocument()
      expect(onSalvar).not.toHaveBeenCalled()
    })

    it('deve aceitar valor zero', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockProduto)

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Grátis')
      await user.type(screen.getByLabelText('Valor (R$)'), '0')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith({
          nome: 'Produto Grátis',
          codigo: null,
          valor: 0,
        })
      })
    })
  })

  // --------------------------------------------------------------------------
  // Form submission
  // --------------------------------------------------------------------------
  describe('form submission', () => {
    it('deve chamar onSalvar com dados corretos', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockProduto)

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Novo')
      await user.type(screen.getByLabelText('Código (opcional)'), 'PRD-001')
      await user.type(screen.getByLabelText('Valor (R$)'), '99,99')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith({
          nome: 'Produto Novo',
          codigo: 'PRD-001',
          valor: 99.99,
        })
      })
    })

    it('deve enviar código como null quando vazio', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockProduto)

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Sem Código')
      await user.type(screen.getByLabelText('Valor (R$)'), '50,00')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith({
          nome: 'Produto Sem Código',
          codigo: null,
          valor: 50,
        })
      })
    })

    it('deve aceitar valor com ponto como separador decimal', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockProduto)

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto')
      await user.type(screen.getByLabelText('Valor (R$)'), '25.50')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith({
          nome: 'Produto',
          codigo: null,
          valor: 25.5,
        })
      })
    })

    it('deve fechar dialog após salvar com sucesso', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockProduto)

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Novo')
      await user.type(screen.getByLabelText('Valor (R$)'), '99,99')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onFechar).toHaveBeenCalled()
      })
    })

    it('não deve fechar dialog se onSalvar retornar null', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(null)

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), 'Produto Novo')
      await user.type(screen.getByLabelText('Valor (R$)'), '99,99')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalled()
      })

      expect(onFechar).not.toHaveBeenCalled()
    })

    it('deve fazer trim nos dados antes de enviar', async () => {
      const user = userEvent.setup()
      const onFechar = vi.fn()
      const onSalvar = vi.fn().mockResolvedValue(mockProduto)

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.type(screen.getByLabelText('Nome'), '  Produto com Espaços  ')
      await user.type(screen.getByLabelText('Código (opcional)'), '  COD-001  ')
      await user.type(screen.getByLabelText('Valor (R$)'), '  10,00  ')
      await user.click(screen.getByRole('button', { name: 'Adicionar' }))

      await waitFor(() => {
        expect(onSalvar).toHaveBeenCalledWith({
          nome: 'Produto com Espaços',
          codigo: 'COD-001',
          valor: 10,
        })
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

      render(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      await user.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(onFechar).toHaveBeenCalled()
    })

    it('deve limpar campos quando dialog é reaberto', async () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      const { rerender } = render(
        <FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />
      )

      // Fechar dialog
      rerender(<FormularioProduto aberto={false} onFechar={onFechar} onSalvar={onSalvar} />)

      // Reabrir dialog
      rerender(<FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} />)

      expect(screen.getByLabelText('Nome')).toHaveValue('')
      expect(screen.getByLabelText('Código (opcional)')).toHaveValue('')
      expect(screen.getByLabelText('Valor (R$)')).toHaveValue('')
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
        <FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} carregando={true} />
      )

      expect(screen.getByLabelText('Nome')).toBeDisabled()
      expect(screen.getByLabelText('Código (opcional)')).toBeDisabled()
      expect(screen.getByLabelText('Valor (R$)')).toBeDisabled()
    })

    it('deve desabilitar botão de submit quando carregando', () => {
      const onFechar = vi.fn()
      const onSalvar = vi.fn()

      render(
        <FormularioProduto aberto={true} onFechar={onFechar} onSalvar={onSalvar} carregando={true} />
      )

      expect(screen.getByRole('button', { name: 'Adicionar' })).toBeDisabled()
    })
  })
})
