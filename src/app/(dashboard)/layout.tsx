import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps): ReactNode {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - a ser implementada em Step 3.1 */}
      <aside className="hidden w-sidebar border-r border-gray-300 bg-white lg:block">
        <div className="p-lg">
          <h2 className="text-h3 font-semibold text-primary">CRM InfinitePay</h2>
        </div>
        <nav className="mt-lg px-sm">
          {/* NavItems - a ser implementado em Step 3.2 */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-3xl">{children}</main>
    </div>
  )
}
