'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTenant } from '@/hooks/use-tenant'
import { criarClienteNavegador } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

interface HeaderProps {
  onMenuClick?: () => void
}

// ============================================================================
// COMPONENT
// ============================================================================

export function Header({ onMenuClick }: HeaderProps): ReactNode {
  const router = useRouter()
  const { tenant, usuario, carregando } = useTenant()

  async function handleLogout(): Promise<void> {
    const supabase = criarClienteNavegador()
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Obter iniciais do nome do usuário
  function obterIniciais(nome: string | undefined): string {
    if (!nome) return '?'
    const partes = nome.split(' ')
    if (partes.length === 1) {
      return partes[0].charAt(0).toUpperCase()
    }
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase()
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-300 bg-white px-lg">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Tenant name - shown on larger screens */}
      <div className="hidden lg:block">
        {carregando ? (
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        ) : (
          <h1 className="text-h4 font-medium text-gray-900">{tenant?.name ?? 'CRM'}</h1>
        )}
      </div>

      {/* Mobile logo - shown on small screens */}
      <div className="flex items-center gap-sm lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <span className="text-sm font-bold text-white">IP</span>
        </div>
        <span className="text-h4 font-semibold text-gray-900">CRM</span>
      </div>

      {/* User area */}
      <div className="flex items-center gap-md">
        {/* User info */}
        {carregando ? (
          <div className="flex items-center gap-sm">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            <div className="hidden h-4 w-24 animate-pulse rounded bg-gray-200 md:block" />
          </div>
        ) : (
          <div className="flex items-center gap-sm">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full bg-primary-light',
                'text-caption font-medium text-primary'
              )}
            >
              {obterIniciais(usuario?.name)}
            </div>
            <div className="hidden md:block">
              <p className="text-body-sm font-medium text-gray-900">{usuario?.name}</p>
              <p className="text-caption text-gray-500">{tenant?.name}</p>
            </div>
          </div>
        )}

        {/* Logout button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Sair"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
