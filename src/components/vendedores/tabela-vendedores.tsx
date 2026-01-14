'use client'

import type { ReactNode } from 'react'
import type { Seller } from '@/types/database'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, User } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface TabelaVendedoresProps {
  vendedores: Seller[]
  onEditar: (vendedor: Seller) => void
  onExcluir: (vendedor: Seller) => void
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TabelaVendedores({
  vendedores,
  onEditar,
  onExcluir,
}: TabelaVendedoresProps): ReactNode {
  // --------------------------------------------------------------------------
  // Empty state
  // --------------------------------------------------------------------------
  if (vendedores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <User className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-lg text-h3 font-medium text-gray-900">Nenhum vendedor cadastrado</h3>
        <p className="mt-sm text-body text-gray-500">Adicione sua equipe de vendas</p>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // Table
  // --------------------------------------------------------------------------
  return (
    <div className="rounded-lg border shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[45%]">Nome</TableHead>
            <TableHead className="w-[45%]">Email</TableHead>
            <TableHead className="w-[10%] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendedores.map((vendedor) => (
            <TableRow key={vendedor.id} className="group">
              <TableCell className="font-medium">{vendedor.name}</TableCell>
              <TableCell className="text-gray-500">{vendedor.email}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-xs opacity-0 transition-standard group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditar(vendedor)}
                    title="Editar vendedor"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExcluir(vendedor)}
                    title="Excluir vendedor"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
