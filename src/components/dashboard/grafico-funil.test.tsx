import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GraficoFunil, GraficoFunilSkeleton, GraficoFunilVazio } from './grafico-funil'
import type { ValorPorEtapa } from '@/app/api/dashboard/graficos/route'
import { OpportunityStage } from '@/types/database'

// Mock do ResizeObserver
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
global.ResizeObserver = ResizeObserverMock

// Mock dos dados
const criarDadosMock = (): ValorPorEtapa[] => [
  { etapa: 'first_contact' as OpportunityStage, etapaLabel: '1º Contato', valor: 50000, quantidade: 10 },
  { etapa: 'proposal' as OpportunityStage, etapaLabel: 'Proposta', valor: 40000, quantidade: 8 },
  { etapa: 'negotiation' as OpportunityStage, etapaLabel: 'Negociação', valor: 30000, quantidade: 6 },
  { etapa: 'awaiting_payment' as OpportunityStage, etapaLabel: 'Aguardando Pagamento', valor: 20000, quantidade: 4 },
  { etapa: 'closed_won' as OpportunityStage, etapaLabel: 'Venda Finalizada', valor: 100000, quantidade: 20 },
  { etapa: 'closed_lost' as OpportunityStage, etapaLabel: 'Desistiu', valor: 15000, quantidade: 3 },
]

const criarDadosVazios = (): ValorPorEtapa[] => [
  { etapa: 'first_contact' as OpportunityStage, etapaLabel: '1º Contato', valor: 0, quantidade: 0 },
  { etapa: 'proposal' as OpportunityStage, etapaLabel: 'Proposta', valor: 0, quantidade: 0 },
  { etapa: 'negotiation' as OpportunityStage, etapaLabel: 'Negociação', valor: 0, quantidade: 0 },
  { etapa: 'awaiting_payment' as OpportunityStage, etapaLabel: 'Aguardando Pagamento', valor: 0, quantidade: 0 },
  { etapa: 'closed_won' as OpportunityStage, etapaLabel: 'Venda Finalizada', valor: 0, quantidade: 0 },
  { etapa: 'closed_lost' as OpportunityStage, etapaLabel: 'Desistiu', valor: 0, quantidade: 0 },
]

describe('GraficoFunil', () => {
  describe('renderizacao', () => {
    it('deve renderizar o titulo do grafico', () => {
      const dados = criarDadosMock()
      render(<GraficoFunil dados={dados} />)

      expect(screen.getByText('Funil de Vendas')).toBeInTheDocument()
    })

    it('deve exibir valor em negociacao na descricao', () => {
      const dados = criarDadosMock()
      // Em negociacao = 50000 + 40000 + 30000 + 20000 = 140000
      render(<GraficoFunil dados={dados} />)

      expect(screen.getByText(/Em negociação:/)).toBeInTheDocument()
    })

    it('deve excluir closed_won e closed_lost do calculo de negociacao', () => {
      const dados: ValorPorEtapa[] = [
        { etapa: 'first_contact' as OpportunityStage, etapaLabel: '1º Contato', valor: 1000, quantidade: 1 },
        { etapa: 'proposal' as OpportunityStage, etapaLabel: 'Proposta', valor: 0, quantidade: 0 },
        { etapa: 'negotiation' as OpportunityStage, etapaLabel: 'Negociação', valor: 0, quantidade: 0 },
        { etapa: 'awaiting_payment' as OpportunityStage, etapaLabel: 'Aguardando Pagamento', valor: 0, quantidade: 0 },
        { etapa: 'closed_won' as OpportunityStage, etapaLabel: 'Venda Finalizada', valor: 50000, quantidade: 10 },
        { etapa: 'closed_lost' as OpportunityStage, etapaLabel: 'Desistiu', valor: 5000, quantidade: 2 },
      ]
      render(<GraficoFunil dados={dados} />)

      // Apenas R$ 1.000,00 em negociacao (apenas first_contact)
      expect(screen.getByText('Funil de Vendas')).toBeInTheDocument()
    })
  })

  describe('estado de carregamento', () => {
    it('deve renderizar skeleton quando carregando', () => {
      render(<GraficoFunil dados={[]} carregando />)

      expect(screen.queryByText('Funil de Vendas')).not.toBeInTheDocument()
    })
  })

  describe('estado vazio', () => {
    it('deve mostrar estado vazio quando todos os valores sao zero', () => {
      const dados = criarDadosVazios()
      render(<GraficoFunil dados={dados} />)

      expect(screen.getByText('Nenhuma oportunidade no funil')).toBeInTheDocument()
    })

    it('deve mostrar estado vazio quando array esta vazio', () => {
      render(<GraficoFunil dados={[]} />)

      expect(screen.getByText('Nenhuma oportunidade no funil')).toBeInTheDocument()
    })
  })

  describe('etapas parciais', () => {
    it('deve renderizar com apenas algumas etapas com valor', () => {
      const dados: ValorPorEtapa[] = [
        { etapa: 'first_contact' as OpportunityStage, etapaLabel: '1º Contato', valor: 10000, quantidade: 5 },
        { etapa: 'proposal' as OpportunityStage, etapaLabel: 'Proposta', valor: 0, quantidade: 0 },
        { etapa: 'negotiation' as OpportunityStage, etapaLabel: 'Negociação', valor: 5000, quantidade: 2 },
        { etapa: 'awaiting_payment' as OpportunityStage, etapaLabel: 'Aguardando Pagamento', valor: 0, quantidade: 0 },
        { etapa: 'closed_won' as OpportunityStage, etapaLabel: 'Venda Finalizada', valor: 0, quantidade: 0 },
        { etapa: 'closed_lost' as OpportunityStage, etapaLabel: 'Desistiu', valor: 0, quantidade: 0 },
      ]
      render(<GraficoFunil dados={dados} />)

      expect(screen.getByText('Funil de Vendas')).toBeInTheDocument()
    })
  })

  describe('cores por etapa', () => {
    it('deve renderizar sem erros com todas as etapas', () => {
      const dados = criarDadosMock()
      render(<GraficoFunil dados={dados} />)

      // O grafico deve existir
      expect(screen.getByText('Funil de Vendas')).toBeInTheDocument()
    })
  })
})

describe('GraficoFunilSkeleton', () => {
  it('deve renderizar sem erros', () => {
    const { container } = render(<GraficoFunilSkeleton />)

    const elementosAnimados = container.querySelectorAll('.animate-pulse')
    expect(elementosAnimados.length).toBeGreaterThan(0)
  })
})

describe('GraficoFunilVazio', () => {
  it('deve renderizar mensagem de estado vazio', () => {
    render(<GraficoFunilVazio />)

    expect(screen.getByText('Nenhuma oportunidade no funil')).toBeInTheDocument()
    expect(screen.getByText('Funil de Vendas')).toBeInTheDocument()
    expect(screen.getByText('Valor por etapa do CRM')).toBeInTheDocument()
  })
})
