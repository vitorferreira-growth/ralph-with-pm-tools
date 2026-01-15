'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
            <AlertTriangle className="h-6 w-6 text-error" />
          </div>
          <CardTitle className="text-xl">Algo deu errado</CardTitle>
          <CardDescription>
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="rounded-md bg-gray-100 p-3">
              <p className="font-mono text-xs text-gray-700 break-all">{error.message}</p>
              {error.digest && (
                <p className="mt-1 font-mono text-xs text-gray-500">Digest: {error.digest}</p>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="/">Voltar para o início</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
