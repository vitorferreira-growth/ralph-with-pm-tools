'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Package, UserCircle, Kanban } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

interface NavItem {
  href: string
  label: string
  icon: ReactNode
}

// ============================================================================
// NAVIGATION ITEMS
// ============================================================================

export const ITENS_NAVEGACAO: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    href: '/clientes',
    label: 'Clientes',
    icon: <Users className="h-5 w-5" />,
  },
  {
    href: '/produtos',
    label: 'Produtos',
    icon: <Package className="h-5 w-5" />,
  },
  {
    href: '/vendedores',
    label: 'Vendedores',
    icon: <UserCircle className="h-5 w-5" />,
  },
  {
    href: '/crm',
    label: 'CRM',
    icon: <Kanban className="h-5 w-5" />,
  },
]

// ============================================================================
// COMPONENT
// ============================================================================

export function NavItems(): ReactNode {
  const pathname = usePathname()

  return (
    <nav className="space-y-xs">
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
  )
}
