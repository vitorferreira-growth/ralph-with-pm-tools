import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useClientes } from './use-clientes'
import type { CustomerWithSeller } from '@/types/database'

// ============================================================================
// MOCKS
// ============================================================================

const mockClientes: CustomerWithSeller[] = [
  {
    id: '1',
    tenant_id: 'tenant-1',
    seller_id: 'seller-1',
    name: 'Ana Maria',
    email: 'ana@example.com',
    whatsapp: '11999999999',
    address: 'Rua A, 123',
    city: 'São Paulo',
    state: 'SP',
    zip_code: '01310100',
    birth_date: '1990-05-15',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    seller: {
      id: 'seller-1',
      tenant_id: 'tenant-1',
      name: 'Bruno Vendedor',
      email: 'bruno@example.com',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  },
  {
    id: '2',
    tenant_id: 'tenant-1',
    seller_id: null,
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    whatsapp: null,
    address: null,
    city: 'Rio de Janeiro',
    state: 'RJ',
    zip_code: null,
    birth_date: null,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    seller: null,
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

describe('useClientes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --------------------------------------------------------------------------
  // buscarClientes
  // --------------------------------------------------------------------------
  describe('buscarClientes', () => {
    it('deve buscar clientes na montagem', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      expect(result.current.carregando).toBe(true)

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.clientes).toEqual(mockClientes)
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/clientes')
    })

    it('deve definir erro quando a busca falha', async () => {
      criarMockFetch({ erro: 'Erro de autenticação' }, 401)

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Erro de autenticação')
      expect(result.current.clientes).toEqual([])
    })

    it('deve definir erro padrão quando resposta não tem mensagem', async () => {
      criarMockFetch({}, 500)

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Erro ao buscar clientes')
    })

    it('deve permitir recarregar clientes manualmente', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const clientesAtualizados: CustomerWithSeller[] = [
        ...mockClientes,
        {
          id: '3',
          tenant_id: 'tenant-1',
          seller_id: null,
          name: 'Diana Costa',
          email: 'diana@example.com',
          whatsapp: null,
          address: null,
          city: null,
          state: null,
          zip_code: null,
          birth_date: null,
          created_at: '2024-01-03T00:00:00Z',
          updated_at: '2024-01-03T00:00:00Z',
          seller: null,
        },
      ]

      criarMockFetch({ clientes: clientesAtualizados })

      await act(async () => {
        await result.current.buscarClientes()
      })

      expect(result.current.clientes).toEqual(clientesAtualizados)
    })

    it('deve buscar clientes com filtro de busca', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ clientes: [mockClientes[0]] })

      await act(async () => {
        await result.current.buscarClientes({ busca: 'ana' })
      })

      expect(global.fetch).toHaveBeenCalledWith('/api/clientes?busca=ana')
    })

    it('deve buscar clientes com filtro de vendedor', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ clientes: [mockClientes[0]] })

      await act(async () => {
        await result.current.buscarClientes({ vendedorId: 'seller-1' })
      })

      expect(global.fetch).toHaveBeenCalledWith('/api/clientes?vendedor_id=seller-1')
    })

    it('deve buscar clientes com múltiplos filtros', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ clientes: [mockClientes[0]] })

      await act(async () => {
        await result.current.buscarClientes({ busca: 'ana', vendedorId: 'seller-1' })
      })

      expect(global.fetch).toHaveBeenCalledWith('/api/clientes?busca=ana&vendedor_id=seller-1')
    })

    it('deve ignorar busca vazia ou só com espaços', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ clientes: mockClientes })

      await act(async () => {
        await result.current.buscarClientes({ busca: '   ' })
      })

      expect(global.fetch).toHaveBeenCalledWith('/api/clientes')
    })
  })

  // --------------------------------------------------------------------------
  // criarCliente
  // --------------------------------------------------------------------------
  describe('criarCliente', () => {
    it('deve criar um novo cliente com sucesso', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoCliente: CustomerWithSeller = {
        id: '3',
        tenant_id: 'tenant-1',
        seller_id: null,
        name: 'Diana Costa',
        email: 'diana@example.com',
        whatsapp: '11888888888',
        address: 'Rua B, 456',
        city: 'Belo Horizonte',
        state: 'MG',
        zip_code: '30130000',
        birth_date: '1985-03-20',
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
        seller: null,
      }

      criarMockFetch({ cliente: novoCliente })

      let resultado: CustomerWithSeller | null = null
      await act(async () => {
        resultado = await result.current.criarCliente({
          nome: 'Diana Costa',
          email: 'diana@example.com',
          whatsapp: '11888888888',
          endereco: 'Rua B, 456',
          cidade: 'Belo Horizonte',
          estado: 'MG',
          cep: '30130000',
          dataNascimento: '1985-03-20',
        })
      })

      expect(resultado).toEqual(novoCliente)
      expect(result.current.clientes).toHaveLength(3)
      expect(result.current.erro).toBeNull()
    })

    it('deve criar cliente com campos mínimos', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoCliente: CustomerWithSeller = {
        id: '3',
        tenant_id: 'tenant-1',
        seller_id: null,
        name: 'Eduardo Lima',
        email: 'eduardo@example.com',
        whatsapp: null,
        address: null,
        city: null,
        state: null,
        zip_code: null,
        birth_date: null,
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
        seller: null,
      }

      criarMockFetch({ cliente: novoCliente })

      let resultado: CustomerWithSeller | null = null
      await act(async () => {
        resultado = await result.current.criarCliente({
          nome: 'Eduardo Lima',
          email: 'eduardo@example.com',
        })
      })

      expect(resultado).toEqual(novoCliente)
      expect(global.fetch).toHaveBeenCalledWith('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Eduardo Lima', email: 'eduardo@example.com' }),
      })
    })

    it('deve manter ordem alfabética após criar cliente', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novoCliente: CustomerWithSeller = {
        id: '3',
        tenant_id: 'tenant-1',
        seller_id: null,
        name: 'Alberto Souza',
        email: 'alberto@example.com',
        whatsapp: null,
        address: null,
        city: null,
        state: null,
        zip_code: null,
        birth_date: null,
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
        seller: null,
      }

      criarMockFetch({ cliente: novoCliente })

      await act(async () => {
        await result.current.criarCliente({
          nome: 'Alberto Souza',
          email: 'alberto@example.com',
        })
      })

      // Alberto deve ser o primeiro (ordem alfabética)
      expect(result.current.clientes[0].name).toBe('Alberto Souza')
    })

    it('deve definir erro quando criação falha', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Já existe um cliente com esse email' }, 409)

      let resultado: CustomerWithSeller | null = null
      await act(async () => {
        resultado = await result.current.criarCliente({
          nome: 'Teste',
          email: 'ana@example.com',
        })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Já existe um cliente com esse email')
    })
  })

  // --------------------------------------------------------------------------
  // atualizarCliente
  // --------------------------------------------------------------------------
  describe('atualizarCliente', () => {
    it('deve atualizar um cliente com sucesso', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const clienteAtualizado: CustomerWithSeller = {
        ...mockClientes[0],
        name: 'Ana Maria Silva',
        city: 'Campinas',
      }

      criarMockFetch({ cliente: clienteAtualizado })

      let resultado: CustomerWithSeller | null = null
      await act(async () => {
        resultado = await result.current.atualizarCliente('1', {
          nome: 'Ana Maria Silva',
          cidade: 'Campinas',
        })
      })

      expect(resultado).toEqual(clienteAtualizado)
      expect(result.current.clientes.find((c) => c.id === '1')?.name).toBe('Ana Maria Silva')
      expect(result.current.clientes.find((c) => c.id === '1')?.city).toBe('Campinas')
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/clientes/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Ana Maria Silva', cidade: 'Campinas' }),
      })
    })

    it('deve manter ordem alfabética após atualizar cliente', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      // Renomeando Ana para Zara (vai para o fim da lista)
      const clienteAtualizado: CustomerWithSeller = {
        ...mockClientes[0],
        name: 'Zara Silva',
      }

      criarMockFetch({ cliente: clienteAtualizado })

      await act(async () => {
        await result.current.atualizarCliente('1', { nome: 'Zara Silva' })
      })

      // Carlos agora deve ser o primeiro
      expect(result.current.clientes[0].name).toBe('Carlos Santos')
      expect(result.current.clientes[1].name).toBe('Zara Silva')
    })

    it('deve definir erro quando atualização falha', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Cliente não encontrado' }, 404)

      let resultado: CustomerWithSeller | null = null
      await act(async () => {
        resultado = await result.current.atualizarCliente('999', { nome: 'Teste' })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Cliente não encontrado')
    })
  })

  // --------------------------------------------------------------------------
  // excluirCliente
  // --------------------------------------------------------------------------
  describe('excluirCliente', () => {
    it('deve excluir um cliente com sucesso', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ sucesso: true })

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirCliente('1')
      })

      expect(sucesso).toBe(true)
      expect(result.current.clientes).toHaveLength(1)
      expect(result.current.clientes.find((c) => c.id === '1')).toBeUndefined()
      expect(result.current.erro).toBeNull()
      expect(global.fetch).toHaveBeenCalledWith('/api/clientes/1', {
        method: 'DELETE',
      })
    })

    it('deve definir erro quando exclusão falha', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      criarMockFetch({ erro: 'Cliente possui oportunidades vinculadas' }, 400)

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirCliente('1')
      })

      expect(sucesso).toBe(false)
      expect(result.current.erro).toBe('Cliente possui oportunidades vinculadas')
      // Lista não foi alterada
      expect(result.current.clientes).toHaveLength(2)
    })
  })

  // --------------------------------------------------------------------------
  // Tratamento de erros de rede
  // --------------------------------------------------------------------------
  describe('tratamento de erros de rede', () => {
    it('deve tratar erro de rede na busca', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Network error')
    })

    it('deve tratar erro de rede na criação', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      let resultado: CustomerWithSeller | null = null
      await act(async () => {
        resultado = await result.current.criarCliente({
          nome: 'Teste',
          email: 'teste@example.com',
        })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Network error')
    })

    it('deve tratar erro de rede na atualização', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      let resultado: CustomerWithSeller | null = null
      await act(async () => {
        resultado = await result.current.atualizarCliente('1', { nome: 'Teste' })
      })

      expect(resultado).toBeNull()
      expect(result.current.erro).toBe('Network error')
    })

    it('deve tratar erro de rede na exclusão', async () => {
      criarMockFetch({ clientes: mockClientes })

      const { result } = renderHook(() => useClientes())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

      let sucesso = false
      await act(async () => {
        sucesso = await result.current.excluirCliente('1')
      })

      expect(sucesso).toBe(false)
      expect(result.current.erro).toBe('Network error')
    })
  })
})
