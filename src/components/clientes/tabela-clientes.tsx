'use client'

import type { ReactNode } from 'react'
import type { CustomerWithSeller } from '@/types/database'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Pencil, Trash2, Users } from 'lucide-react'
import { formatarWhatsApp } from '@/lib/validations/cliente'

// ============================================================================
// TYPES
// ============================================================================

interface TabelaClientesProps {
  clientes: CustomerWithSeller[]
  onEditar: (cliente: CustomerWithSeller) => void
  onExcluir: (cliente: CustomerWithSeller) => void
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TabelaClientes({
  clientes,
  onEditar,
  onExcluir,
}: TabelaClientesProps): ReactNode {
  // --------------------------------------------------------------------------
  // Empty state
  // --------------------------------------------------------------------------
  if (clientes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-lg text-h3 font-medium text-gray-900">Nenhum cliente cadastrado</h3>
        <p className="mt-sm text-body text-gray-500">Comece adicionando seu primeiro cliente</p>
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
            <TableHead className="w-[25%]">Nome</TableHead>
            <TableHead className="w-[25%]">Email</TableHead>
            <TableHead className="w-[15%]">WhatsApp</TableHead>
            <TableHead className="w-[15%]">Cidade</TableHead>
            <TableHead className="w-[12%]">Vendedor</TableHead>
            <TableHead className="w-[8%] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id} className="group">
              <TableCell className="font-medium">{cliente.name}</TableCell>
              <TableCell className="text-body-sm text-gray-500">{cliente.email || '—'}</TableCell>
              <TableCell className="text-body-sm text-gray-500">
                {cliente.whatsapp ? formatarWhatsApp(cliente.whatsapp) : '—'}
              </TableCell>
              <TableCell className="text-body-sm text-gray-500">
                {cliente.city && cliente.state
                  ? `${cliente.city}/${cliente.state}`
                  : cliente.city || cliente.state || '—'}
              </TableCell>
              <TableCell className="text-body-sm text-gray-500">
                {cliente.seller?.name || '—'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-xs opacity-0 transition-standard group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditar(cliente)}
                    title="Editar cliente"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExcluir(cliente)}
                    title="Excluir cliente"
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

// ============================================================================
// SKELETON COMPONENT
// ============================================================================

export function TabelaClientesSkeleton(): ReactNode {
  return (
    <div className="rounded-lg border shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Nome</TableHead>
            <TableHead className="w-[25%]">Email</TableHead>
            <TableHead className="w-[15%]">WhatsApp</TableHead>
            <TableHead className="w-[15%]">Cidade</TableHead>
            <TableHead className="w-[12%]">Vendedor</TableHead>
            <TableHead className="w-[8%] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-xs">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
