'use client'

import type { ReactNode } from 'react'
import { Calendar, Package, User, DollarSign, FileText, Clock } from 'lucide-react'
import type { OpportunityStage, OpportunityWithRelations } from '@/types/database'
import { OPPORTUNITY_STAGE_LABELS } from '@/types/database'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// ============================================================================
// TYPES
// ============================================================================

interface CardOportunidadeProps {
  oportunidade: OpportunityWithRelations
  onClick?: () => void
  compact?: boolean
  showActions?: boolean
  onEditar?: () => void
  onExcluir?: () => void
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

function formatarData(dataString: string): string {
  const data = new Date(dataString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(data)
}

function formatarDataRelativa(dataString: string): string {
  const data = new Date(dataString)
  const agora = new Date()
  const diffMs = agora.getTime() - data.getTime()
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDias === 0) return 'Hoje'
  if (diffDias === 1) return 'Ontem'
  if (diffDias < 7) return `${diffDias} dias atrás`
  if (diffDias < 30) return `${Math.floor(diffDias / 7)} semanas atrás`
  if (diffDias < 365) return `${Math.floor(diffDias / 30)} meses atrás`
  return `${Math.floor(diffDias / 365)} anos atrás`
}

function obterCorEtapa(etapa: OpportunityStage): { bg: string; text: string; border: string } {
  switch (etapa) {
    case 'first_contact':
      return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' }
    case 'proposal':
      return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' }
    case 'negotiation':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' }
    case 'awaiting_payment':
      return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' }
    case 'closed_won':
      return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' }
    case 'closed_lost':
      return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' }
  }
}

// ============================================================================
// BADGE COMPONENT
// ============================================================================

interface BadgeEtapaProps {
  etapa: OpportunityStage
}

function BadgeEtapa({ etapa }: BadgeEtapaProps): ReactNode {
  const cores = obterCorEtapa(etapa)
  const label = OPPORTUNITY_STAGE_LABELS[etapa]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-caption font-medium',
        cores.bg,
        cores.text,
        cores.border
      )}
    >
      {label}
    </span>
  )
}

// ============================================================================
// COMPACT CARD (for lists)
// ============================================================================

function CardOportunidadeCompacto({
  oportunidade,
  onClick,
}: {
  oportunidade: OpportunityWithRelations
  onClick?: () => void
}): ReactNode {
  return (
    <div
      className={cn(
        'cursor-pointer rounded-lg border border-gray-200 bg-white p-md shadow-kanban transition-all hover:shadow-kanban-drag',
        onClick && 'hover:border-primary/30'
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Header: Cliente e Badge */}
      <div className="flex items-start justify-between gap-sm">
        <p className="text-body font-medium text-gray-900 line-clamp-1">
          {oportunidade.customer.name}
        </p>
        <BadgeEtapa etapa={oportunidade.stage} />
      </div>

      {/* Valor */}
      <p className="mt-sm font-mono text-h4 font-semibold text-primary">
        {formatarMoeda(oportunidade.total_value)}
      </p>

      {/* Meta info */}
      <div className="mt-sm flex flex-wrap items-center gap-lg text-caption text-gray-500">
        {/* Vendedor */}
        {oportunidade.seller && (
          <span className="flex items-center gap-xs">
            <User className="h-3.5 w-3.5" />
            {oportunidade.seller.name}
          </span>
        )}

        {/* Produtos */}
        {oportunidade.products.length > 0 && (
          <span className="flex items-center gap-xs">
            <Package className="h-3.5 w-3.5" />
            {oportunidade.products.length} produto{oportunidade.products.length !== 1 ? 's' : ''}
          </span>
        )}

        {/* Data */}
        <span className="flex items-center gap-xs">
          <Clock className="h-3.5 w-3.5" />
          {formatarDataRelativa(oportunidade.created_at)}
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// FULL CARD (for detail view)
// ============================================================================

function CardOportunidadeCompleto({
  oportunidade,
  onClick,
}: {
  oportunidade: OpportunityWithRelations
  onClick?: () => void
}): ReactNode {
  const produtosTotal = oportunidade.products.reduce(
    (acc, p) => acc + p.quantity * p.unit_price,
    0
  )

  return (
    <Card
      className={cn(
        'transition-all',
        onClick && 'cursor-pointer hover:shadow-kanban-drag hover:border-primary/30'
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <CardHeader className="pb-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-md">
          <div className="min-w-0 flex-1">
            <h3 className="text-h4 font-semibold text-gray-900 line-clamp-1">
              {oportunidade.customer.name}
            </h3>
            {oportunidade.customer.email && (
              <p className="mt-xs text-body-sm text-gray-500">{oportunidade.customer.email}</p>
            )}
          </div>
          <BadgeEtapa etapa={oportunidade.stage} />
        </div>
      </CardHeader>

      <CardContent className="space-y-lg">
        {/* Valor total */}
        <div className="flex items-center gap-sm rounded-lg bg-primary-light/50 p-md">
          <DollarSign className="h-5 w-5 text-primary" />
          <div>
            <p className="text-caption text-gray-500">Valor Total</p>
            <p className="font-mono text-h3 font-bold text-primary">
              {formatarMoeda(oportunidade.total_value)}
            </p>
          </div>
        </div>

        {/* Vendedor */}
        {oportunidade.seller && (
          <div className="flex items-center gap-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <User className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <p className="text-caption text-gray-500">Vendedor Responsável</p>
              <p className="text-body font-medium text-gray-900">{oportunidade.seller.name}</p>
            </div>
          </div>
        )}

        {/* Produtos */}
        {oportunidade.products.length > 0 && (
          <div>
            <div className="mb-sm flex items-center gap-xs text-caption text-gray-500">
              <Package className="h-3.5 w-3.5" />
              <span>
                Produtos ({oportunidade.products.length}) - {formatarMoeda(produtosTotal)}
              </span>
            </div>
            <div className="space-y-xs">
              {oportunidade.products.map((op) => (
                <div
                  key={op.id}
                  className="flex items-center justify-between rounded-md bg-gray-50 px-sm py-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm font-medium text-gray-700 line-clamp-1">
                      {op.product.name}
                    </p>
                    {op.product.code && (
                      <p className="font-mono text-caption text-gray-400">{op.product.code}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-body-sm font-medium text-gray-900">
                      {formatarMoeda(op.unit_price)}
                    </p>
                    <p className="text-caption text-gray-500">×{op.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observações */}
        {oportunidade.notes && (
          <div>
            <div className="mb-xs flex items-center gap-xs text-caption text-gray-500">
              <FileText className="h-3.5 w-3.5" />
              <span>Observações</span>
            </div>
            <p className="rounded-md bg-gray-50 p-sm text-body-sm text-gray-600">
              {oportunidade.notes}
            </p>
          </div>
        )}

        {/* Datas */}
        <div className="flex flex-wrap gap-lg border-t border-gray-100 pt-md text-caption text-gray-500">
          <div className="flex items-center gap-xs">
            <Calendar className="h-3.5 w-3.5" />
            <span>Criado em {formatarData(oportunidade.created_at)}</span>
          </div>
          {oportunidade.closed_at && (
            <div className="flex items-center gap-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>Fechado em {formatarData(oportunidade.closed_at)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function CardOportunidade({
  oportunidade,
  onClick,
  compact = false,
}: CardOportunidadeProps): ReactNode {
  if (compact) {
    return <CardOportunidadeCompacto oportunidade={oportunidade} onClick={onClick} />
  }

  return <CardOportunidadeCompleto oportunidade={oportunidade} onClick={onClick} />
}

// Export sub-components for flexibility
export { BadgeEtapa, CardOportunidadeCompacto, CardOportunidadeCompleto }
