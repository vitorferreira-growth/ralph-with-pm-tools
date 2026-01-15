import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'

// Tipo para os KPIs do dashboard
export interface DashboardKPIs {
  totalVendas: {
    valor: number
    quantidade: number
  }
  ticketMedio: number
  emNegociacao: {
    valor: number
    quantidade: number
  }
  desistencias: {
    valor: number
    quantidade: number
  }
}

// ============================================================================
// GET /api/dashboard/kpis - KPIs do tenant
// ============================================================================
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await criarClienteServidor()

    // Verifica autenticacao
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Nao autorizado' }, { status: 401 })
    }

    // Parametros de filtro
    const { searchParams } = new URL(request.url)
    const periodo = searchParams.get('periodo') || 'mes' // mes, trimestre, ano

    // Calcula data inicial baseado no periodo
    const agora = new Date()
    let dataInicial: Date

    switch (periodo) {
      case 'trimestre':
        dataInicial = new Date(agora.getFullYear(), agora.getMonth() - 3, 1)
        break
      case 'ano':
        dataInicial = new Date(agora.getFullYear(), 0, 1)
        break
      case 'mes':
      default:
        dataInicial = new Date(agora.getFullYear(), agora.getMonth(), 1)
        break
    }

    // Busca todas as oportunidades do tenant (RLS aplica filtro de tenant)
    const { data: oportunidades, error: opError } = await supabase
      .from('opportunities')
      .select('id, stage, total_value, created_at, closed_at')
      .gte('created_at', dataInicial.toISOString())

    if (opError) {
      console.error('Erro ao buscar oportunidades:', opError)
      return NextResponse.json({ erro: 'Erro ao buscar dados do dashboard' }, { status: 500 })
    }

    // Calcula KPIs
    const vendasFinalizadas = oportunidades?.filter((op) => op.stage === 'closed_won') || []
    const emNegociacao =
      oportunidades?.filter((op) =>
        ['first_contact', 'proposal', 'negotiation', 'awaiting_payment'].includes(op.stage)
      ) || []
    const desistencias = oportunidades?.filter((op) => op.stage === 'closed_lost') || []

    // Total de vendas (R$ e quantidade)
    const totalVendasValor = vendasFinalizadas.reduce(
      (acc, op) => acc + (op.total_value || 0),
      0
    )
    const totalVendasQtd = vendasFinalizadas.length

    // Ticket medio
    const ticketMedio = totalVendasQtd > 0 ? totalVendasValor / totalVendasQtd : 0

    // Em negociacao (R$ e quantidade)
    const emNegociacaoValor = emNegociacao.reduce((acc, op) => acc + (op.total_value || 0), 0)
    const emNegociacaoQtd = emNegociacao.length

    // Desistencias (R$ e quantidade)
    const desistenciasValor = desistencias.reduce((acc, op) => acc + (op.total_value || 0), 0)
    const desistenciasQtd = desistencias.length

    const kpis: DashboardKPIs = {
      totalVendas: {
        valor: totalVendasValor,
        quantidade: totalVendasQtd,
      },
      ticketMedio,
      emNegociacao: {
        valor: emNegociacaoValor,
        quantidade: emNegociacaoQtd,
      },
      desistencias: {
        valor: desistenciasValor,
        quantidade: desistenciasQtd,
      },
    }

    return NextResponse.json({ kpis })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
