'use client'

import { useState, useEffect } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { CustomerWithSeller, Seller } from '@/types/database'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import {
  clienteSchema,
  ESTADOS_BRASILEIROS,
  formatarCEP,
  formatarWhatsApp,
} from '@/lib/validations/cliente'
import type { ClienteInput } from '@/hooks/use-clientes'

// ============================================================================
// TYPES
// ============================================================================

interface FormularioClienteProps {
  aberto: boolean
  onFechar: () => void
  onSalvar: (dados: ClienteInput) => Promise<CustomerWithSeller | null>
  cliente?: CustomerWithSeller | null
  vendedores: Seller[]
  carregando?: boolean
}

interface FormErrors {
  nome?: string
  email?: string
  whatsapp?: string
  endereco?: string
  cidade?: string
  estado?: string
  cep?: string
  dataNascimento?: string
  vendedorId?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FormularioCliente({
  aberto,
  onFechar,
  onSalvar,
  cliente,
  vendedores,
  carregando = false,
}: FormularioClienteProps): ReactNode {
  // Form fields
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [endereco, setEndereco] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [cep, setCep] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [vendedorId, setVendedorId] = useState('')

  // UI state
  const [erros, setErros] = useState<FormErrors>({})
  const [salvando, setSalvando] = useState(false)

  const modoEdicao = !!cliente

  // --------------------------------------------------------------------------
  // Reset form when dialog opens/closes or cliente changes
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (aberto) {
      if (cliente) {
        setNome(cliente.name)
        setEmail(cliente.email || '')
        setWhatsapp(cliente.whatsapp ? formatarWhatsApp(cliente.whatsapp) : '')
        setEndereco(cliente.address || '')
        setCidade(cliente.city || '')
        setEstado(cliente.state || '')
        setCep(cliente.zip_code ? formatarCEP(cliente.zip_code) : '')
        setDataNascimento(cliente.birth_date || '')
        setVendedorId(cliente.seller_id || '')
      } else {
        setNome('')
        setEmail('')
        setWhatsapp('')
        setEndereco('')
        setCidade('')
        setEstado('')
        setCep('')
        setDataNascimento('')
        setVendedorId('')
      }
      setErros({})
    }
  }, [aberto, cliente])

  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------
  function validarFormulario(): boolean {
    const dados = {
      nome,
      email,
      whatsapp: whatsapp || null,
      endereco: endereco || null,
      cidade: cidade || null,
      estado: estado || null,
      cep: cep || null,
      dataNascimento: dataNascimento || null,
      vendedorId: vendedorId || null,
    }

    const resultado = clienteSchema.safeParse(dados)

    if (!resultado.success) {
      const novosErros: FormErrors = {}
      resultado.error.errors.forEach((err) => {
        const campo = err.path[0] as keyof FormErrors
        if (campo && !novosErros[campo]) {
          novosErros[campo] = err.message
        }
      })
      setErros(novosErros)
      return false
    }

    setErros({})
    return true
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
      const dados: ClienteInput = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim() || null,
        endereco: endereco.trim() || null,
        cidade: cidade.trim() || null,
        estado: estado.trim().toUpperCase() || null,
        cep: cep.replace(/\D/g, '') || null,
        dataNascimento: dataNascimento || null,
        vendedorId: vendedorId || null,
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
    <Dialog open={aberto} onOpenChange={(open) => !open && onFechar()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{modoEdicao ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
            <DialogDescription>
              {modoEdicao
                ? 'Atualize as informações do cliente'
                : 'Preencha as informações do novo cliente'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-lg py-lg">
            {/* Nome */}
            <div className="grid gap-sm">
              <Label htmlFor="nome">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo do cliente"
                disabled={salvando || carregando}
                className={erros.nome ? 'border-destructive' : ''}
              />
              {erros.nome && <span className="text-caption text-destructive">{erros.nome}</span>}
            </div>

            {/* Email */}
            <div className="grid gap-sm">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cliente@exemplo.com"
                disabled={salvando || carregando}
                className={erros.email ? 'border-destructive' : ''}
              />
              {erros.email && <span className="text-caption text-destructive">{erros.email}</span>}
            </div>

            {/* WhatsApp */}
            <div className="grid gap-sm">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(11) 99999-9999"
                disabled={salvando || carregando}
                className={erros.whatsapp ? 'border-destructive' : ''}
              />
              {erros.whatsapp && (
                <span className="text-caption text-destructive">{erros.whatsapp}</span>
              )}
            </div>

            {/* Endereço */}
            <div className="grid gap-sm">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Rua, número, bairro"
                disabled={salvando || carregando}
                className={erros.endereco ? 'border-destructive' : ''}
              />
              {erros.endereco && (
                <span className="text-caption text-destructive">{erros.endereco}</span>
              )}
            </div>

            {/* Cidade, Estado, CEP */}
            <div className="grid grid-cols-3 gap-md">
              {/* Cidade */}
              <div className="grid gap-sm">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="São Paulo"
                  disabled={salvando || carregando}
                  className={erros.cidade ? 'border-destructive' : ''}
                />
                {erros.cidade && (
                  <span className="text-caption text-destructive">{erros.cidade}</span>
                )}
              </div>

              {/* Estado */}
              <div className="grid gap-sm">
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={estado}
                  onValueChange={setEstado}
                  disabled={salvando || carregando}
                >
                  <SelectTrigger
                    id="estado"
                    className={erros.estado ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_BRASILEIROS.map((uf) => (
                      <SelectItem key={uf.sigla} value={uf.sigla}>
                        {uf.sigla}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {erros.estado && (
                  <span className="text-caption text-destructive">{erros.estado}</span>
                )}
              </div>

              {/* CEP */}
              <div className="grid gap-sm">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  disabled={salvando || carregando}
                  className={erros.cep ? 'border-destructive' : ''}
                />
                {erros.cep && <span className="text-caption text-destructive">{erros.cep}</span>}
              </div>
            </div>

            {/* Data de nascimento */}
            <div className="grid gap-sm">
              <Label htmlFor="dataNascimento">Data de nascimento</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                disabled={salvando || carregando}
                className={erros.dataNascimento ? 'border-destructive' : ''}
              />
              {erros.dataNascimento && (
                <span className="text-caption text-destructive">{erros.dataNascimento}</span>
              )}
            </div>

            {/* Vendedor responsável */}
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
                  <SelectItem value="">Nenhum</SelectItem>
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
