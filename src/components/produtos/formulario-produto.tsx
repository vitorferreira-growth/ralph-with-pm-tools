'use client'

import { useState, useEffect } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { Product } from '@/types/database'
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

interface FormularioProdutoProps {
  aberto: boolean
  onFechar: () => void
  onSalvar: (dados: { nome: string; codigo?: string | null; valor: number }) => Promise<Product | null>
  produto?: Product | null
  carregando?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FormularioProduto({
  aberto,
  onFechar,
  onSalvar,
  produto,
  carregando = false,
}: FormularioProdutoProps): ReactNode {
  const [nome, setNome] = useState('')
  const [codigo, setCodigo] = useState('')
  const [valor, setValor] = useState('')
  const [erroNome, setErroNome] = useState('')
  const [erroValor, setErroValor] = useState('')
  const [salvando, setSalvando] = useState(false)

  const modoEdicao = !!produto

  // --------------------------------------------------------------------------
  // Reset form when dialog opens/closes or produto changes
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (aberto) {
      if (produto) {
        setNome(produto.name)
        setCodigo(produto.code || '')
        setValor(formatarValorParaInput(produto.price))
      } else {
        setNome('')
        setCodigo('')
        setValor('')
      }
      setErroNome('')
      setErroValor('')
    }
  }, [aberto, produto])

  // --------------------------------------------------------------------------
  // Value formatting helpers
  // --------------------------------------------------------------------------
  function formatarValorParaInput(valorNumerico: number): string {
    return valorNumerico.toFixed(2).replace('.', ',')
  }

  function parseValor(valorString: string): number | null {
    // Remove spaces and replace comma with dot
    const valorLimpo = valorString.trim().replace(',', '.')
    const numero = parseFloat(valorLimpo)
    if (isNaN(numero)) return null
    return numero
  }

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

    // Validar valor
    const valorNumerico = parseValor(valor)
    if (valorNumerico === null) {
      setErroValor('Valor inválido')
      valido = false
    } else if (valorNumerico < 0) {
      setErroValor('Valor não pode ser negativo')
      valido = false
    } else {
      setErroValor('')
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
      const valorNumerico = parseValor(valor)!
      const resultado = await onSalvar({
        nome: nome.trim(),
        codigo: codigo.trim() || null,
        valor: valorNumerico,
      })
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
            <DialogTitle>{modoEdicao ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
            <DialogDescription>
              {modoEdicao
                ? 'Atualize as informações do produto'
                : 'Preencha as informações do novo produto'}
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
                placeholder="Nome do produto"
                disabled={salvando || carregando}
                className={erroNome ? 'border-destructive' : ''}
              />
              {erroNome && <span className="text-caption text-destructive">{erroNome}</span>}
            </div>

            {/* Código */}
            <div className="grid gap-sm">
              <Label htmlFor="codigo">Código (opcional)</Label>
              <Input
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="SKU ou código interno"
                disabled={salvando || carregando}
              />
            </div>

            {/* Valor */}
            <div className="grid gap-sm">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0,00"
                disabled={salvando || carregando}
                className={erroValor ? 'border-destructive' : ''}
              />
              {erroValor && <span className="text-caption text-destructive">{erroValor}</span>}
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
