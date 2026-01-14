'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ITENS_NAVEGACAO } from './nav-items'

// ============================================================================
// COMPONENT
// ============================================================================

export function Sidebar(): ReactNode {
  const pathname = usePathname()

  return (
    <aside className="hidden w-sidebar flex-shrink-0 border-r border-gray-300 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-300 px-lg">
        <Link href="/dashboard" className="flex items-center gap-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-sm font-bold text-white">IP</span>
          </div>
          <span className="text-h4 font-semibold text-gray-900">CRM</span>
        </Link>
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
                className={cn(
                  'flex-shrink-0',
                  estaAtivo ? 'text-primary' : 'text-gray-500'
                )}
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
  )
}
