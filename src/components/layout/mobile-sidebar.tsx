'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ITENS_NAVEGACAO } from './nav-items'

// ============================================================================
// TYPES
// ============================================================================

interface MobileSidebarProps {
  aberto: boolean
  aoFechar: () => void
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MobileSidebar({ aberto, aoFechar }: MobileSidebarProps): ReactNode {
  const pathname = usePathname()

  // Fechar o menu quando a rota mudar
  useEffect(() => {
    aoFechar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Prevenir scroll do body quando o menu estiver aberto
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return (): void => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-emphasis lg:hidden',
          aberto ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={aoFechar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-sidebar bg-white shadow-lg transition-transform duration-emphasis lg:hidden',
          aberto ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-300 px-lg">
          <Link href="/dashboard" className="flex items-center gap-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-white">IP</span>
            </div>
            <span className="text-h4 font-semibold text-gray-900">CRM</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={aoFechar} aria-label="Fechar menu">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-xs p-sm">
          {ITENS_NAVEGACAO.map((item) => {
            const estaAtivo = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-sm rounded-md px-md py-sm text-body font-medium transition-colors duration-micro',
                  estaAtivo
                    ? 'bg-primary-light text-primary'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <span
                  className={cn('flex-shrink-0', estaAtivo ? 'text-primary' : 'text-gray-500')}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-300 p-sm">
          <div className="rounded-md bg-gray-50 px-md py-sm">
            <p className="text-caption text-gray-500">Powered by</p>
            <p className="text-body-sm font-medium text-primary">InfinitePay</p>
          </div>
        </div>
      </aside>
    </>
  )
}
