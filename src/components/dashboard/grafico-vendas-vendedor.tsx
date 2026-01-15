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
import type { VendasPorVendedor } from '@/app/api/dashboard/graficos/route'
import { Users } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface GraficoVendasVendedorProps {
  dados: VendasPorVendedor[]
  carregando?: boolean
}

// ============================================================================
// CHART CONFIG
// ============================================================================

const chartConfig: ChartConfig = {
  valor: {
    label: 'Vendas',
    color: 'hsl(var(--chart-2))',
  },
}

// ============================================================================
// SKELETON
// ============================================================================

function GraficoVendasVendedorSkeleton(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-52 animate-pulse rounded bg-gray-200" />
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

function GraficoVendasVendedorVazio(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-chart-2" />
          Vendas por Vendedor
        </CardTitle>
        <CardDescription>Performance da equipe de vendas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] flex-col items-center justify-center text-center">
          <Users className="mb-4 h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-500">Nenhuma venda com vendedor atribuído</p>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MAIN COMPONENT (memoized for performance)
// ============================================================================

export const GraficoVendasVendedor = memo(function GraficoVendasVendedor({
  dados,
  carregando,
}: GraficoVendasVendedorProps): React.ReactElement {
  if (carregando) {
    return <GraficoVendasVendedorSkeleton />
  }

  // Verifica se há dados
  if (!dados || dados.length === 0) {
    return <GraficoVendasVendedorVazio />
  }

  // Prepara dados para o grafico (limitando a 10 vendedores)
  const dadosGrafico = dados.slice(0, 10).map((d) => ({
    ...d,
    nome: d.vendedorNome.length > 15 ? `${d.vendedorNome.slice(0, 12)}...` : d.vendedorNome,
    nomeCompleto: d.vendedorNome,
  }))

  // Calcula o total
  const totalVendas = dados.reduce((acc, d) => acc + d.valor, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-chart-2" />
          Vendas por Vendedor
        </CardTitle>
        <CardDescription>
          Total: {formatarMoeda(totalVendas)} ({dados.length} vendedor{dados.length !== 1 ? 'es' : ''})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={dadosGrafico}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
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
            <YAxis
              type="category"
              dataKey="nome"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
              width={100}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{item.payload.nomeCompleto}</span>
                      <span className="font-mono">{formatarMoeda(value as number)}</span>
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
              radius={[0, 4, 4, 0]}
              name="valor"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
})

GraficoVendasVendedor.displayName = 'GraficoVendasVendedor'

export { GraficoVendasVendedorSkeleton, GraficoVendasVendedorVazio }
