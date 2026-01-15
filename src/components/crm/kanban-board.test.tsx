import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KanbanBoard } from './kanban-board'
import type { OpportunityWithRelations, OpportunityStage } from '@/types/database'

// ============================================================================
// MOCK DATA
// ============================================================================

function criarOportunidadeMock(
  overrides: Partial<OpportunityWithRelations> & { id?: string } = {}
): OpportunityWithRelations {
  const id = overrides.id || 'opp-1'
  return {
    id,
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
        opportunity_id: id,
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
    ],
    ...overrides,
  }
}

function criarOportunidadesPorEtapaVazias(): Record<OpportunityStage, OpportunityWithRelations[]> {
  return {
    first_contact: [],
    proposal: [],
    negotiation: [],
    awaiting_payment: [],
    closed_won: [],
    closed_lost: [],
  }
}

function criarTotaisPorEtapaZerados(): Record<OpportunityStage, number> {
  return {
    first_contact: 0,
    proposal: 0,
    negotiation: 0,
    awaiting_payment: 0,
    closed_won: 0,
    closed_lost: 0,
  }
}

// ============================================================================
// KANBAN BOARD TESTS
// ============================================================================

describe('KanbanBoard', () => {
  it('renders loading state with spinner', () => {
    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={true}
      />
    )

    // Loading state should show a spinner (Loader2 component)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('does not render columns when loading', () => {
    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={true}
      />
    )

    expect(screen.queryByText('1º Contato')).not.toBeInTheDocument()
    expect(screen.queryByText('Negociação')).not.toBeInTheDocument()
  })

  it('renders all 6 stage columns', () => {
    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    expect(screen.getByText('1º Contato')).toBeInTheDocument()
    expect(screen.getByText('Elaboração de Proposta')).toBeInTheDocument()
    expect(screen.getByText('Negociação')).toBeInTheDocument()
    expect(screen.getByText('Aguardando Pagamento')).toBeInTheDocument()
    expect(screen.getByText('Venda Finalizada')).toBeInTheDocument()
    expect(screen.getByText('Desistiu')).toBeInTheDocument()
  })

  it('renders columns in correct order', () => {
    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    const columnHeaders = screen.getAllByRole('heading', { level: 3 })
    const expectedOrder = [
      '1º Contato',
      'Elaboração de Proposta',
      'Negociação',
      'Aguardando Pagamento',
      'Venda Finalizada',
      'Desistiu',
    ]

    columnHeaders.forEach((header, index) => {
      expect(header.textContent).toBe(expectedOrder[index])
    })
  })

  it('renders opportunities in correct columns', () => {
    const oportunidadesPorEtapa = criarOportunidadesPorEtapaVazias()
    oportunidadesPorEtapa.first_contact = [
      criarOportunidadeMock({
        id: 'opp-1',
        stage: 'first_contact',
        customer: { ...criarOportunidadeMock().customer, name: 'Cliente Primeiro Contato' },
      }),
    ]
    oportunidadesPorEtapa.negotiation = [
      criarOportunidadeMock({
        id: 'opp-2',
        stage: 'negotiation',
        customer: { ...criarOportunidadeMock().customer, name: 'Cliente Negociação' },
      }),
    ]

    render(
      <KanbanBoard
        oportunidadesPorEtapa={oportunidadesPorEtapa}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    expect(screen.getByText('Cliente Primeiro Contato')).toBeInTheDocument()
    expect(screen.getByText('Cliente Negociação')).toBeInTheDocument()
  })

  it('renders totals in each column', () => {
    const totaisPorEtapa = criarTotaisPorEtapaZerados()
    totaisPorEtapa.first_contact = 1000
    totaisPorEtapa.negotiation = 2500.50
    totaisPorEtapa.closed_won = 10000

    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={totaisPorEtapa}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.500,50')).toBeInTheDocument()
    expect(screen.getByText('R$ 10.000,00')).toBeInTheDocument()
  })

  it('renders opportunity counts in column badges', () => {
    const oportunidadesPorEtapa = criarOportunidadesPorEtapaVazias()
    oportunidadesPorEtapa.first_contact = [
      criarOportunidadeMock({ id: 'opp-1' }),
      criarOportunidadeMock({ id: 'opp-2' }),
    ]
    oportunidadesPorEtapa.negotiation = [
      criarOportunidadeMock({ id: 'opp-3' }),
      criarOportunidadeMock({ id: 'opp-4' }),
      criarOportunidadeMock({ id: 'opp-5' }),
    ]

    render(
      <KanbanBoard
        oportunidadesPorEtapa={oportunidadesPorEtapa}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    // Check that count badges are rendered (2 and 3)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('handles empty opportunities gracefully', () => {
    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    // All columns should show 0 count
    const zeroBadges = screen.getAllByText('0')
    expect(zeroBadges.length).toBe(6) // One per column
  })

  it('renders empty state in empty columns', () => {
    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    // All empty columns should show the empty state message
    const emptyMessages = screen.getAllByText(/Arraste oportunidades/)
    expect(emptyMessages.length).toBe(6)
  })

  it('does not show empty state in columns with opportunities', () => {
    const oportunidadesPorEtapa = criarOportunidadesPorEtapaVazias()
    oportunidadesPorEtapa.first_contact = [criarOportunidadeMock({ id: 'opp-1' })]

    render(
      <KanbanBoard
        oportunidadesPorEtapa={oportunidadesPorEtapa}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    // Only 5 empty columns should show empty state (first_contact has an opportunity)
    const emptyMessages = screen.getAllByText(/Arraste oportunidades/)
    expect(emptyMessages.length).toBe(5)
  })

  it('defaults to not loading when carregando is not provided', () => {
    render(
      <KanbanBoard
        oportunidadesPorEtapa={criarOportunidadesPorEtapaVazias()}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
      />
    )

    // Should render columns, not loading spinner
    expect(screen.getByText('1º Contato')).toBeInTheDocument()
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).not.toBeInTheDocument()
  })

  it('renders multiple opportunities in the same column', () => {
    const oportunidadesPorEtapa = criarOportunidadesPorEtapaVazias()
    oportunidadesPorEtapa.negotiation = [
      criarOportunidadeMock({
        id: 'opp-1',
        customer: { ...criarOportunidadeMock().customer, name: 'Cliente A' },
        total_value: 1000,
      }),
      criarOportunidadeMock({
        id: 'opp-2',
        customer: { ...criarOportunidadeMock().customer, name: 'Cliente B' },
        total_value: 2000,
      }),
      criarOportunidadeMock({
        id: 'opp-3',
        customer: { ...criarOportunidadeMock().customer, name: 'Cliente C' },
        total_value: 3000,
      }),
    ]

    render(
      <KanbanBoard
        oportunidadesPorEtapa={oportunidadesPorEtapa}
        totaisPorEtapa={{ ...criarTotaisPorEtapaZerados(), negotiation: 6000 }}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    expect(screen.getByText('Cliente A')).toBeInTheDocument()
    expect(screen.getByText('Cliente B')).toBeInTheDocument()
    expect(screen.getByText('Cliente C')).toBeInTheDocument()
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 3.000,00')).toBeInTheDocument()
  })

  it('renders opportunity card details correctly', () => {
    const oportunidadesPorEtapa = criarOportunidadesPorEtapaVazias()
    oportunidadesPorEtapa.proposal = [
      criarOportunidadeMock({
        id: 'opp-1',
        customer: { ...criarOportunidadeMock().customer, name: 'Cliente Especial' },
        seller: { ...criarOportunidadeMock().seller!, name: 'Vendedor Top' },
        total_value: 9999.99,
        products: [
          {
            id: 'op-1',
            opportunity_id: 'opp-1',
            product_id: 'prod-1',
            quantity: 1,
            unit_price: 9999.99,
            created_at: '2026-01-10T10:00:00Z',
            product: {
              id: 'prod-1',
              tenant_id: 'tenant-1',
              name: 'Produto Premium',
              code: 'PREMIUM',
              price: 9999.99,
              created_at: '2026-01-01T00:00:00Z',
              updated_at: '2026-01-01T00:00:00Z',
            },
          },
        ],
      }),
    ]

    render(
      <KanbanBoard
        oportunidadesPorEtapa={oportunidadesPorEtapa}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    expect(screen.getByText('Cliente Especial')).toBeInTheDocument()
    expect(screen.getByText('Vendedor Top')).toBeInTheDocument()
    expect(screen.getByText('R$ 9.999,99')).toBeInTheDocument()
    expect(screen.getByText('1 produto')).toBeInTheDocument()
  })

  it('renders cards without seller correctly', () => {
    const oportunidadesPorEtapa = criarOportunidadesPorEtapaVazias()
    oportunidadesPorEtapa.first_contact = [
      criarOportunidadeMock({
        id: 'opp-1',
        seller: null,
        seller_id: null,
      }),
    ]

    render(
      <KanbanBoard
        oportunidadesPorEtapa={oportunidadesPorEtapa}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    // Should still render customer name
    expect(screen.getByText('Cliente Teste')).toBeInTheDocument()
    // Should not render seller (checking that "Vendedor Teste" doesn't appear)
    expect(screen.queryByText('Vendedor Teste')).not.toBeInTheDocument()
  })

  it('renders cards without products correctly', () => {
    const oportunidadesPorEtapa = criarOportunidadesPorEtapaVazias()
    oportunidadesPorEtapa.first_contact = [
      criarOportunidadeMock({
        id: 'opp-1',
        products: [],
        total_value: 0,
      }),
    ]

    render(
      <KanbanBoard
        oportunidadesPorEtapa={oportunidadesPorEtapa}
        totaisPorEtapa={criarTotaisPorEtapaZerados()}
        onMoverOportunidade={vi.fn()}
        onCardClick={vi.fn()}
        carregando={false}
      />
    )

    // Should render customer name and value
    expect(screen.getByText('Cliente Teste')).toBeInTheDocument()
    // Should not show product count
    expect(screen.queryByText(/produto/)).not.toBeInTheDocument()
  })
})
