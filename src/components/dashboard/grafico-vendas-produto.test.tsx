import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  GraficoVendasProduto,
  GraficoVendasProdutoSkeleton,
  GraficoVendasProdutoVazio,
} from './grafico-vendas-produto'
import type { VendasPorProduto } from '@/app/api/dashboard/graficos/route'

// Mock do ResizeObserver
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
global.ResizeObserver = ResizeObserverMock

// Mock dos dados
const criarDadosMock = (quantidade: number = 4): VendasPorProduto[] => {
  return Array.from({ length: quantidade }, (_, i) => ({
    produtoId: `produto-${i + 1}`,
    produtoNome: `Produto ${i + 1}`,
    valor: (quantidade - i) * 3000, // Decrescente
    quantidade: (quantidade - i) * 10,
  }))
}

describe('GraficoVendasProduto', () => {
  describe('renderizacao', () => {
    it('deve renderizar o titulo do grafico', () => {
      const dados = criarDadosMock()
      render(<GraficoVendasProduto dados={dados} />)

      expect(screen.getByText('Vendas por Produto')).toBeInTheDocument()
    })

    it('deve exibir total e quantidade de produtos', () => {
      const dados = criarDadosMock(4)
      render(<GraficoVendasProduto dados={dados} />)

      expect(screen.getByText(/Total:/)).toBeInTheDocument()
      expect(screen.getByText(/4 produtos/)).toBeInTheDocument()
    })

    it('deve usar singular quando houver apenas um produto', () => {
      const dados = criarDadosMock(1)
      render(<GraficoVendasProduto dados={dados} />)

      expect(screen.getByText(/1 produto/)).toBeInTheDocument()
      expect(screen.queryByText(/produtos/)).not.toBeInTheDocument()
    })
  })

  describe('estado de carregamento', () => {
    it('deve renderizar skeleton quando carregando', () => {
      render(<GraficoVendasProduto dados={[]} carregando />)

      expect(screen.queryByText('Vendas por Produto')).not.toBeInTheDocument()
    })
  })

  describe('estado vazio', () => {
    it('deve mostrar estado vazio quando dados estao vazios', () => {
      render(<GraficoVendasProduto dados={[]} />)

      expect(screen.getByText('Nenhum produto vendido no período')).toBeInTheDocument()
    })

    it('deve mostrar estado vazio quando dados sao null', () => {
      // @ts-expect-error - Testando caso de dados null
      render(<GraficoVendasProduto dados={null} />)

      expect(screen.getByText('Nenhum produto vendido no período')).toBeInTheDocument()
    })
  })

  describe('agrupamento em "Outros"', () => {
    it('deve agrupar produtos alem dos 5 primeiros em "Outros"', () => {
      const dados = criarDadosMock(8)
      render(<GraficoVendasProduto dados={dados} />)

      // Deve mostrar o total correto (8 produtos no total)
      expect(screen.getByText(/8 produtos/)).toBeInTheDocument()
    })

    it('deve mostrar todos os produtos quando sao 6 ou menos', () => {
      const dados = criarDadosMock(6)
      render(<GraficoVendasProduto dados={dados} />)

      expect(screen.getByText(/6 produtos/)).toBeInTheDocument()
    })
  })

  describe('nomes longos', () => {
    it('deve aceitar nomes de produtos longos', () => {
      const dados: VendasPorProduto[] = [
        {
          produtoId: 'p1',
          produtoNome: 'Nome de Produto Muito Longo Que Precisa Ser Truncado',
          valor: 10000,
          quantidade: 50,
        },
      ]
      render(<GraficoVendasProduto dados={dados} />)

      expect(screen.getByText('Vendas por Produto')).toBeInTheDocument()
    })
  })
})

describe('GraficoVendasProdutoSkeleton', () => {
  it('deve renderizar sem erros', () => {
    const { container } = render(<GraficoVendasProdutoSkeleton />)

    const elementosAnimados = container.querySelectorAll('.animate-pulse')
    expect(elementosAnimados.length).toBeGreaterThan(0)
  })
})

describe('GraficoVendasProdutoVazio', () => {
  it('deve renderizar mensagem de estado vazio', () => {
    render(<GraficoVendasProdutoVazio />)

    expect(screen.getByText('Nenhum produto vendido no período')).toBeInTheDocument()
    expect(screen.getByText('Vendas por Produto')).toBeInTheDocument()
    expect(screen.getByText('Distribuição de vendas por produto')).toBeInTheDocument()
  })
})
