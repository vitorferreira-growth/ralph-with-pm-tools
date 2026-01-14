'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Product } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

interface ProdutoInput {
  nome: string
  codigo?: string | null
  valor: number
}

interface UseProdutosRetorno {
  produtos: Product[]
  carregando: boolean
  erro: string | null
  buscarProdutos: () => Promise<void>
  criarProduto: (dados: ProdutoInput) => Promise<Product | null>
  atualizarProduto: (id: string, dados: Partial<ProdutoInput>) => Promise<Product | null>
  excluirProduto: (id: string) => Promise<boolean>
}

// ============================================================================
// HOOK
// ============================================================================

export function useProdutos(): UseProdutosRetorno {
  const [produtos, setProdutos] = useState<Product[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  // --------------------------------------------------------------------------
  // Buscar produtos
  // --------------------------------------------------------------------------
  const buscarProdutos = useCallback(async (): Promise<void> => {
    try {
      setCarregando(true)
      setErro(null)

      const response = await fetch('/api/produtos')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao buscar produtos')
      }

      setProdutos(data.produtos || [])
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao buscar produtos'
      setErro(mensagem)
      console.error('useProdutos - buscarProdutos:', error)
    } finally {
      setCarregando(false)
    }
  }, [])

  // --------------------------------------------------------------------------
  // Criar produto
  // --------------------------------------------------------------------------
  const criarProduto = useCallback(async (dados: ProdutoInput): Promise<Product | null> => {
    try {
      setErro(null)

      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao criar produto')
      }

      // Adiciona o novo produto à lista (mantendo ordem alfabética)
      setProdutos((prev) => {
        const novos = [...prev, data.produto]
        return novos.sort((a, b) => a.name.localeCompare(b.name))
      })

      return data.produto
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao criar produto'
      setErro(mensagem)
      console.error('useProdutos - criarProduto:', error)
      return null
    }
  }, [])

  // --------------------------------------------------------------------------
  // Atualizar produto
  // --------------------------------------------------------------------------
  const atualizarProduto = useCallback(
    async (id: string, dados: Partial<ProdutoInput>): Promise<Product | null> => {
      try {
        setErro(null)

        const response = await fetch(`/api/produtos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.erro || 'Erro ao atualizar produto')
        }

        // Atualiza o produto na lista (mantendo ordem alfabética)
        setProdutos((prev) => {
          const novos = prev.map((p) => (p.id === id ? data.produto : p))
          return novos.sort((a, b) => a.name.localeCompare(b.name))
        })

        return data.produto
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao atualizar produto'
        setErro(mensagem)
        console.error('useProdutos - atualizarProduto:', error)
        return null
      }
    },
    []
  )

  // --------------------------------------------------------------------------
  // Excluir produto
  // --------------------------------------------------------------------------
  const excluirProduto = useCallback(async (id: string): Promise<boolean> => {
    try {
      setErro(null)

      const response = await fetch(`/api/produtos/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao excluir produto')
      }

      // Remove o produto da lista
      setProdutos((prev) => prev.filter((p) => p.id !== id))

      return true
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao excluir produto'
      setErro(mensagem)
      console.error('useProdutos - excluirProduto:', error)
      return false
    }
  }, [])

  // --------------------------------------------------------------------------
  // Carrega produtos na montagem
  // --------------------------------------------------------------------------
  useEffect(() => {
    buscarProdutos()
  }, [buscarProdutos])

  return {
    produtos,
    carregando,
    erro,
    buscarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
  }
}
