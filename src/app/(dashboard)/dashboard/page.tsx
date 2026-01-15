'use client'

import { type ReactElement } from 'react'
import dynamic from 'next/dynamic'
import { useDashboard, type PeriodoDashboard } from '@/hooks/use-dashboard'
import { GridKPIs } from '@/components/dashboard/grid-kpis'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle } from 'lucide-react'

// ============================================================================
// LAZY LOADED CHART COMPONENTS (Recharts is heavy - ~100KB)
// ============================================================================

const ChartSkeleton = (): ReactElement => (
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

const GraficoVendasMes = dynamic(
  () => import('@/components/dashboard/grafico-vendas-mes').then((mod) => mod.GraficoVendasMes),
  { loading: () => <ChartSkeleton />, ssr: false }
)

const GraficoVendasVendedor = dynamic(
  () =>
    import('@/components/dashboard/grafico-vendas-vendedor').then((mod) => mod.GraficoVendasVendedor),
  { loading: () => <ChartSkeleton />, ssr: false }
)

const GraficoVendasProduto = dynamic(
  () =>
    import('@/components/dashboard/grafico-vendas-produto').then((mod) => mod.GraficoVendasProduto),
  { loading: () => <ChartSkeleton />, ssr: false }
)

const GraficoFunil = dynamic(
  () => import('@/components/dashboard/grafico-funil').then((mod) => mod.GraficoFunil),
  { loading: () => <ChartSkeleton />, ssr: false }
)

// ============================================================================
// CONSTANTS
// ============================================================================

const OPCOES_PERIODO: { valor: PeriodoDashboard; label: string }[] = [
  { valor: 'mes', label: 'Este mês' },
  { valor: 'trimestre', label: 'Últimos 3 meses' },
  { valor: 'ano', label: 'Este ano' },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DashboardPage(): ReactElement {
  const {
    kpis,
    graficos,
    carregando,
    carregandoKpis,
    carregandoGraficos,
    erro,
    periodo,
    setPeriodo,
    buscarDados,
  } = useDashboard()

  // --------------------------------------------------------------------------
  // Render: Erro
  // --------------------------------------------------------------------------
  if (erro && !kpis && !graficos) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-error" />
        <p className="text-gray-600">{erro}</p>
        <Button onClick={() => buscarDados()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-xl">
      {/* --------------------------------------------------------------------
          Header
      --------------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h1 font-semibold text-gray-900">Dashboard</h1>
          <p className="text-body-sm text-gray-500">Visão geral do negócio</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filtro de período */}
          <Select value={periodo} onValueChange={(valor) => setPeriodo(valor as PeriodoDashboard)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              {OPCOES_PERIODO.map((opcao) => (
                <SelectItem key={opcao.valor} value={opcao.valor}>
                  {opcao.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Botão atualizar */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => buscarDados()}
            disabled={carregando}
            title="Atualizar dados"
          >
            <RefreshCw className={`h-4 w-4 ${carregando ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          Erro inline (quando já tem dados)
      --------------------------------------------------------------------- */}
      {erro && (kpis || graficos) && (
        <div className="flex items-center gap-2 rounded-md bg-error/10 p-3 text-sm text-error">
          <AlertCircle className="h-4 w-4" />
          {erro}
        </div>
      )}

      {/* --------------------------------------------------------------------
          KPIs Grid
      --------------------------------------------------------------------- */}
      <GridKPIs kpis={kpis} carregando={carregandoKpis} />

      {/* --------------------------------------------------------------------
          Charts Grid (2x2)
      --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Vendas por Mês */}
        <GraficoVendasMes
          dados={graficos?.vendasPorMes || []}
          carregando={carregandoGraficos}
        />

        {/* Vendas por Vendedor */}
        <GraficoVendasVendedor
          dados={graficos?.vendasPorVendedor || []}
          carregando={carregandoGraficos}
        />

        {/* Vendas por Produto */}
        <GraficoVendasProduto
          dados={graficos?.vendasPorProduto || []}
          carregando={carregandoGraficos}
        />

        {/* Funil de Vendas */}
        <GraficoFunil
          dados={graficos?.valorPorEtapa || []}
          carregando={carregandoGraficos}
        />
      </div>
    </div>
  )
}
