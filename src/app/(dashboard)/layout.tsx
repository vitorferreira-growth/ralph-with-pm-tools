'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { TenantProvider } from '@/hooks/use-tenant'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { MobileSidebar } from '@/components/layout/mobile-sidebar'

// ============================================================================
// TYPES
// ============================================================================

interface DashboardLayoutProps {
  children: ReactNode
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function DashboardLayout({ children }: DashboardLayoutProps): ReactNode {
  const [menuAberto, setMenuAberto] = useState(false)

  function abrirMenu(): void {
    setMenuAberto(true)
  }

  function fecharMenu(): void {
    setMenuAberto(false)
  }

  return (
    <TenantProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Sidebar */}
        <MobileSidebar aberto={menuAberto} aoFechar={fecharMenu} />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header onMenuClick={abrirMenu} />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-lg lg:p-xl">{children}</main>
        </div>
      </div>
    </TenantProvider>
  )
}
