import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useVendedores } from './use-vendedores'
import type { Seller } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockVendedores: Seller[] = [
  {
    id: '1',
    tenant_id: 'tenant-1',
    name: 'Ana Silva',
    email: 'ana@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    tenant_id: 'tenant-1',
    name: 'Bruno Costa',
    email: 'bruno@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

function criarMockFetch(resposta: unknown, status = 200): void {
  vi.mocked(global.fetch).mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(resposta),
  } as Response)
}

// ============================================================================
// TESTS
// ============================================================================

describe('useVendedores', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --------------------------------------------------------------------------
  // buscarVendedores
  // --------------------------------------------------------------------------
  describe('buscarVendedores', () => {
    it('deve buscar vendedores na montagem', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      expect(result.current.carregando).toBe(true)

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.vendedores).toEqual(mockVendedores)
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/vendedores')
    })

    it('deve definir erro quando a busca falha', async () => {
      criarMockFetch({ erro: 'Erro de autenticação' }, 401)

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Erro de autenticação')
      expect(result.current.vendedores).toEqual([])
    })

    it('deve definir erro padrão quando resposta não tem mensagem', async () => {
      criarMockFetch({}, 500)

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Erro ao buscar vendedores')
    })

    it('deve permitir recarregar vendedores manualmente', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const vendedoresAtualizados = [
        ...mockVendedores,
        {
          id: '3',
          tenant_id: 'tenant-1',
          name: 'Carlos Souza',
          email: 'carlos@example.com',
          created_at: '2024-01-02T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
        },
      ]

      criarMockFetch({ vendedores: vendedoresAtualizados })

      await act(async () => {
        await result.current.buscarVendedores()
      })

      expect(result.current.vendedores).toEqual(vendedoresAtualizados)
    })
  })

  // --------------------------------------------------------------------------
  // criarVendedor
  // --------------------------------------------------------------------------
  describe('criarVendedor', () => {
    it('deve criar um novo vendedor com sucesso', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoVendedor: Seller = {
        id: '3',
        tenant_id: 'tenant-1',
        name: 'Carlos Souza',
        email: 'carlos@example.com',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      }

      criarMockFetch({ vendedor: novoVendedor })

      let resultado: Seller | null = null
      await act(async () => {
        resultado = await result.current.criarVendedor({
          nome: 'Carlos Souza',
          email: 'carlos@example.com',
        })
      })

      expect(resultado).toEqual(novoVendedor)
      expect(result.current.vendedores).toHaveLength(3)
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/vendedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Carlos Souza', email: 'carlos@example.com' }),
      })
    })

    it('deve manter ordem alfabética após criar vendedor', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoVendedor: Seller = {
        id: '3',
        tenant_id: 'tenant-1',
        name: 'Alberto Lima',
        email: 'alberto@example.com',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      }

      criarMockFetch({ vendedor: novoVendedor })

      await act(async () => {
        await result.current.criarVendedor({
          nome: 'Alberto Lima',
          email: 'alberto@example.com',
        })
      })

      // Alberto deve ser o primeiro (ordem alfabética)
      expect(result.current.vendedores[0].name).toBe('Alberto Lima')
    })

    it('deve definir erro quando criação falha', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Email já existe' }, 400)

      let resultado: Seller | null = null
      await act(async () => {
        resultado = await result.current.criarVendedor({
          nome: 'Teste',
          email: 'ana@example.com',
        })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Email já existe')
    })
  })

  // --------------------------------------------------------------------------
  // atualizarVendedor
  // --------------------------------------------------------------------------
  describe('atualizarVendedor', () => {
    it('deve atualizar um vendedor com sucesso', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const vendedorAtualizado: Seller = {
        ...mockVendedores[0],
        name: 'Ana Maria Silva',
      }

      criarMockFetch({ vendedor: vendedorAtualizado })

      let resultado: Seller | null = null
      await act(async () => {
        resultado = await result.current.atualizarVendedor('1', {
          nome: 'Ana Maria Silva',
        })
      })

      expect(resultado).toEqual(vendedorAtualizado)
      expect(result.current.vendedores.find((v) => v.id === '1')?.name).toBe('Ana Maria Silva')
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/vendedores/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Ana Maria Silva' }),
      })
    })

    it('deve manter ordem alfabética após atualizar vendedor', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      // Renomeando Ana para Zara (vai para o fim da lista)
      const vendedorAtualizado: Seller = {
        ...mockVendedores[0],
        name: 'Zara Silva',
      }

      criarMockFetch({ vendedor: vendedorAtualizado })

      await act(async () => {
        await result.current.atualizarVendedor('1', { nome: 'Zara Silva' })
      })

      // Bruno agora deve ser o primeiro
      expect(result.current.vendedores[0].name).toBe('Bruno Costa')
      expect(result.current.vendedores[1].name).toBe('Zara Silva')
    })

    it('deve definir erro quando atualização falha', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Vendedor não encontrado' }, 404)

      let resultado: Seller | null = null
      await act(async () => {
        resultado = await result.current.atualizarVendedor('999', { nome: 'Teste' })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Vendedor não encontrado')
    })
  })

  // --------------------------------------------------------------------------
  // excluirVendedor
  // --------------------------------------------------------------------------
  describe('excluirVendedor', () => {
    it('deve excluir um vendedor com sucesso', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ sucesso: true })

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirVendedor('1')
      })

      expect(sucesso).toBe(true)
      expect(result.current.vendedores).toHaveLength(1)
      expect(result.current.vendedores.find((v) => v.id === '1')).toBeUndefined()
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/vendedores/1', {
        method: 'DELETE',
      })
    })

    it('deve definir erro quando exclusão falha', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Vendedor possui clientes vinculados' }, 400)

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirVendedor('1')
      })

      expect(sucesso).toBe(false)
      expect(result.current.erro).toBe('Vendedor possui clientes vinculados')
      // Lista não foi alterada
      expect(result.current.vendedores).toHaveLength(2)
    })
  })

  // --------------------------------------------------------------------------
  // Tratamento de erros de rede
  // --------------------------------------------------------------------------
  describe('tratamento de erros de rede', () => {
    it('deve tratar erro de rede na busca', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Network error')
    })

    it('deve tratar erro de rede na criação', async () => {
      criarMockFetch({ vendedores: mockVendedores })

      const { result } = renderHook(() => useVendedores())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      let resultado: Seller | null = null
      await act(async () => {
        resultado = await result.current.criarVendedor({ nome: 'Teste', email: 'teste@example.com' })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Network error')
    })
  })
})
