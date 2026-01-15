import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import { OpportunityStage, OPPORTUNITY_STAGE_LABELS } from '@/types/database'

// Tipo para dados de vendas por mes
export interface VendasPorMes {
  mes: string // formato: "Jan/2025"
  valor: number
  quantidade: number
}

// Tipo para dados de vendas por vendedor
export interface VendasPorVendedor {
  vendedorId: string
  vendedorNome: string
  valor: number
  quantidade: number
}

// Tipo para dados de vendas por produto
export interface VendasPorProduto {
  produtoId: string
  produtoNome: string
  valor: number
  quantidade: number
}

// Tipo para dados do funil (valor por etapa)
export interface ValorPorEtapa {
  etapa: OpportunityStage
  etapaLabel: string
  valor: number
  quantidade: number
}

// Tipo para todos os dados dos graficos
export interface DashboardGraficos {
  vendasPorMes: VendasPorMes[]
  vendasPorVendedor: VendasPorVendedor[]
  vendasPorProduto: VendasPorProduto[]
  valorPorEtapa: ValorPorEtapa[]
}

// Helper para formatar mes
function formatarMes(data: Date): string {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${meses[data.getMonth()]}/${data.getFullYear()}`
}

// ============================================================================
// GET /api/dashboard/graficos - Dados dos graficos
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
    const periodo = searchParams.get('periodo') || 'ano' // mes, trimestre, ano
    const meses = parseInt(searchParams.get('meses') || '12', 10) // ultimos N meses para grafico

    // Calcula data inicial baseado no periodo
    const agora = new Date()
    let dataInicial: Date

    switch (periodo) {
      case 'mes':
        dataInicial = new Date(agora.getFullYear(), agora.getMonth(), 1)
        break
      case 'trimestre':
        dataInicial = new Date(agora.getFullYear(), agora.getMonth() - 3, 1)
        break
      case 'ano':
      default:
        dataInicial = new Date(agora.getFullYear(), agora.getMonth() - meses + 1, 1)
        break
    }

    // Busca oportunidades finalizadas (closed_won) com relacionamentos
    const { data: vendasFinalizadas, error: vendasError } = await supabase
      .from('opportunities')
      .select(
        `
        id,
        total_value,
        closed_at,
        seller:sellers(id, name),
        products:opportunity_products(
          quantity,
          unit_price,
          product:products(id, name)
        )
      `
      )
      .eq('stage', 'closed_won')
      .gte('closed_at', dataInicial.toISOString())

    if (vendasError) {
      console.error('Erro ao buscar vendas:', vendasError)
      return NextResponse.json({ erro: 'Erro ao buscar dados de vendas' }, { status: 500 })
    }

    // Busca todas as oportunidades para o funil (independente da data)
    const { data: todasOportunidades, error: opError } = await supabase
      .from('opportunities')
      .select('id, stage, total_value')

    if (opError) {
      console.error('Erro ao buscar oportunidades:', opError)
      return NextResponse.json({ erro: 'Erro ao buscar dados do funil' }, { status: 500 })
    }

    // ========================================================================
    // 1. Vendas por mes (ultimos N meses)
    // ========================================================================
    const vendasPorMesMap = new Map<string, { valor: number; quantidade: number }>()

    // Inicializa todos os meses no periodo
    for (let i = 0; i < meses; i++) {
      const data = new Date(agora.getFullYear(), agora.getMonth() - meses + 1 + i, 1)
      const chave = formatarMes(data)
      vendasPorMesMap.set(chave, { valor: 0, quantidade: 0 })
    }

    // Agrupa vendas por mes
    vendasFinalizadas?.forEach((venda) => {
      if (venda.closed_at) {
        const data = new Date(venda.closed_at)
        const chave = formatarMes(data)
        const atual = vendasPorMesMap.get(chave) || { valor: 0, quantidade: 0 }
        vendasPorMesMap.set(chave, {
          valor: atual.valor + (venda.total_value || 0),
          quantidade: atual.quantidade + 1,
        })
      }
    })

    const vendasPorMes: VendasPorMes[] = Array.from(vendasPorMesMap.entries()).map(
      ([mes, dados]) => ({
        mes,
        valor: dados.valor,
        quantidade: dados.quantidade,
      })
    )

    // ========================================================================
    // 2. Vendas por vendedor
    // ========================================================================
    const vendasPorVendedorMap = new Map<
      string,
      { nome: string; valor: number; quantidade: number }
    >()

    vendasFinalizadas?.forEach((venda) => {
      // Type assertion para o seller
      const seller = venda.seller as { id: string; name: string } | null
      if (seller) {
        const atual = vendasPorVendedorMap.get(seller.id) || {
          nome: seller.name,
          valor: 0,
          quantidade: 0,
        }
        vendasPorVendedorMap.set(seller.id, {
          nome: seller.name,
          valor: atual.valor + (venda.total_value || 0),
          quantidade: atual.quantidade + 1,
        })
      }
    })

    const vendasPorVendedor: VendasPorVendedor[] = Array.from(vendasPorVendedorMap.entries())
      .map(([id, dados]) => ({
        vendedorId: id,
        vendedorNome: dados.nome,
        valor: dados.valor,
        quantidade: dados.quantidade,
      }))
      .sort((a, b) => b.valor - a.valor) // Ordena por valor decrescente

    // ========================================================================
    // 3. Vendas por produto
    // ========================================================================
    const vendasPorProdutoMap = new Map<
      string,
      { nome: string; valor: number; quantidade: number }
    >()

    vendasFinalizadas?.forEach((venda) => {
      // Type assertion para products
      const products = venda.products as Array<{
        quantity: number
        unit_price: number
        product: { id: string; name: string } | null
      }> | null

      products?.forEach((item) => {
        if (item.product) {
          const valorItem = item.unit_price * item.quantity
          const atual = vendasPorProdutoMap.get(item.product.id) || {
            nome: item.product.name,
            valor: 0,
            quantidade: 0,
          }
          vendasPorProdutoMap.set(item.product.id, {
            nome: item.product.name,
            valor: atual.valor + valorItem,
            quantidade: atual.quantidade + item.quantity,
          })
        }
      })
    })

    const vendasPorProduto: VendasPorProduto[] = Array.from(vendasPorProdutoMap.entries())
      .map(([id, dados]) => ({
        produtoId: id,
        produtoNome: dados.nome,
        valor: dados.valor,
        quantidade: dados.quantidade,
      }))
      .sort((a, b) => b.valor - a.valor) // Ordena por valor decrescente

    // ========================================================================
    // 4. Valor por etapa do CRM (funil)
    // ========================================================================
    const etapas: OpportunityStage[] = [
      'first_contact',
      'proposal',
      'negotiation',
      'awaiting_payment',
      'closed_won',
      'closed_lost',
    ]

    const valorPorEtapa: ValorPorEtapa[] = etapas.map((etapa) => {
      const oportunidadesEtapa = todasOportunidades?.filter((op) => op.stage === etapa) || []
      const valor = oportunidadesEtapa.reduce((acc, op) => acc + (op.total_value || 0), 0)
      return {
        etapa,
        etapaLabel: OPPORTUNITY_STAGE_LABELS[etapa],
        valor,
        quantidade: oportunidadesEtapa.length,
      }
    })

    const graficos: DashboardGraficos = {
      vendasPorMes,
      vendasPorVendedor,
      vendasPorProduto,
      valorPorEtapa,
    }

    return NextResponse.json({ graficos })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
