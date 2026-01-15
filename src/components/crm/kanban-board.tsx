'use client'

import type { ReactNode } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { OpportunityStage, OpportunityWithRelations } from '@/types/database'
import { OPPORTUNITY_STAGES_ORDER } from '@/types/database'
import { KanbanColuna } from './kanban-coluna'
import { Loader2 } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface KanbanBoardProps {
  oportunidadesPorEtapa: Record<OpportunityStage, OpportunityWithRelations[]>
  totaisPorEtapa: Record<OpportunityStage, number>
  onMoverOportunidade: (id: string, novaEtapa: OpportunityStage) => Promise<void>
  onCardClick: (oportunidade: OpportunityWithRelations) => void
  carregando?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export function KanbanBoard({
  oportunidadesPorEtapa,
  totaisPorEtapa,
  onMoverOportunidade,
  onCardClick,
  carregando = false,
}: KanbanBoardProps): ReactNode {
  // --------------------------------------------------------------------------
  // Handle drag end
  // --------------------------------------------------------------------------
  const handleDragEnd = async (result: DropResult): Promise<void> => {
    const { destination, source, draggableId } = result

    // Se não há destino, foi solto fora de uma área válida
    if (!destination) {
      return
    }

    // Se foi solto na mesma posição, não faz nada
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Se mudou de coluna, atualiza a etapa
    if (destination.droppableId !== source.droppableId) {
      const novaEtapa = destination.droppableId as OpportunityStage
      await onMoverOportunidade(draggableId, novaEtapa)
    }
  }

  // --------------------------------------------------------------------------
  // Loading state
  // --------------------------------------------------------------------------
  if (carregando) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-lg overflow-x-auto pb-lg">
        {OPPORTUNITY_STAGES_ORDER.map((etapa) => (
          <KanbanColuna
            key={etapa}
            etapa={etapa}
            oportunidades={oportunidadesPorEtapa[etapa] || []}
            total={totaisPorEtapa[etapa] || 0}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
