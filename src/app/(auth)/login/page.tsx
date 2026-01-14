import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormularioLogin } from '@/components/auth/formulario-login'

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps): Promise<ReactNode> {
  const { redirectTo } = await searchParams

  return (
    <Card className="shadow-card">
      <CardHeader className="space-y-xs text-center">
        <div className="mx-auto mb-md text-h1 font-bold text-primary">InfinitePay</div>
        <CardTitle className="text-h2">Bem-vindo de volta</CardTitle>
        <CardDescription className="text-body text-gray-500">
          Entre com seu email e senha para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormularioLogin redirectTo={redirectTo} />
      </CardContent>
    </Card>
  )
}
