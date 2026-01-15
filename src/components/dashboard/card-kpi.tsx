'use client'

import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

// ============================================================================
// TYPES
// ============================================================================

export type VarianteKPI = 'default' | 'success' | 'warning' | 'error'

export interface CardKPIProps {
  /** Título do KPI (ex: "Total de Vendas") */
  titulo: string
  /** Valor principal formatado (ex: "R$ 10.000,00") */
  valor: string
  /** Descrição ou valor secundário (ex: "15 vendas") */
  descricao?: string
  /** Ícone do Lucide a ser exibido */
  icone?: LucideIcon
  /** Variante de cor do KPI */
  variante?: VarianteKPI
  /** Se está carregando (mostra skeleton) */
  carregando?: boolean
  /** Classes CSS adicionais */
  className?: string
  /** Handler para clique no card */
  onClick?: () => void
}

// ============================================================================
// HELPER: Cores por variante
// ============================================================================

const CORES_VARIANTE: Record<VarianteKPI, { icone: string; fundo: string }> = {
  default: {
    icone: 'text-primary',
    fundo: 'bg-primary-light',
  },
  success: {
    icone: 'text-success',
    fundo: 'bg-success/10',
  },
  warning: {
    icone: 'text-warning',
    fundo: 'bg-warning/10',
  },
  error: {
    icone: 'text-error',
    fundo: 'bg-error/10',
  },
}

// ============================================================================
// SKELETON COMPONENT
// ============================================================================

function CardKPISkeleton({ className }: { className?: string }): React.ReactElement {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            {/* Título skeleton */}
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            {/* Valor skeleton */}
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            {/* Descrição skeleton */}
            <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
          </div>
          {/* Ícone skeleton */}
          <div className="h-10 w-10 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function CardKPI({
  titulo,
  valor,
  descricao,
  icone: Icone,
  variante = 'default',
  carregando = false,
  className,
  onClick,
}: CardKPIProps): React.ReactElement {
  // Se está carregando, renderiza skeleton
  if (carregando) {
    return <CardKPISkeleton className={className} />
  }

  const cores = CORES_VARIANTE[variante]
  const isClickable = !!onClick

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow duration-standard',
        isClickable && 'cursor-pointer hover:shadow-card-hover',
        className
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Conteúdo principal */}
          <div className="space-y-1 min-w-0 flex-1">
            {/* Título */}
            <p className="text-body-sm text-gray-500 font-medium truncate">{titulo}</p>

            {/* Valor principal */}
            <p className="text-h2 font-semibold text-gray-900 font-mono truncate">{valor}</p>

            {/* Descrição */}
            {descricao && <p className="text-caption text-gray-500 truncate">{descricao}</p>}
          </div>

          {/* Ícone */}
          {Icone && (
            <div className={cn('p-2.5 rounded-lg flex-shrink-0', cores.fundo)}>
              <Icone className={cn('h-5 w-5', cores.icone)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export { CardKPISkeleton }
