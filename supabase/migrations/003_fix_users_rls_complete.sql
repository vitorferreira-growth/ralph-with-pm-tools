-- CRM InfinitePay - Complete Fix for Users RLS Policies
-- Migration: 003_fix_users_rls_complete.sql
-- Created: 2025-01-15
-- Description: Fixes circular dependency in users table RLS policies
--
-- PROBLEMA RAIZ:
-- 1. A policy "Users can insert own tenant users" usa get_user_tenant_id()
--    mas essa funcao tenta ler da tabela users - que nao tem registro durante signup!
-- 2. A policy "Users can view own tenant users" tambem causa dependencia circular.
--
-- SOLUCAO:
-- - DROP das policies antigas conflitantes
-- - Criar policies simples baseadas em auth.uid()
-- - Para INSERT: permitir se id = auth.uid() (signup) OU se tenant_id match (futuro convite)
-- - Para SELECT/UPDATE: permitir se id = auth.uid()

-- ============================================================================
-- STEP 1: Drop existing conflicting policies on users table
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own tenant users" ON users;
DROP POLICY IF EXISTS "Users can insert own tenant users" ON users;
DROP POLICY IF EXISTS "Users can update own tenant users" ON users;
DROP POLICY IF EXISTS "Users can view own record" ON users;
DROP POLICY IF EXISTS "Users can update own record" ON users;
DROP POLICY IF EXISTS "Allow user creation during signup" ON users;

-- ============================================================================
-- STEP 2: Create new simplified policies
-- ============================================================================

-- SELECT: Usuario pode ler seu proprio registro
-- Isso evita dependencia circular com get_user_tenant_id()
CREATE POLICY "users_select_own_record"
  ON users FOR SELECT
  USING (id = auth.uid());

-- INSERT: Usuario pode criar seu proprio registro durante signup
-- A verificacao de tenant_id sera feita pela aplicacao, nao pelo RLS
CREATE POLICY "users_insert_own_record"
  ON users FOR INSERT
  WITH CHECK (id = auth.uid());

-- UPDATE: Usuario pode atualizar seu proprio registro
CREATE POLICY "users_update_own_record"
  ON users FOR UPDATE
  USING (id = auth.uid());

-- DELETE: Nao permitimos delete de users via RLS (cascade do auth.users cuida disso)
-- Nenhuma policy de DELETE = nenhum usuario pode deletar

-- ============================================================================
-- STEP 3: Verificar se get_user_tenant_id() funciona corretamente
-- ============================================================================

-- A funcao get_user_tenant_id() tem SECURITY DEFINER, entao ela bypassa RLS
-- Isso significa que ela sempre consegue ler o tenant_id do usuario autenticado
-- Essa funcao continua funcionando para as outras tabelas (sellers, customers, etc)

-- ============================================================================
-- NOTA SOBRE ARQUITETURA FUTURA
-- ============================================================================
--
-- Modelo atual: 1 USER = 1 TENANT
-- - Cada usuario cria seu proprio tenant no registro
-- - Nao existe fluxo de convite de outros usuarios
--
-- Se/quando implementar convites para multi-usuario por tenant:
-- 1. Criar tabela de invites
-- 2. Adicionar policy de INSERT que verifica invite valido
-- 3. Expandir policy de SELECT para ver usuarios do mesmo tenant
--
-- Por enquanto, as policies simples baseadas em auth.uid() sao suficientes.
-- ============================================================================
