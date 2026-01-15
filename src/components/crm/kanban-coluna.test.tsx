import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DragDropContext } from '@hello-pangea/dnd'
import { KanbanColuna } from './kanban-coluna'
import type { OpportunityWithRelations, OpportunityStage } from '@/types/database'
import type { ReactNode } from 'react'

// ============================================================================
// MOCK DND CONTEXT WRAPPER
// ============================================================================

function DndWrapper({ children }: { children: ReactNode }): ReactNode {
  return (
    <DragDropContext onDragEnd={() => {}}>
      {children}
    </DragDropContext>
  )
}

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

// ============================================================================
// KANBAN COLUNA TESTS
// ============================================================================

describe('KanbanColuna', () => {
  it('renders column with stage label', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="first_contact"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('1º Contato')).toBeInTheDocument()
  })

  it('renders correct label for proposal stage', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="proposal"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('Elaboração de Proposta')).toBeInTheDocument()
  })

  it('renders correct label for negotiation stage', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('Negociação')).toBeInTheDocument()
  })

  it('renders correct label for awaiting_payment stage', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="awaiting_payment"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('Aguardando Pagamento')).toBeInTheDocument()
  })

  it('renders correct label for closed_won stage', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="closed_won"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('Venda Finalizada')).toBeInTheDocument()
  })

  it('renders correct label for closed_lost stage', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="closed_lost"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('Desistiu')).toBeInTheDocument()
  })

  it('renders opportunity count badge', () => {
    const oportunidades = [
      criarOportunidadeMock({ id: 'opp-1' }),
      criarOportunidadeMock({ id: 'opp-2' }),
      criarOportunidadeMock({ id: 'opp-3' }),
    ]

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={oportunidades}
          total={4500}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders formatted total value in BRL', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={[]}
          total={12345.67}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('R$ 12.345,67')).toBeInTheDocument()
  })

  it('renders zero total value', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="first_contact"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('R$ 0,00')).toBeInTheDocument()
  })

  it('renders empty state when no opportunities', () => {
    render(
      <DndWrapper>
        <KanbanColuna
          etapa="first_contact"
          oportunidades={[]}
          total={0}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText(/Arraste oportunidades/)).toBeInTheDocument()
    expect(screen.getByText(/para cá/)).toBeInTheDocument()
  })

  it('renders opportunity cards with customer names', () => {
    const oportunidades = [
      criarOportunidadeMock({
        id: 'opp-1',
        customer: {
          ...criarOportunidadeMock().customer,
          name: 'Cliente Alpha'
        }
      }),
      criarOportunidadeMock({
        id: 'opp-2',
        customer: {
          ...criarOportunidadeMock().customer,
          name: 'Cliente Beta'
        }
      }),
    ]

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={oportunidades}
          total={3000}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('Cliente Alpha')).toBeInTheDocument()
    expect(screen.getByText('Cliente Beta')).toBeInTheDocument()
  })

  it('renders opportunity card values', () => {
    const oportunidades = [
      criarOportunidadeMock({ id: 'opp-1', total_value: 1000 }),
      criarOportunidadeMock({ id: 'opp-2', total_value: 2500.50 }),
    ]

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={oportunidades}
          total={3500.50}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.500,50')).toBeInTheDocument()
  })

  it('renders seller name on cards when seller exists', () => {
    const oportunidades = [
      criarOportunidadeMock({ id: 'opp-1' }),
    ]

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={oportunidades}
          total={1500}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('Vendedor Teste')).toBeInTheDocument()
  })

  it('renders product count on cards', () => {
    const oportunidades = [
      criarOportunidadeMock({
        id: 'opp-1',
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
          {
            id: 'op-2',
            opportunity_id: 'opp-1',
            product_id: 'prod-2',
            quantity: 1,
            unit_price: 200,
            created_at: '2026-01-10T10:00:00Z',
            product: {
              id: 'prod-2',
              tenant_id: 'tenant-1',
              name: 'Produto B',
              code: 'PROD-B',
              price: 200,
              created_at: '2026-01-01T00:00:00Z',
              updated_at: '2026-01-01T00:00:00Z',
            },
          },
          {
            id: 'op-3',
            opportunity_id: 'opp-1',
            product_id: 'prod-3',
            quantity: 1,
            unit_price: 300,
            created_at: '2026-01-10T10:00:00Z',
            product: {
              id: 'prod-3',
              tenant_id: 'tenant-1',
              name: 'Produto C',
              code: 'PROD-C',
              price: 300,
              created_at: '2026-01-01T00:00:00Z',
              updated_at: '2026-01-01T00:00:00Z',
            },
          },
        ],
      }),
    ]

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={oportunidades}
          total={600}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.getByText('3 produtos')).toBeInTheDocument()
  })

  it('calls onCardClick when card is clicked', () => {
    const oportunidade = criarOportunidadeMock()
    const handleCardClick = vi.fn()

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={[oportunidade]}
          total={1500}
          onCardClick={handleCardClick}
        />
      </DndWrapper>
    )

    fireEvent.click(screen.getByText('Cliente Teste'))
    expect(handleCardClick).toHaveBeenCalledWith(oportunidade)
  })

  it('calls onCardClick with correct opportunity when multiple cards exist', () => {
    const oportunidade1 = criarOportunidadeMock({
      id: 'opp-1',
      customer: { ...criarOportunidadeMock().customer, name: 'Cliente Alpha' },
    })
    const oportunidade2 = criarOportunidadeMock({
      id: 'opp-2',
      customer: { ...criarOportunidadeMock().customer, name: 'Cliente Beta' },
    })
    const handleCardClick = vi.fn()

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={[oportunidade1, oportunidade2]}
          total={3000}
          onCardClick={handleCardClick}
        />
      </DndWrapper>
    )

    fireEvent.click(screen.getByText('Cliente Beta'))
    expect(handleCardClick).toHaveBeenCalledWith(oportunidade2)
  })

  it('handles keyboard navigation on cards (Enter)', () => {
    const oportunidade = criarOportunidadeMock()
    const handleCardClick = vi.fn()

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={[oportunidade]}
          total={1500}
          onCardClick={handleCardClick}
        />
      </DndWrapper>
    )

    // Get all buttons - the inner one is the card itself (has cursor-pointer class)
    const buttons = screen.getAllByRole('button')
    const cardButton = buttons.find(btn => btn.classList.contains('cursor-pointer'))
    expect(cardButton).toBeDefined()
    fireEvent.keyDown(cardButton!, { key: 'Enter' })
    expect(handleCardClick).toHaveBeenCalledWith(oportunidade)
  })

  it('handles keyboard navigation on cards (Space)', () => {
    const oportunidade = criarOportunidadeMock()
    const handleCardClick = vi.fn()

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={[oportunidade]}
          total={1500}
          onCardClick={handleCardClick}
        />
      </DndWrapper>
    )

    // Get all buttons - the inner one is the card itself (has cursor-pointer class)
    const buttons = screen.getAllByRole('button')
    const cardButton = buttons.find(btn => btn.classList.contains('cursor-pointer'))
    expect(cardButton).toBeDefined()
    fireEvent.keyDown(cardButton!, { key: ' ' })
    expect(handleCardClick).toHaveBeenCalledWith(oportunidade)
  })

  it('does not show empty state when opportunities exist', () => {
    const oportunidades = [criarOportunidadeMock()]

    render(
      <DndWrapper>
        <KanbanColuna
          etapa="negotiation"
          oportunidades={oportunidades}
          total={1500}
          onCardClick={() => {}}
        />
      </DndWrapper>
    )

    expect(screen.queryByText(/Arraste oportunidades/)).not.toBeInTheDocument()
  })
})
