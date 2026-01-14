'use client'

import { useState, useCallback, useEffect } from 'react'
import type { CustomerWithSeller } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

export interface ClienteInput {
  nome: string
  email: string
  whatsapp?: string | null
  endereco?: string | null
  cidade?: string | null
  estado?: string | null
  cep?: string | null
  dataNascimento?: string | null
  vendedorId?: string | null
}

interface FiltrosClientes {
  busca?: string
  vendedorId?: string
}

interface UseClientesRetorno {
  clientes: CustomerWithSeller[]
  carregando: boolean
  erro: string | null
  buscarClientes: (filtros?: FiltrosClientes) => Promise<void>
  criarCliente: (dados: ClienteInput) => Promise<CustomerWithSeller | null>
  atualizarCliente: (
    id: string,
    dados: Partial<ClienteInput>
  ) => Promise<CustomerWithSeller | null>
  excluirCliente: (id: string) => Promise<boolean>
}

// ============================================================================
// HOOK
// ============================================================================

export function useClientes(): UseClientesRetorno {
  const [clientes, setClientes] = useState<CustomerWithSeller[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  // --------------------------------------------------------------------------
  // Buscar clientes
  // --------------------------------------------------------------------------
  const buscarClientes = useCallback(async (filtros?: FiltrosClientes): Promise<void> => {
    try {
      setCarregando(true)
      setErro(null)

      // Monta query string com filtros
      const params = new URLSearchParams()
      if (filtros?.busca && filtros.busca.trim()) {
        params.set('busca', filtros.busca.trim())
      }
      if (filtros?.vendedorId) {
        params.set('vendedor_id', filtros.vendedorId)
      }

      const url = `/api/clientes${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao buscar clientes')
      }

      setClientes(data.clientes || [])
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao buscar clientes'
      setErro(mensagem)
      console.error('useClientes - buscarClientes:', error)
    } finally {
      setCarregando(false)
    }
  }, [])

  // --------------------------------------------------------------------------
  // Criar cliente
  // --------------------------------------------------------------------------
  const criarCliente = useCallback(
    async (dados: ClienteInput): Promise<CustomerWithSeller | null> => {
      try {
        setErro(null)

        const response = await fetch('/api/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.erro || 'Erro ao criar cliente')
        }

        // Adiciona o novo cliente à lista (mantendo ordem alfabética)
        setClientes((prev) => {
          const novos = [...prev, data.cliente]
          return novos.sort((a, b) => a.name.localeCompare(b.name))
        })

        return data.cliente
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao criar cliente'
        setErro(mensagem)
        console.error('useClientes - criarCliente:', error)
        return null
      }
    },
    []
  )

  // --------------------------------------------------------------------------
  // Atualizar cliente
  // --------------------------------------------------------------------------
  const atualizarCliente = useCallback(
    async (id: string, dados: Partial<ClienteInput>): Promise<CustomerWithSeller | null> => {
      try {
        setErro(null)

        const response = await fetch(`/api/clientes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.erro || 'Erro ao atualizar cliente')
        }

        // Atualiza o cliente na lista (mantendo ordem alfabética)
        setClientes((prev) => {
          const novos = prev.map((c) => (c.id === id ? data.cliente : c))
          return novos.sort((a, b) => a.name.localeCompare(b.name))
        })

        return data.cliente
      } catch (error) {
        const mensagem = error instanceof Error ? error.message : 'Erro ao atualizar cliente'
        setErro(mensagem)
        console.error('useClientes - atualizarCliente:', error)
        return null
      }
    },
    []
  )

  // --------------------------------------------------------------------------
  // Excluir cliente
  // --------------------------------------------------------------------------
  const excluirCliente = useCallback(async (id: string): Promise<boolean> => {
    try {
      setErro(null)

      const response = await fetch(`/api/clientes/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao excluir cliente')
      }

      // Remove o cliente da lista
      setClientes((prev) => prev.filter((c) => c.id !== id))

      return true
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao excluir cliente'
      setErro(mensagem)
      console.error('useClientes - excluirCliente:', error)
      return false
    }
  }, [])

  // --------------------------------------------------------------------------
  // Carrega clientes na montagem
  // --------------------------------------------------------------------------
  useEffect(() => {
    buscarClientes()
  }, [buscarClientes])

  return {
    clientes,
    carregando,
    erro,
    buscarClientes,
    criarCliente,
    atualizarCliente,
    excluirCliente,
  }
}
