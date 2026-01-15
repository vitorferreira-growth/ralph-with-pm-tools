'use client'

import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { OpportunityStage, OpportunityWithRelations, Seller } from '@/types/database'
import { useOportunidades } from '@/hooks/use-oportunidades'
import type { OportunidadeInput, OportunidadeUpdateInput } from '@/hooks/use-oportunidades'
import { useClientes } from '@/hooks/use-clientes'
import { useProdutos } from '@/hooks/use-produtos'
import { useVendedores } from '@/hooks/use-vendedores'
import { KanbanBoard } from '@/components/crm/kanban-board'
import { FormularioOportunidade } from '@/components/crm/formulario-oportunidade'
import { CardOportunidadeCompleto } from '@/components/crm/card-oportunidade'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2, Plus, RefreshCw, AlertCircle, Filter, Kanban } from 'lucide-react'

// ============================================================================
// COMPONENT
// ============================================================================

export default function CrmPage(): ReactNode {
  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------
  const {
    oportunidadesPorEtapa,
    totaisPorEtapa,
    carregando: carregandoOportunidades,
    erro: erroOportunidades,
    buscarOportunidades,
    criarOportunidade,
    atualizarOportunidade,
    moverOportunidade,
    excluirOportunidade,
  } = useOportunidades()

  const { clientes, carregando: carregandoClientes } = useClientes()
  const { produtos, carregando: carregandoProdutos } = useProdutos()
  const { vendedores, carregando: carregandoVendedores } = useVendedores()

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  const [formularioAberto, setFormularioAberto] = useState(false)
  const [oportunidadeSelecionada, setOportunidadeSelecionada] =
    useState<OpportunityWithRelations | null>(null)
  const [detalhesAbertos, setDetalhesAbertos] = useState(false)
  const [filtroVendedor, setFiltroVendedor] = useState<string>('')
  const [erroOperacao, setErroOperacao] = useState<string | null>(null)
  const [confirmacaoDesistencia, setConfirmacaoDesistencia] = useState<{
    oportunidade: OpportunityWithRelations
    novaEtapa: OpportunityStage
  } | null>(null)

  // --------------------------------------------------------------------------
  // Derived state
  // --------------------------------------------------------------------------
  const carregandoDados = carregandoClientes || carregandoProdutos || carregandoVendedores
  const totalOportunidades = Object.values(oportunidadesPorEtapa).reduce(
    (acc, arr) => acc + arr.length,
    0
  )

  // Filter opportunities by seller
  const oportunidadesFiltradas = filtroVendedor
    ? Object.fromEntries(
        Object.entries(oportunidadesPorEtapa).map(([etapa, ops]) => [
          etapa,
          ops.filter((op) => op.seller_id === filtroVendedor),
        ])
      ) as Record<OpportunityStage, OpportunityWithRelations[]>
    : oportunidadesPorEtapa

  const totaisFiltrados = filtroVendedor
    ? Object.fromEntries(
        Object.entries(oportunidadesFiltradas).map(([etapa, ops]) => [
          etapa,
          ops.reduce((sum, op) => sum + op.total_value, 0),
        ])
      ) as Record<OpportunityStage, number>
    : totaisPorEtapa

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------
  const handleCardClick = useCallback((oportunidade: OpportunityWithRelations): void => {
    setOportunidadeSelecionada(oportunidade)
    setDetalhesAbertos(true)
  }, [])

  const handleMoverOportunidade = useCallback(
    async (id: string, novaEtapa: OpportunityStage): Promise<void> => {
      setErroOperacao(null)

      // Find the opportunity
      const oportunidade = Object.values(oportunidadesPorEtapa)
        .flat()
        .find((op) => op.id === id)

      // If moving to "Desistiu", ask for confirmation
      if (novaEtapa === 'closed_lost' && oportunidade) {
        setConfirmacaoDesistencia({ oportunidade, novaEtapa })
        return
      }

      const resultado = await moverOportunidade(id, novaEtapa)
      if (!resultado) {
        setErroOperacao('Erro ao mover oportunidade')
      }
    },
    [moverOportunidade, oportunidadesPorEtapa]
  )

  const handleConfirmarDesistencia = async (): Promise<void> => {
    if (!confirmacaoDesistencia) return

    const resultado = await moverOportunidade(
      confirmacaoDesistencia.oportunidade.id,
      confirmacaoDesistencia.novaEtapa
    )
    if (!resultado) {
      setErroOperacao('Erro ao mover oportunidade')
    }
    setConfirmacaoDesistencia(null)
  }

  const handleCancelarDesistencia = (): void => {
    setConfirmacaoDesistencia(null)
    // Trigger a refresh to restore the card position
    buscarOportunidades()
  }

  const handleNovaOportunidade = useCallback((): void => {
    setOportunidadeSelecionada(null)
    setFormularioAberto(true)
  }, [])

  const handleEditarOportunidade = useCallback((): void => {
    setDetalhesAbertos(false)
    setFormularioAberto(true)
  }, [])

  const handleFecharFormulario = useCallback((): void => {
    setFormularioAberto(false)
    setOportunidadeSelecionada(null)
  }, [])

  const handleFecharDetalhes = useCallback((): void => {
    setDetalhesAbertos(false)
    setOportunidadeSelecionada(null)
  }, [])

  const handleSalvarOportunidade = useCallback(
    async (
      dados: OportunidadeInput | OportunidadeUpdateInput
    ): Promise<OpportunityWithRelations | null> => {
      setErroOperacao(null)

      if (oportunidadeSelecionada) {
        const resultado = await atualizarOportunidade(oportunidadeSelecionada.id, dados)
        if (!resultado) {
          setErroOperacao('Erro ao atualizar oportunidade')
        }
        return resultado
      } else {
        const resultado = await criarOportunidade(dados as OportunidadeInput)
        if (!resultado) {
          setErroOperacao('Erro ao criar oportunidade')
        }
        return resultado
      }
    },
    [oportunidadeSelecionada, criarOportunidade, atualizarOportunidade]
  )

  const handleExcluirOportunidade = useCallback(async (): Promise<void> => {
    if (!oportunidadeSelecionada) return

    setErroOperacao(null)
    const sucesso = await excluirOportunidade(oportunidadeSelecionada.id)
    if (sucesso) {
      setDetalhesAbertos(false)
      setOportunidadeSelecionada(null)
    } else {
      setErroOperacao('Erro ao excluir oportunidade')
    }
  }, [oportunidadeSelecionada, excluirOportunidade])

  const handleFiltroChange = useCallback((value: string): void => {
    setFiltroVendedor(value === '__all__' ? '' : value)
  }, [])

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  if (carregandoOportunidades && totalOportunidades === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Error state
  // --------------------------------------------------------------------------
  if (erroOportunidades && totalOportunidades === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-lg text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div>
          <h2 className="text-h3 font-medium text-gray-900">Erro ao carregar oportunidades</h2>
          <p className="mt-sm text-body text-gray-500">{erroOportunidades}</p>
        </div>
        <Button onClick={() => buscarOportunidades()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-lg flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-md">
          <Kanban className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-h1 font-semibold text-gray-900">CRM</h1>
            <p className="text-body-sm text-gray-500">
              {totalOportunidades} {totalOportunidades === 1 ? 'oportunidade' : 'oportunidades'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-md">
          {/* Filter by seller */}
          <div className="flex items-center gap-sm">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filtroVendedor || '__all__'} onValueChange={handleFiltroChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por vendedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Todos os vendedores</SelectItem>
                {vendedores.map((vendedor: Seller) => (
                  <SelectItem key={vendedor.id} value={vendedor.id}>
                    {vendedor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Add button */}
          <Button onClick={handleNovaOportunidade} disabled={carregandoDados}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Oportunidade
          </Button>
        </div>
      </div>

      {/* Operation error */}
      {erroOperacao && (
        <div className="mb-lg flex items-center gap-sm rounded-lg border border-destructive/20 bg-destructive/10 p-md text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{erroOperacao}</span>
          <button
            onClick={() => setErroOperacao(null)}
            className="ml-auto text-sm hover:underline"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Kanban Board */}
      <div className="min-h-0 flex-1">
        <KanbanBoard
          oportunidadesPorEtapa={oportunidadesFiltradas}
          totaisPorEtapa={totaisFiltrados}
          onMoverOportunidade={handleMoverOportunidade}
          onCardClick={handleCardClick}
          carregando={carregandoOportunidades}
        />
      </div>

      {/* Opportunity Form (create/edit) */}
      <FormularioOportunidade
        aberto={formularioAberto}
        onFechar={handleFecharFormulario}
        onSalvar={handleSalvarOportunidade}
        oportunidade={oportunidadeSelecionada}
        clientes={clientes}
        produtos={produtos}
        vendedores={vendedores}
        carregando={carregandoDados}
      />

      {/* Opportunity Details Sheet */}
      <Sheet open={detalhesAbertos} onOpenChange={(open) => !open && handleFecharDetalhes()}>
        <SheetContent className="flex w-full flex-col sm:max-w-[540px]">
          <SheetHeader>
            <SheetTitle>Detalhes da Oportunidade</SheetTitle>
            <SheetDescription>
              Visualize os detalhes completos desta oportunidade
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-lg">
            {oportunidadeSelecionada && (
              <CardOportunidadeCompleto
                oportunidade={oportunidadeSelecionada}
                onClick={() => {}}
              />
            )}
          </div>
          <div className="flex justify-between border-t pt-lg">
            <Button variant="destructive" onClick={handleExcluirOportunidade}>
              Excluir
            </Button>
            <div className="flex gap-sm">
              <Button variant="outline" onClick={handleFecharDetalhes}>
                Fechar
              </Button>
              <Button onClick={handleEditarOportunidade}>Editar</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Confirmation dialog for "Desistiu" */}
      <AlertDialog
        open={!!confirmacaoDesistencia}
        onOpenChange={(open) => !open && handleCancelarDesistencia()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar desistência</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja marcar esta oportunidade como &quot;Desistiu&quot;?
              {confirmacaoDesistencia?.oportunidade && (
                <span className="mt-sm block font-medium text-gray-900">
                  Cliente: {confirmacaoDesistencia.oportunidade.customer.name}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelarDesistencia}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmarDesistencia}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
