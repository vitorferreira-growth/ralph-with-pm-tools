'use client'

import { useState, useEffect } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { Seller } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface FormularioVendedorProps {
  aberto: boolean
  onFechar: () => void
  onSalvar: (dados: { nome: string; email: string }) => Promise<Seller | null>
  vendedor?: Seller | null
  carregando?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FormularioVendedor({
  aberto,
  onFechar,
  onSalvar,
  vendedor,
  carregando = false,
}: FormularioVendedorProps): ReactNode {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [erroNome, setErroNome] = useState('')
  const [erroEmail, setErroEmail] = useState('')
  const [salvando, setSalvando] = useState(false)

  const modoEdicao = !!vendedor

  // --------------------------------------------------------------------------
  // Reset form when dialog opens/closes or vendedor changes
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (aberto) {
      if (vendedor) {
        setNome(vendedor.name)
        setEmail(vendedor.email)
      } else {
        setNome('')
        setEmail('')
      }
      setErroNome('')
      setErroEmail('')
    }
  }, [aberto, vendedor])

  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------
  function validarFormulario(): boolean {
    let valido = true

    // Validar nome
    if (!nome.trim()) {
      setErroNome('Nome é obrigatório')
      valido = false
    } else {
      setErroNome('')
    }

    // Validar email
    if (!email.trim()) {
      setErroEmail('Email é obrigatório')
      valido = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErroEmail('Email inválido')
      valido = false
    } else {
      setErroEmail('')
    }

    return valido
  }

  // --------------------------------------------------------------------------
  // Submit handler
  // --------------------------------------------------------------------------
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setSalvando(true)

    try {
      const resultado = await onSalvar({ nome: nome.trim(), email: email.trim().toLowerCase() })
      if (resultado) {
        onFechar()
      }
    } finally {
      setSalvando(false)
    }
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <Dialog open={aberto} onOpenChange={(open) => !open && onFechar()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{modoEdicao ? 'Editar Vendedor' : 'Novo Vendedor'}</DialogTitle>
            <DialogDescription>
              {modoEdicao
                ? 'Atualize as informações do vendedor'
                : 'Preencha as informações do novo vendedor'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-lg py-lg">
            {/* Nome */}
            <div className="grid gap-sm">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do vendedor"
                disabled={salvando || carregando}
                className={erroNome ? 'border-destructive' : ''}
              />
              {erroNome && <span className="text-caption text-destructive">{erroNome}</span>}
            </div>

            {/* Email */}
            <div className="grid gap-sm">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                disabled={salvando || carregando}
                className={erroEmail ? 'border-destructive' : ''}
              />
              {erroEmail && <span className="text-caption text-destructive">{erroEmail}</span>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onFechar} disabled={salvando}>
              Cancelar
            </Button>
            <Button type="submit" disabled={salvando || carregando}>
              {salvando ? (
                <>
                  <Loader2 className="animate-spin" />
                  Salvando...
                </>
              ) : modoEdicao ? (
                'Salvar'
              ) : (
                'Adicionar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
