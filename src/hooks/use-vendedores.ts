'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Seller } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

interface VendedorInput {
  nome: string
  email: string
}

interface UseVendedoresRetorno {
  vendedores: Seller[]
  carregando: boolean
  erro: string | null
  buscarVendedores: () => Promise<void>
  criarVendedor: (dados: VendedorInput) => Promise<Seller | null>
  atualizarVendedor: (id: string, dados: Partial<VendedorInput>) => Promise<Seller | null>
  excluirVendedor: (id: string) => Promise<boolean>
}

// ============================================================================
// HOOK
// ============================================================================

export function useVendedores(): UseVendedoresRetorno {
  const [vendedores, setVendedores] = useState<Seller[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  // --------------------------------------------------------------------------
  // Buscar vendedores
  // --------------------------------------------------------------------------
  const buscarVendedores = useCallback(async (): Promise<void> => {
    try {
      setCarregando(true)
      setErro(null)

      const response = await fetch('/api/vendedores')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao buscar vendedores')
      }

      setVendedores(data.vendedores || [])
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao buscar vendedores'
      setErro(mensagem)
      console.error('useVendedores - buscarVendedores:', error)
    } finally {
      setCarregando(false)
    }
  }, [])

  // --------------------------------------------------------------------------
  // Criar vendedor
  // --------------------------------------------------------------------------
  const criarVendedor = useCallback(async (dados: VendedorInput): Promise<Seller | null> => {
    try {
      setErro(null)

      const response = await fetch('/api/vendedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao criar vendedor')
      }

      // Adiciona o novo vendedor à lista (mantendo ordem alfabética)
      setVendedores((prev) => {
        const novos = [...prev, data.vendedor]
        return novos.sort((a, b) => a.name.localeCompare(b.name))
      })

      return data.vendedor
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao criar vendedor'
      setErro(mensagem)
      console.error('useVendedores - criarVendedor:', error)
      return null
    }
  }, [])

  // --------------------------------------------------------------------------
  // Atualizar vendedor
  // --------------------------------------------------------------------------
  const atualizarVendedor = useCallback(
    async (id: string, dados: Partial<VendedorInput>): Promise<Seller | null> => {
      try {
        setErro(null)

        const response = await fetch(`/api/vendedores/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.erro || 'Erro ao atualizar vendedor')
        }

        // Atualiza o vendedor na lista (mantendo ordem alfabética)
        setVendedores((prev) => {
          const novos = prev.map((v) => (v.id === id ? data.vendedor : v))
          return novos.sort((a, b) => a.name.localeCompare(b.name))
        })

        return data.vendedor
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao atualizar vendedor'
        setErro(mensagem)
        console.error('useVendedores - atualizarVendedor:', error)
        return null
      }
    },
    []
  )

  // --------------------------------------------------------------------------
  // Excluir vendedor
  // --------------------------------------------------------------------------
  const excluirVendedor = useCallback(async (id: string): Promise<boolean> => {
    try {
      setErro(null)

      const response = await fetch(`/api/vendedores/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao excluir vendedor')
      }

      // Remove o vendedor da lista
      setVendedores((prev) => prev.filter((v) => v.id !== id))

      return true
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao excluir vendedor'
      setErro(mensagem)
      console.error('useVendedores - excluirVendedor:', error)
      return false
    }
  }, [])

  // --------------------------------------------------------------------------
  // Carrega vendedores na montagem
  // --------------------------------------------------------------------------
  useEffect(() => {
    buscarVendedores()
  }, [buscarVendedores])

  return {
    vendedores,
    carregando,
    erro,
    buscarVendedores,
    criarVendedor,
    atualizarVendedor,
    excluirVendedor,
  }
}
