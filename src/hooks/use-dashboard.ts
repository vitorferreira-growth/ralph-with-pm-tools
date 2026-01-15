'use client'

import { useState, useCallback, useEffect } from 'react'
import type { DashboardKPIs } from '@/app/api/dashboard/kpis/route'
import type { DashboardGraficos } from '@/app/api/dashboard/graficos/route'

// ============================================================================
// TYPES
// ============================================================================

export type PeriodoDashboard = 'mes' | 'trimestre' | 'ano'

interface FiltrosDashboard {
  periodo?: PeriodoDashboard
  meses?: number // Para graficos: quantidade de meses no historico
}

interface UseDashboardRetorno {
  kpis: DashboardKPIs | null
  graficos: DashboardGraficos | null
  carregando: boolean
  carregandoKpis: boolean
  carregandoGraficos: boolean
  erro: string | null
  periodo: PeriodoDashboard
  setPeriodo: (periodo: PeriodoDashboard) => void
  buscarDados: (filtros?: FiltrosDashboard) => Promise<void>
  buscarKpis: (filtros?: FiltrosDashboard) => Promise<void>
  buscarGraficos: (filtros?: FiltrosDashboard) => Promise<void>
}

// ============================================================================
// HELPER: KPIs vazios para estado inicial
// ============================================================================

const KPIS_VAZIOS: DashboardKPIs = {
  totalVendas: {
    valor: 0,
    quantidade: 0,
  },
  ticketMedio: 0,
  emNegociacao: {
    valor: 0,
    quantidade: 0,
  },
  desistencias: {
    valor: 0,
    quantidade: 0,
  },
}

// ============================================================================
// HOOK
// ============================================================================

export function useDashboard(): UseDashboardRetorno {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null)
  const [graficos, setGraficos] = useState<DashboardGraficos | null>(null)
  const [carregandoKpis, setCarregandoKpis] = useState(true)
  const [carregandoGraficos, setCarregandoGraficos] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [periodo, setPeriodoState] = useState<PeriodoDashboard>('mes')

  // --------------------------------------------------------------------------
  // Buscar KPIs
  // --------------------------------------------------------------------------
  const buscarKpis = useCallback(async (filtros?: FiltrosDashboard): Promise<void> => {
    try {
      setCarregandoKpis(true)
      setErro(null)

      // Monta query string com filtros
      const params = new URLSearchParams()
      const periodoFiltro = filtros?.periodo || periodo
      params.set('periodo', periodoFiltro)

      const url = `/api/dashboard/kpis?${params.toString()}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao buscar KPIs')
      }

      setKpis(data.kpis || KPIS_VAZIOS)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao buscar KPIs'
      setErro(mensagem)
      console.error('useDashboard - buscarKpis:', error)
    } finally {
      setCarregandoKpis(false)
    }
  }, [periodo])

  // --------------------------------------------------------------------------
  // Buscar Graficos
  // --------------------------------------------------------------------------
  const buscarGraficos = useCallback(async (filtros?: FiltrosDashboard): Promise<void> => {
    try {
      setCarregandoGraficos(true)
      setErro(null)

      // Monta query string com filtros
      const params = new URLSearchParams()
      const periodoFiltro = filtros?.periodo || periodo
      params.set('periodo', periodoFiltro)

      if (filtros?.meses) {
        params.set('meses', filtros.meses.toString())
      }

      const url = `/api/dashboard/graficos?${params.toString()}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao buscar dados dos gráficos')
      }

      setGraficos(data.graficos || null)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao buscar dados dos gráficos'
      setErro(mensagem)
      console.error('useDashboard - buscarGraficos:', error)
    } finally {
      setCarregandoGraficos(false)
    }
  }, [periodo])

  // --------------------------------------------------------------------------
  // Buscar todos os dados (KPIs e Graficos em paralelo)
  // --------------------------------------------------------------------------
  const buscarDados = useCallback(
    async (filtros?: FiltrosDashboard): Promise<void> => {
      // Executa ambas as buscas em paralelo
      await Promise.all([buscarKpis(filtros), buscarGraficos(filtros)])
    },
    [buscarKpis, buscarGraficos]
  )

  // --------------------------------------------------------------------------
  // Setter para periodo que também atualiza os dados
  // --------------------------------------------------------------------------
  const setPeriodo = useCallback(
    (novoPeriodo: PeriodoDashboard): void => {
      setPeriodoState(novoPeriodo)
      // Busca dados com novo periodo
      buscarDados({ periodo: novoPeriodo })
    },
    [buscarDados]
  )

  // --------------------------------------------------------------------------
  // Computed: carregando geral (ambos carregando)
  // --------------------------------------------------------------------------
  const carregando = carregandoKpis || carregandoGraficos

  // --------------------------------------------------------------------------
  // Carrega dados na montagem
  // --------------------------------------------------------------------------
  useEffect(() => {
    buscarDados()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // Nota: Não incluímos buscarDados nas deps porque queremos carregar apenas uma vez

  return {
    kpis,
    graficos,
    carregando,
    carregandoKpis,
    carregandoGraficos,
    erro,
    periodo,
    setPeriodo,
    buscarDados,
    buscarKpis,
    buscarGraficos,
  }
}
