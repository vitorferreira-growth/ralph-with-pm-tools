'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '@/types/database'
import { useProdutos } from '@/hooks/use-produtos'
import { TabelaProdutos, TabelaProdutosSkeleton } from '@/components/produtos/tabela-produtos'
import { FormularioProduto } from '@/components/produtos/formulario-produto'
import { DialogoExcluirProduto } from '@/components/produtos/dialogo-excluir-produto'
import { Button } from '@/components/ui/button'
import { Plus, AlertCircle, RefreshCw } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

// ============================================================================
// COMPONENT
// ============================================================================

export default function ProdutosPage(): ReactNode {
  const { produtos, carregando, erro, criarProduto, atualizarProduto, excluirProduto } =
    useProdutos()

  // Form dialog state
  const [formularioAberto, setFormularioAberto] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Product | null>(null)

  // Delete dialog state
  const [dialogoExcluirAberto, setDialogoExcluirAberto] = useState(false)
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Product | null>(null)
  const [excluindo, setExcluindo] = useState(false)

  // Error state for operations
  const [erroOperacao, setErroOperacao] = useState<string | null>(null)

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------
  function handleNovoProduto(): void {
    setProdutoSelecionado(null)
    setFormularioAberto(true)
    setErroOperacao(null)
  }

  function handleEditarProduto(produto: Product): void {
    setProdutoSelecionado(produto)
    setFormularioAberto(true)
    setErroOperacao(null)
  }

  function handleExcluirProduto(produto: Product): void {
    setProdutoParaExcluir(produto)
    setDialogoExcluirAberto(true)
    setErroOperacao(null)
  }

  function handleFecharFormulario(): void {
    setFormularioAberto(false)
    setProdutoSelecionado(null)
  }

  function handleFecharDialogoExcluir(): void {
    setDialogoExcluirAberto(false)
    setProdutoParaExcluir(null)
  }

  async function handleSalvarProduto(dados: {
    nome: string
    codigo?: string | null
    valor: number
  }): Promise<Product | null> {
    setErroOperacao(null)

    if (produtoSelecionado) {
      // Update existing
      const resultado = await atualizarProduto(produtoSelecionado.id, dados)
      if (!resultado) {
        setErroOperacao('Erro ao atualizar produto. Verifique se o código já está em uso.')
      }
      return resultado
    } else {
      // Create new
      const resultado = await criarProduto(dados)
      if (!resultado) {
        setErroOperacao('Erro ao criar produto. Verifique se o código já está em uso.')
      }
      return resultado
    }
  }

  async function handleConfirmarExclusao(): Promise<void> {
    if (!produtoParaExcluir) return

    setExcluindo(true)
    setErroOperacao(null)

    const sucesso = await excluirProduto(produtoParaExcluir.id)

    if (sucesso) {
      handleFecharDialogoExcluir()
    } else {
      setErroOperacao(
        'Não foi possível excluir o produto. Verifique se há oportunidades vinculadas.'
      )
    }

    setExcluindo(false)
  }

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  if (carregando) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-lg text-body text-gray-500">Carregando produtos...</p>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Error state
  // --------------------------------------------------------------------------
  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="mt-lg text-h3 font-medium text-gray-900">Erro ao carregar produtos</h3>
        <p className="mt-sm text-body text-gray-500">{erro}</p>
        <Button
          variant="outline"
          className="mt-lg"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="mr-sm h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-semibold text-gray-900">Produtos</h1>
          <p className="mt-xs text-body text-gray-500">
            Gerencie seu catálogo de produtos ({produtos.length}{' '}
            {produtos.length === 1 ? 'produto' : 'produtos'})
          </p>
        </div>
        <Button onClick={handleNovoProduto}>
          <Plus className="h-4 w-4" />
          Adicionar produto
        </Button>
      </div>

      {/* Operation error toast */}
      {erroOperacao && (
        <div className="flex items-center gap-sm rounded-lg border border-destructive/20 bg-destructive/10 p-md text-body text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {erroOperacao}
        </div>
      )}

      {/* Table */}
      <TabelaProdutos
        produtos={produtos}
        onEditar={handleEditarProduto}
        onExcluir={handleExcluirProduto}
      />

      {/* Create/Edit dialog */}
      <FormularioProduto
        aberto={formularioAberto}
        onFechar={handleFecharFormulario}
        onSalvar={handleSalvarProduto}
        produto={produtoSelecionado}
      />

      {/* Delete confirmation dialog */}
      <DialogoExcluirProduto
        aberto={dialogoExcluirAberto}
        onFechar={handleFecharDialogoExcluir}
        onConfirmar={handleConfirmarExclusao}
        produto={produtoParaExcluir}
        excluindo={excluindo}
      />
    </div>
  )
}
