'use client'

import { memo } from 'react'
import { Cell, Pie, PieChart, Sector } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatarMoeda } from '@/lib/calculos'
import type { VendasPorProduto } from '@/app/api/dashboard/graficos/route'
import { Package } from 'lucide-react'
import { useState, useCallback } from 'react'

// ============================================================================
// TYPES
// ============================================================================

interface GraficoVendasProdutoProps {
  dados: VendasPorProduto[]
  carregando?: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Cores para os setores do grafico pizza
const CORES = [
  'hsl(var(--primary))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--accent))',
]

// ============================================================================
// CHART CONFIG
// ============================================================================

const chartConfig: ChartConfig = {
  valor: {
    label: 'Vendas',
  },
}

// ============================================================================
// SKELETON
// ============================================================================

function GraficoVendasProdutoSkeleton(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
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

function GraficoVendasProdutoVazio(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-chart-3" />
          Vendas por Produto
        </CardTitle>
        <CardDescription>Distribuição de vendas por produto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] flex-col items-center justify-center text-center">
          <Package className="mb-4 h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-500">Nenhum produto vendido no período</p>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// ACTIVE SHAPE (for hover effect)
// ============================================================================

interface ActiveShapeProps {
  cx: number
  cy: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  fill: string
  payload: { produtoNome: string; valor: number; quantidade: number }
}

function renderActiveShape(props: ActiveShapeProps): React.ReactElement {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props

  return (
    <g>
      <text x={cx} y={cy} dy={-8} textAnchor="middle" fill={fill} className="text-sm font-medium">
        {payload.produtoNome.length > 20
          ? `${payload.produtoNome.slice(0, 17)}...`
          : payload.produtoNome}
      </text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" fill="#666" className="text-xs">
        {formatarMoeda(payload.valor)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  )
}

// ============================================================================
// MAIN COMPONENT (memoized for performance)
// ============================================================================

export const GraficoVendasProduto = memo(function GraficoVendasProduto({
  dados,
  carregando,
}: GraficoVendasProdutoProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index)
  }, [])

  if (carregando) {
    return <GraficoVendasProdutoSkeleton />
  }

  // Verifica se há dados
  if (!dados || dados.length === 0) {
    return <GraficoVendasProdutoVazio />
  }

  // Prepara dados para o grafico (limitando a 6 produtos + "Outros")
  const dadosGrafico =
    dados.length <= 6
      ? dados
      : [
          ...dados.slice(0, 5),
          {
            produtoId: 'outros',
            produtoNome: 'Outros',
            valor: dados.slice(5).reduce((acc, d) => acc + d.valor, 0),
            quantidade: dados.slice(5).reduce((acc, d) => acc + d.quantidade, 0),
          },
        ]

  // Calcula o total
  const totalVendas = dados.reduce((acc, d) => acc + d.valor, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-chart-3" />
          Vendas por Produto
        </CardTitle>
        <CardDescription>
          Total: {formatarMoeda(totalVendas)} ({dados.length} produto{dados.length !== 1 ? 's' : ''})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape as unknown as (props: unknown) => React.ReactElement}
              data={dadosGrafico}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="valor"
              onMouseEnter={onPieEnter}
            >
              {dadosGrafico.map((entry, index) => (
                <Cell key={`cell-${entry.produtoId}`} fill={CORES[index % CORES.length]} />
              ))}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{item.payload.produtoNome}</span>
                      <span className="font-mono">{formatarMoeda(value as number)}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.payload.quantidade} unidade{item.payload.quantidade !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
})

GraficoVendasProduto.displayName = 'GraficoVendasProduto'

export { GraficoVendasProdutoSkeleton, GraficoVendasProdutoVazio }
