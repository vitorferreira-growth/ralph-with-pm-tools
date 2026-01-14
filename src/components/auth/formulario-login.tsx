'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { criarClienteNavegador } from '@/lib/supabase/client'

interface FormularioLoginProps {
  redirectTo?: string
}

export function FormularioLogin({ redirectTo }: FormularioLoginProps): ReactNode {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault()
    setErro(null)
    setCarregando(true)

    const supabase = criarClienteNavegador()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      setErro(traduzirErro(error.message))
      setCarregando(false)
      return
    }

    router.push(redirectTo || '/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-lg">
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
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
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
            Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>

      <p className="text-center text-body-sm text-gray-500">
        Ainda nao tem conta?{' '}
        <Link href="/registro" className="text-primary hover:underline">
          Criar conta
        </Link>
      </p>
    </form>
  )
}

function traduzirErro(mensagem: string): string {
  const traducoes: Record<string, string> = {
    'Invalid login credentials': 'Email ou senha incorretos',
    'Email not confirmed': 'Email ainda nao foi confirmado. Verifique sua caixa de entrada.',
    'Too many requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
    'User not found': 'Usuario nao encontrado',
  }

  return traducoes[mensagem] || 'Erro ao fazer login. Tente novamente.'
}
