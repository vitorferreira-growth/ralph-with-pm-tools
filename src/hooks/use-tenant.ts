'use client'

import { useTenantContext } from '@/contexts/tenant-context'
import type { Tenant, User, UserRole } from '@/types/database'

// ============================================================================
// TYPES
// ============================================================================

interface UseTenantReturn {
  // Dados
  tenant: Tenant | null
  usuario: User | null
  tenantId: string | null

  // Estado
  carregando: boolean
  erro: string | null
  autenticado: boolean

  // Helpers de permissão
  ehProprietario: boolean
  ehAdministrador: boolean
  ehMembro: boolean
  temPermissao: (roleMinima: UserRole) => boolean

  // Ações
  recarregar: () => Promise<void>
}

// ============================================================================
// HIERARQUIA DE ROLES
// ============================================================================

const HIERARQUIA_ROLES: Record<UserRole, number> = {
  owner: 3,
  admin: 2,
  member: 1,
}

// ============================================================================
// HOOK
// ============================================================================

export function useTenant(): UseTenantReturn {
  const { tenant, usuario, carregando, erro, recarregar } = useTenantContext()

  // Helpers de permissão
  const role = usuario?.role ?? null
  const ehProprietario = role === 'owner'
  const ehAdministrador = role === 'admin' || role === 'owner'
  const ehMembro = role !== null

  /**
   * Verifica se o usuário tem permissão mínima para uma ação
   * @param roleMinima - Role mínima necessária (owner > admin > member)
   * @returns true se o usuário tem permissão igual ou superior
   */
  function temPermissao(roleMinima: UserRole): boolean {
    if (!role) return false
    return HIERARQUIA_ROLES[role] >= HIERARQUIA_ROLES[roleMinima]
  }

  return {
    // Dados
    tenant,
    usuario,
    tenantId: tenant?.id ?? null,

    // Estado
    carregando,
    erro,
    autenticado: usuario !== null,

    // Helpers de permissão
    ehProprietario,
    ehAdministrador,
    ehMembro,
    temPermissao,

    // Ações
    recarregar,
  }
}

// Re-exportar o provider para facilitar imports
export { TenantProvider } from '@/contexts/tenant-context'
