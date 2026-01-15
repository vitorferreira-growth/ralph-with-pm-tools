'use client'

import { useState, useEffect, useMemo } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type {
  OpportunityWithRelations,
  CustomerWithSeller,
  Product,
  Seller,
  OpportunityStage,
} from '@/types/database'
import { OPPORTUNITY_STAGE_LABELS, OPPORTUNITY_STAGES_ORDER } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Plus, Trash2, Package } from 'lucide-react'
import type { OportunidadeInput, OportunidadeUpdateInput } from '@/hooks/use-oportunidades'

// ============================================================================
// TYPES
// ============================================================================

interface ProdutoSelecionado {
  produtoId: string
  quantidade: number
  precoUnitario: number
  // Dados do produto para exibição
  nome: string
  codigo: string | null
}

interface FormularioOportunidadeProps {
  aberto: boolean
  onFechar: () => void
  onSalvar: (
    dados: OportunidadeInput | OportunidadeUpdateInput
  ) => Promise<OpportunityWithRelations | null>
  oportunidade?: OpportunityWithRelations | null
  clientes: CustomerWithSeller[]
  produtos: Product[]
  vendedores: Seller[]
  carregando?: boolean
}

interface FormErrors {
  clienteId?: string
  vendedorId?: string
  etapa?: string
  produtos?: string
  observacoes?: string
}

// ============================================================================
// HELPER FUNCTIONS
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

export function FormularioOportunidade({
  aberto,
  onFechar,
  onSalvar,
  oportunidade,
  clientes,
  produtos,
  vendedores,
  carregando = false,
}: FormularioOportunidadeProps): ReactNode {
  // Form fields
  const [clienteId, setClienteId] = useState('')
  const [vendedorId, setVendedorId] = useState('')
  const [etapa, setEtapa] = useState<OpportunityStage>('first_contact')
  const [observacoes, setObservacoes] = useState('')
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([])

  // Product selection state
  const [produtoParaAdicionar, setProdutoParaAdicionar] = useState('')

  // UI state
  const [erros, setErros] = useState<FormErrors>({})
  const [salvando, setSalvando] = useState(false)

  const modoEdicao = !!oportunidade

  // --------------------------------------------------------------------------
  // Calculated total
  // --------------------------------------------------------------------------
  const valorTotal = useMemo(() => {
    return produtosSelecionados.reduce((total, produto) => {
      return total + produto.precoUnitario * produto.quantidade
    }, 0)
  }, [produtosSelecionados])

  // --------------------------------------------------------------------------
  // Available products (not already selected)
  // --------------------------------------------------------------------------
  const produtosDisponiveis = useMemo(() => {
    const selecionadosIds = new Set(produtosSelecionados.map((p) => p.produtoId))
    return produtos.filter((p) => !selecionadosIds.has(p.id))
  }, [produtos, produtosSelecionados])

  // --------------------------------------------------------------------------
  // Reset form when dialog opens/closes or oportunidade changes
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (aberto) {
      if (oportunidade) {
        setClienteId(oportunidade.customer_id)
        setVendedorId(oportunidade.seller_id || '')
        setEtapa(oportunidade.stage)
        setObservacoes(oportunidade.notes || '')
        // Map products from opportunity
        setProdutosSelecionados(
          oportunidade.products.map((op) => ({
            produtoId: op.product_id,
            quantidade: op.quantity,
            precoUnitario: op.unit_price,
            nome: op.product.name,
            codigo: op.product.code,
          }))
        )
      } else {
        setClienteId('')
        setVendedorId('')
        setEtapa('first_contact')
        setObservacoes('')
        setProdutosSelecionados([])
      }
      setProdutoParaAdicionar('')
      setErros({})
    }
  }, [aberto, oportunidade])

  // --------------------------------------------------------------------------
  // Add product
  // --------------------------------------------------------------------------
  function adicionarProduto(): void {
    if (!produtoParaAdicionar) return

    const produto = produtos.find((p) => p.id === produtoParaAdicionar)
    if (!produto) return

    setProdutosSelecionados((prev) => [
      ...prev,
      {
        produtoId: produto.id,
        quantidade: 1,
        precoUnitario: produto.price,
        nome: produto.name,
        codigo: produto.code,
      },
    ])
    setProdutoParaAdicionar('')
  }

  // --------------------------------------------------------------------------
  // Remove product
  // --------------------------------------------------------------------------
  function removerProduto(produtoId: string): void {
    setProdutosSelecionados((prev) => prev.filter((p) => p.produtoId !== produtoId))
  }

  // --------------------------------------------------------------------------
  // Update product quantity
  // --------------------------------------------------------------------------
  function atualizarQuantidade(produtoId: string, quantidade: number): void {
    if (quantidade < 1) return
    setProdutosSelecionados((prev) =>
      prev.map((p) => (p.produtoId === produtoId ? { ...p, quantidade } : p))
    )
  }

  // --------------------------------------------------------------------------
  // Update product unit price
  // --------------------------------------------------------------------------
  function atualizarPrecoUnitario(produtoId: string, precoStr: string): void {
    // Parse the price (allow comma or dot as decimal separator)
    const precoLimpo = precoStr.replace(/[^\d,.-]/g, '').replace(',', '.')
    const preco = parseFloat(precoLimpo)
    if (isNaN(preco) || preco < 0) return
    setProdutosSelecionados((prev) =>
      prev.map((p) => (p.produtoId === produtoId ? { ...p, precoUnitario: preco } : p))
    )
  }

  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------
  function validarFormulario(): boolean {
    const novosErros: FormErrors = {}

    if (!clienteId) {
      novosErros.clienteId = 'Selecione um cliente'
    }

    if (!etapa) {
      novosErros.etapa = 'Selecione uma etapa'
    }

    if (produtosSelecionados.length === 0) {
      novosErros.produtos = 'Adicione pelo menos um produto'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
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
      const dados: OportunidadeInput | OportunidadeUpdateInput = {
        clienteId,
        vendedorId: vendedorId && vendedorId !== '__none__' ? vendedorId : null,
        etapa,
        observacoes: observacoes.trim() || null,
        produtos: produtosSelecionados.map((p) => ({
          produtoId: p.produtoId,
          quantidade: p.quantidade,
          precoUnitario: p.precoUnitario,
        })),
      }

      const resultado = await onSalvar(dados)
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
    <Sheet open={aberto} onOpenChange={(open) => !open && onFechar()}>
      <SheetContent className="flex w-full flex-col sm:max-w-[540px]">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>{modoEdicao ? 'Editar Oportunidade' : 'Nova Oportunidade'}</SheetTitle>
            <SheetDescription>
              {modoEdicao
                ? 'Atualize as informações da oportunidade'
                : 'Preencha as informações da nova oportunidade de venda'}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-lg overflow-y-auto py-lg">
            {/* Cliente */}
            <div className="grid gap-sm">
              <Label htmlFor="clienteId">
                Cliente <span className="text-destructive">*</span>
              </Label>
              <Select
                value={clienteId}
                onValueChange={setClienteId}
                disabled={salvando || carregando}
              >
                <SelectTrigger
                  id="clienteId"
                  className={erros.clienteId ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.name} {cliente.email ? `(${cliente.email})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {erros.clienteId && (
                <span className="text-caption text-destructive">{erros.clienteId}</span>
              )}
            </div>

            {/* Vendedor */}
            <div className="grid gap-sm">
              <Label htmlFor="vendedorId">Vendedor responsável</Label>
              <Select
                value={vendedorId}
                onValueChange={setVendedorId}
                disabled={salvando || carregando}
              >
                <SelectTrigger
                  id="vendedorId"
                  className={erros.vendedorId ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Selecione um vendedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">Nenhum</SelectItem>
                  {vendedores.map((vendedor) => (
                    <SelectItem key={vendedor.id} value={vendedor.id}>
                      {vendedor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {erros.vendedorId && (
                <span className="text-caption text-destructive">{erros.vendedorId}</span>
              )}
            </div>

            {/* Etapa */}
            <div className="grid gap-sm">
              <Label htmlFor="etapa">
                Etapa <span className="text-destructive">*</span>
              </Label>
              <Select
                value={etapa}
                onValueChange={(value) => setEtapa(value as OpportunityStage)}
                disabled={salvando || carregando}
              >
                <SelectTrigger id="etapa" className={erros.etapa ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Selecione uma etapa" />
                </SelectTrigger>
                <SelectContent>
                  {OPPORTUNITY_STAGES_ORDER.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {OPPORTUNITY_STAGE_LABELS[stage]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {erros.etapa && <span className="text-caption text-destructive">{erros.etapa}</span>}
            </div>

            {/* Produtos */}
            <div className="grid gap-sm">
              <Label>
                Produtos <span className="text-destructive">*</span>
              </Label>

              {/* Add product */}
              <div className="flex gap-sm">
                <Select
                  value={produtoParaAdicionar}
                  onValueChange={setProdutoParaAdicionar}
                  disabled={salvando || carregando || produtosDisponiveis.length === 0}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue
                      placeholder={
                        produtosDisponiveis.length === 0
                          ? 'Todos os produtos adicionados'
                          : 'Selecione um produto'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {produtosDisponiveis.map((produto) => (
                      <SelectItem key={produto.id} value={produto.id}>
                        {produto.name} - {formatarMoeda(produto.price)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={adicionarProduto}
                  disabled={!produtoParaAdicionar || salvando || carregando}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {erros.produtos && (
                <span className="text-caption text-destructive">{erros.produtos}</span>
              )}

              {/* Selected products list */}
              {produtosSelecionados.length > 0 && (
                <div className="space-y-sm rounded-lg border p-md">
                  {produtosSelecionados.map((produto) => (
                    <div
                      key={produto.produtoId}
                      className="flex items-center gap-sm border-b pb-sm last:border-0 last:pb-0"
                    >
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{produto.nome}</div>
                        {produto.codigo && (
                          <div className="text-caption text-muted-foreground">{produto.codigo}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-sm">
                        <div className="grid gap-xs">
                          <Label className="text-caption" htmlFor={`qtd-${produto.produtoId}`}>
                            Qtd
                          </Label>
                          <Input
                            id={`qtd-${produto.produtoId}`}
                            type="number"
                            min="1"
                            value={produto.quantidade}
                            onChange={(e) =>
                              atualizarQuantidade(produto.produtoId, parseInt(e.target.value) || 1)
                            }
                            className="h-8 w-16 text-center"
                            disabled={salvando || carregando}
                          />
                        </div>
                        <div className="grid gap-xs">
                          <Label className="text-caption" htmlFor={`preco-${produto.produtoId}`}>
                            Valor
                          </Label>
                          <Input
                            id={`preco-${produto.produtoId}`}
                            value={produto.precoUnitario.toFixed(2).replace('.', ',')}
                            onChange={(e) =>
                              atualizarPrecoUnitario(produto.produtoId, e.target.value)
                            }
                            className="h-8 w-24 font-mono text-right"
                            disabled={salvando || carregando}
                          />
                        </div>
                        <div className="grid gap-xs">
                          <Label className="text-caption">Subtotal</Label>
                          <div className="flex h-8 w-24 items-center justify-end font-mono text-sm">
                            {formatarMoeda(produto.precoUnitario * produto.quantidade)}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removerProduto(produto.produtoId)}
                          disabled={salvando || carregando}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex items-center justify-between border-t pt-sm">
                    <span className="font-medium">Valor Total</span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {formatarMoeda(valorTotal)}
                    </span>
                  </div>
                </div>
              )}

              {produtosSelecionados.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-lg text-center text-muted-foreground">
                  <Package className="mb-sm h-8 w-8" />
                  <p className="text-sm">Nenhum produto adicionado</p>
                  <p className="text-caption">Selecione um produto acima para adicionar</p>
                </div>
              )}
            </div>

            {/* Observações */}
            <div className="grid gap-sm">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Notas ou observações sobre esta oportunidade..."
                rows={3}
                disabled={salvando || carregando}
                className={erros.observacoes ? 'border-destructive' : ''}
              />
              {erros.observacoes && (
                <span className="text-caption text-destructive">{erros.observacoes}</span>
              )}
            </div>
          </div>

          <SheetFooter className="border-t pt-lg">
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
                'Criar Oportunidade'
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
