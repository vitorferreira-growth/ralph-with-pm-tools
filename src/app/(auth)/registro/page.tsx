import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormularioRegistro } from '@/components/auth/formulario-registro'

export default function RegistroPage(): ReactNode {
  return (
    <Card className="shadow-card">
      <CardHeader className="space-y-xs text-center">
        <div className="mx-auto mb-md text-h1 font-bold text-primary">InfinitePay</div>
        <CardTitle className="text-h2">Criar sua conta</CardTitle>
        <CardDescription className="text-body text-gray-500">
          Preencha os dados abaixo para comecar a usar o CRM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormularioRegistro />
      </CardContent>
    </Card>
  )
}
