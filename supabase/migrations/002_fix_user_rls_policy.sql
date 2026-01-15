-- CRM InfinitePay - Fix User RLS Policy
-- Migration: 002_fix_user_rls_policy.sql
-- Created: 2025-01-15
-- Description: Fix circular dependency in users table RLS policy
--
-- CONTEXTO:
-- Atualmente: 1 user = 1 tenant (sem fluxo de convite de novos users)
-- Cada usuário é dono do seu próprio tenant.
--
-- PROBLEMA:
-- A policy "Users can view own tenant users" depende de get_user_tenant_id()
-- que por sua vez precisa ler da tabela users, criando um deadlock para
-- usuários que não conseguem ler seu próprio registro.
--
-- SOLUÇÃO:
-- Simplificar: usuário sempre pode ler/atualizar seu próprio registro.

-- ============================================================================
-- FIX: Permitir usuário acessar seu próprio registro diretamente
-- ============================================================================

-- SELECT: Usuário pode ler seu próprio registro
CREATE POLICY "Users can view own record"
  ON users FOR SELECT
  USING (id = auth.uid());

-- UPDATE: Usuário pode atualizar seu próprio registro
CREATE POLICY "Users can update own record"
  ON users FOR UPDATE
  USING (id = auth.uid());

-- ============================================================================
-- NOTA SOBRE ARQUITETURA
-- ============================================================================
--
-- Modelo atual: 1 USER = 1 TENANT
-- - Cada usuário cria seu próprio tenant no registro
-- - Não existe fluxo de convite de outros usuários
-- - Quando/se implementar convites, revisar estas policies
--
-- As policies existentes de tenant continuam funcionando para:
-- - Futuro suporte a múltiplos usuários por tenant
-- - Consistência com outras tabelas (sellers, customers, etc.)
