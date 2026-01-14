'use client'

import type { ReactNode } from 'react'

export function Header(): ReactNode {
  // A ser implementado em Step 3.1
  return (
    <header className="border-b border-gray-300 bg-white px-lg py-md">
      <div className="flex items-center justify-between">
        <h1 className="text-h3 font-medium text-gray-900">CRM InfinitePay</h1>
      </div>
    </header>
  )
}
