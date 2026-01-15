-- CRM InfinitePay - Fix User RLS Policy
-- Migration: 002_fix_user_rls_policy.sql
-- Created: 2025-01-15
-- Description: Fix circular dependency in users table RLS policy
--
-- PROBLEMA:
-- A policy "Users can view own tenant users" depende de get_user_tenant_id()
-- que por sua vez precisa ler da tabela users, criando um deadlock para
-- novos usuários que ainda não conseguem ler seu próprio registro.
--
-- SOLUÇÃO:
-- Adicionar policy que permite usuário ler seu próprio registro via auth.uid()

-- ============================================================================
-- FIX: Allow users to read their own record directly
-- ============================================================================

-- Adiciona policy para usuário ler seu próprio registro
-- Isso quebra a dependência circular permitindo:
-- 1. Usuário lê seu próprio registro (via id = auth.uid())
-- 2. Com isso, get_user_tenant_id() funciona
-- 3. Outras policies baseadas em tenant_id funcionam normalmente
CREATE POLICY "Users can view own record"
  ON users FOR SELECT
  USING (id = auth.uid());

-- Nota: A policy existente "Users can view own tenant users" continua válida
-- para permitir que usuários vejam outros membros do mesmo tenant.
-- As duas policies funcionam com OR lógico (qualquer uma sendo true permite acesso).
