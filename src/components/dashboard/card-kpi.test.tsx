import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DollarSign, TrendingUp, Clock } from 'lucide-react'
import { CardKPI, CardKPISkeleton } from './card-kpi'

describe('CardKPI', () => {
  // --------------------------------------------------------------------------
  // Renderização básica
  // --------------------------------------------------------------------------

  describe('renderização', () => {
    it('deve renderizar título e valor', () => {
      render(<CardKPI titulo="Total de Vendas" valor="R$ 10.000,00" />)

      expect(screen.getByText('Total de Vendas')).toBeInTheDocument()
      expect(screen.getByText('R$ 10.000,00')).toBeInTheDocument()
    })

    it('deve renderizar descrição quando fornecida', () => {
      render(<CardKPI titulo="Total de Vendas" valor="R$ 10.000,00" descricao="15 vendas" />)

      expect(screen.getByText('15 vendas')).toBeInTheDocument()
    })

    it('não deve renderizar descrição quando não fornecida', () => {
      render(<CardKPI titulo="Total de Vendas" valor="R$ 10.000,00" />)

      expect(screen.queryByText('vendas')).not.toBeInTheDocument()
    })

    it('deve renderizar ícone quando fornecido', () => {
      const { container } = render(
        <CardKPI titulo="Total de Vendas" valor="R$ 10.000,00" icone={DollarSign} />
      )

      // Lucide icons renderizam como SVG
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('não deve renderizar ícone quando não fornecido', () => {
      const { container } = render(<CardKPI titulo="Total de Vendas" valor="R$ 10.000,00" />)

      const svg = container.querySelector('svg')
      expect(svg).not.toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Variantes
  // --------------------------------------------------------------------------

  describe('variantes', () => {
    it('deve aplicar variante default por padrão', () => {
      const { container } = render(
        <CardKPI titulo="Teste" valor="R$ 100,00" icone={DollarSign} />
      )

      // Verifica se o container do ícone tem a classe bg-primary-light
      const iconContainer = container.querySelector('.bg-primary-light')
      expect(iconContainer).toBeInTheDocument()
    })

    it('deve aplicar variante success', () => {
      const { container } = render(
        <CardKPI titulo="Teste" valor="R$ 100,00" icone={DollarSign} variante="success" />
      )

      const iconContainer = container.querySelector('.bg-success\\/10')
      expect(iconContainer).toBeInTheDocument()
    })

    it('deve aplicar variante warning', () => {
      const { container } = render(
        <CardKPI titulo="Teste" valor="R$ 100,00" icone={Clock} variante="warning" />
      )

      const iconContainer = container.querySelector('.bg-warning\\/10')
      expect(iconContainer).toBeInTheDocument()
    })

    it('deve aplicar variante error', () => {
      const { container } = render(
        <CardKPI titulo="Teste" valor="R$ 100,00" icone={TrendingUp} variante="error" />
      )

      const iconContainer = container.querySelector('.bg-error\\/10')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Estado de carregamento
  // --------------------------------------------------------------------------

  describe('estado de carregamento', () => {
    it('deve renderizar skeleton quando carregando=true', () => {
      render(<CardKPI titulo="Total de Vendas" valor="R$ 10.000,00" carregando={true} />)

      // Não deve exibir o conteúdo real
      expect(screen.queryByText('Total de Vendas')).not.toBeInTheDocument()
      expect(screen.queryByText('R$ 10.000,00')).not.toBeInTheDocument()

      // Deve ter elementos com animate-pulse (skeleton)
      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('deve renderizar conteúdo quando carregando=false', () => {
      render(<CardKPI titulo="Total de Vendas" valor="R$ 10.000,00" carregando={false} />)

      expect(screen.getByText('Total de Vendas')).toBeInTheDocument()
      expect(screen.getByText('R$ 10.000,00')).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Interatividade
  // --------------------------------------------------------------------------

  describe('interatividade', () => {
    it('deve chamar onClick quando clicado', () => {
      const handleClick = vi.fn()
      render(<CardKPI titulo="Teste" valor="R$ 100,00" onClick={handleClick} />)

      const card = screen.getByRole('button')
      fireEvent.click(card)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('não deve ter role button quando não há onClick', () => {
      render(<CardKPI titulo="Teste" valor="R$ 100,00" />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('deve responder a Enter quando tem onClick', () => {
      const handleClick = vi.fn()
      render(<CardKPI titulo="Teste" valor="R$ 100,00" onClick={handleClick} />)

      const card = screen.getByRole('button')
      fireEvent.keyDown(card, { key: 'Enter' })

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('deve responder a Space quando tem onClick', () => {
      const handleClick = vi.fn()
      render(<CardKPI titulo="Teste" valor="R$ 100,00" onClick={handleClick} />)

      const card = screen.getByRole('button')
      fireEvent.keyDown(card, { key: ' ' })

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('não deve responder a outras teclas', () => {
      const handleClick = vi.fn()
      render(<CardKPI titulo="Teste" valor="R$ 100,00" onClick={handleClick} />)

      const card = screen.getByRole('button')
      fireEvent.keyDown(card, { key: 'Escape' })

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('deve aplicar classe cursor-pointer quando clicável', () => {
      const { container } = render(
        <CardKPI titulo="Teste" valor="R$ 100,00" onClick={() => {}} />
      )

      const card = container.querySelector('.cursor-pointer')
      expect(card).toBeInTheDocument()
    })
  })

  // --------------------------------------------------------------------------
  // Classes CSS customizadas
  // --------------------------------------------------------------------------

  describe('classes CSS', () => {
    it('deve aplicar className adicional', () => {
      const { container } = render(
        <CardKPI titulo="Teste" valor="R$ 100,00" className="custom-class" />
      )

      const card = container.querySelector('.custom-class')
      expect(card).toBeInTheDocument()
    })
  })
})

describe('CardKPISkeleton', () => {
  it('deve renderizar elementos skeleton', () => {
    render(<CardKPISkeleton />)

    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('deve aplicar className adicional', () => {
    const { container } = render(<CardKPISkeleton className="custom-skeleton" />)

    const card = container.querySelector('.custom-skeleton')
    expect(card).toBeInTheDocument()
  })
})
