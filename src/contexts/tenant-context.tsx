'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { criarClienteNavegador } from '@/lib/supabase/client'
import type { Tenant, User } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

interface TenantContextData {
  tenant: Tenant | null
  usuario: User | null
  carregando: boolean
  erro: string | null
  recarregar: () => Promise<void>
}

interface TenantProviderProps {
  children: ReactNode
}

// ============================================================================
// CONTEXT
// ============================================================================

const TenantContext = createContext<TenantContextData | undefined>(undefined)

// ============================================================================
// PROVIDER
// ============================================================================

export function TenantProvider({ children }: TenantProviderProps): ReactNode {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [usuario, setUsuario] = useState<User | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  const carregarDadosTenant = useCallback(async (): Promise<void> => {
    try {
      setCarregando(true)
      setErro(null)

      const supabase = criarClienteNavegador()

      // Buscar usuário autenticado
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) {
        throw new Error('Erro ao verificar autenticação')
      }

      if (!authUser) {
        // Usuário não autenticado - limpar estado
        setTenant(null)
        setUsuario(null)
        return
      }

      // Buscar dados do usuário na tabela users
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (usuarioError) {
        throw new Error('Erro ao carregar dados do usuário')
      }

      if (!usuarioData) {
        throw new Error('Usuário não encontrado')
      }

      setUsuario(usuarioData)

      // Buscar dados do tenant
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', usuarioData.tenant_id)
        .single()

      if (tenantError) {
        throw new Error('Erro ao carregar dados da empresa')
      }

      if (!tenantData) {
        throw new Error('Empresa não encontrada')
      }

      setTenant(tenantData)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido'
      setErro(mensagem)
      setTenant(null)
      setUsuario(null)
    } finally {
      setCarregando(false)
    }
  }, [])

  // Carregar dados ao montar o componente
  useEffect(() => {
    carregarDadosTenant()
  }, [carregarDadosTenant])

  // Escutar mudanças de autenticação
  useEffect(() => {
    const supabase = criarClienteNavegador()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        carregarDadosTenant()
      } else if (event === 'SIGNED_OUT') {
        setTenant(null)
        setUsuario(null)
        setCarregando(false)
      }
    })

    return (): void => {
      subscription.unsubscribe()
    }
  }, [carregarDadosTenant])

  const valor: TenantContextData = {
    tenant,
    usuario,
    carregando,
    erro,
    recarregar: carregarDadosTenant,
  }

  return <TenantContext.Provider value={valor}>{children}</TenantContext.Provider>
}

// ============================================================================
// HOOK
// ============================================================================

export function useTenantContext(): TenantContextData {
  const context = useContext(TenantContext)

  if (context === undefined) {
    throw new Error('useTenantContext deve ser usado dentro de um TenantProvider')
  }

  return context
}
