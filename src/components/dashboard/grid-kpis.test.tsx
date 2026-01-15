import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GridKPIs, ORDEM_KPIS, CONFIGURACAO_KPIS, TipoKPI } from './grid-kpis'
import type { DashboardKPIs } from '@/app/api/dashboard/kpis/route'

// ============================================================================
// MOCK DATA
// ============================================================================

const kpisMock: DashboardKPIs = {
  totalVendas: {
    valor: 15000.5,
    quantidade: 10,
  },
  ticketMedio: 1500.05,
  emNegociacao: {
    valor: 8500.0,
    quantidade: 5,
  },
  desistencias: {
    valor: 3200.0,
    quantidade: 3,
  },
}

const kpisZerados: DashboardKPIs = {
  totalVendas: {
    valor: 0,
    quantidade: 0,
  },
  ticketMedio: 0,
  emNegociacao: {
    valor: 0,
    quantidade: 0,
  },
  desistencias: {
    valor: 0,
    quantidade: 0,
  },
}

const kpisUnitarios: DashboardKPIs = {
  totalVendas: {
    valor: 1000,
    quantidade: 1,
  },
  ticketMedio: 1000,
  emNegociacao: {
    valor: 500,
    quantidade: 1,
  },
  desistencias: {
    valor: 200,
    quantidade: 1,
  },
}

// ============================================================================
// TESTS
// ============================================================================

describe('GridKPIs', () => {
  // --------------------------------------------------------------------------
  // Renderização
  // --------------------------------------------------------------------------

  describe('renderização', () => {
    it('deve renderizar todos os 4 KPIs', () => {
      render(<GridKPIs kpis={kpisMock} />)

      expect(screen.getByText('Total de Vendas')).toBeInTheDocument()
      expect(screen.getByText('Ticket Médio')).toBeInTheDocument()
      expect(screen.getByText('Em Negociação')).toBeInTheDocument()
      expect(screen.getByText('Desistências')).toBeInTheDocument()
    })

    it('deve renderizar valores formatados em BRL', () => {
      render(<GridKPIs kpis={kpisMock} />)

      // Total de Vendas: R$ 15.000,50
      expect(screen.getByText('R$ 15.000,50')).toBeInTheDocument()
      // Ticket Médio: R$ 1.500,05
      expect(screen.getByText('R$ 1.500,05')).toBeInTheDocument()
      // Em Negociação: R$ 8.500,00
      expect(screen.getByText('R$ 8.500,00')).toBeInTheDocument()
      // Desistências: R$ 3.200,00
      expect(screen.getByText('R$ 3.200,00')).toBeInTheDocument()
    })

    it('deve renderizar quantidades nas descrições', () => {
      render(<GridKPIs kpis={kpisMock} />)

      expect(screen.getByText('10 vendas')).toBeInTheDocument()
      expect(screen.getByText('por venda')).toBeInTheDocument()
      expect(screen.getByText('5 oportunidades')).toBeInTheDocument()
      expect(screen.getByText('3 oportunidades')).toBeInTheDocument()
    })

    it('deve usar singular para quantidade 1', () => {
      render(<GridKPIs kpis={kpisUnitarios} />)

      expect(screen.getByText('1 venda')).toBeInTheDocument()
      expect(screen.getByText('1 oportunidade')).toBeInTheDocument()
    })

    it('deve renderizar valores zerados corretamente', () => {
      render(<GridKPIs kpis={kpisZerados} />)

      // Todos os valores devem ser R$ 0,00
      const valoresZerados = screen.getAllByText('R$ 0,00')
      expect(valoresZerados).toHaveLength(4)

      // Quantidades zeradas
      expect(screen.getByText('0 vendas')).toBeInTheDocument()
      expect(screen.getByText('0 oportunidades')).toBeInTheDocument()
    })

    it('deve ter role region com aria-label', () => {
      render(<GridKPIs kpis={kpisMock} />)

      const region = screen.getByRole('region', { name: 'Indicadores de desempenho' })
      expect(region).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Estado de carregamento
  // --------------------------------------------------------------------------

  describe('estado de carregamento', () => {
    it('deve renderizar skeletons quando carregando=true', () => {
      render(<GridKPIs kpis={kpisMock} carregando={true} />)

      // Não deve mostrar valores reais
      expect(screen.queryByText('R$ 15.000,50')).not.toBeInTheDocument()

      // Deve ter skeletons
      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('deve renderizar skeletons quando kpis é null', () => {
      render(<GridKPIs kpis={null} />)

      // Deve ter skeletons
      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('deve renderizar 4 cards skeleton', () => {
      const { container } = render(<GridKPIs kpis={null} carregando={true} />)

      // Cada card tem elementos com animate-pulse
      // O grid deve ter 4 filhos (cards)
      const grid = container.querySelector('[role="region"]')
      expect(grid?.children).toHaveLength(4)
    })
  })

  // --------------------------------------------------------------------------
  // Interatividade
  // --------------------------------------------------------------------------

  describe('interatividade', () => {
    it('deve chamar onKPIClick com tipo correto ao clicar', () => {
      const handleClick = vi.fn()
      render(<GridKPIs kpis={kpisMock} onKPIClick={handleClick} />)

      // Clica no card "Total de Vendas"
      const totalVendasCard = screen.getByText('Total de Vendas').closest('[role="button"]')
      fireEvent.click(totalVendasCard!)

      expect(handleClick).toHaveBeenCalledWith('totalVendas')
    })

    it('deve chamar onKPIClick para cada KPI clicado', () => {
      const handleClick = vi.fn()
      render(<GridKPIs kpis={kpisMock} onKPIClick={handleClick} />)

      // Clica em cada card
      const cards = screen.getAllByRole('button')
      expect(cards).toHaveLength(4)

      fireEvent.click(cards[0]) // totalVendas
      fireEvent.click(cards[1]) // ticketMedio
      fireEvent.click(cards[2]) // emNegociacao
      fireEvent.click(cards[3]) // desistencias

      expect(handleClick).toHaveBeenCalledTimes(4)
      expect(handleClick).toHaveBeenNthCalledWith(1, 'totalVendas')
      expect(handleClick).toHaveBeenNthCalledWith(2, 'ticketMedio')
      expect(handleClick).toHaveBeenNthCalledWith(3, 'emNegociacao')
      expect(handleClick).toHaveBeenNthCalledWith(4, 'desistencias')
    })

    it('não deve ter cards clicáveis quando não há onKPIClick', () => {
      render(<GridKPIs kpis={kpisMock} />)

      const buttons = screen.queryAllByRole('button')
      expect(buttons).toHaveLength(0)
    })
  })

  // --------------------------------------------------------------------------
  // Classes CSS
  // --------------------------------------------------------------------------

  describe('classes CSS', () => {
    it('deve aplicar className adicional ao grid', () => {
      const { container } = render(<GridKPIs kpis={kpisMock} className="custom-grid" />)

      const grid = container.querySelector('.custom-grid')
      expect(grid).toBeInTheDocument()
    })

    it('deve usar grid responsivo', () => {
      const { container } = render(<GridKPIs kpis={kpisMock} />)

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('sm:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-4')
    })
  })
})

describe('CONFIGURACAO_KPIS', () => {
  it('deve ter configuração para todos os tipos de KPI', () => {
    const tipos: TipoKPI[] = ['totalVendas', 'ticketMedio', 'emNegociacao', 'desistencias']

    tipos.forEach((tipo) => {
      expect(CONFIGURACAO_KPIS[tipo]).toBeDefined()
      expect(CONFIGURACAO_KPIS[tipo].titulo).toBeTruthy()
      expect(CONFIGURACAO_KPIS[tipo].icone).toBeDefined()
      expect(CONFIGURACAO_KPIS[tipo].variante).toBeTruthy()
      expect(CONFIGURACAO_KPIS[tipo].getValor).toBeInstanceOf(Function)
      expect(CONFIGURACAO_KPIS[tipo].getDescricao).toBeInstanceOf(Function)
    })
  })
})

describe('ORDEM_KPIS', () => {
  it('deve ter 4 KPIs na ordem correta', () => {
    expect(ORDEM_KPIS).toHaveLength(4)
    expect(ORDEM_KPIS).toEqual(['totalVendas', 'ticketMedio', 'emNegociacao', 'desistencias'])
  })
})
