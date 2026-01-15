// Funções de cálculo para o Dashboard
// Funções puras e testáveis para calcular KPIs e métricas

import { OpportunityStage, OPPORTUNITY_STAGE_LABELS } from '@/types/database'

// ============================================================================
// TIPOS
// ============================================================================

// Tipo simplificado de oportunidade para cálculos
export interface OportunidadeCalculo {
  id: string
  stage: OpportunityStage
  total_value: number
  created_at?: string
  closed_at?: string | null
}

// Tipo para produto em oportunidade (para cálculos de vendas por produto)
export interface ProdutoOportunidadeCalculo {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
}

// Tipo para oportunidade com vendedor (para cálculos por vendedor)
export interface OportunidadeComVendedor extends OportunidadeCalculo {
  seller_id?: string | null
  seller_name?: string | null
}

// Tipo para oportunidade com produtos (para cálculos por produto)
export interface OportunidadeComProdutos extends OportunidadeCalculo {
  produtos: ProdutoOportunidadeCalculo[]
}

// Resultado do cálculo de KPIs
export interface ResultadoKPIs {
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

// Resultado de vendas agrupadas
export interface VendasAgrupadas {
  id: string
  nome: string
  valor: number
  quantidade: number
}

// Resultado de valor por etapa
export interface ValorEtapa {
  etapa: OpportunityStage
  etapaLabel: string
  valor: number
  quantidade: number
}

// ============================================================================
// CONSTANTES
// ============================================================================

// Etapas consideradas "em negociação" (pipeline ativo)
export const ETAPAS_EM_NEGOCIACAO: OpportunityStage[] = [
  'first_contact',
  'proposal',
  'negotiation',
  'awaiting_payment',
]

// Todas as etapas em ordem do funil
export const ETAPAS_FUNIL: OpportunityStage[] = [
  'first_contact',
  'proposal',
  'negotiation',
  'awaiting_payment',
  'closed_won',
  'closed_lost',
]

// Nomes dos meses em português
export const NOMES_MESES = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

// ============================================================================
// FUNÇÕES DE CÁLCULO - KPIs
// ============================================================================

/**
 * Calcula o ticket médio a partir de uma lista de valores de vendas
 * @param vendas - Array de valores de vendas (em R$)
 * @returns Ticket médio ou 0 se não houver vendas
 */
export function calcularTicketMedio(vendas: number[]): number {
  if (vendas.length === 0) return 0
  const total = vendas.reduce((acc, valor) => acc + valor, 0)
  return total / vendas.length
}

/**
 * Calcula o total de vendas (soma dos valores)
 * @param vendas - Array de valores de vendas (em R$)
 * @returns Soma total dos valores
 */
export function calcularTotalVendas(vendas: number[]): number {
  return vendas.reduce((acc, valor) => acc + valor, 0)
}

/**
 * Filtra oportunidades por etapa
 * @param oportunidades - Lista de oportunidades
 * @param etapas - Etapas para filtrar
 * @returns Oportunidades filtradas
 */
export function filtrarPorEtapas<T extends OportunidadeCalculo>(
  oportunidades: T[],
  etapas: OpportunityStage[]
): T[] {
  return oportunidades.filter((op) => etapas.includes(op.stage))
}

/**
 * Calcula os KPIs do dashboard a partir de uma lista de oportunidades
 * @param oportunidades - Lista de oportunidades
 * @returns Objeto com todos os KPIs calculados
 */
export function calcularKPIs(oportunidades: OportunidadeCalculo[]): ResultadoKPIs {
  // Vendas finalizadas (closed_won)
  const vendasFinalizadas = oportunidades.filter((op) => op.stage === 'closed_won')
  const valoresVendas = vendasFinalizadas.map((op) => op.total_value || 0)

  // Em negociação (etapas ativas do funil)
  const emNegociacao = filtrarPorEtapas(oportunidades, ETAPAS_EM_NEGOCIACAO)

  // Desistências (closed_lost)
  const desistencias = oportunidades.filter((op) => op.stage === 'closed_lost')

  return {
    totalVendas: {
      valor: calcularTotalVendas(valoresVendas),
      quantidade: vendasFinalizadas.length,
    },
    ticketMedio: calcularTicketMedio(valoresVendas),
    emNegociacao: {
      valor: calcularTotalVendas(emNegociacao.map((op) => op.total_value || 0)),
      quantidade: emNegociacao.length,
    },
    desistencias: {
      valor: calcularTotalVendas(desistencias.map((op) => op.total_value || 0)),
      quantidade: desistencias.length,
    },
  }
}

// ============================================================================
// FUNÇÕES DE CÁLCULO - AGRUPAMENTOS
// ============================================================================

/**
 * Agrupa vendas finalizadas por vendedor
 * @param oportunidades - Lista de oportunidades com dados do vendedor
 * @returns Array de vendas agrupadas por vendedor, ordenado por valor decrescente
 */
export function agruparVendasPorVendedor(
  oportunidades: OportunidadeComVendedor[]
): VendasAgrupadas[] {
  const vendasFinalizadas = oportunidades.filter((op) => op.stage === 'closed_won')

  const mapa = new Map<string, { nome: string; valor: number; quantidade: number }>()

  vendasFinalizadas.forEach((op) => {
    if (op.seller_id && op.seller_name) {
      const atual = mapa.get(op.seller_id) || {
        nome: op.seller_name,
        valor: 0,
        quantidade: 0,
      }
      mapa.set(op.seller_id, {
        nome: op.seller_name,
        valor: atual.valor + (op.total_value || 0),
        quantidade: atual.quantidade + 1,
      })
    }
  })

  return Array.from(mapa.entries())
    .map(([id, dados]) => ({
      id,
      nome: dados.nome,
      valor: dados.valor,
      quantidade: dados.quantidade,
    }))
    .sort((a, b) => b.valor - a.valor)
}

/**
 * Agrupa vendas finalizadas por produto
 * @param oportunidades - Lista de oportunidades com produtos
 * @returns Array de vendas agrupadas por produto, ordenado por valor decrescente
 */
export function agruparVendasPorProduto(oportunidades: OportunidadeComProdutos[]): VendasAgrupadas[] {
  const vendasFinalizadas = oportunidades.filter((op) => op.stage === 'closed_won')

  const mapa = new Map<string, { nome: string; valor: number; quantidade: number }>()

  vendasFinalizadas.forEach((op) => {
    op.produtos.forEach((produto) => {
      const valorItem = produto.unit_price * produto.quantity
      const atual = mapa.get(produto.product_id) || {
        nome: produto.product_name,
        valor: 0,
        quantidade: 0,
      }
      mapa.set(produto.product_id, {
        nome: produto.product_name,
        valor: atual.valor + valorItem,
        quantidade: atual.quantidade + produto.quantity,
      })
    })
  })

  return Array.from(mapa.entries())
    .map(([id, dados]) => ({
      id,
      nome: dados.nome,
      valor: dados.valor,
      quantidade: dados.quantidade,
    }))
    .sort((a, b) => b.valor - a.valor)
}

/**
 * Calcula o valor total por etapa do CRM (funil)
 * @param oportunidades - Lista de oportunidades
 * @returns Array com valor e quantidade por etapa
 */
export function calcularValorPorEtapa(oportunidades: OportunidadeCalculo[]): ValorEtapa[] {
  return ETAPAS_FUNIL.map((etapa) => {
    const oportunidadesEtapa = oportunidades.filter((op) => op.stage === etapa)
    const valor = calcularTotalVendas(oportunidadesEtapa.map((op) => op.total_value || 0))
    return {
      etapa,
      etapaLabel: OPPORTUNITY_STAGE_LABELS[etapa],
      valor,
      quantidade: oportunidadesEtapa.length,
    }
  })
}

// ============================================================================
// FUNÇÕES DE CÁLCULO - VENDAS POR MÊS
// ============================================================================

/**
 * Formata uma data no formato "Mês/Ano" (ex: "Jan/2025")
 * @param data - Data a ser formatada
 * @returns String no formato "Mês/Ano"
 */
export function formatarMesAno(data: Date): string {
  return `${NOMES_MESES[data.getMonth()]}/${data.getFullYear()}`
}

/**
 * Gera uma lista de meses no formato "Mês/Ano" para os últimos N meses
 * @param quantidadeMeses - Número de meses a gerar
 * @param dataReferencia - Data de referência (default: hoje)
 * @returns Array de strings no formato "Mês/Ano"
 */
export function gerarListaMeses(quantidadeMeses: number, dataReferencia: Date = new Date()): string[] {
  const meses: string[] = []

  for (let i = 0; i < quantidadeMeses; i++) {
    const data = new Date(
      dataReferencia.getFullYear(),
      dataReferencia.getMonth() - quantidadeMeses + 1 + i,
      1
    )
    meses.push(formatarMesAno(data))
  }

  return meses
}

/**
 * Agrupa vendas finalizadas por mês
 * @param oportunidades - Lista de oportunidades com closed_at
 * @param quantidadeMeses - Número de meses a considerar (default: 12)
 * @param dataReferencia - Data de referência (default: hoje)
 * @returns Array com vendas por mês, incluindo meses sem vendas
 */
export function agruparVendasPorMes(
  oportunidades: OportunidadeCalculo[],
  quantidadeMeses: number = 12,
  dataReferencia: Date = new Date()
): VendasAgrupadas[] {
  const vendasFinalizadas = oportunidades.filter((op) => op.stage === 'closed_won' && op.closed_at)

  // Inicializa mapa com todos os meses (valor zero)
  const mesesLista = gerarListaMeses(quantidadeMeses, dataReferencia)
  const mapa = new Map<string, { valor: number; quantidade: number }>()

  mesesLista.forEach((mes) => {
    mapa.set(mes, { valor: 0, quantidade: 0 })
  })

  // Agrupa vendas por mês
  vendasFinalizadas.forEach((op) => {
    if (op.closed_at) {
      const data = new Date(op.closed_at)
      const chave = formatarMesAno(data)
      const atual = mapa.get(chave)
      if (atual) {
        mapa.set(chave, {
          valor: atual.valor + (op.total_value || 0),
          quantidade: atual.quantidade + 1,
        })
      }
    }
  })

  // Mantém ordem cronológica (não ordena por valor)
  return mesesLista.map((mes) => {
    const dados = mapa.get(mes) || { valor: 0, quantidade: 0 }
    return {
      id: mes,
      nome: mes,
      valor: dados.valor,
      quantidade: dados.quantidade,
    }
  })
}

// ============================================================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================================================

/**
 * Formata um valor em reais (BRL)
 * @param valor - Valor numérico
 * @returns String formatada (ex: "R$ 1.234,56")
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

/**
 * Formata um valor como porcentagem
 * @param valor - Valor decimal (ex: 0.25 para 25%)
 * @param casasDecimais - Número de casas decimais (default: 1)
 * @returns String formatada (ex: "25,0%")
 */
export function formatarPorcentagem(valor: number, casasDecimais: number = 1): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  }).format(valor)
}

/**
 * Calcula a taxa de conversão (vendas / total de oportunidades)
 * @param vendasFinalizadas - Número de vendas finalizadas
 * @param totalOportunidades - Total de oportunidades (excluindo em negociação ativa)
 * @returns Taxa de conversão (0 a 1)
 */
export function calcularTaxaConversao(
  vendasFinalizadas: number,
  totalOportunidades: number
): number {
  if (totalOportunidades === 0) return 0
  return vendasFinalizadas / totalOportunidades
}

/**
 * Calcula a taxa de desistência (desistências / total fechado)
 * @param desistencias - Número de desistências
 * @param totalFechado - Total de oportunidades fechadas (won + lost)
 * @returns Taxa de desistência (0 a 1)
 */
export function calcularTaxaDesistencia(desistencias: number, totalFechado: number): number {
  if (totalFechado === 0) return 0
  return desistencias / totalFechado
}
