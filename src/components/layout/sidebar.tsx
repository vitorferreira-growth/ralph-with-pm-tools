'use client'

import type { ReactNode } from 'react'

export function Sidebar(): ReactNode {
  // A ser implementado em Step 3.1
  return (
    <aside className="hidden w-sidebar border-r border-gray-300 bg-white lg:block">
      <div className="p-lg">
        <h2 className="text-h3 font-semibold text-primary">CRM InfinitePay</h2>
      </div>
    </aside>
  )
}
