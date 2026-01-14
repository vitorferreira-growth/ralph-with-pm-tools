'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { criarClienteNavegador } from '@/lib/supabase/client'

function gerarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}

export function FormularioRegistro(): ReactNode {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault()
    setErro(null)

    if (senha !== confirmarSenha) {
      setErro('As senhas nao coincidem')
      return
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setCarregando(true)

    const supabase = criarClienteNavegador()
    const slug = gerarSlug(nomeEmpresa) + '-' + Date.now().toString(36)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          name: nome,
          empresa: nomeEmpresa,
          slug: slug,
        },
      },
    })

    if (authError) {
      setErro(traduzirErro(authError.message))
      setCarregando(false)
      return
    }

    if (!authData.user) {
      setErro('Erro ao criar usuario. Tente novamente.')
      setCarregando(false)
      return
    }

    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: nomeEmpresa,
        slug: slug,
      })
      .select('id')
      .single()

    if (tenantError) {
      setErro('Erro ao criar empresa. Tente novamente.')
      setCarregando(false)
      return
    }

    const { error: userError } = await supabase.from('users').insert({
      id: authData.user.id,
      tenant_id: tenant.id,
      name: nome,
      email: email,
      role: 'owner',
    })

    if (userError) {
      setErro('Erro ao vincular usuario. Tente novamente.')
      setCarregando(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-lg">
      <div className="space-y-sm">
        <Label htmlFor="nome">Seu nome</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Joao Silva"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          disabled={carregando}
          className="h-10"
        />
      </div>

      <div className="space-y-sm">
        <Label htmlFor="nomeEmpresa">Nome da empresa</Label>
        <Input
          id="nomeEmpresa"
          type="text"
          placeholder="Minha Empresa"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
          required
          disabled={carregando}
          className="h-10"
        />
      </div>

      <div className="space-y-sm">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={carregando}
          className="h-10"
        />
      </div>

      <div className="space-y-sm">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="Minimo 6 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength={6}
          disabled={carregando}
          className="h-10"
        />
      </div>

      <div className="space-y-sm">
        <Label htmlFor="confirmarSenha">Confirmar senha</Label>
        <Input
          id="confirmarSenha"
          type="password"
          placeholder="Repita a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
          minLength={6}
          disabled={carregando}
          className="h-10"
        />
      </div>

      {erro && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-md text-body-sm text-destructive">
          {erro}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={carregando}>
        {carregando ? (
          <>
            <Loader2 className="animate-spin" />
            Criando conta...
          </>
        ) : (
          'Criar conta'
        )}
      </Button>

      <p className="text-center text-body-sm text-gray-500">
        Ja tem uma conta?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  )
}

function traduzirErro(mensagem: string): string {
  const traducoes: Record<string, string> = {
    'User already registered': 'Este email ja esta cadastrado',
    'Password should be at least 6 characters':
      'A senha deve ter pelo menos 6 caracteres',
    'Unable to validate email address: invalid format': 'Formato de email invalido',
    'Signup requires a valid password': 'Informe uma senha valida',
    'To signup, please provide your email': 'Informe seu email',
  }

  return traducoes[mensagem] || 'Erro ao criar conta. Tente novamente.'
}
