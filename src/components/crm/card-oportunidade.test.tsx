import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  CardOportunidade,
  BadgeEtapa,
  CardOportunidadeCompacto,
  CardOportunidadeCompleto,
} from './card-oportunidade'
import type { OpportunityWithRelations, OpportunityStage } from '@/types/database'

// ============================================================================
// MOCK DATA
// ============================================================================

function criarOportunidadeMock(
  overrides: Partial<OpportunityWithRelations> = {}
): OpportunityWithRelations {
  return {
    id: 'opp-1',
    tenant_id: 'tenant-1',
    customer_id: 'customer-1',
    seller_id: 'seller-1',
    stage: 'negotiation' as OpportunityStage,
    total_value: 1500.5,
    notes: 'Observações de teste',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-12T15:30:00Z',
    closed_at: null,
    customer: {
      id: 'customer-1',
      tenant_id: 'tenant-1',
      seller_id: 'seller-1',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      whatsapp: '11999999999',
      address: 'Rua Teste, 123',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01234567',
      birth_date: '1990-05-15',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    },
    seller: {
      id: 'seller-1',
      tenant_id: 'tenant-1',
      name: 'Vendedor Teste',
      email: 'vendedor@teste.com',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    },
    products: [
      {
        id: 'op-1',
        opportunity_id: 'opp-1',
        product_id: 'prod-1',
        quantity: 2,
        unit_price: 500,
        created_at: '2026-01-10T10:00:00Z',
        product: {
          id: 'prod-1',
          tenant_id: 'tenant-1',
          name: 'Produto A',
          code: 'PROD-A',
          price: 500,
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
        },
      },
      {
        id: 'op-2',
        opportunity_id: 'opp-1',
        product_id: 'prod-2',
        quantity: 1,
        unit_price: 500.5,
        created_at: '2026-01-10T10:00:00Z',
        product: {
          id: 'prod-2',
          tenant_id: 'tenant-1',
          name: 'Produto B',
          code: null,
          price: 500.5,
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
        },
      },
    ],
    ...overrides,
  }
}

// ============================================================================
// BADGE ETAPA TESTS
// ============================================================================

describe('BadgeEtapa', () => {
  it('renders correct label for first_contact stage', () => {
    render(<BadgeEtapa etapa="first_contact" />)
    expect(screen.getByText('1º Contato')).toBeInTheDocument()
  })

  it('renders correct label for proposal stage', () => {
    render(<BadgeEtapa etapa="proposal" />)
    expect(screen.getByText('Elaboração de Proposta')).toBeInTheDocument()
  })

  it('renders correct label for negotiation stage', () => {
    render(<BadgeEtapa etapa="negotiation" />)
    expect(screen.getByText('Negociação')).toBeInTheDocument()
  })

  it('renders correct label for awaiting_payment stage', () => {
    render(<BadgeEtapa etapa="awaiting_payment" />)
    expect(screen.getByText('Aguardando Pagamento')).toBeInTheDocument()
  })

  it('renders correct label for closed_won stage', () => {
    render(<BadgeEtapa etapa="closed_won" />)
    expect(screen.getByText('Venda Finalizada')).toBeInTheDocument()
  })

  it('renders correct label for closed_lost stage', () => {
    render(<BadgeEtapa etapa="closed_lost" />)
    expect(screen.getByText('Desistiu')).toBeInTheDocument()
  })
})

// ============================================================================
// CARD OPORTUNIDADE COMPACTO TESTS
// ============================================================================

describe('CardOportunidadeCompacto', () => {
  it('renders customer name', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.getByText('Cliente Teste')).toBeInTheDocument()
  })

  it('renders formatted value in BRL', () => {
    const oportunidade = criarOportunidadeMock({ total_value: 1234.56 })
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument()
  })

  it('renders stage badge', () => {
    const oportunidade = criarOportunidadeMock({ stage: 'proposal' })
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.getByText('Elaboração de Proposta')).toBeInTheDocument()
  })

  it('renders seller name when seller exists', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.getByText('Vendedor Teste')).toBeInTheDocument()
  })

  it('does not render seller when seller is null', () => {
    const oportunidade = criarOportunidadeMock({ seller: null, seller_id: null })
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.queryByText('Vendedor Teste')).not.toBeInTheDocument()
  })

  it('renders product count when products exist', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.getByText('2 produtos')).toBeInTheDocument()
  })

  it('renders singular product text for single product', () => {
    const oportunidade = criarOportunidadeMock({
      products: [
        {
          id: 'op-1',
          opportunity_id: 'opp-1',
          product_id: 'prod-1',
          quantity: 1,
          unit_price: 100,
          created_at: '2026-01-10T10:00:00Z',
          product: {
            id: 'prod-1',
            tenant_id: 'tenant-1',
            name: 'Produto A',
            code: 'PROD-A',
            price: 100,
            created_at: '2026-01-01T00:00:00Z',
            updated_at: '2026-01-01T00:00:00Z',
          },
        },
      ],
    })
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.getByText('1 produto')).toBeInTheDocument()
  })

  it('does not render product count when no products', () => {
    const oportunidade = criarOportunidadeMock({ products: [] })
    render(<CardOportunidadeCompacto oportunidade={oportunidade} />)
    expect(screen.queryByText(/produto/)).not.toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const oportunidade = criarOportunidadeMock()
    const handleClick = vi.fn()
    render(<CardOportunidadeCompacto oportunidade={oportunidade} onClick={handleClick} />)

    fireEvent.click(screen.getByText('Cliente Teste'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick on Enter key', () => {
    const oportunidade = criarOportunidadeMock()
    const handleClick = vi.fn()
    render(<CardOportunidadeCompacto oportunidade={oportunidade} onClick={handleClick} />)

    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick on Space key', () => {
    const oportunidade = criarOportunidadeMock()
    const handleClick = vi.fn()
    render(<CardOportunidadeCompacto oportunidade={oportunidade} onClick={handleClick} />)

    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: ' ' })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

// ============================================================================
// CARD OPORTUNIDADE COMPLETO TESTS
// ============================================================================

describe('CardOportunidadeCompleto', () => {
  it('renders customer name as heading', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('Cliente Teste')).toBeInTheDocument()
  })

  it('renders customer email when available', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('cliente@teste.com')).toBeInTheDocument()
  })

  it('does not render customer email when not available', () => {
    const oportunidade = criarOportunidadeMock()
    oportunidade.customer.email = null
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.queryByText('cliente@teste.com')).not.toBeInTheDocument()
  })

  it('renders stage badge', () => {
    const oportunidade = criarOportunidadeMock({ stage: 'closed_won' })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('Venda Finalizada')).toBeInTheDocument()
  })

  it('renders formatted total value', () => {
    const oportunidade = criarOportunidadeMock({ total_value: 9999.99 })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('R$ 9.999,99')).toBeInTheDocument()
  })

  it('renders "Valor Total" label', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('Valor Total')).toBeInTheDocument()
  })

  it('renders seller name when seller exists', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('Vendedor Teste')).toBeInTheDocument()
    expect(screen.getByText('Vendedor Responsável')).toBeInTheDocument()
  })

  it('does not render seller section when seller is null', () => {
    const oportunidade = criarOportunidadeMock({ seller: null, seller_id: null })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.queryByText('Vendedor Responsável')).not.toBeInTheDocument()
  })

  it('renders product list with names', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('Produto A')).toBeInTheDocument()
    expect(screen.getByText('Produto B')).toBeInTheDocument()
  })

  it('renders product codes when available', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('PROD-A')).toBeInTheDocument()
  })

  it('renders product unit prices', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('R$ 500,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 500,50')).toBeInTheDocument()
  })

  it('renders product quantities', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('×2')).toBeInTheDocument()
    expect(screen.getByText('×1')).toBeInTheDocument()
  })

  it('renders products section header with count and total', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    // 2×500 + 1×500.50 = 1500.50
    expect(screen.getByText(/Produtos \(2\)/)).toBeInTheDocument()
  })

  it('does not render products section when no products', () => {
    const oportunidade = criarOportunidadeMock({ products: [] })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.queryByText(/Produtos \(/)).not.toBeInTheDocument()
  })

  it('renders notes when available', () => {
    const oportunidade = criarOportunidadeMock({ notes: 'Notas importantes aqui' })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText('Observações')).toBeInTheDocument()
    expect(screen.getByText('Notas importantes aqui')).toBeInTheDocument()
  })

  it('does not render notes section when notes is null', () => {
    const oportunidade = criarOportunidadeMock({ notes: null })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.queryByText('Observações')).not.toBeInTheDocument()
  })

  it('renders creation date', () => {
    const oportunidade = criarOportunidadeMock({ created_at: '2026-01-10T10:00:00Z' })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText(/Criado em 10\/01\/2026/)).toBeInTheDocument()
  })

  it('renders closed date when available', () => {
    const oportunidade = criarOportunidadeMock({ closed_at: '2026-01-15T10:00:00Z' })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.getByText(/Fechado em 15\/01\/2026/)).toBeInTheDocument()
  })

  it('does not render closed date when not available', () => {
    const oportunidade = criarOportunidadeMock({ closed_at: null })
    render(<CardOportunidadeCompleto oportunidade={oportunidade} />)
    expect(screen.queryByText(/Fechado em/)).not.toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const oportunidade = criarOportunidadeMock()
    const handleClick = vi.fn()
    render(<CardOportunidadeCompleto oportunidade={oportunidade} onClick={handleClick} />)

    fireEvent.click(screen.getByText('Cliente Teste'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

// ============================================================================
// CARD OPORTUNIDADE (MAIN COMPONENT) TESTS
// ============================================================================

describe('CardOportunidade', () => {
  it('renders compact version when compact prop is true', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidade oportunidade={oportunidade} compact />)

    // Compact version doesn't show "Valor Total" label
    expect(screen.queryByText('Valor Total')).not.toBeInTheDocument()
    // But shows the value
    expect(screen.getByText('R$ 1.500,50')).toBeInTheDocument()
  })

  it('renders full version when compact prop is false', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidade oportunidade={oportunidade} compact={false} />)

    // Full version shows "Valor Total" label
    expect(screen.getByText('Valor Total')).toBeInTheDocument()
  })

  it('renders full version by default (compact undefined)', () => {
    const oportunidade = criarOportunidadeMock()
    render(<CardOportunidade oportunidade={oportunidade} />)

    // Full version shows "Valor Total" label
    expect(screen.getByText('Valor Total')).toBeInTheDocument()
  })

  it('passes onClick to compact version', () => {
    const oportunidade = criarOportunidadeMock()
    const handleClick = vi.fn()
    render(<CardOportunidade oportunidade={oportunidade} compact onClick={handleClick} />)

    fireEvent.click(screen.getByText('Cliente Teste'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('passes onClick to full version', () => {
    const oportunidade = criarOportunidadeMock()
    const handleClick = vi.fn()
    render(<CardOportunidade oportunidade={oportunidade} onClick={handleClick} />)

    fireEvent.click(screen.getByText('Cliente Teste'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
