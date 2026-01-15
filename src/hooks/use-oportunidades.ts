'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import type { OpportunityStage, OpportunityWithRelations } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

// Tipo para produto na criação/atualização de oportunidade
export interface ProdutoOportunidadeInput {
  produtoId: string
  quantidade?: number
  precoUnitario: number
}

export interface OportunidadeInput {
  clienteId: string
  vendedorId?: string | null
  etapa?: OpportunityStage
  observacoes?: string | null
  produtos?: ProdutoOportunidadeInput[]
}

export interface OportunidadeUpdateInput {
  clienteId?: string
  vendedorId?: string | null
  etapa?: OpportunityStage
  observacoes?: string | null
  produtos?: ProdutoOportunidadeInput[]
}

interface FiltrosOportunidades {
  vendedorId?: string
  etapa?: OpportunityStage
  clienteId?: string
}

interface UseOportunidadesRetorno {
  oportunidades: OpportunityWithRelations[]
  carregando: boolean
  erro: string | null
  buscarOportunidades: (filtros?: FiltrosOportunidades) => Promise<void>
  criarOportunidade: (dados: OportunidadeInput) => Promise<OpportunityWithRelations | null>
  atualizarOportunidade: (
    id: string,
    dados: OportunidadeUpdateInput
  ) => Promise<OpportunityWithRelations | null>
  moverOportunidade: (
    id: string,
    novaEtapa: OpportunityStage
  ) => Promise<OpportunityWithRelations | null>
  excluirOportunidade: (id: string) => Promise<boolean>
  oportunidadesPorEtapa: Record<OpportunityStage, OpportunityWithRelations[]>
  totaisPorEtapa: Record<OpportunityStage, number>
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function agruparPorEtapa(
  oportunidades: OpportunityWithRelations[]
): Record<OpportunityStage, OpportunityWithRelations[]> {
  const etapas: OpportunityStage[] = [
    'first_contact',
    'proposal',
    'negotiation',
    'awaiting_payment',
    'closed_won',
    'closed_lost',
  ]

  const agrupado = {} as Record<OpportunityStage, OpportunityWithRelations[]>
  for (const etapa of etapas) {
    agrupado[etapa] = []
  }

  for (const oportunidade of oportunidades) {
    if (agrupado[oportunidade.stage]) {
      agrupado[oportunidade.stage].push(oportunidade)
    }
  }

  return agrupado
}

function calcularTotaisPorEtapa(
  oportunidades: OpportunityWithRelations[]
): Record<OpportunityStage, number> {
  const etapas: OpportunityStage[] = [
    'first_contact',
    'proposal',
    'negotiation',
    'awaiting_payment',
    'closed_won',
    'closed_lost',
  ]

  const totais = {} as Record<OpportunityStage, number>
  for (const etapa of etapas) {
    totais[etapa] = 0
  }

  for (const oportunidade of oportunidades) {
    if (totais[oportunidade.stage] !== undefined) {
      totais[oportunidade.stage] += oportunidade.total_value
    }
  }

  return totais
}

// ============================================================================
// HOOK
// ============================================================================

export function useOportunidades(): UseOportunidadesRetorno {
  const [oportunidades, setOportunidades] = useState<OpportunityWithRelations[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  // --------------------------------------------------------------------------
  // Buscar oportunidades
  // --------------------------------------------------------------------------
  const buscarOportunidades = useCallback(async (filtros?: FiltrosOportunidades): Promise<void> => {
    try {
      setCarregando(true)
      setErro(null)

      // Monta query string com filtros
      const params = new URLSearchParams()
      if (filtros?.vendedorId) {
        params.set('vendedor_id', filtros.vendedorId)
      }
      if (filtros?.etapa) {
        params.set('etapa', filtros.etapa)
      }
      if (filtros?.clienteId) {
        params.set('cliente_id', filtros.clienteId)
      }

      const url = `/api/oportunidades${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao buscar oportunidades')
      }

      setOportunidades(data.oportunidades || [])
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao buscar oportunidades'
      setErro(mensagem)
      console.error('useOportunidades - buscarOportunidades:', error)
    } finally {
      setCarregando(false)
    }
  }, [])

  // --------------------------------------------------------------------------
  // Criar oportunidade
  // --------------------------------------------------------------------------
  const criarOportunidade = useCallback(
    async (dados: OportunidadeInput): Promise<OpportunityWithRelations | null> => {
      try {
        setErro(null)

        const response = await fetch('/api/oportunidades', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.erro || 'Erro ao criar oportunidade')
        }

        // Adiciona a nova oportunidade à lista
        setOportunidades((prev) => [data.oportunidade, ...prev])

        return data.oportunidade
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao criar oportunidade'
        setErro(mensagem)
        console.error('useOportunidades - criarOportunidade:', error)
        return null
      }
    },
    []
  )

  // --------------------------------------------------------------------------
  // Atualizar oportunidade (full update)
  // --------------------------------------------------------------------------
  const atualizarOportunidade = useCallback(
    async (
      id: string,
      dados: OportunidadeUpdateInput
    ): Promise<OpportunityWithRelations | null> => {
      try {
        setErro(null)

        const response = await fetch(`/api/oportunidades/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.erro || 'Erro ao atualizar oportunidade')
        }

        // Atualiza a oportunidade na lista
        setOportunidades((prev) => prev.map((o) => (o.id === id ? data.oportunidade : o)))

        return data.oportunidade
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao atualizar oportunidade'
        setErro(mensagem)
        console.error('useOportunidades - atualizarOportunidade:', error)
        return null
      }
    },
    []
  )

  // --------------------------------------------------------------------------
  // Mover oportunidade (drag & drop - apenas etapa via PATCH)
  // --------------------------------------------------------------------------
  const moverOportunidade = useCallback(
    async (id: string, novaEtapa: OpportunityStage): Promise<OpportunityWithRelations | null> => {
      // Otimistic update: atualiza localmente primeiro para UI fluida
      const oportunidadeAnterior = oportunidades.find((o) => o.id === id)
      if (!oportunidadeAnterior) {
        setErro('Oportunidade não encontrada')
        return null
      }

      // Atualiza localmente de forma otimista
      setOportunidades((prev) =>
        prev.map((o) => (o.id === id ? { ...o, stage: novaEtapa } : o))
      )

      try {
        setErro(null)

        const response = await fetch(`/api/oportunidades/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ etapa: novaEtapa }),
        })

        const data = await response.json()

        if (!response.ok) {
          // Rollback em caso de erro da API
          setOportunidades((prev) =>
            prev.map((o) => (o.id === id ? oportunidadeAnterior : o))
          )
          throw new Error(data.erro || 'Erro ao mover oportunidade')
        }

        // Atualiza com dados do servidor (inclui closed_at atualizado se necessário)
        setOportunidades((prev) => prev.map((o) => (o.id === id ? data.oportunidade : o)))

        return data.oportunidade
      } catch (error) {
        // Rollback em caso de erro de rede ou outro erro
        setOportunidades((prev) =>
          prev.map((o) => (o.id === id ? oportunidadeAnterior : o))
        )
        const mensagem = error instanceof Error ? error.message : 'Erro ao mover oportunidade'
        setErro(mensagem)
        console.error('useOportunidades - moverOportunidade:', error)
        return null
      }
    },
    [oportunidades]
  )

  // --------------------------------------------------------------------------
  // Excluir oportunidade
  // --------------------------------------------------------------------------
  const excluirOportunidade = useCallback(async (id: string): Promise<boolean> => {
    try {
      setErro(null)

      const response = await fetch(`/api/oportunidades/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao excluir oportunidade')
      }

      // Remove a oportunidade da lista
      setOportunidades((prev) => prev.filter((o) => o.id !== id))

      return true
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao excluir oportunidade'
      setErro(mensagem)
      console.error('useOportunidades - excluirOportunidade:', error)
      return false
    }
  }, [])

  // --------------------------------------------------------------------------
  // Computed values (memoized for performance)
  // --------------------------------------------------------------------------
  const oportunidadesPorEtapa = useMemo(
    () => agruparPorEtapa(oportunidades),
    [oportunidades]
  )

  const totaisPorEtapa = useMemo(
    () => calcularTotaisPorEtapa(oportunidades),
    [oportunidades]
  )

  // --------------------------------------------------------------------------
  // Carrega oportunidades na montagem
  // --------------------------------------------------------------------------
  useEffect(() => {
    buscarOportunidades()
  }, [buscarOportunidades])

  return {
    oportunidades,
    carregando,
    erro,
    buscarOportunidades,
    criarOportunidade,
    atualizarOportunidade,
    moverOportunidade,
    excluirOportunidade,
    oportunidadesPorEtapa,
    totaisPorEtapa,
  }
}
