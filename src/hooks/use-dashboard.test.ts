import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useDashboard } from './use-dashboard'
import type { DashboardKPIs } from '@/app/api/dashboard/kpis/route'
import type { DashboardGraficos } from '@/app/api/dashboard/graficos/route'

// Mock data
const mockKpis: DashboardKPIs = {
  totalVendas: {
    valor: 15000,
    quantidade: 10,
  },
  ticketMedio: 1500,
  emNegociacao: {
    valor: 8000,
    quantidade: 5,
  },
  desistencias: {
    valor: 2000,
    quantidade: 2,
  },
}

const mockGraficos: DashboardGraficos = {
  vendasPorMes: [
    { mes: 'Jan/2025', valor: 5000, quantidade: 3 },
    { mes: 'Fev/2025', valor: 7000, quantidade: 5 },
    { mes: 'Mar/2025', valor: 3000, quantidade: 2 },
  ],
  vendasPorVendedor: [
    { vendedorId: 'seller-1', vendedorNome: 'João Silva', valor: 10000, quantidade: 7 },
    { vendedorId: 'seller-2', vendedorNome: 'Maria Santos', valor: 5000, quantidade: 3 },
  ],
  vendasPorProduto: [
    { produtoId: 'prod-1', produtoNome: 'Produto A', valor: 8000, quantidade: 20 },
    { produtoId: 'prod-2', produtoNome: 'Produto B', valor: 7000, quantidade: 15 },
  ],
  valorPorEtapa: [
    { etapa: 'first_contact', etapaLabel: '1º Contato', valor: 2000, quantidade: 3 },
    { etapa: 'proposal', etapaLabel: 'Elaboração de Proposta', valor: 3000, quantidade: 2 },
    { etapa: 'negotiation', etapaLabel: 'Negociação', valor: 1500, quantidade: 1 },
    { etapa: 'awaiting_payment', etapaLabel: 'Aguardando Pagamento', valor: 1500, quantidade: 1 },
    { etapa: 'closed_won', etapaLabel: 'Venda Finalizada', valor: 15000, quantidade: 10 },
    { etapa: 'closed_lost', etapaLabel: 'Desistiu', valor: 2000, quantidade: 2 },
  ],
}

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ==========================================================================
  // Initial load
  // ==========================================================================
  describe('carregamento inicial', () => {
    it('deve carregar KPIs e gráficos na montagem', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      expect(result.current.carregando).toBe(true)

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.kpis).toEqual(mockKpis)
      expect(result.current.graficos).toEqual(mockGraficos)
      expect(result.current.erro).toBeNull()
    })

    it('deve ter periodo padrão como "mes"', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      expect(result.current.periodo).toBe('mes')

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(fetch).toHaveBeenCalledWith('/api/dashboard/kpis?periodo=mes')
      expect(fetch).toHaveBeenCalledWith('/api/dashboard/graficos?periodo=mes')
    })
  })

  // ==========================================================================
  // buscarKpis
  // ==========================================================================
  describe('buscarKpis', () => {
    it('deve buscar KPIs com filtro de periodo', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ kpis: { ...mockKpis, ticketMedio: 2000 } }),
      } as Response)

      await act(async () => {
        await result.current.buscarKpis({ periodo: 'trimestre' })
      })

      expect(fetch).toHaveBeenLastCalledWith('/api/dashboard/kpis?periodo=trimestre')
      expect(result.current.kpis?.ticketMedio).toBe(2000)
    })

    it('deve lidar com erro ao buscar KPIs', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ erro: 'Erro ao buscar KPIs' }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregandoKpis).toBe(false)
      })

      expect(result.current.kpis).toBeNull()
      expect(result.current.erro).toBe('Erro ao buscar KPIs')
    })

    it('deve usar KPIs vazios quando API retorna null', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: null }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.kpis).toEqual({
        totalVendas: { valor: 0, quantidade: 0 },
        ticketMedio: 0,
        emNegociacao: { valor: 0, quantidade: 0 },
        desistencias: { valor: 0, quantidade: 0 },
      })
    })
  })

  // ==========================================================================
  // buscarGraficos
  // ==========================================================================
  describe('buscarGraficos', () => {
    it('deve buscar gráficos com filtro de periodo', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ graficos: { ...mockGraficos, vendasPorMes: [] } }),
      } as Response)

      await act(async () => {
        await result.current.buscarGraficos({ periodo: 'ano' })
      })

      expect(fetch).toHaveBeenLastCalledWith('/api/dashboard/graficos?periodo=ano')
      expect(result.current.graficos?.vendasPorMes).toHaveLength(0)
    })

    it('deve buscar gráficos com filtro de meses', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ graficos: mockGraficos }),
      } as Response)

      await act(async () => {
        await result.current.buscarGraficos({ meses: 6 })
      })

      expect(fetch).toHaveBeenLastCalledWith('/api/dashboard/graficos?periodo=mes&meses=6')
    })

    it('deve lidar com erro ao buscar gráficos', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ erro: 'Erro ao buscar dados dos gráficos' }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregandoGraficos).toBe(false)
      })

      expect(result.current.graficos).toBeNull()
      expect(result.current.erro).toBe('Erro ao buscar dados dos gráficos')
    })
  })

  // ==========================================================================
  // buscarDados
  // ==========================================================================
  describe('buscarDados', () => {
    it('deve buscar KPIs e gráficos em paralelo', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      await act(async () => {
        await result.current.buscarDados({ periodo: 'ano' })
      })

      // Both calls should be made
      const calls = vi.mocked(fetch).mock.calls
      const lastTwoCalls = calls.slice(-2)
      expect(lastTwoCalls.some((call) => call[0] === '/api/dashboard/kpis?periodo=ano')).toBe(true)
      expect(lastTwoCalls.some((call) => call[0] === '/api/dashboard/graficos?periodo=ano')).toBe(
        true
      )
    })

    it('deve permitir recarregar todos os dados', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      const updatedKpis = { ...mockKpis, ticketMedio: 3000 }

      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: updatedKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      await act(async () => {
        await result.current.buscarDados()
      })

      expect(result.current.kpis?.ticketMedio).toBe(3000)
    })
  })

  // ==========================================================================
  // setPeriodo
  // ==========================================================================
  describe('setPeriodo', () => {
    it('deve atualizar periodo e buscar novos dados', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.periodo).toBe('mes')

      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      await act(async () => {
        result.current.setPeriodo('trimestre')
      })

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      expect(result.current.periodo).toBe('trimestre')

      // Should have called API with new period
      const calls = vi.mocked(fetch).mock.calls
      const lastTwoCalls = calls.slice(-2)
      expect(
        lastTwoCalls.some((call) => call[0] === '/api/dashboard/kpis?periodo=trimestre')
      ).toBe(true)
    })

    it('deve permitir trocar entre mes, trimestre e ano', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      // Test all three values
      for (const novoPeriodo of ['trimestre', 'ano', 'mes'] as const) {
        vi.mocked(fetch)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ kpis: mockKpis }),
          } as Response)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ graficos: mockGraficos }),
          } as Response)

        await act(async () => {
          result.current.setPeriodo(novoPeriodo)
        })

        await waitFor(() => {
          expect(result.current.carregando).toBe(false)
        })

        expect(result.current.periodo).toBe(novoPeriodo)
      }
    })
  })

  // ==========================================================================
  // Loading states
  // ==========================================================================
  describe('estados de carregamento', () => {
    it('deve ter estados de carregamento separados para KPIs e gráficos', async () => {
      let resolveKpis!: (value: Response) => void
      let resolveGraficos!: (value: Response) => void

      vi.mocked(fetch)
        .mockImplementationOnce(
          () =>
            new Promise<Response>((resolve) => {
              resolveKpis = resolve
            })
        )
        .mockImplementationOnce(
          () =>
            new Promise<Response>((resolve) => {
              resolveGraficos = resolve
            })
        )

      const { result } = renderHook(() => useDashboard())

      // Initially both loading
      expect(result.current.carregandoKpis).toBe(true)
      expect(result.current.carregandoGraficos).toBe(true)
      expect(result.current.carregando).toBe(true)

      // Resolve KPIs first
      await act(async () => {
        resolveKpis({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
      })

      await waitFor(() => {
        expect(result.current.carregandoKpis).toBe(false)
      })

      // KPIs done, graficos still loading
      expect(result.current.carregandoKpis).toBe(false)
      expect(result.current.carregandoGraficos).toBe(true)
      expect(result.current.carregando).toBe(true)

      // Resolve graficos
      await act(async () => {
        resolveGraficos({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)
      })

      await waitFor(() => {
        expect(result.current.carregandoGraficos).toBe(false)
      })

      // Both done
      expect(result.current.carregandoKpis).toBe(false)
      expect(result.current.carregandoGraficos).toBe(false)
      expect(result.current.carregando).toBe(false)
    })
  })

  // ==========================================================================
  // Network errors
  // ==========================================================================
  describe('erros de rede', () => {
    it('deve lidar com erro de rede ao buscar KPIs', async () => {
      vi.mocked(fetch)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregandoKpis).toBe(false)
      })

      expect(result.current.erro).toBe('Network error')
    })

    it('deve lidar com erro de rede ao buscar gráficos', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregandoGraficos).toBe(false)
      })

      expect(result.current.erro).toBe('Network error')
    })

    it('deve lidar com erro de rede em buscarDados', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ kpis: mockKpis }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      const { result } = renderHook(() => useDashboard())

      await waitFor(() => {
        expect(result.current.carregando).toBe(false)
      })

      vi.mocked(fetch)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ graficos: mockGraficos }),
        } as Response)

      await act(async () => {
        await result.current.buscarDados()
      })

      expect(result.current.erro).toBe('Network error')
    })
  })
})
