'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps): React.ReactElement {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Erro crítico</h1>
              <p className="mt-2 text-sm text-gray-600">
                Ocorreu um erro crítico na aplicação. Por favor, tente novamente.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {process.env.NODE_ENV === 'development' && (
                <div className="rounded-md bg-gray-100 p-3">
                  <p className="font-mono text-xs text-gray-700 break-all">{error.message}</p>
                  {error.digest && (
                    <p className="mt-1 font-mono text-xs text-gray-500">Digest: {error.digest}</p>
                  )}
                </div>
              )}
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                <RefreshCw className="h-4 w-4" />
                Tentar novamente
              </button>
              <a
                href="/"
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Voltar para o início
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
