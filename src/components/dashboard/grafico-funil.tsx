'use client'

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatarMoeda } from '@/lib/calculos'
import type { ValorPorEtapa } from '@/app/api/dashboard/graficos/route'
import { Filter } from 'lucide-react'
import { OpportunityStage } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

interface GraficoFunilProps {
  dados: ValorPorEtapa[]
  carregando?: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Cores por etapa do CRM (matching kanban-coluna.tsx)
const CORES_ETAPA: Record<OpportunityStage, string> = {
  first_contact: '#3B82F6', // blue-500
  proposal: '#8B5CF6', // violet-500
  negotiation: '#F59E0B', // amber-500
  awaiting_payment: '#F97316', // orange-500
  closed_won: '#22C55E', // green-500
  closed_lost: '#EF4444', // red-500
}

// ============================================================================
// CHART CONFIG
// ============================================================================

const chartConfig: ChartConfig = {
  valor: {
    label: 'Valor',
  },
}

// ============================================================================
// SKELETON
// ============================================================================

function GraficoFunilSkeleton(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] animate-pulse rounded bg-gray-100" />
      </CardContent>
    </Card>
  )
}

// ============================================================================
// EMPTY STATE
// ============================================================================

function GraficoFunilVazio(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-chart-4" />
          Funil de Vendas
        </CardTitle>
        <CardDescription>Valor por etapa do CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] flex-col items-center justify-center text-center">
          <Filter className="mb-4 h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-500">Nenhuma oportunidade no funil</p>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function GraficoFunil({ dados, carregando }: GraficoFunilProps): React.ReactElement {
  if (carregando) {
    return <GraficoFunilSkeleton />
  }

  // Verifica se há dados
  const temDados = dados.some((d) => d.quantidade > 0)
  if (!temDados) {
    return <GraficoFunilVazio />
  }

  // Calcula total em negociacao (exceto closed_won e closed_lost)
  const emNegociacao = dados
    .filter((d) => d.etapa !== 'closed_won' && d.etapa !== 'closed_lost')
    .reduce((acc, d) => acc + d.valor, 0)

  // Prepara dados com labels curtos para mobile
  const dadosGrafico = dados.map((d) => ({
    ...d,
    labelCurto:
      d.etapaLabel.length > 10 ? `${d.etapaLabel.slice(0, 8)}...` : d.etapaLabel,
    cor: CORES_ETAPA[d.etapa],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-chart-4" />
          Funil de Vendas
        </CardTitle>
        <CardDescription>
          Em negociação: {formatarMoeda(emNegociacao)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={dadosGrafico}
            margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="labelCurto"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={11}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
              tickFormatter={(value: number) =>
                new Intl.NumberFormat('pt-BR', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value)
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{item.payload.etapaLabel}</span>
                      <span className="font-mono">{formatarMoeda(value as number)}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.payload.quantidade} oportunidade
                        {item.payload.quantidade !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="valor" radius={[4, 4, 0, 0]} name="valor">
              {dadosGrafico.map((entry) => (
                <Cell key={`cell-${entry.etapa}`} fill={entry.cor} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { GraficoFunilSkeleton, GraficoFunilVazio }
