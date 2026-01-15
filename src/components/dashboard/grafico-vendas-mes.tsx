'use client'

import { memo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatarMoeda } from '@/lib/calculos'
import type { VendasPorMes } from '@/app/api/dashboard/graficos/route'
import { TrendingUp } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface GraficoVendasMesProps {
  dados: VendasPorMes[]
  carregando?: boolean
}

// ============================================================================
// CHART CONFIG
// ============================================================================

const chartConfig: ChartConfig = {
  valor: {
    label: 'Vendas',
    color: 'hsl(var(--primary))',
  },
}

// ============================================================================
// SKELETON
// ============================================================================

function GraficoVendasMesSkeleton(): React.ReactElement {
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

function GraficoVendasMesVazio(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Vendas por Mês
        </CardTitle>
        <CardDescription>Evolução das vendas ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] flex-col items-center justify-center text-center">
          <TrendingUp className="mb-4 h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-500">Nenhuma venda registrada no período</p>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MAIN COMPONENT (memoized for performance)
// ============================================================================

export const GraficoVendasMes = memo(function GraficoVendasMes({
  dados,
  carregando,
}: GraficoVendasMesProps): React.ReactElement {
  if (carregando) {
    return <GraficoVendasMesSkeleton />
  }

  // Verifica se há dados
  const temDados = dados.some((d) => d.valor > 0)
  if (!temDados) {
    return <GraficoVendasMesVazio />
  }

  // Calcula o total do periodo
  const totalPeriodo = dados.reduce((acc, d) => acc + d.valor, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Vendas por Mês
        </CardTitle>
        <CardDescription>
          Total no período: {formatarMoeda(totalPeriodo)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={dados}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
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
                      <span className="font-medium">{formatarMoeda(value as number)}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.payload.quantidade} venda{item.payload.quantidade !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              dataKey="valor"
              fill="var(--color-valor)"
              radius={[4, 4, 0, 0]}
              name="valor"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
})

GraficoVendasMes.displayName = 'GraficoVendasMes'

export { GraficoVendasMesSkeleton, GraficoVendasMesVazio }
