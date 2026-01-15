import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useOportunidades } from './use-oportunidades'
import type { OpportunityWithRelations } from '@/types/database'

// Mock opportunity data
const mockCustomer = {
  id: 'cust-1',
  tenant_id: 'tenant-1',
  seller_id: null,
  name: 'Cliente Teste',
  email: 'cliente@teste.com',
  whatsapp: '11999999999',
  address: null,
  city: null,
  state: null,
  zip_code: null,
  birth_date: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockSeller = {
  id: 'seller-1',
  tenant_id: 'tenant-1',
  name: 'Vendedor Teste',
  email: 'vendedor@teste.com',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockProduct = {
  id: 'prod-1',
  tenant_id: 'tenant-1',
  name: 'Produto Teste',
  code: 'PROD001',
  price: 100,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockOportunidades: OpportunityWithRelations[] = [
  {
    id: 'opp-1',
    tenant_id: 'tenant-1',
    customer_id: 'cust-1',
    seller_id: 'seller-1',
    stage: 'first_contact',
    total_value: 500,
    notes: 'Primeiro contato realizado',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    closed_at: null,
    customer: mockCustomer,
    seller: mockSeller,
    products: [
      {
        id: 'opp-prod-1',
        opportunity_id: 'opp-1',
        product_id: 'prod-1',
        quantity: 5,
        unit_price: 100,
        created_at: '2024-01-01T00:00:00Z',
        product: mockProduct,
      },
    ],
  },
  {
    id: 'opp-2',
    tenant_id: 'tenant-1',
    customer_id: 'cust-1',
    seller_id: null,
    stage: 'proposal',
    total_value: 200,
    notes: null,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    closed_at: null,
    customer: mockCustomer,
    seller: null,
    products: [],
  },
  {
    id: 'opp-3',
    tenant_id: 'tenant-1',
    customer_id: 'cust-1',
    seller_id: 'seller-1',
    stage: 'closed_won',
    total_value: 1000,
    notes: 'Venda finalizada',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    closed_at: '2024-01-03T12:00:00Z',
    customer: mockCustomer,
    seller: mockSeller,
    products: [],
  },
]

describe('useOportunidades', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ==========================================================================
  // buscarOportunidades
  // ==========================================================================
  describe('buscarOportunidades', () => {
    it('deve carregar oportunidades na montagem', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      expect(result.current.carregando).toBe(true)

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.oportunidades).toHaveLength(3)
      expect(result.current.erro).toBeNull()
      expect(fetch).toHaveBeenCalledWith('/api/oportunidades')
    })

    it('deve lidar com erro na busca', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ erro: 'Erro ao buscar oportunidades' }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.oportunidades).toHaveLength(0)
      expect(result.current.erro).toBe('Erro ao buscar oportunidades')
    })

    it('deve permitir recarregar oportunidades', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [mockOportunidades[0]] }),
      } as Response)

      await act(async () => {
        await result.current.buscarOportunidades()
      })

      expect(result.current.oportunidades).toHaveLength(1)
    })

    it('deve filtrar por vendedor', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [mockOportunidades[0]] }),
      } as Response)

      await act(async () => {
        await result.current.buscarOportunidades({ vendedorId: 'seller-1' })
      })

      expect(fetch).toHaveBeenLastCalledWith('/api/oportunidades?vendedor_id=seller-1')
    })

    it('deve filtrar por etapa', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [mockOportunidades[0]] }),
      } as Response)

      await act(async () => {
        await result.current.buscarOportunidades({ etapa: 'first_contact' })
      })

      expect(fetch).toHaveBeenLastCalledWith('/api/oportunidades?etapa=first_contact')
    })

    it('deve filtrar por cliente', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [mockOportunidades[0]] }),
      } as Response)

      await act(async () => {
        await result.current.buscarOportunidades({ clienteId: 'cust-1' })
      })

      expect(fetch).toHaveBeenLastCalledWith('/api/oportunidades?cliente_id=cust-1')
    })

    it('deve combinar múltiplos filtros', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [mockOportunidades[0]] }),
      } as Response)

      await act(async () => {
        await result.current.buscarOportunidades({
          vendedorId: 'seller-1',
          etapa: 'first_contact',
        })
      })

      expect(fetch).toHaveBeenLastCalledWith(
        '/api/oportunidades?vendedor_id=seller-1&etapa=first_contact'
      )
    })
  })

  // ==========================================================================
  // criarOportunidade
  // ==========================================================================
  describe('criarOportunidade', () => {
    it('deve criar uma nova oportunidade', async () => {
      const novaOportunidade: OpportunityWithRelations = {
        ...mockOportunidades[0],
        id: 'opp-new',
        total_value: 300,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidade: novaOportunidade }),
      } as Response)

      let retorno: OpportunityWithRelations | null = null
      await act(async () => {
        retorno = await result.current.criarOportunidade({
          clienteId: 'cust-1',
          vendedorId: 'seller-1',
          produtos: [{ produtoId: 'prod-1', quantidade: 3, precoUnitario: 100 }],
        })
      })

      expect(retorno).toEqual(novaOportunidade)
      expect(result.current.oportunidades).toHaveLength(4)
      expect(result.current.oportunidades[0].id).toBe('opp-new')
    })

    it('deve lidar com erro ao criar oportunidade', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ erro: 'Cliente não encontrado' }),
      } as Response)

      let retorno: OpportunityWithRelations | null = null
      await act(async () => {
        retorno = await result.current.criarOportunidade({
          clienteId: 'invalid-id',
        })
      })

      expect(retorno).toBeNull()
      expect(result.current.erro).toBe('Cliente não encontrado')
      expect(result.current.oportunidades).toHaveLength(3)
    })

    it('deve criar oportunidade com campos mínimos', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const novaOportunidade: OpportunityWithRelations = {
        ...mockOportunidades[0],
        id: 'opp-new',
        seller_id: null,
        seller: null,
        products: [],
        total_value: 0,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidade: novaOportunidade }),
      } as Response)

      await act(async () => {
        await result.current.criarOportunidade({
          clienteId: 'cust-1',
        })
      })

      expect(fetch).toHaveBeenLastCalledWith('/api/oportunidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clienteId: 'cust-1' }),
      })
    })
  })

  // ==========================================================================
  // atualizarOportunidade
  // ==========================================================================
  describe('atualizarOportunidade', () => {
    it('deve atualizar uma oportunidade existente', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const oportunidadeAtualizada: OpportunityWithRelations = {
        ...mockOportunidades[0],
        notes: 'Novas observações',
        total_value: 800,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidade: oportunidadeAtualizada }),
      } as Response)

      let retorno: OpportunityWithRelations | null = null
      await act(async () => {
        retorno = await result.current.atualizarOportunidade('opp-1', {
          observacoes: 'Novas observações',
          produtos: [{ produtoId: 'prod-1', quantidade: 8, precoUnitario: 100 }],
        })
      })

      expect(retorno).toEqual(oportunidadeAtualizada)
      expect(result.current.oportunidades.find((o) => o.id === 'opp-1')?.notes).toBe(
        'Novas observações'
      )
    })

    it('deve lidar com erro ao atualizar', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ erro: 'Oportunidade não encontrada' }),
      } as Response)

      let retorno: OpportunityWithRelations | null = null
      await act(async () => {
        retorno = await result.current.atualizarOportunidade('invalid-id', {
          observacoes: 'Teste',
        })
      })

      expect(retorno).toBeNull()
      expect(result.current.erro).toBe('Oportunidade não encontrada')
    })
  })

  // ==========================================================================
  // moverOportunidade (drag & drop)
  // ==========================================================================
  describe('moverOportunidade', () => {
    it('deve mover oportunidade para nova etapa', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const oportunidadeMovida: OpportunityWithRelations = {
        ...mockOportunidades[0],
        stage: 'proposal',
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidade: oportunidadeMovida }),
      } as Response)

      let retorno: OpportunityWithRelations | null = null
      await act(async () => {
        retorno = await result.current.moverOportunidade('opp-1', 'proposal')
      })

      expect(retorno).toEqual(oportunidadeMovida)
      expect(result.current.oportunidades.find((o) => o.id === 'opp-1')?.stage).toBe('proposal')
      expect(fetch).toHaveBeenLastCalledWith('/api/oportunidades/opp-1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etapa: 'proposal' }),
      })
    })

    it('deve fazer rollback em caso de erro', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ erro: 'Erro ao mover oportunidade' }),
      } as Response)

      await act(async () => {
        await result.current.moverOportunidade('opp-1', 'negotiation')
      })

      // Deve ter feito rollback para a etapa original
      expect(result.current.oportunidades.find((o) => o.id === 'opp-1')?.stage).toBe('first_contact')
      expect(result.current.erro).toBe('Erro ao mover oportunidade')
    })

    it('deve retornar null se oportunidade não existe', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      let retorno: OpportunityWithRelations | null = null
      await act(async () => {
        retorno = await result.current.moverOportunidade('non-existent', 'proposal')
      })

      expect(retorno).toBeNull()
      expect(result.current.erro).toBe('Oportunidade não encontrada')
    })

    it('deve mover para etapa finalizada (closed_won)', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const oportunidadeFinalizada: OpportunityWithRelations = {
        ...mockOportunidades[0],
        stage: 'closed_won',
        closed_at: '2024-01-15T00:00:00Z',
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidade: oportunidadeFinalizada }),
      } as Response)

      await act(async () => {
        await result.current.moverOportunidade('opp-1', 'closed_won')
      })

      expect(result.current.oportunidades.find((o) => o.id === 'opp-1')?.stage).toBe('closed_won')
      expect(result.current.oportunidades.find((o) => o.id === 'opp-1')?.closed_at).not.toBeNull()
    })
  })

  // ==========================================================================
  // excluirOportunidade
  // ==========================================================================
  describe('excluirOportunidade', () => {
    it('deve excluir uma oportunidade', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ sucesso: true }),
      } as Response)

      let retorno = false
      await act(async () => {
        retorno = await result.current.excluirOportunidade('opp-1')
      })

      expect(retorno).toBe(true)
      expect(result.current.oportunidades).toHaveLength(2)
      expect(result.current.oportunidades.find((o) => o.id === 'opp-1')).toBeUndefined()
    })

    it('deve lidar com erro ao excluir', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ erro: 'Oportunidade não encontrada' }),
      } as Response)

      let retorno = true
      await act(async () => {
        retorno = await result.current.excluirOportunidade('invalid-id')
      })

      expect(retorno).toBe(false)
      expect(result.current.erro).toBe('Oportunidade não encontrada')
      expect(result.current.oportunidades).toHaveLength(3)
    })
  })

  // ==========================================================================
  // oportunidadesPorEtapa (computed)
  // ==========================================================================
  describe('oportunidadesPorEtapa', () => {
    it('deve agrupar oportunidades por etapa', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const porEtapa = result.current.oportunidadesPorEtapa

      expect(porEtapa.first_contact).toHaveLength(1)
      expect(porEtapa.first_contact[0].id).toBe('opp-1')

      expect(porEtapa.proposal).toHaveLength(1)
      expect(porEtapa.proposal[0].id).toBe('opp-2')

      expect(porEtapa.closed_won).toHaveLength(1)
      expect(porEtapa.closed_won[0].id).toBe('opp-3')

      expect(porEtapa.negotiation).toHaveLength(0)
      expect(porEtapa.awaiting_payment).toHaveLength(0)
      expect(porEtapa.closed_lost).toHaveLength(0)
    })

    it('deve retornar arrays vazios para todas as etapas quando não há oportunidades', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const porEtapa = result.current.oportunidadesPorEtapa

      expect(porEtapa.first_contact).toHaveLength(0)
      expect(porEtapa.proposal).toHaveLength(0)
      expect(porEtapa.negotiation).toHaveLength(0)
      expect(porEtapa.awaiting_payment).toHaveLength(0)
      expect(porEtapa.closed_won).toHaveLength(0)
      expect(porEtapa.closed_lost).toHaveLength(0)
    })
  })

  // ==========================================================================
  // totaisPorEtapa (computed)
  // ==========================================================================
  describe('totaisPorEtapa', () => {
    it('deve calcular totais por etapa', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const totais = result.current.totaisPorEtapa

      expect(totais.first_contact).toBe(500)
      expect(totais.proposal).toBe(200)
      expect(totais.closed_won).toBe(1000)
      expect(totais.negotiation).toBe(0)
      expect(totais.awaiting_payment).toBe(0)
      expect(totais.closed_lost).toBe(0)
    })

    it('deve retornar zeros quando não há oportunidades', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const totais = result.current.totaisPorEtapa

      expect(totais.first_contact).toBe(0)
      expect(totais.proposal).toBe(0)
      expect(totais.negotiation).toBe(0)
      expect(totais.awaiting_payment).toBe(0)
      expect(totais.closed_won).toBe(0)
      expect(totais.closed_lost).toBe(0)
    })

    it('deve somar múltiplas oportunidades na mesma etapa', async () => {
      const multipleInSameStage: OpportunityWithRelations[] = [
        { ...mockOportunidades[0], total_value: 100 },
        { ...mockOportunidades[0], id: 'opp-extra', total_value: 250 },
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: multipleInSameStage }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.totaisPorEtapa.first_contact).toBe(350)
    })
  })

  // ==========================================================================
  // Network errors
  // ==========================================================================
  describe('erros de rede', () => {
    it('deve lidar com erro de rede ao buscar', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.erro).toBe('Network error')
    })

    it('deve lidar com erro de rede ao criar', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: [] }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await act(async () => {
        await result.current.criarOportunidade({ clienteId: 'cust-1' })
      })

      expect(result.current.erro).toBe('Network error')
    })

    it('deve lidar com erro de rede ao mover', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ oportunidades: mockOportunidades }),
      } as Response)

      const { result } = renderHook(() => useOportunidades())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await act(async () => {
        await result.current.moverOportunidade('opp-1', 'proposal')
      })

      expect(result.current.erro).toBe('Network error')
      // Should rollback
      expect(result.current.oportunidades.find((o) => o.id === 'opp-1')?.stage).toBe('first_contact')
    })
  })
})
