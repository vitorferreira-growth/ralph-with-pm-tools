'use client'

import type { ReactNode } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import type { OpportunityStage, OpportunityWithRelations } from '@/types/database'
import { OPPORTUNITY_STAGE_LABELS } from '@/types/database'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

// ============================================================================
// TYPES
// ============================================================================

interface KanbanColunaProps {
  etapa: OpportunityStage
  oportunidades: OpportunityWithRelations[]
  total: number
  onCardClick: (oportunidade: OpportunityWithRelations) => void
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function obterCorEtapa(etapa: OpportunityStage): string {
  switch (etapa) {
    case 'first_contact':
      return 'bg-blue-500'
    case 'proposal':
      return 'bg-purple-500'
    case 'negotiation':
      return 'bg-yellow-500'
    case 'awaiting_payment':
      return 'bg-orange-500'
    case 'closed_won':
      return 'bg-success'
    case 'closed_lost':
      return 'bg-destructive'
    default:
      return 'bg-gray-500'
  }
}

// ============================================================================
// CARD COMPONENT
// ============================================================================

interface CardOportunidadeSimplificadoProps {
  oportunidade: OpportunityWithRelations
  onClick: () => void
}

function CardOportunidadeSimplificado({
  oportunidade,
  onClick,
}: CardOportunidadeSimplificadoProps): ReactNode {
  return (
    <div
      className="cursor-pointer rounded-md border border-gray-200 bg-white p-md shadow-kanban transition-shadow hover:shadow-kanban-drag"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Cliente */}
      <p className="text-body font-medium text-gray-900 line-clamp-1">
        {oportunidade.customer.name}
      </p>

      {/* Valor */}
      <p className="mt-xs font-mono text-h4 font-semibold text-primary">
        {formatarMoeda(oportunidade.total_value)}
      </p>

      {/* Vendedor */}
      {oportunidade.seller && (
        <p className="mt-xs text-caption text-gray-500 line-clamp-1">
          {oportunidade.seller.name}
        </p>
      )}

      {/* Quantidade de produtos */}
      {oportunidade.products.length > 0 && (
        <p className="mt-xs text-caption text-gray-400">
          {oportunidade.products.length} produto{oportunidade.products.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}

// ============================================================================
// COLUMN COMPONENT
// ============================================================================

export function KanbanColuna({
  etapa,
  oportunidades,
  total,
  onCardClick,
}: KanbanColunaProps): ReactNode {
  const corEtapa = obterCorEtapa(etapa)
  const label = OPPORTUNITY_STAGE_LABELS[etapa]

  return (
    <div className="flex h-full w-72 min-w-72 flex-col rounded-xl bg-gray-100 p-sm">
      {/* Header */}
      <div className="mb-sm flex items-center justify-between px-xs">
        <div className="flex items-center gap-sm">
          <div className={cn('h-3 w-3 rounded-full', corEtapa)} />
          <h3 className="text-body-sm font-semibold text-gray-700">{label}</h3>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-200 px-1 text-caption font-medium text-gray-600">
            {oportunidades.length}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mb-sm px-xs">
        <p className="font-mono text-caption font-medium text-gray-500">{formatarMoeda(total)}</p>
      </div>

      {/* Droppable area */}
      <Droppable droppableId={etapa}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex flex-1 flex-col gap-sm overflow-y-auto rounded-lg p-xs transition-colors',
              snapshot.isDraggingOver && 'bg-primary-light/50'
            )}
          >
            {oportunidades.map((oportunidade, index) => (
              <Draggable key={oportunidade.id} draggableId={oportunidade.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      'transition-transform',
                      snapshot.isDragging && 'rotate-2 scale-105'
                    )}
                  >
                    <CardOportunidadeSimplificado
                      oportunidade={oportunidade}
                      onClick={() => onCardClick(oportunidade)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {/* Empty state para coluna */}
            {oportunidades.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-lg">
                <p className="text-center text-caption text-gray-400">
                  Arraste oportunidades
                  <br />
                  para cá
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}

// ============================================================================
// SKELETON COMPONENTS
// ============================================================================

/**
 * Skeleton for individual kanban card
 */
export function KanbanCardSkeleton(): ReactNode {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-md shadow-kanban">
      {/* Cliente */}
      <Skeleton className="h-4 w-32" />

      {/* Valor */}
      <Skeleton className="mt-xs h-5 w-24" />

      {/* Vendedor */}
      <Skeleton className="mt-xs h-3 w-20" />

      {/* Produtos */}
      <Skeleton className="mt-xs h-3 w-16" />
    </div>
  )
}

/**
 * Skeleton for entire kanban column
 */
export function KanbanColunaSkeleton({
  cardsCount = 3,
}: {
  cardsCount?: number
}): ReactNode {
  return (
    <div className="flex h-full w-72 min-w-72 flex-col rounded-xl bg-gray-100 p-sm">
      {/* Header skeleton */}
      <div className="mb-sm flex items-center justify-between px-xs">
        <div className="flex items-center gap-sm">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>

      {/* Total skeleton */}
      <div className="mb-sm px-xs">
        <Skeleton className="h-3 w-20" />
      </div>

      {/* Cards skeleton */}
      <div className="flex flex-1 flex-col gap-sm overflow-y-auto rounded-lg p-xs">
        {Array.from({ length: cardsCount }).map((_, index) => (
          <KanbanCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

/**
 * Skeleton for entire kanban board (6 columns)
 */
export function KanbanBoardSkeleton(): ReactNode {
  // Different card counts per column for realistic appearance
  const cardCountsPerColumn = [2, 3, 2, 1, 2, 1]

  return (
    <div
      className="flex h-full gap-lg overflow-x-auto pb-lg"
      role="region"
      aria-label="Carregando kanban..."
    >
      {cardCountsPerColumn.map((cardsCount, index) => (
        <KanbanColunaSkeleton key={index} cardsCount={cardsCount} />
      ))}
    </div>
  )
}
