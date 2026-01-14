// Tipos gerados pelo Supabase CLI
// Execute: npx supabase gen types typescript --project-id=SEU_PROJECT_ID > src/types/database.ts
// Este arquivo será substituído após criar o schema no Supabase

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

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
      }
      users: {
        Row: {
          id: string
          tenant_id: string
          name: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          tenant_id: string
          name: string
          email: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          email?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
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
      }
      opportunities: {
        Row: {
          id: string
          tenant_id: string
          customer_id: string
          seller_id: string | null
          stage: string
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
          stage?: string
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
          stage?: string
          total_value?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
          closed_at?: string | null
        }
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
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
