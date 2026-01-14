'use client'

import type { ReactNode } from 'react'
import type { Product } from '@/types/database'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Package } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface TabelaProdutosProps {
  produtos: Product[]
  onEditar: (produto: Product) => void
  onExcluir: (produto: Product) => void
}

// ============================================================================
// HELPERS
// ============================================================================

function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TabelaProdutos({
  produtos,
  onEditar,
  onExcluir,
}: TabelaProdutosProps): ReactNode {
  // --------------------------------------------------------------------------
  // Empty state
  // --------------------------------------------------------------------------
  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-lg text-h3 font-medium text-gray-900">Nenhum produto cadastrado</h3>
        <p className="mt-sm text-body text-gray-500">Adicione produtos para vincular às suas vendas</p>
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
            <TableHead className="w-[20%]">Código</TableHead>
            <TableHead className="w-[50%]">Nome</TableHead>
            <TableHead className="w-[20%] text-right">Valor</TableHead>
            <TableHead className="w-[10%] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos.map((produto) => (
            <TableRow key={produto.id} className="group">
              <TableCell className="font-mono text-body-sm text-gray-500">
                {produto.code || '—'}
              </TableCell>
              <TableCell className="font-medium">{produto.name}</TableCell>
              <TableCell className="text-right font-mono font-medium text-gray-900">
                {formatarMoeda(produto.price)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-xs opacity-0 transition-standard group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditar(produto)}
                    title="Editar produto"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExcluir(produto)}
                    title="Excluir produto"
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
