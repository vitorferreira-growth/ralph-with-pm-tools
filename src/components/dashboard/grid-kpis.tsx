'use client'

import * as React from 'react'
import { DollarSign, TrendingUp, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CardKPI, VarianteKPI } from './card-kpi'
import type { DashboardKPIs } from '@/app/api/dashboard/kpis/route'
import { formatarMoeda } from '@/lib/calculos'

// ============================================================================
// TYPES
// ============================================================================

export interface GridKPIsProps {
  /** Dados dos KPIs do dashboard */
  kpis: DashboardKPIs | null
  /** Se está carregando */
  carregando?: boolean
  /** Classes CSS adicionais */
  className?: string
  /** Handler para clique em KPI específico */
  onKPIClick?: (tipo: TipoKPI) => void
}

export type TipoKPI = 'totalVendas' | 'ticketMedio' | 'emNegociacao' | 'desistencias'

// ============================================================================
// HELPER: Formatar quantidade com texto plural
// ============================================================================

function formatarQuantidade(quantidade: number, singular: string, plural: string): string {
  if (quantidade === 1) {
    return `${quantidade} ${singular}`
  }
  return `${quantidade} ${plural}`
}

// ============================================================================
// HELPER: Configuração dos KPIs
// ============================================================================

interface ConfiguracaoKPI {
  titulo: string
  icone: typeof DollarSign
  variante: VarianteKPI
  getValor: (kpis: DashboardKPIs) => string
  getDescricao: (kpis: DashboardKPIs) => string
}

const CONFIGURACAO_KPIS: Record<TipoKPI, ConfiguracaoKPI> = {
  totalVendas: {
    titulo: 'Total de Vendas',
    icone: DollarSign,
    variante: 'success',
    getValor: (kpis) => formatarMoeda(kpis.totalVendas.valor),
    getDescricao: (kpis) => formatarQuantidade(kpis.totalVendas.quantidade, 'venda', 'vendas'),
  },
  ticketMedio: {
    titulo: 'Ticket Médio',
    icone: TrendingUp,
    variante: 'default',
    getValor: (kpis) => formatarMoeda(kpis.ticketMedio),
    getDescricao: () => 'por venda',
  },
  emNegociacao: {
    titulo: 'Em Negociação',
    icone: Clock,
    variante: 'warning',
    getValor: (kpis) => formatarMoeda(kpis.emNegociacao.valor),
    getDescricao: (kpis) =>
      formatarQuantidade(kpis.emNegociacao.quantidade, 'oportunidade', 'oportunidades'),
  },
  desistencias: {
    titulo: 'Desistências',
    icone: XCircle,
    variante: 'error',
    getValor: (kpis) => formatarMoeda(kpis.desistencias.valor),
    getDescricao: (kpis) =>
      formatarQuantidade(kpis.desistencias.quantidade, 'oportunidade', 'oportunidades'),
  },
}

// Ordem de exibição dos KPIs
const ORDEM_KPIS: TipoKPI[] = ['totalVendas', 'ticketMedio', 'emNegociacao', 'desistencias']

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function GridKPIs({
  kpis,
  carregando = false,
  className,
  onKPIClick,
}: GridKPIsProps): React.ReactElement {
  return (
    <div
      className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}
      role="region"
      aria-label="Indicadores de desempenho"
    >
      {ORDEM_KPIS.map((tipo) => {
        const config = CONFIGURACAO_KPIS[tipo]

        // Se está carregando ou não tem dados, renderiza skeleton
        if (carregando || !kpis) {
          return (
            <CardKPI
              key={tipo}
              titulo={config.titulo}
              valor=""
              icone={config.icone}
              variante={config.variante}
              carregando={true}
            />
          )
        }

        return (
          <CardKPI
            key={tipo}
            titulo={config.titulo}
            valor={config.getValor(kpis)}
            descricao={config.getDescricao(kpis)}
            icone={config.icone}
            variante={config.variante}
            onClick={onKPIClick ? () => onKPIClick(tipo) : undefined}
          />
        )
      })}
    </div>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export { CONFIGURACAO_KPIS, ORDEM_KPIS }
