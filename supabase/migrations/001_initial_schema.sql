-- CRM InfinitePay - Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Created: 2025-01-14
-- Description: Creates all tables with RLS policies for multi-tenancy

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Tenants (Empresas)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (vinculados a um tenant)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendedores
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clientes
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES sellers(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  birth_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Produtos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  code TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Oportunidades (CRM)
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES sellers(id) ON DELETE SET NULL,
  stage TEXT NOT NULL DEFAULT 'first_contact' CHECK (
    stage IN (
      'first_contact',
      'proposal',
      'negotiation',
      'awaiting_payment',
      'closed_won',
      'closed_lost'
    )
  ),
  total_value DECIMAL(10,2) DEFAULT 0 CHECK (total_value >= 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

-- Produtos da Oportunidade (many-to-many)
CREATE TABLE opportunity_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Tenant lookups
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_sellers_tenant_id ON sellers(tenant_id);
CREATE INDEX idx_customers_tenant_id ON customers(tenant_id);
CREATE INDEX idx_products_tenant_id ON products(tenant_id);
CREATE INDEX idx_opportunities_tenant_id ON opportunities(tenant_id);

-- Foreign key lookups
CREATE INDEX idx_customers_seller_id ON customers(seller_id);
CREATE INDEX idx_opportunities_customer_id ON opportunities(customer_id);
CREATE INDEX idx_opportunities_seller_id ON opportunities(seller_id);
CREATE INDEX idx_opportunity_products_opportunity_id ON opportunity_products(opportunity_id);
CREATE INDEX idx_opportunity_products_product_id ON opportunity_products(product_id);

-- Search indexes
CREATE INDEX idx_customers_name ON customers(name);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_sellers_name ON sellers(name);

-- Stage filtering
CREATE INDEX idx_opportunities_stage ON opportunities(stage);

-- Date filtering for dashboard
CREATE INDEX idx_opportunities_created_at ON opportunities(created_at);
CREATE INDEX idx_opportunities_closed_at ON opportunities(closed_at);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get current user's tenant_id
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate opportunity total value
CREATE OR REPLACE FUNCTION calculate_opportunity_total()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE opportunities
  SET total_value = (
    SELECT COALESCE(SUM(quantity * unit_price), 0)
    FROM opportunity_products
    WHERE opportunity_id = COALESCE(NEW.opportunity_id, OLD.opportunity_id)
  )
  WHERE id = COALESCE(NEW.opportunity_id, OLD.opportunity_id);
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Updated_at triggers
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sellers_updated_at
  BEFORE UPDATE ON sellers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Opportunity total calculation triggers
CREATE TRIGGER calculate_opportunity_total_on_insert
  AFTER INSERT ON opportunity_products
  FOR EACH ROW EXECUTE FUNCTION calculate_opportunity_total();

CREATE TRIGGER calculate_opportunity_total_on_update
  AFTER UPDATE ON opportunity_products
  FOR EACH ROW EXECUTE FUNCTION calculate_opportunity_total();

CREATE TRIGGER calculate_opportunity_total_on_delete
  AFTER DELETE ON opportunity_products
  FOR EACH ROW EXECUTE FUNCTION calculate_opportunity_total();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_products ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES: TENANTS
-- ============================================================================

CREATE POLICY "Users can view own tenant"
  ON tenants FOR SELECT
  USING (id = get_user_tenant_id());

CREATE POLICY "Users can update own tenant"
  ON tenants FOR UPDATE
  USING (id = get_user_tenant_id());

-- ============================================================================
-- RLS POLICIES: USERS
-- ============================================================================

CREATE POLICY "Users can view own tenant users"
  ON users FOR SELECT
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can insert own tenant users"
  ON users FOR INSERT
  WITH CHECK (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can update own tenant users"
  ON users FOR UPDATE
  USING (tenant_id = get_user_tenant_id());

-- ============================================================================
-- RLS POLICIES: SELLERS
-- ============================================================================

CREATE POLICY "Users can view own tenant sellers"
  ON sellers FOR SELECT
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can insert own tenant sellers"
  ON sellers FOR INSERT
  WITH CHECK (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can update own tenant sellers"
  ON sellers FOR UPDATE
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can delete own tenant sellers"
  ON sellers FOR DELETE
  USING (tenant_id = get_user_tenant_id());

-- ============================================================================
-- RLS POLICIES: CUSTOMERS
-- ============================================================================

CREATE POLICY "Users can view own tenant customers"
  ON customers FOR SELECT
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can insert own tenant customers"
  ON customers FOR INSERT
  WITH CHECK (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can update own tenant customers"
  ON customers FOR UPDATE
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can delete own tenant customers"
  ON customers FOR DELETE
  USING (tenant_id = get_user_tenant_id());

-- ============================================================================
-- RLS POLICIES: PRODUCTS
-- ============================================================================

CREATE POLICY "Users can view own tenant products"
  ON products FOR SELECT
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can insert own tenant products"
  ON products FOR INSERT
  WITH CHECK (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can update own tenant products"
  ON products FOR UPDATE
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can delete own tenant products"
  ON products FOR DELETE
  USING (tenant_id = get_user_tenant_id());

-- ============================================================================
-- RLS POLICIES: OPPORTUNITIES
-- ============================================================================

CREATE POLICY "Users can view own tenant opportunities"
  ON opportunities FOR SELECT
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can insert own tenant opportunities"
  ON opportunities FOR INSERT
  WITH CHECK (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can update own tenant opportunities"
  ON opportunities FOR UPDATE
  USING (tenant_id = get_user_tenant_id());

CREATE POLICY "Users can delete own tenant opportunities"
  ON opportunities FOR DELETE
  USING (tenant_id = get_user_tenant_id());

-- ============================================================================
-- RLS POLICIES: OPPORTUNITY_PRODUCTS
-- ============================================================================

CREATE POLICY "Users can view own tenant opportunity products"
  ON opportunity_products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = opportunity_products.opportunity_id
      AND opportunities.tenant_id = get_user_tenant_id()
    )
  );

CREATE POLICY "Users can insert own tenant opportunity products"
  ON opportunity_products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = opportunity_products.opportunity_id
      AND opportunities.tenant_id = get_user_tenant_id()
    )
  );

CREATE POLICY "Users can update own tenant opportunity products"
  ON opportunity_products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = opportunity_products.opportunity_id
      AND opportunities.tenant_id = get_user_tenant_id()
    )
  );

CREATE POLICY "Users can delete own tenant opportunity products"
  ON opportunity_products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = opportunity_products.opportunity_id
      AND opportunities.tenant_id = get_user_tenant_id()
    )
  );

-- ============================================================================
-- SPECIAL POLICIES FOR REGISTRATION
-- ============================================================================

-- Allow new users to create their tenant during registration
CREATE POLICY "Allow tenant creation during signup"
  ON tenants FOR INSERT
  WITH CHECK (true);

-- Allow new users to create their user record during registration
CREATE POLICY "Allow user creation during signup"
  ON users FOR INSERT
  WITH CHECK (id = auth.uid());
