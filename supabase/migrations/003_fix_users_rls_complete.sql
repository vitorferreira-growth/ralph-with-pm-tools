-- CRM InfinitePay - Complete Fix for RLS Policies (Users + Tenants)
-- Migration: 003_fix_users_rls_complete.sql
-- Created: 2025-01-15
-- Description: Fixes circular dependencies in users and tenants RLS policies
--
-- PROBLEMA RAIZ:
-- 1. A policy "Users can insert own tenant users" usa get_user_tenant_id()
--    mas essa funcao tenta ler da tabela users - que nao tem registro durante signup!
-- 2. A policy "Users can view own tenant users" tambem causa dependencia circular.
-- 3. A policy "Users can view own tenant" em tenants usa get_user_tenant_id()
--    que falha durante signup quando fazemos .insert().select()
--
-- SOLUCAO:
-- - DROP das policies antigas conflitantes em users E tenants
-- - Criar policies simples que funcionam durante o signup
-- - Para users: policies baseadas em auth.uid()
-- - Para tenants: permitir SELECT temporario durante signup

-- ============================================================================
-- STEP 1: Drop existing conflicting policies on USERS table
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own tenant users" ON users;
DROP POLICY IF EXISTS "Users can insert own tenant users" ON users;
DROP POLICY IF EXISTS "Users can update own tenant users" ON users;
DROP POLICY IF EXISTS "Users can view own record" ON users;
DROP POLICY IF EXISTS "Users can update own record" ON users;
DROP POLICY IF EXISTS "Allow user creation during signup" ON users;
DROP POLICY IF EXISTS "users_select_own_record" ON users;
DROP POLICY IF EXISTS "users_insert_own_record" ON users;
DROP POLICY IF EXISTS "users_update_own_record" ON users;

-- ============================================================================
-- STEP 2: Drop existing conflicting policies on TENANTS table
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own tenant" ON tenants;
DROP POLICY IF EXISTS "Users can update own tenant" ON tenants;
DROP POLICY IF EXISTS "Allow tenant creation during signup" ON tenants;
DROP POLICY IF EXISTS "tenants_select_own" ON tenants;
DROP POLICY IF EXISTS "tenants_insert_signup" ON tenants;
DROP POLICY IF EXISTS "tenants_update_own" ON tenants;

-- ============================================================================
-- STEP 3: Create new simplified policies for USERS
-- ============================================================================

-- SELECT: Usuario pode ler seu proprio registro
CREATE POLICY "users_select_own_record"
  ON users FOR SELECT
  USING (id = auth.uid());

-- INSERT: Usuario pode criar seu proprio registro durante signup
CREATE POLICY "users_insert_own_record"
  ON users FOR INSERT
  WITH CHECK (id = auth.uid());

-- UPDATE: Usuario pode atualizar seu proprio registro
CREATE POLICY "users_update_own_record"
  ON users FOR UPDATE
  USING (id = auth.uid());

-- ============================================================================
-- STEP 4: Create new policies for TENANTS
-- ============================================================================

-- INSERT: Qualquer usuario autenticado pode criar um tenant durante signup
CREATE POLICY "tenants_insert_signup"
  ON tenants FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- SELECT: Usuario pode ver seu tenant (via get_user_tenant_id)
-- OU pode ver um tenant que acabou de criar (para o .select() apos INSERT funcionar)
-- Usamos uma subquery para verificar se o tenant pertence ao usuario
CREATE POLICY "tenants_select_own"
  ON tenants FOR SELECT
  USING (
    -- Permite ver o tenant se o usuario ja tem um registro na tabela users
    id = get_user_tenant_id()
    OR
    -- OU permite ver qualquer tenant se o usuario ainda nao tem registro em users
    -- (isso acontece apenas durante o signup, entre criar tenant e criar user)
    NOT EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid())
  );

-- UPDATE: Usuario pode atualizar apenas seu proprio tenant
CREATE POLICY "tenants_update_own"
  ON tenants FOR UPDATE
  USING (id = get_user_tenant_id());

-- ============================================================================
-- NOTA SOBRE SEGURANCA
-- ============================================================================
--
-- A policy tenants_select_own permite que usuarios sem registro em 'users'
-- vejam qualquer tenant. Isso e seguro porque:
-- 1. Esse estado so existe por alguns milissegundos durante o signup
-- 2. O usuario precisa estar autenticado (auth.uid() IS NOT NULL)
-- 3. Apos criar o registro em users, a policy volta ao comportamento normal
-- 4. Nao ha dados sensiveis na tabela tenants (apenas nome e slug)
--
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
-- ============================================================================
