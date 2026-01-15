'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Seller } from '@/types/database'
import { useVendedores } from '@/hooks/use-vendedores'
import { TabelaVendedores, TabelaVendedoresSkeleton } from '@/components/vendedores/tabela-vendedores'
import { FormularioVendedor } from '@/components/vendedores/formulario-vendedor'
import { DialogoExcluirVendedor } from '@/components/vendedores/dialogo-excluir-vendedor'
import { Button } from '@/components/ui/button'
import { Plus, Loader2, AlertCircle, RefreshCw } from 'lucide-react'

// ============================================================================
// COMPONENT
// ============================================================================

export default function VendedoresPage(): ReactNode {
  const { vendedores, carregando, erro, criarVendedor, atualizarVendedor, excluirVendedor } =
    useVendedores()

  // Form dialog state
  const [formularioAberto, setFormularioAberto] = useState(false)
  const [vendedorSelecionado, setVendedorSelecionado] = useState<Seller | null>(null)

  // Delete dialog state
  const [dialogoExcluirAberto, setDialogoExcluirAberto] = useState(false)
  const [vendedorParaExcluir, setVendedorParaExcluir] = useState<Seller | null>(null)
  const [excluindo, setExcluindo] = useState(false)

  // Error state for operations
  const [erroOperacao, setErroOperacao] = useState<string | null>(null)

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------
  function handleNovoVendedor(): void {
    setVendedorSelecionado(null)
    setFormularioAberto(true)
    setErroOperacao(null)
  }

  function handleEditarVendedor(vendedor: Seller): void {
    setVendedorSelecionado(vendedor)
    setFormularioAberto(true)
    setErroOperacao(null)
  }

  function handleExcluirVendedor(vendedor: Seller): void {
    setVendedorParaExcluir(vendedor)
    setDialogoExcluirAberto(true)
    setErroOperacao(null)
  }

  function handleFecharFormulario(): void {
    setFormularioAberto(false)
    setVendedorSelecionado(null)
  }

  function handleFecharDialogoExcluir(): void {
    setDialogoExcluirAberto(false)
    setVendedorParaExcluir(null)
  }

  async function handleSalvarVendedor(dados: {
    nome: string
    email: string
  }): Promise<Seller | null> {
    setErroOperacao(null)

    if (vendedorSelecionado) {
      // Update existing
      const resultado = await atualizarVendedor(vendedorSelecionado.id, dados)
      if (!resultado) {
        setErroOperacao('Erro ao atualizar vendedor. Verifique se o email já está em uso.')
      }
      return resultado
    } else {
      // Create new
      const resultado = await criarVendedor(dados)
      if (!resultado) {
        setErroOperacao('Erro ao criar vendedor. Verifique se o email já está em uso.')
      }
      return resultado
    }
  }

  async function handleConfirmarExclusao(): Promise<void> {
    if (!vendedorParaExcluir) return

    setExcluindo(true)
    setErroOperacao(null)

    const sucesso = await excluirVendedor(vendedorParaExcluir.id)

    if (sucesso) {
      handleFecharDialogoExcluir()
    } else {
      setErroOperacao(
        'Não foi possível excluir o vendedor. Verifique se há clientes ou oportunidades vinculados.'
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
        <p className="mt-lg text-body text-gray-500">Carregando vendedores...</p>
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
        <h3 className="mt-lg text-h3 font-medium text-gray-900">Erro ao carregar vendedores</h3>
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
          <h1 className="text-h1 font-semibold text-gray-900">Vendedores</h1>
          <p className="mt-xs text-body text-gray-500">
            Gerencie sua equipe de vendas ({vendedores.length}{' '}
            {vendedores.length === 1 ? 'vendedor' : 'vendedores'})
          </p>
        </div>
        <Button onClick={handleNovoVendedor}>
          <Plus className="h-4 w-4" />
          Adicionar vendedor
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
      <TabelaVendedores
        vendedores={vendedores}
        onEditar={handleEditarVendedor}
        onExcluir={handleExcluirVendedor}
      />

      {/* Create/Edit dialog */}
      <FormularioVendedor
        aberto={formularioAberto}
        onFechar={handleFecharFormulario}
        onSalvar={handleSalvarVendedor}
        vendedor={vendedorSelecionado}
      />

      {/* Delete confirmation dialog */}
      <DialogoExcluirVendedor
        aberto={dialogoExcluirAberto}
        onFechar={handleFecharDialogoExcluir}
        onConfirmar={handleConfirmarExclusao}
        vendedor={vendedorParaExcluir}
        excluindo={excluindo}
      />
    </div>
  )
}
