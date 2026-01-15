'use client'

import { useState, useCallback } from 'react'
import type { ReactNode, ChangeEvent } from 'react'
import type { CustomerWithSeller } from '@/types/database'
import { useClientes } from '@/hooks/use-clientes'
import { useVendedores } from '@/hooks/use-vendedores'
import { TabelaClientes, TabelaClientesSkeleton } from '@/components/clientes/tabela-clientes'
import { FormularioCliente } from '@/components/clientes/formulario-cliente'
import { DialogoExcluirCliente } from '@/components/clientes/dialogo-excluir-cliente'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Loader2, AlertCircle, RefreshCw, Search } from 'lucide-react'

// ============================================================================
// COMPONENT
// ============================================================================

export default function ClientesPage(): ReactNode {
  const {
    clientes,
    carregando,
    erro,
    buscarClientes,
    criarCliente,
    atualizarCliente,
    excluirCliente,
  } = useClientes()

  const { vendedores, carregando: carregandoVendedores } = useVendedores()

  // Search state
  const [termoBusca, setTermoBusca] = useState('')

  // Form dialog state
  const [formularioAberto, setFormularioAberto] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState<CustomerWithSeller | null>(null)

  // Delete dialog state
  const [dialogoExcluirAberto, setDialogoExcluirAberto] = useState(false)
  const [clienteParaExcluir, setClienteParaExcluir] = useState<CustomerWithSeller | null>(null)
  const [excluindo, setExcluindo] = useState(false)

  // Error state for operations
  const [erroOperacao, setErroOperacao] = useState<string | null>(null)

  // --------------------------------------------------------------------------
  // Search handler with debounce
  // --------------------------------------------------------------------------
  const handleBusca = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const valor = event.target.value
      setTermoBusca(valor)
      // Buscar com filtro
      buscarClientes({ busca: valor })
    },
    [buscarClientes]
  )

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------
  function handleNovoCliente(): void {
    setClienteSelecionado(null)
    setFormularioAberto(true)
    setErroOperacao(null)
  }

  function handleEditarCliente(cliente: CustomerWithSeller): void {
    setClienteSelecionado(cliente)
    setFormularioAberto(true)
    setErroOperacao(null)
  }

  function handleExcluirCliente(cliente: CustomerWithSeller): void {
    setClienteParaExcluir(cliente)
    setDialogoExcluirAberto(true)
    setErroOperacao(null)
  }

  function handleFecharFormulario(): void {
    setFormularioAberto(false)
    setClienteSelecionado(null)
  }

  function handleFecharDialogoExcluir(): void {
    setDialogoExcluirAberto(false)
    setClienteParaExcluir(null)
  }

  async function handleSalvarCliente(dados: {
    nome: string
    email: string
    whatsapp?: string | null
    endereco?: string | null
    cidade?: string | null
    estado?: string | null
    cep?: string | null
    dataNascimento?: string | null
    vendedorId?: string | null
  }): Promise<CustomerWithSeller | null> {
    setErroOperacao(null)

    if (clienteSelecionado) {
      // Update existing
      const resultado = await atualizarCliente(clienteSelecionado.id, dados)
      if (!resultado) {
        setErroOperacao('Erro ao atualizar cliente. Verifique se o email já está em uso.')
      }
      return resultado
    } else {
      // Create new
      const resultado = await criarCliente(dados)
      if (!resultado) {
        setErroOperacao('Erro ao criar cliente. Verifique se o email já está em uso.')
      }
      return resultado
    }
  }

  async function handleConfirmarExclusao(): Promise<void> {
    if (!clienteParaExcluir) return

    setExcluindo(true)
    setErroOperacao(null)

    const sucesso = await excluirCliente(clienteParaExcluir.id)

    if (sucesso) {
      handleFecharDialogoExcluir()
    } else {
      setErroOperacao(
        'Não foi possível excluir o cliente. Verifique se há oportunidades vinculadas.'
      )
    }

    setExcluindo(false)
  }

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  if (carregando && clientes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-lg text-body text-gray-500">Carregando clientes...</p>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Error state
  // --------------------------------------------------------------------------
  if (erro && clientes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="mt-lg text-h3 font-medium text-gray-900">Erro ao carregar clientes</h3>
        <p className="mt-sm text-body text-gray-500">{erro}</p>
        <Button variant="outline" className="mt-lg" onClick={() => window.location.reload()}>
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
          <h1 className="text-h1 font-semibold text-gray-900">Clientes</h1>
          <p className="mt-xs text-body text-gray-500">
            Gerencie sua base de clientes ({clientes.length}{' '}
            {clientes.length === 1 ? 'cliente' : 'clientes'})
          </p>
        </div>
        <Button onClick={handleNovoCliente}>
          <Plus className="h-4 w-4" />
          Adicionar cliente
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={termoBusca}
          onChange={handleBusca}
          className="pl-10"
        />
      </div>

      {/* Operation error toast */}
      {erroOperacao && (
        <div className="flex items-center gap-sm rounded-lg border border-destructive/20 bg-destructive/10 p-md text-body text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {erroOperacao}
        </div>
      )}

      {/* Table */}
      <TabelaClientes
        clientes={clientes}
        onEditar={handleEditarCliente}
        onExcluir={handleExcluirCliente}
      />

      {/* Create/Edit dialog */}
      <FormularioCliente
        aberto={formularioAberto}
        onFechar={handleFecharFormulario}
        onSalvar={handleSalvarCliente}
        cliente={clienteSelecionado}
        vendedores={vendedores}
        carregando={carregandoVendedores}
      />

      {/* Delete confirmation dialog */}
      <DialogoExcluirCliente
        aberto={dialogoExcluirAberto}
        onFechar={handleFecharDialogoExcluir}
        onConfirmar={handleConfirmarExclusao}
        cliente={clienteParaExcluir}
        excluindo={excluindo}
      />
    </div>
  )
}
