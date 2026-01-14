// Tipos TypeScript para o Supabase
// Baseado no schema: supabase/migrations/001_initial_schema.sql
//
// Para regenerar automaticamente após mudanças no schema:
// npx supabase gen types typescript --project-id=SEU_PROJECT_ID > src/types/database.ts
//
// Este arquivo define tipos manuais que podem ser substituídos pela geração automática

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// ============================================================================
// ENUMS
// ============================================================================

export type UserRole = 'owner' | 'admin' | 'member'

export type OpportunityStage =
  | 'first_contact'
  | 'proposal'
  | 'negotiation'
  | 'awaiting_payment'
  | 'closed_won'
  | 'closed_lost'

// Labels em português para as etapas do CRM
export const OPPORTUNITY_STAGE_LABELS: Record<OpportunityStage, string> = {
  first_contact: '1º Contato',
  proposal: 'Elaboração de Proposta',
  negotiation: 'Negociação',
  awaiting_payment: 'Aguardando Pagamento',
  closed_won: 'Venda Finalizada',
  closed_lost: 'Desistiu',
}

// Ordem das etapas no kanban
export const OPPORTUNITY_STAGES_ORDER: OpportunityStage[] = [
  'first_contact',
  'proposal',
  'negotiation',
  'awaiting_payment',
  'closed_won',
  'closed_lost',
]

// ============================================================================
// DATABASE INTERFACE
// ============================================================================

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          tenant_id: string
          name: string
          email: string
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          tenant_id: string
          name: string
          email: string
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          email?: string
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'users_tenant_id_fkey'
            columns: ['tenant_id']
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          }
        ]
      }
      sellers: {
        Row: {
          id: string
          tenant_id: string
          name: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sellers_tenant_id_fkey'
            columns: ['tenant_id']
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          }
        ]
      }
      customers: {
        Row: {
          id: string
          tenant_id: string
          seller_id: string | null
          name: string
          email: string | null
          whatsapp: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          birth_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          seller_id?: string | null
          name: string
          email?: string | null
          whatsapp?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          birth_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          seller_id?: string | null
          name?: string
          email?: string | null
          whatsapp?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          birth_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'customers_tenant_id_fkey'
            columns: ['tenant_id']
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'customers_seller_id_fkey'
            columns: ['seller_id']
            referencedRelation: 'sellers'
            referencedColumns: ['id']
          }
        ]
      }
      products: {
        Row: {
          id: string
          tenant_id: string
          name: string
          code: string | null
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          code?: string | null
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          code?: string | null
          price?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'products_tenant_id_fkey'
            columns: ['tenant_id']
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          }
        ]
      }
      opportunities: {
        Row: {
          id: string
          tenant_id: string
          customer_id: string
          seller_id: string | null
          stage: OpportunityStage
          total_value: number
          notes: string | null
          created_at: string
          updated_at: string
          closed_at: string | null
        }
        Insert: {
          id?: string
          tenant_id: string
          customer_id: string
          seller_id?: string | null
          stage?: OpportunityStage
          total_value?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
          closed_at?: string | null
        }
        Update: {
          id?: string
          tenant_id?: string
          customer_id?: string
          seller_id?: string | null
          stage?: OpportunityStage
          total_value?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
          closed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'opportunities_tenant_id_fkey'
            columns: ['tenant_id']
            referencedRelation: 'tenants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'opportunities_customer_id_fkey'
            columns: ['customer_id']
            referencedRelation: 'customers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'opportunities_seller_id_fkey'
            columns: ['seller_id']
            referencedRelation: 'sellers'
            referencedColumns: ['id']
          }
        ]
      }
      opportunity_products: {
        Row: {
          id: string
          opportunity_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at: string
        }
        Insert: {
          id?: string
          opportunity_id: string
          product_id: string
          quantity?: number
          unit_price: number
          created_at?: string
        }
        Update: {
          id?: string
          opportunity_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'opportunity_products_opportunity_id_fkey'
            columns: ['opportunity_id']
            referencedRelation: 'opportunities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'opportunity_products_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_tenant_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      user_role: UserRole
      opportunity_stage: OpportunityStage
    }
    CompositeTypes: Record<string, never>
  }
}

// ============================================================================
// HELPER TYPES
// ============================================================================

// Tipos de conveniência para uso na aplicação
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Tipos específicos para cada entidade (Row)
export type Tenant = Tables<'tenants'>
export type User = Tables<'users'>
export type Seller = Tables<'sellers'>
export type Customer = Tables<'customers'>
export type Product = Tables<'products'>
export type Opportunity = Tables<'opportunities'>
export type OpportunityProduct = Tables<'opportunity_products'>

// Tipos para inserção
export type TenantInsert = TablesInsert<'tenants'>
export type UserInsert = TablesInsert<'users'>
export type SellerInsert = TablesInsert<'sellers'>
export type CustomerInsert = TablesInsert<'customers'>
export type ProductInsert = TablesInsert<'products'>
export type OpportunityInsert = TablesInsert<'opportunities'>
export type OpportunityProductInsert = TablesInsert<'opportunity_products'>

// Tipos para atualização
export type TenantUpdate = TablesUpdate<'tenants'>
export type UserUpdate = TablesUpdate<'users'>
export type SellerUpdate = TablesUpdate<'sellers'>
export type CustomerUpdate = TablesUpdate<'customers'>
export type ProductUpdate = TablesUpdate<'products'>
export type OpportunityUpdate = TablesUpdate<'opportunities'>
export type OpportunityProductUpdate = TablesUpdate<'opportunity_products'>

// ============================================================================
// EXTENDED TYPES (com relacionamentos)
// ============================================================================

// Oportunidade com dados relacionados (para uso no Kanban)
export interface OpportunityWithRelations extends Opportunity {
  customer: Customer
  seller: Seller | null
  products: (OpportunityProduct & { product: Product })[]
}

// Cliente com vendedor
export interface CustomerWithSeller extends Customer {
  seller: Seller | null
}

// ============================================================================
// CONSTANTES DE APLICAÇÃO (em português conforme PRD)
// ============================================================================

export const ETAPAS_CRM = {
  PRIMEIRO_CONTATO: 'first_contact',
  ELABORACAO_PROPOSTA: 'proposal',
  NEGOCIACAO: 'negotiation',
  AGUARDANDO_PAGAMENTO: 'awaiting_payment',
  VENDA_FINALIZADA: 'closed_won',
  DESISTIU: 'closed_lost',
} as const

export const ROLES_USUARIO = {
  PROPRIETARIO: 'owner',
  ADMINISTRADOR: 'admin',
  MEMBRO: 'member',
} as const
