import { describe, it, expect } from 'vitest'
import {
  calcularTicketMedio,
  calcularTotalVendas,
  filtrarPorEtapas,
  calcularKPIs,
  agruparVendasPorVendedor,
  agruparVendasPorProduto,
  calcularValorPorEtapa,
  formatarMesAno,
  gerarListaMeses,
  agruparVendasPorMes,
  formatarMoeda,
  formatarPorcentagem,
  calcularTaxaConversao,
  calcularTaxaDesistencia,
  ETAPAS_EM_NEGOCIACAO,
  ETAPAS_FUNIL,
  OportunidadeCalculo,
  OportunidadeComVendedor,
  OportunidadeComProdutos,
} from './calculos'

// ============================================================================
// TESTES - calcularTicketMedio
// ============================================================================

describe('calcularTicketMedio', () => {
  it('deve retornar zero quando não há vendas', () => {
    expect(calcularTicketMedio([])).toBe(0)
  })

  it('deve calcular corretamente com uma venda', () => {
    expect(calcularTicketMedio([100])).toBe(100)
  })

  it('deve calcular corretamente com múltiplas vendas', () => {
    const vendas = [100, 200, 300]
    expect(calcularTicketMedio(vendas)).toBe(200)
  })

  it('deve lidar com valores decimais', () => {
    const vendas = [99.99, 149.99, 199.99]
    const resultado = calcularTicketMedio(vendas)
    expect(resultado).toBeCloseTo(149.99, 2)
  })

  it('deve lidar com vendas de valor zero', () => {
    const vendas = [0, 100, 200]
    expect(calcularTicketMedio(vendas)).toBe(100)
  })
})

// ============================================================================
// TESTES - calcularTotalVendas
// ============================================================================

describe('calcularTotalVendas', () => {
  it('deve retornar zero quando não há vendas', () => {
    expect(calcularTotalVendas([])).toBe(0)
  })

  it('deve somar corretamente uma venda', () => {
    expect(calcularTotalVendas([100])).toBe(100)
  })

  it('deve somar corretamente múltiplas vendas', () => {
    const vendas = [100, 200, 300]
    expect(calcularTotalVendas(vendas)).toBe(600)
  })

  it('deve lidar com valores decimais', () => {
    const vendas = [99.99, 49.99]
    expect(calcularTotalVendas(vendas)).toBeCloseTo(149.98, 2)
  })
})

// ============================================================================
// TESTES - filtrarPorEtapas
// ============================================================================

describe('filtrarPorEtapas', () => {
  const oportunidades: OportunidadeCalculo[] = [
    { id: '1', stage: 'first_contact', total_value: 100 },
    { id: '2', stage: 'proposal', total_value: 200 },
    { id: '3', stage: 'closed_won', total_value: 300 },
    { id: '4', stage: 'closed_lost', total_value: 400 },
  ]

  it('deve filtrar por uma etapa', () => {
    const resultado = filtrarPorEtapas(oportunidades, ['closed_won'])
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe('3')
  })

  it('deve filtrar por múltiplas etapas', () => {
    const resultado = filtrarPorEtapas(oportunidades, ['first_contact', 'proposal'])
    expect(resultado).toHaveLength(2)
    expect(resultado.map((o) => o.id)).toEqual(['1', '2'])
  })

  it('deve retornar array vazio quando nenhuma etapa corresponde', () => {
    const resultado = filtrarPorEtapas(oportunidades, ['negotiation'])
    expect(resultado).toHaveLength(0)
  })

  it('deve retornar array vazio com lista de etapas vazia', () => {
    const resultado = filtrarPorEtapas(oportunidades, [])
    expect(resultado).toHaveLength(0)
  })
})

// ============================================================================
// TESTES - calcularKPIs
// ============================================================================

describe('calcularKPIs', () => {
  it('deve retornar zeros quando não há oportunidades', () => {
    const resultado = calcularKPIs([])

    expect(resultado.totalVendas.valor).toBe(0)
    expect(resultado.totalVendas.quantidade).toBe(0)
    expect(resultado.ticketMedio).toBe(0)
    expect(resultado.emNegociacao.valor).toBe(0)
    expect(resultado.emNegociacao.quantidade).toBe(0)
    expect(resultado.desistencias.valor).toBe(0)
    expect(resultado.desistencias.quantidade).toBe(0)
  })

  it('deve calcular KPIs corretamente com dados variados', () => {
    const oportunidades: OportunidadeCalculo[] = [
      // Vendas finalizadas
      { id: '1', stage: 'closed_won', total_value: 100 },
      { id: '2', stage: 'closed_won', total_value: 200 },
      { id: '3', stage: 'closed_won', total_value: 300 },
      // Em negociação
      { id: '4', stage: 'first_contact', total_value: 50 },
      { id: '5', stage: 'proposal', total_value: 150 },
      { id: '6', stage: 'negotiation', total_value: 250 },
      { id: '7', stage: 'awaiting_payment', total_value: 350 },
      // Desistências
      { id: '8', stage: 'closed_lost', total_value: 500 },
      { id: '9', stage: 'closed_lost', total_value: 1000 },
    ]

    const resultado = calcularKPIs(oportunidades)

    // Total vendas: 100 + 200 + 300 = 600
    expect(resultado.totalVendas.valor).toBe(600)
    expect(resultado.totalVendas.quantidade).toBe(3)

    // Ticket médio: 600 / 3 = 200
    expect(resultado.ticketMedio).toBe(200)

    // Em negociação: 50 + 150 + 250 + 350 = 800
    expect(resultado.emNegociacao.valor).toBe(800)
    expect(resultado.emNegociacao.quantidade).toBe(4)

    // Desistências: 500 + 1000 = 1500
    expect(resultado.desistencias.valor).toBe(1500)
    expect(resultado.desistencias.quantidade).toBe(2)
  })

  it('deve lidar com oportunidades sem total_value', () => {
    const oportunidades: OportunidadeCalculo[] = [
      { id: '1', stage: 'closed_won', total_value: 0 },
      { id: '2', stage: 'first_contact', total_value: 0 },
    ]

    const resultado = calcularKPIs(oportunidades)

    expect(resultado.totalVendas.valor).toBe(0)
    expect(resultado.totalVendas.quantidade).toBe(1)
    expect(resultado.ticketMedio).toBe(0)
  })
})

// ============================================================================
// TESTES - agruparVendasPorVendedor
// ============================================================================

describe('agruparVendasPorVendedor', () => {
  it('deve retornar array vazio quando não há vendas', () => {
    expect(agruparVendasPorVendedor([])).toEqual([])
  })

  it('deve agrupar vendas por vendedor corretamente', () => {
    const oportunidades: OportunidadeComVendedor[] = [
      { id: '1', stage: 'closed_won', total_value: 100, seller_id: 'v1', seller_name: 'João' },
      { id: '2', stage: 'closed_won', total_value: 200, seller_id: 'v1', seller_name: 'João' },
      { id: '3', stage: 'closed_won', total_value: 500, seller_id: 'v2', seller_name: 'Maria' },
    ]

    const resultado = agruparVendasPorVendedor(oportunidades)

    expect(resultado).toHaveLength(2)
    // Deve estar ordenado por valor decrescente
    expect(resultado[0].id).toBe('v2')
    expect(resultado[0].nome).toBe('Maria')
    expect(resultado[0].valor).toBe(500)
    expect(resultado[0].quantidade).toBe(1)

    expect(resultado[1].id).toBe('v1')
    expect(resultado[1].nome).toBe('João')
    expect(resultado[1].valor).toBe(300)
    expect(resultado[1].quantidade).toBe(2)
  })

  it('deve ignorar vendas sem vendedor', () => {
    const oportunidades: OportunidadeComVendedor[] = [
      { id: '1', stage: 'closed_won', total_value: 100, seller_id: 'v1', seller_name: 'João' },
      { id: '2', stage: 'closed_won', total_value: 200, seller_id: null, seller_name: null },
    ]

    const resultado = agruparVendasPorVendedor(oportunidades)

    expect(resultado).toHaveLength(1)
    expect(resultado[0].valor).toBe(100)
  })

  it('deve ignorar oportunidades que não são closed_won', () => {
    const oportunidades: OportunidadeComVendedor[] = [
      { id: '1', stage: 'closed_won', total_value: 100, seller_id: 'v1', seller_name: 'João' },
      { id: '2', stage: 'first_contact', total_value: 200, seller_id: 'v1', seller_name: 'João' },
      { id: '3', stage: 'closed_lost', total_value: 300, seller_id: 'v1', seller_name: 'João' },
    ]

    const resultado = agruparVendasPorVendedor(oportunidades)

    expect(resultado).toHaveLength(1)
    expect(resultado[0].valor).toBe(100)
    expect(resultado[0].quantidade).toBe(1)
  })
})

// ============================================================================
// TESTES - agruparVendasPorProduto
// ============================================================================

describe('agruparVendasPorProduto', () => {
  it('deve retornar array vazio quando não há vendas', () => {
    expect(agruparVendasPorProduto([])).toEqual([])
  })

  it('deve agrupar vendas por produto corretamente', () => {
    const oportunidades: OportunidadeComProdutos[] = [
      {
        id: '1',
        stage: 'closed_won',
        total_value: 300,
        produtos: [
          { product_id: 'p1', product_name: 'Produto A', quantity: 2, unit_price: 100 },
          { product_id: 'p2', product_name: 'Produto B', quantity: 1, unit_price: 100 },
        ],
      },
      {
        id: '2',
        stage: 'closed_won',
        total_value: 500,
        produtos: [{ product_id: 'p1', product_name: 'Produto A', quantity: 5, unit_price: 100 }],
      },
    ]

    const resultado = agruparVendasPorProduto(oportunidades)

    expect(resultado).toHaveLength(2)
    // Deve estar ordenado por valor decrescente
    // Produto A: (2*100) + (5*100) = 700
    // Produto B: 1*100 = 100
    expect(resultado[0].id).toBe('p1')
    expect(resultado[0].nome).toBe('Produto A')
    expect(resultado[0].valor).toBe(700)
    expect(resultado[0].quantidade).toBe(7)

    expect(resultado[1].id).toBe('p2')
    expect(resultado[1].nome).toBe('Produto B')
    expect(resultado[1].valor).toBe(100)
    expect(resultado[1].quantidade).toBe(1)
  })

  it('deve ignorar oportunidades que não são closed_won', () => {
    const oportunidades: OportunidadeComProdutos[] = [
      {
        id: '1',
        stage: 'closed_won',
        total_value: 200,
        produtos: [{ product_id: 'p1', product_name: 'Produto A', quantity: 2, unit_price: 100 }],
      },
      {
        id: '2',
        stage: 'first_contact',
        total_value: 500,
        produtos: [{ product_id: 'p1', product_name: 'Produto A', quantity: 5, unit_price: 100 }],
      },
    ]

    const resultado = agruparVendasPorProduto(oportunidades)

    expect(resultado).toHaveLength(1)
    expect(resultado[0].valor).toBe(200)
    expect(resultado[0].quantidade).toBe(2)
  })

  it('deve lidar com oportunidades sem produtos', () => {
    const oportunidades: OportunidadeComProdutos[] = [
      { id: '1', stage: 'closed_won', total_value: 0, produtos: [] },
    ]

    const resultado = agruparVendasPorProduto(oportunidades)

    expect(resultado).toEqual([])
  })
})

// ============================================================================
// TESTES - calcularValorPorEtapa
// ============================================================================

describe('calcularValorPorEtapa', () => {
  it('deve retornar todas as etapas com zero quando não há oportunidades', () => {
    const resultado = calcularValorPorEtapa([])

    expect(resultado).toHaveLength(6)
    resultado.forEach((etapa) => {
      expect(etapa.valor).toBe(0)
      expect(etapa.quantidade).toBe(0)
    })
  })

  it('deve calcular valor por etapa corretamente', () => {
    const oportunidades: OportunidadeCalculo[] = [
      { id: '1', stage: 'first_contact', total_value: 100 },
      { id: '2', stage: 'first_contact', total_value: 150 },
      { id: '3', stage: 'proposal', total_value: 200 },
      { id: '4', stage: 'closed_won', total_value: 500 },
      { id: '5', stage: 'closed_lost', total_value: 300 },
    ]

    const resultado = calcularValorPorEtapa(oportunidades)

    expect(resultado).toHaveLength(6)

    // Verifica first_contact
    const firstContact = resultado.find((e) => e.etapa === 'first_contact')
    expect(firstContact?.valor).toBe(250)
    expect(firstContact?.quantidade).toBe(2)
    expect(firstContact?.etapaLabel).toBe('1º Contato')

    // Verifica proposal
    const proposal = resultado.find((e) => e.etapa === 'proposal')
    expect(proposal?.valor).toBe(200)
    expect(proposal?.quantidade).toBe(1)

    // Verifica closed_won
    const closedWon = resultado.find((e) => e.etapa === 'closed_won')
    expect(closedWon?.valor).toBe(500)
    expect(closedWon?.quantidade).toBe(1)
    expect(closedWon?.etapaLabel).toBe('Venda Finalizada')

    // Verifica closed_lost
    const closedLost = resultado.find((e) => e.etapa === 'closed_lost')
    expect(closedLost?.valor).toBe(300)
    expect(closedLost?.quantidade).toBe(1)
    expect(closedLost?.etapaLabel).toBe('Desistiu')

    // Verifica etapas vazias
    const negotiation = resultado.find((e) => e.etapa === 'negotiation')
    expect(negotiation?.valor).toBe(0)
    expect(negotiation?.quantidade).toBe(0)
  })

  it('deve manter a ordem correta das etapas', () => {
    const resultado = calcularValorPorEtapa([])

    expect(resultado.map((e) => e.etapa)).toEqual(ETAPAS_FUNIL)
  })
})

// ============================================================================
// TESTES - formatarMesAno
// ============================================================================

describe('formatarMesAno', () => {
  it('deve formatar janeiro corretamente', () => {
    const data = new Date(2025, 0, 15) // Janeiro
    expect(formatarMesAno(data)).toBe('Jan/2025')
  })

  it('deve formatar dezembro corretamente', () => {
    const data = new Date(2025, 11, 15) // Dezembro
    expect(formatarMesAno(data)).toBe('Dez/2025')
  })

  it('deve formatar todos os meses do ano', () => {
    const esperado = [
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

    for (let mes = 0; mes < 12; mes++) {
      const data = new Date(2025, mes, 1)
      expect(formatarMesAno(data)).toBe(`${esperado[mes]}/2025`)
    }
  })
})

// ============================================================================
// TESTES - gerarListaMeses
// ============================================================================

describe('gerarListaMeses', () => {
  it('deve gerar lista com quantidade correta de meses', () => {
    const dataReferencia = new Date(2025, 5, 15) // Junho 2025
    const resultado = gerarListaMeses(6, dataReferencia)

    expect(resultado).toHaveLength(6)
  })

  it('deve gerar meses na ordem cronológica correta', () => {
    const dataReferencia = new Date(2025, 5, 15) // Junho 2025
    const resultado = gerarListaMeses(6, dataReferencia)

    expect(resultado).toEqual([
      'Jan/2025',
      'Fev/2025',
      'Mar/2025',
      'Abr/2025',
      'Mai/2025',
      'Jun/2025',
    ])
  })

  it('deve lidar com virada de ano', () => {
    const dataReferencia = new Date(2025, 1, 15) // Fevereiro 2025
    const resultado = gerarListaMeses(4, dataReferencia)

    expect(resultado).toEqual(['Nov/2024', 'Dez/2024', 'Jan/2025', 'Fev/2025'])
  })

  it('deve gerar 12 meses corretamente', () => {
    const dataReferencia = new Date(2025, 11, 15) // Dezembro 2025
    const resultado = gerarListaMeses(12, dataReferencia)

    expect(resultado).toHaveLength(12)
    expect(resultado[0]).toBe('Jan/2025')
    expect(resultado[11]).toBe('Dez/2025')
  })
})

// ============================================================================
// TESTES - agruparVendasPorMes
// ============================================================================

describe('agruparVendasPorMes', () => {
  it('deve retornar todos os meses com zero quando não há vendas', () => {
    const dataReferencia = new Date(2025, 5, 15) // Junho 2025
    const resultado = agruparVendasPorMes([], 6, dataReferencia)

    expect(resultado).toHaveLength(6)
    resultado.forEach((mes) => {
      expect(mes.valor).toBe(0)
      expect(mes.quantidade).toBe(0)
    })
  })

  it('deve agrupar vendas por mês corretamente', () => {
    const dataReferencia = new Date(2025, 5, 15) // Junho 2025
    const oportunidades: OportunidadeCalculo[] = [
      { id: '1', stage: 'closed_won', total_value: 100, closed_at: '2025-01-15T00:00:00Z' },
      { id: '2', stage: 'closed_won', total_value: 200, closed_at: '2025-01-20T00:00:00Z' },
      { id: '3', stage: 'closed_won', total_value: 500, closed_at: '2025-03-10T00:00:00Z' },
    ]

    const resultado = agruparVendasPorMes(oportunidades, 6, dataReferencia)

    expect(resultado).toHaveLength(6)

    const jan = resultado.find((m) => m.nome === 'Jan/2025')
    expect(jan?.valor).toBe(300)
    expect(jan?.quantidade).toBe(2)

    const mar = resultado.find((m) => m.nome === 'Mar/2025')
    expect(mar?.valor).toBe(500)
    expect(mar?.quantidade).toBe(1)

    const fev = resultado.find((m) => m.nome === 'Fev/2025')
    expect(fev?.valor).toBe(0)
    expect(fev?.quantidade).toBe(0)
  })

  it('deve manter ordem cronológica (não ordenar por valor)', () => {
    const dataReferencia = new Date(2025, 2, 15) // Março 2025
    const oportunidades: OportunidadeCalculo[] = [
      { id: '1', stage: 'closed_won', total_value: 1000, closed_at: '2025-01-15T00:00:00Z' },
      { id: '2', stage: 'closed_won', total_value: 100, closed_at: '2025-02-15T00:00:00Z' },
      { id: '3', stage: 'closed_won', total_value: 500, closed_at: '2025-03-15T00:00:00Z' },
    ]

    const resultado = agruparVendasPorMes(oportunidades, 3, dataReferencia)

    expect(resultado[0].nome).toBe('Jan/2025')
    expect(resultado[1].nome).toBe('Fev/2025')
    expect(resultado[2].nome).toBe('Mar/2025')
  })

  it('deve ignorar vendas fora do período', () => {
    const dataReferencia = new Date(2025, 2, 15) // Março 2025
    const oportunidades: OportunidadeCalculo[] = [
      { id: '1', stage: 'closed_won', total_value: 100, closed_at: '2025-01-15T00:00:00Z' },
      { id: '2', stage: 'closed_won', total_value: 200, closed_at: '2024-06-15T00:00:00Z' }, // Fora do período
    ]

    const resultado = agruparVendasPorMes(oportunidades, 3, dataReferencia)

    const total = resultado.reduce((acc, m) => acc + m.valor, 0)
    expect(total).toBe(100)
  })

  it('deve ignorar oportunidades que não são closed_won', () => {
    const dataReferencia = new Date(2025, 0, 31) // Janeiro 2025
    const oportunidades: OportunidadeCalculo[] = [
      { id: '1', stage: 'closed_won', total_value: 100, closed_at: '2025-01-15T00:00:00Z' },
      { id: '2', stage: 'first_contact', total_value: 200, closed_at: '2025-01-15T00:00:00Z' },
      { id: '3', stage: 'closed_lost', total_value: 300, closed_at: '2025-01-15T00:00:00Z' },
    ]

    const resultado = agruparVendasPorMes(oportunidades, 1, dataReferencia)

    expect(resultado[0].valor).toBe(100)
    expect(resultado[0].quantidade).toBe(1)
  })

  it('deve ignorar vendas sem closed_at', () => {
    const dataReferencia = new Date(2025, 0, 31) // Janeiro 2025
    const oportunidades: OportunidadeCalculo[] = [
      { id: '1', stage: 'closed_won', total_value: 100, closed_at: '2025-01-15T00:00:00Z' },
      { id: '2', stage: 'closed_won', total_value: 200, closed_at: null },
      { id: '3', stage: 'closed_won', total_value: 300 }, // sem closed_at
    ]

    const resultado = agruparVendasPorMes(oportunidades, 1, dataReferencia)

    expect(resultado[0].valor).toBe(100)
    expect(resultado[0].quantidade).toBe(1)
  })
})

// ============================================================================
// TESTES - formatarMoeda
// ============================================================================

describe('formatarMoeda', () => {
  it('deve formatar valor inteiro corretamente', () => {
    const resultado = formatarMoeda(1000)
    expect(resultado).toBe('R$ 1.000,00')
  })

  it('deve formatar valor decimal corretamente', () => {
    const resultado = formatarMoeda(1234.56)
    expect(resultado).toBe('R$ 1.234,56')
  })

  it('deve formatar zero', () => {
    const resultado = formatarMoeda(0)
    expect(resultado).toBe('R$ 0,00')
  })

  it('deve formatar valores negativos', () => {
    const resultado = formatarMoeda(-500.5)
    expect(resultado).toBe('-R$ 500,50')
  })

  it('deve formatar valores grandes', () => {
    const resultado = formatarMoeda(1000000.99)
    expect(resultado).toBe('R$ 1.000.000,99')
  })
})

// ============================================================================
// TESTES - formatarPorcentagem
// ============================================================================

describe('formatarPorcentagem', () => {
  it('deve formatar porcentagem corretamente', () => {
    const resultado = formatarPorcentagem(0.25)
    expect(resultado).toBe('25,0%')
  })

  it('deve formatar zero', () => {
    const resultado = formatarPorcentagem(0)
    expect(resultado).toBe('0,0%')
  })

  it('deve formatar 100%', () => {
    const resultado = formatarPorcentagem(1)
    expect(resultado).toBe('100,0%')
  })

  it('deve respeitar casas decimais', () => {
    const resultado = formatarPorcentagem(0.3333, 2)
    expect(resultado).toBe('33,33%')
  })

  it('deve lidar com valores maiores que 100%', () => {
    const resultado = formatarPorcentagem(1.5)
    expect(resultado).toBe('150,0%')
  })
})

// ============================================================================
// TESTES - calcularTaxaConversao
// ============================================================================

describe('calcularTaxaConversao', () => {
  it('deve retornar zero quando não há oportunidades', () => {
    expect(calcularTaxaConversao(0, 0)).toBe(0)
  })

  it('deve calcular taxa corretamente', () => {
    // 3 vendas de 10 oportunidades = 30%
    expect(calcularTaxaConversao(3, 10)).toBe(0.3)
  })

  it('deve retornar 1 quando todas converteram', () => {
    expect(calcularTaxaConversao(5, 5)).toBe(1)
  })

  it('deve retornar 0 quando nenhuma converteu', () => {
    expect(calcularTaxaConversao(0, 10)).toBe(0)
  })
})

// ============================================================================
// TESTES - calcularTaxaDesistencia
// ============================================================================

describe('calcularTaxaDesistencia', () => {
  it('deve retornar zero quando não há oportunidades fechadas', () => {
    expect(calcularTaxaDesistencia(0, 0)).toBe(0)
  })

  it('deve calcular taxa corretamente', () => {
    // 2 desistências de 10 fechadas = 20%
    expect(calcularTaxaDesistencia(2, 10)).toBe(0.2)
  })

  it('deve retornar 1 quando todas desistiram', () => {
    expect(calcularTaxaDesistencia(5, 5)).toBe(1)
  })

  it('deve retornar 0 quando nenhuma desistiu', () => {
    expect(calcularTaxaDesistencia(0, 10)).toBe(0)
  })
})

// ============================================================================
// TESTES - CONSTANTES
// ============================================================================

describe('ETAPAS_EM_NEGOCIACAO', () => {
  it('deve conter as 4 etapas ativas', () => {
    expect(ETAPAS_EM_NEGOCIACAO).toHaveLength(4)
    expect(ETAPAS_EM_NEGOCIACAO).toContain('first_contact')
    expect(ETAPAS_EM_NEGOCIACAO).toContain('proposal')
    expect(ETAPAS_EM_NEGOCIACAO).toContain('negotiation')
    expect(ETAPAS_EM_NEGOCIACAO).toContain('awaiting_payment')
  })

  it('não deve conter etapas finalizadas', () => {
    expect(ETAPAS_EM_NEGOCIACAO).not.toContain('closed_won')
    expect(ETAPAS_EM_NEGOCIACAO).not.toContain('closed_lost')
  })
})

describe('ETAPAS_FUNIL', () => {
  it('deve conter todas as 6 etapas', () => {
    expect(ETAPAS_FUNIL).toHaveLength(6)
  })

  it('deve estar na ordem correta do funil', () => {
    expect(ETAPAS_FUNIL).toEqual([
      'first_contact',
      'proposal',
      'negotiation',
      'awaiting_payment',
      'closed_won',
      'closed_lost',
    ])
  })
})
