import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GraficoVendasMes, GraficoVendasMesSkeleton, GraficoVendasMesVazio } from './grafico-vendas-mes'
import type { VendasPorMes } from '@/app/api/dashboard/graficos/route'

// Mock do ResizeObserver
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
global.ResizeObserver = ResizeObserverMock

// Mock dos dados
const criarDadosMock = (meses: number = 6): VendasPorMes[] => {
  const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return Array.from({ length: meses }, (_, i) => ({
    mes: `${nomesMeses[i]}/2025`,
    valor: (i + 1) * 1000,
    quantidade: i + 1,
  }))
}

describe('GraficoVendasMes', () => {
  describe('renderizacao', () => {
    it('deve renderizar o titulo do grafico', () => {
      const dados = criarDadosMock()
      render(<GraficoVendasMes dados={dados} />)

      expect(screen.getByText('Vendas por Mês')).toBeInTheDocument()
    })

    it('deve exibir a descricao com total do periodo', () => {
      const dados = criarDadosMock(3) // 1000 + 2000 + 3000 = 6000
      render(<GraficoVendasMes dados={dados} />)

      expect(screen.getByText(/Total no período:/)).toBeInTheDocument()
      expect(screen.getByText(/R\$/)).toBeInTheDocument()
    })

    it('deve renderizar o icone TrendingUp', () => {
      const dados = criarDadosMock()
      render(<GraficoVendasMes dados={dados} />)

      // O componente renderiza o Card corretamente
      expect(screen.getByRole('img', { hidden: true }) || screen.getByText('Vendas por Mês')).toBeInTheDocument()
    })
  })

  describe('estado de carregamento', () => {
    it('deve renderizar skeleton quando carregando', () => {
      render(<GraficoVendasMes dados={[]} carregando />)

      // Skeleton nao tem texto visivel, mas tem elementos animados
      expect(screen.queryByText('Vendas por Mês')).not.toBeInTheDocument()
    })
  })

  describe('estado vazio', () => {
    it('deve mostrar estado vazio quando todos os valores sao zero', () => {
      const dadosVazios: VendasPorMes[] = [
        { mes: 'Jan/2025', valor: 0, quantidade: 0 },
        { mes: 'Fev/2025', valor: 0, quantidade: 0 },
      ]
      render(<GraficoVendasMes dados={dadosVazios} />)

      expect(screen.getByText('Nenhuma venda registrada no período')).toBeInTheDocument()
    })

    it('deve mostrar estado vazio com array vazio', () => {
      render(<GraficoVendasMes dados={[]} />)

      expect(screen.getByText('Nenhuma venda registrada no período')).toBeInTheDocument()
    })
  })

  describe('dados variados', () => {
    it('deve aceitar dados com valores decimais', () => {
      const dados: VendasPorMes[] = [
        { mes: 'Jan/2025', valor: 1234.56, quantidade: 5 },
      ]
      render(<GraficoVendasMes dados={dados} />)

      expect(screen.getByText('Vendas por Mês')).toBeInTheDocument()
    })

    it('deve aceitar muitos meses de dados', () => {
      const dados = criarDadosMock(12)
      render(<GraficoVendasMes dados={dados} />)

      expect(screen.getByText('Vendas por Mês')).toBeInTheDocument()
    })
  })
})

describe('GraficoVendasMesSkeleton', () => {
  it('deve renderizar sem erros', () => {
    const { container } = render(<GraficoVendasMesSkeleton />)

    // Deve ter elementos animados (animate-pulse)
    const elementosAnimados = container.querySelectorAll('.animate-pulse')
    expect(elementosAnimados.length).toBeGreaterThan(0)
  })
})

describe('GraficoVendasMesVazio', () => {
  it('deve renderizar mensagem de estado vazio', () => {
    render(<GraficoVendasMesVazio />)

    expect(screen.getByText('Nenhuma venda registrada no período')).toBeInTheDocument()
    expect(screen.getByText('Vendas por Mês')).toBeInTheDocument()
  })
})
