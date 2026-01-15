import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  GraficoVendasVendedor,
  GraficoVendasVendedorSkeleton,
  GraficoVendasVendedorVazio,
} from './grafico-vendas-vendedor'
import type { VendasPorVendedor } from '@/app/api/dashboard/graficos/route'

// Mock do ResizeObserver
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
global.ResizeObserver = ResizeObserverMock

// Mock dos dados
const criarDadosMock = (quantidade: number = 3): VendasPorVendedor[] => {
  return Array.from({ length: quantidade }, (_, i) => ({
    vendedorId: `vendedor-${i + 1}`,
    vendedorNome: `Vendedor ${i + 1}`,
    valor: (quantidade - i) * 5000, // Decrescente
    quantidade: (quantidade - i) * 2,
  }))
}

describe('GraficoVendasVendedor', () => {
  describe('renderizacao', () => {
    it('deve renderizar o titulo do grafico', () => {
      const dados = criarDadosMock()
      render(<GraficoVendasVendedor dados={dados} />)

      expect(screen.getByText('Vendas por Vendedor')).toBeInTheDocument()
    })

    it('deve exibir total e quantidade de vendedores', () => {
      const dados = criarDadosMock(3) // 15000 + 10000 + 5000 = 30000
      render(<GraficoVendasVendedor dados={dados} />)

      expect(screen.getByText(/Total:/)).toBeInTheDocument()
      expect(screen.getByText(/3 vendedores/)).toBeInTheDocument()
    })

    it('deve usar singular quando houver apenas um vendedor', () => {
      const dados = criarDadosMock(1)
      render(<GraficoVendasVendedor dados={dados} />)

      expect(screen.getByText(/1 vendedor/)).toBeInTheDocument()
      expect(screen.queryByText(/vendedores/)).not.toBeInTheDocument()
    })
  })

  describe('estado de carregamento', () => {
    it('deve renderizar skeleton quando carregando', () => {
      render(<GraficoVendasVendedor dados={[]} carregando />)

      expect(screen.queryByText('Vendas por Vendedor')).not.toBeInTheDocument()
    })
  })

  describe('estado vazio', () => {
    it('deve mostrar estado vazio quando dados estao vazios', () => {
      render(<GraficoVendasVendedor dados={[]} />)

      expect(screen.getByText('Nenhuma venda com vendedor atribuído')).toBeInTheDocument()
    })

    it('deve mostrar estado vazio quando dados sao null', () => {
      // @ts-expect-error - Testando caso de dados null
      render(<GraficoVendasVendedor dados={null} />)

      expect(screen.getByText('Nenhuma venda com vendedor atribuído')).toBeInTheDocument()
    })
  })

  describe('truncamento de nomes', () => {
    it('deve truncar nomes longos de vendedores', () => {
      const dados: VendasPorVendedor[] = [
        {
          vendedorId: 'v1',
          vendedorNome: 'Nome Muito Longo do Vendedor Completo',
          valor: 10000,
          quantidade: 5,
        },
      ]
      render(<GraficoVendasVendedor dados={dados} />)

      // O grafico deve renderizar sem erros mesmo com nomes longos
      expect(screen.getByText('Vendas por Vendedor')).toBeInTheDocument()
    })
  })

  describe('limite de vendedores', () => {
    it('deve aceitar mais de 10 vendedores', () => {
      const dados = criarDadosMock(15)
      render(<GraficoVendasVendedor dados={dados} />)

      // Deve mostrar o total correto (15 vendedores)
      expect(screen.getByText(/15 vendedores/)).toBeInTheDocument()
    })
  })
})

describe('GraficoVendasVendedorSkeleton', () => {
  it('deve renderizar sem erros', () => {
    const { container } = render(<GraficoVendasVendedorSkeleton />)

    const elementosAnimados = container.querySelectorAll('.animate-pulse')
    expect(elementosAnimados.length).toBeGreaterThan(0)
  })
})

describe('GraficoVendasVendedorVazio', () => {
  it('deve renderizar mensagem de estado vazio', () => {
    render(<GraficoVendasVendedorVazio />)

    expect(screen.getByText('Nenhuma venda com vendedor atribuído')).toBeInTheDocument()
    expect(screen.getByText('Vendas por Vendedor')).toBeInTheDocument()
    expect(screen.getByText('Performance da equipe de vendas')).toBeInTheDocument()
  })
})
