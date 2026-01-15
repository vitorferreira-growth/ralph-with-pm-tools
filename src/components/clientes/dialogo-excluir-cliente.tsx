'use client'

import type { ReactNode } from 'react'
import type { CustomerWithSeller } from '@/types/database'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AlertTriangle, Loader2 } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface DialogoExcluirClienteProps {
  aberto: boolean
  onFechar: () => void
  onConfirmar: () => Promise<void>
  cliente: CustomerWithSeller | null
  excluindo: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DialogoExcluirCliente({
  aberto,
  onFechar,
  onConfirmar,
  cliente,
  excluindo,
}: DialogoExcluirClienteProps): ReactNode {
  if (!cliente) return null

  return (
    <Dialog open={aberto} onOpenChange={(open) => !open && !excluindo && onFechar()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">Excluir cliente?</DialogTitle>
          <DialogDescription className="text-center">
            Tem certeza que deseja excluir <strong>{cliente.name}</strong>? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-sm sm:justify-center">
          <Button type="button" variant="outline" onClick={onFechar} disabled={excluindo}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirmar} disabled={excluindo}>
            {excluindo ? (
              <>
                <Loader2 className="animate-spin" />
                Excluindo...
              </>
            ) : (
              'Excluir'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
