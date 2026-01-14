import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useProdutos } from './use-produtos'
import type { Product } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockProdutos: Product[] = [
  {
    id: '1',
    tenant_id: 'tenant-1',
    name: 'Produto A',
    code: 'PROD-A',
    price: 99.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    tenant_id: 'tenant-1',
    name: 'Produto B',
    code: 'PROD-B',
    price: 199.9,
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

describe('useProdutos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --------------------------------------------------------------------------
  // buscarProdutos
  // --------------------------------------------------------------------------
  describe('buscarProdutos', () => {
    it('deve buscar produtos na montagem', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      expect(result.current.carregando).toBe(true)

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.produtos).toEqual(mockProdutos)
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/produtos')
    })

    it('deve definir erro quando a busca falha', async () => {
      criarMockFetch({ erro: 'Erro de autenticação' }, 401)

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Erro de autenticação')
      expect(result.current.produtos).toEqual([])
    })

    it('deve definir erro padrão quando resposta não tem mensagem', async () => {
      criarMockFetch({}, 500)

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Erro ao buscar produtos')
    })

    it('deve permitir recarregar produtos manualmente', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const produtosAtualizados = [
        ...mockProdutos,
        {
          id: '3',
          tenant_id: 'tenant-1',
          name: 'Produto C',
          code: 'PROD-C',
          price: 299.9,
          created_at: '2024-01-02T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
        },
      ]

      criarMockFetch({ produtos: produtosAtualizados })

      await act(async () => {
        await result.current.buscarProdutos()
      })

      expect(result.current.produtos).toEqual(produtosAtualizados)
    })
  })

  // --------------------------------------------------------------------------
  // criarProduto
  // --------------------------------------------------------------------------
  describe('criarProduto', () => {
    it('deve criar um novo produto com sucesso', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoProduto: Product = {
        id: '3',
        tenant_id: 'tenant-1',
        name: 'Produto C',
        code: 'PROD-C',
        price: 299.9,
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      }

      criarMockFetch({ produto: novoProduto })

      let resultado: Product | null = null
      await act(async () => {
        resultado = await result.current.criarProduto({
          nome: 'Produto C',
          codigo: 'PROD-C',
          valor: 299.9,
        })
      })

      expect(resultado).toEqual(novoProduto)
      expect(result.current.produtos).toHaveLength(3)
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Produto C', codigo: 'PROD-C', valor: 299.9 }),
      })
    })

    it('deve criar produto sem código', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoProduto: Product = {
        id: '3',
        tenant_id: 'tenant-1',
        name: 'Serviço X',
        code: null,
        price: 150.0,
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      }

      criarMockFetch({ produto: novoProduto })

      let resultado: Product | null = null
      await act(async () => {
        resultado = await result.current.criarProduto({
          nome: 'Serviço X',
          valor: 150.0,
        })
      })

      expect(resultado).toEqual(novoProduto)
      expect(result.current.produtos).toHaveLength(3)
    })

    it('deve manter ordem alfabética após criar produto', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoProduto: Product = {
        id: '3',
        tenant_id: 'tenant-1',
        name: 'Acessório Z',
        code: 'ACESS-Z',
        price: 50.0,
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      }

      criarMockFetch({ produto: novoProduto })

      await act(async () => {
        await result.current.criarProduto({
          nome: 'Acessório Z',
          codigo: 'ACESS-Z',
          valor: 50.0,
        })
      })

      // Acessório Z deve ser o primeiro (ordem alfabética)
      expect(result.current.produtos[0].name).toBe('Acessório Z')
    })

    it('deve definir erro quando criação falha', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Código já existe' }, 400)

      let resultado: Product | null = null
      await act(async () => {
        resultado = await result.current.criarProduto({
          nome: 'Teste',
          codigo: 'PROD-A',
          valor: 100,
        })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Código já existe')
    })
  })

  // --------------------------------------------------------------------------
  // atualizarProduto
  // --------------------------------------------------------------------------
  describe('atualizarProduto', () => {
    it('deve atualizar um produto com sucesso', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const produtoAtualizado: Product = {
        ...mockProdutos[0],
        name: 'Produto A Premium',
        price: 149.9,
      }

      criarMockFetch({ produto: produtoAtualizado })

      let resultado: Product | null = null
      await act(async () => {
        resultado = await result.current.atualizarProduto('1', {
          nome: 'Produto A Premium',
          valor: 149.9,
        })
      })

      expect(resultado).toEqual(produtoAtualizado)
      expect(result.current.produtos.find((p) => p.id === '1')?.name).toBe('Produto A Premium')
      expect(result.current.produtos.find((p) => p.id === '1')?.price).toBe(149.9)
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/produtos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Produto A Premium', valor: 149.9 }),
      })
    })

    it('deve manter ordem alfabética após atualizar produto', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      // Renomeando Produto A para Zênite (vai para o fim da lista)
      const produtoAtualizado: Product = {
        ...mockProdutos[0],
        name: 'Zênite Premium',
      }

      criarMockFetch({ produto: produtoAtualizado })

      await act(async () => {
        await result.current.atualizarProduto('1', { nome: 'Zênite Premium' })
      })

      // Produto B agora deve ser o primeiro
      expect(result.current.produtos[0].name).toBe('Produto B')
      expect(result.current.produtos[1].name).toBe('Zênite Premium')
    })

    it('deve definir erro quando atualização falha', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Produto não encontrado' }, 404)

      let resultado: Product | null = null
      await act(async () => {
        resultado = await result.current.atualizarProduto('999', { nome: 'Teste' })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Produto não encontrado')
    })
  })

  // --------------------------------------------------------------------------
  // excluirProduto
  // --------------------------------------------------------------------------
  describe('excluirProduto', () => {
    it('deve excluir um produto com sucesso', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ sucesso: true })

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirProduto('1')
      })

      expect(sucesso).toBe(true)
      expect(result.current.produtos).toHaveLength(1)
      expect(result.current.produtos.find((p) => p.id === '1')).toBeUndefined()
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/produtos/1', {
        method: 'DELETE',
      })
    })

    it('deve definir erro quando exclusão falha', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Produto está vinculado a oportunidades' }, 400)

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirProduto('1')
      })

      expect(sucesso).toBe(false)
      expect(result.current.erro).toBe('Produto está vinculado a oportunidades')
      // Lista não foi alterada
      expect(result.current.produtos).toHaveLength(2)
    })
  })

  // --------------------------------------------------------------------------
  // Tratamento de erros de rede
  // --------------------------------------------------------------------------
  describe('tratamento de erros de rede', () => {
    it('deve tratar erro de rede na busca', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Network error')
    })

    it('deve tratar erro de rede na criação', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      let resultado: Product | null = null
      await act(async () => {
        resultado = await result.current.criarProduto({ nome: 'Teste', valor: 100 })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Network error')
    })

    it('deve tratar erro de rede na atualização', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      let resultado: Product | null = null
      await act(async () => {
        resultado = await result.current.atualizarProduto('1', { nome: 'Teste' })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Network error')
    })

    it('deve tratar erro de rede na exclusão', async () => {
      criarMockFetch({ produtos: mockProdutos })

      const { result } = renderHook(() => useProdutos())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirProduto('1')
      })

      expect(sucesso).toBe(false)
      expect(result.current.erro).toBe('Network error')
    })
  })
})
