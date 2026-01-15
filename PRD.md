# PRD - CRM InfinitePay

> Documento gerado em: Janeiro 2025
> Versão: 1.0

---

## Índice

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Features List](#2-features-list)
3. [User Stories](#3-user-stories)
4. [Design System](#4-design-system)
5. [Screen States](#5-screen-states)
6. [Technical Architecture](#6-technical-architecture)
7. [Project Rules](#7-project-rules)
8. [Implementation Plan](#8-implementation-plan)

---

## 1. Visão Geral do Produto

### Elevator Pitch

CRM gratuito e simples para autônomos e microempreendedores que substitui planilhas desorganizadas por uma ferramenta web intuitiva com dashboard, cadastros e pipeline de vendas em kanban.

### Problem Statement

Autônomos e microempreendedores gerenciam clientes, produtos e vendas em planilhas desorganizadas, perdendo tempo com controle manual e sem visibilidade clara do funil de vendas. Falta uma solução simples, gratuita e focada nas necessidades reais desse público.

### Target Audience

| Segmento   | Descrição                   | Necessidades                                                |
| ---------- | --------------------------- | ----------------------------------------------------------- |
| Primário   | Autônomos e MEIs            | Organizar clientes, acompanhar vendas, ter visão do negócio |
| Secundário | Microempresas (1-5 pessoas) | Gestão básica de equipe de vendas, controle de produtos     |
| Terciário  | Vendedores individuais      | Acompanhar próprio pipeline de vendas                       |

### USP (Unique Selling Proposition)

Integração futura com InfinitePay - conectando gestão de clientes com soluções de pagamento, criando um ecossistema completo para o empreendedor.

### Plataformas

- [x] Web (Desktop)
- [ ] Mobile iOS
- [ ] Mobile Android
- [ ] Desktop App
- [ ] API

### Monetização

Gratuito - ferramenta de valor agregado para a base de clientes InfinitePay.

---

## 2. Features List

### MVP (P0)

| Feature                    | Descrição                                  | Requisitos                                                                                                                                                                  |
| -------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dashboard**              | Visão geral do negócio com KPIs e gráficos | KPIs: Total vendas (R$ e qtd), Ticket médio, Em negociação (R$ e qtd), Desistências (R$ e qtd). Gráficos: Vendas por mês, por vendedor, por produto, valor por etapa do CRM |
| **Cadastro de Clientes**   | Base de clientes com dados de contato      | Campos: Nome, email, WhatsApp, endereço, cidade, estado, CEP, data nascimento, vendedor responsável                                                                         |
| **Cadastro de Produtos**   | Catálogo simples de produtos/serviços      | Campos: Nome, código, valor                                                                                                                                                 |
| **Cadastro de Vendedores** | Equipe de vendas                           | Campos: Nome, email                                                                                                                                                         |
| **CRM Kanban**             | Pipeline de vendas com etapas visuais      | Etapas: 1º Contato → Elaboração de Proposta → Negociação → Aguardando Pagamento → Venda Finalizada / Desistiu                                                               |

### v2 (P1)

| Feature | Descrição                    | Requisitos |
| ------- | ---------------------------- | ---------- |
| -       | Nenhuma planejada no momento | -          |

### Futuro (P2)

| Feature                | Descrição                                |
| ---------------------- | ---------------------------------------- |
| Integração InfinitePay | Conectar pagamentos e maquininhas ao CRM |

---

## 3. User Stories

### Feature: Dashboard

#### User Stories

| Persona      | Story                                                                                     | Prioridade |
| ------------ | ----------------------------------------------------------------------------------------- | ---------- |
| Empreendedor | Como empreendedor, quero ver o total de vendas do período para saber quanto faturei       | P0         |
| Empreendedor | Como empreendedor, quero ver o ticket médio para entender o valor médio por venda         | P0         |
| Empreendedor | Como empreendedor, quero ver negociações em andamento para saber meu potencial de receita | P0         |
| Empreendedor | Como empreendedor, quero ver desistências para identificar perdas no funil                | P0         |
| Empreendedor | Como empreendedor, quero ver gráficos de vendas por mês para acompanhar evolução          | P0         |
| Empreendedor | Como empreendedor, quero ver vendas por vendedor para avaliar performance da equipe       | P0         |
| Empreendedor | Como empreendedor, quero ver vendas por produto para saber o que vende mais               | P0         |
| Empreendedor | Como empreendedor, quero ver valor em cada etapa do CRM para entender o funil             | P0         |

#### Acceptance Criteria

- [ ] Exibir KPI de total de vendas em R$ e quantidade
- [ ] Exibir KPI de ticket médio calculado automaticamente
- [ ] Exibir KPI de negociações em andamento (R$ e qtd)
- [ ] Exibir KPI de desistências (R$ e qtd)
- [ ] Gráfico de vendas por mês (últimos 6-12 meses)
- [ ] Gráfico de vendas por vendedor (barras ou pizza)
- [ ] Gráfico de vendas por produto (barras ou pizza)
- [ ] Gráfico de valor em cada etapa do kanban (funil)

---

### Feature: Cadastro de Clientes

#### User Stories

| Persona      | Story                                                                                            | Prioridade |
| ------------ | ------------------------------------------------------------------------------------------------ | ---------- |
| Empreendedor | Como empreendedor, quero cadastrar clientes com dados de contato para manter uma base organizada | P0         |
| Empreendedor | Como empreendedor, quero vincular um cliente a um vendedor para definir responsabilidade         | P0         |
| Empreendedor | Como empreendedor, quero editar dados de um cliente para manter informações atualizadas          | P0         |
| Empreendedor | Como empreendedor, quero buscar clientes por nome ou email para encontrar rapidamente            | P0         |
| Empreendedor | Como empreendedor, quero excluir um cliente que não é mais relevante                             | P0         |

#### Acceptance Criteria

- [ ] Formulário com campos: nome, email, WhatsApp, endereço, cidade, estado, CEP, data nascimento, vendedor responsável
- [ ] Listagem de clientes com busca e filtros
- [ ] Edição de cliente existente
- [ ] Exclusão de cliente (com confirmação)
- [ ] Validação de campos obrigatórios (nome, email)
- [ ] Dropdown de vendedores para vincular responsável

---

### Feature: Cadastro de Produtos

#### User Stories

| Persona      | Story                                                                                     | Prioridade |
| ------------ | ----------------------------------------------------------------------------------------- | ---------- |
| Empreendedor | Como empreendedor, quero cadastrar produtos com nome, código e valor para ter um catálogo | P0         |
| Empreendedor | Como empreendedor, quero editar um produto para atualizar preços                          | P0         |
| Empreendedor | Como empreendedor, quero excluir um produto descontinuado                                 | P0         |
| Empreendedor | Como empreendedor, quero buscar produtos por nome ou código                               | P0         |

#### Acceptance Criteria

- [ ] Formulário com campos: nome, código, valor (R$)
- [ ] Listagem de produtos com busca
- [ ] Edição de produto existente
- [ ] Exclusão de produto (com confirmação)
- [ ] Validação de campos obrigatórios (nome, valor)

---

### Feature: Cadastro de Vendedores

#### User Stories

| Persona      | Story                                                                     | Prioridade |
| ------------ | ------------------------------------------------------------------------- | ---------- |
| Empreendedor | Como empreendedor, quero cadastrar vendedores para organizar minha equipe | P0         |
| Empreendedor | Como empreendedor, quero editar dados de um vendedor                      | P0         |
| Empreendedor | Como empreendedor, quero excluir um vendedor que saiu da equipe           | P0         |

#### Acceptance Criteria

- [ ] Formulário com campos: nome, email
- [ ] Listagem de vendedores
- [ ] Edição de vendedor existente
- [ ] Exclusão de vendedor (com confirmação e tratamento de vínculos)

---

### Feature: CRM Kanban

#### User Stories

| Persona      | Story                                                                                | Prioridade |
| ------------ | ------------------------------------------------------------------------------------ | ---------- |
| Empreendedor | Como empreendedor, quero criar uma oportunidade de venda vinculada a um cliente      | P0         |
| Empreendedor | Como empreendedor, quero arrastar cards entre etapas para atualizar o status         | P0         |
| Empreendedor | Como empreendedor, quero ver o valor total em cada coluna para entender o funil      | P0         |
| Empreendedor | Como empreendedor, quero adicionar produtos a uma oportunidade para calcular o valor | P0         |
| Empreendedor | Como empreendedor, quero filtrar oportunidades por vendedor                          | P0         |
| Vendedor     | Como vendedor, quero ver apenas minhas oportunidades para focar no meu trabalho      | P0         |

#### Acceptance Criteria

- [ ] Kanban com 6 colunas: 1º Contato, Elaboração de Proposta, Negociação, Aguardando Pagamento, Venda Finalizada, Desistiu
- [ ] Drag and drop de cards entre colunas
- [ ] Card com: cliente, valor, produtos, vendedor responsável
- [ ] Total de valor exibido em cada coluna
- [ ] Criação de nova oportunidade (modal ou sidebar)
- [ ] Edição de oportunidade existente
- [ ] Filtro por vendedor
- [ ] Vinculação de produtos à oportunidade (multi-select)

---

## 4. Design System

### Color Palette

#### Primary Colors

| Nome          | Hex       | Uso                              |
| ------------- | --------- | -------------------------------- |
| Primary       | `#6E08F2` | Botões principais, links, ênfase |
| Primary Hover | `#5A06C8` | Hover states em botões           |
| Primary Light | `#EDE5FE` | Backgrounds sutis, badges        |

#### Accent Colors

| Nome         | Hex       | Uso                                                 |
| ------------ | --------- | --------------------------------------------------- |
| Accent       | `#33D9B2` | CTAs secundários, indicadores de sucesso, destaques |
| Accent Light | `#E6FAF5` | Backgrounds de destaque positivo                    |

#### Neutral Colors

| Nome     | Hex       | Uso                           |
| -------- | --------- | ----------------------------- |
| Gray 900 | `#111827` | Texto principal               |
| Gray 700 | `#374151` | Texto secundário              |
| Gray 500 | `#6B7280` | Texto terciário, placeholders |
| Gray 300 | `#D1D5DB` | Bordas, divisores             |
| Gray 100 | `#F3F4F6` | Backgrounds de cards, hover   |
| Gray 50  | `#F9FAFB` | Background da página          |
| White    | `#FFFFFF` | Cards, modals, inputs         |

#### Functional Colors

| Nome    | Hex       | Uso                            |
| ------- | --------- | ------------------------------ |
| Success | `#22C55E` | Confirmações, venda finalizada |
| Error   | `#EF4444` | Erros, desistências            |
| Warning | `#FFDB58` | Avisos, atenção                |
| Info    | `#6E08F2` | Informações (usa primary)      |

### Typography

#### Font Families

- **Primary**: Inter (UI, textos)
- **Monospace**: JetBrains Mono (códigos, valores monetários)

#### Type Scale

| Style      | Size | Weight         | Line Height | Uso               |
| ---------- | ---- | -------------- | ----------- | ----------------- |
| H1         | 30px | Semibold (600) | 36px        | Títulos de página |
| H2         | 24px | Semibold (600) | 32px        | Títulos de seção  |
| H3         | 18px | Medium (500)   | 28px        | Subtítulos        |
| H4         | 16px | Medium (500)   | 24px        | Títulos de cards  |
| Body       | 14px | Regular (400)  | 20px        | Texto padrão      |
| Body Small | 13px | Regular (400)  | 18px        | Texto secundário  |
| Caption    | 12px | Medium (500)   | 16px        | Labels, badges    |

### Spacing System

| Token | Value | Uso                          |
| ----- | ----- | ---------------------------- |
| xs    | 4px   | Micro espaçamentos           |
| sm    | 8px   | Entre elementos relacionados |
| md    | 12px  | Padding interno de inputs    |
| lg    | 16px  | Padding de cards             |
| xl    | 24px  | Separação de seções          |
| 2xl   | 32px  | Entre blocos principais      |
| 3xl   | 48px  | Margens de página            |

### Border Radius

| Token | Value  | Uso                       |
| ----- | ------ | ------------------------- |
| sm    | 6px    | Inputs, badges            |
| md    | 8px    | Botões, cards pequenos    |
| lg    | 12px   | Cards, modals             |
| xl    | 16px   | Cards grandes, containers |
| full  | 9999px | Avatars, pills            |

### Component Styling (shadcn/ui)

#### Buttons

| Variant     | Background  | Text      | Border        |
| ----------- | ----------- | --------- | ------------- |
| Primary     | `#6E08F2`   | White     | none          |
| Secondary   | `#F3F4F6`   | `#374151` | none          |
| Outline     | Transparent | `#6E08F2` | 1px `#6E08F2` |
| Ghost       | Transparent | `#374151` | none          |
| Destructive | `#EF4444`   | White     | none          |

- Height: 36px (default), 32px (sm), 40px (lg)
- Padding: 16px horizontal
- Radius: 8px
- Font: 14px Medium

#### Cards

- Background: White
- Border: 1px `#E5E7EB`
- Shadow: `0 1px 2px rgba(0,0,0,0.05)`
- Radius: 12px
- Padding: 16px

#### Inputs

- Height: 40px
- Background: White
- Border: 1px `#D1D5DB` (idle), 2px `#6E08F2` (focus)
- Radius: 8px
- Padding: 12px horizontal
- Font: 14px Regular

#### Tables

- Header: `#F9FAFB` background, 12px Medium text
- Rows: White, hover `#F3F4F6`
- Border: 1px `#E5E7EB` entre linhas
- Padding: 12px células

#### Kanban Cards

- Background: White
- Border: 1px `#E5E7EB`
- Shadow: `0 1px 3px rgba(0,0,0,0.08)`
- Radius: 8px
- Padding: 12px
- Drag state: Shadow `0 8px 16px rgba(0,0,0,0.12)`

#### Kanban Columns

- Background: `#F3F4F6`
- Radius: 12px
- Padding: 8px
- Header: 14px Semibold, `#374151`

### Iconography

- **Library**: Lucide Icons (consistente com shadcn)
- **Size**: 16px (inline), 20px (buttons), 24px (navigation)
- **Stroke**: 1.5px

### Motion & Animation

| Type     | Duration | Easing      | Uso                |
| -------- | -------- | ----------- | ------------------ |
| Micro    | 100ms    | ease-out    | Hovers, toggles    |
| Standard | 150ms    | ease-in-out | Transições gerais  |
| Emphasis | 200ms    | ease-out    | Modais, dropdowns  |
| Drag     | 250ms    | spring      | Kanban drag & drop |

### Layout

- **Max width**: 1280px (container)
- **Sidebar**: 240px (fixa)
- **Gap padrão**: 24px entre seções
- **Page padding**: 32px

---

## 5. Screen States

### Feature: Dashboard

#### Main Screen States

**Loading State**

- Skeleton loaders nos KPI cards (4 retângulos pulsando)
- Skeleton nos gráficos (área cinza com shimmer)
- Manter estrutura do layout visível

**Success State (Populated)**

- 4 KPI cards no topo (Total Vendas, Ticket Médio, Em Negociação, Desistências)
- Grid 2x2 com gráficos abaixo
- Filtro de período no header (Este mês, Últimos 3 meses, Este ano)

**Empty State**

- KPIs zerados com formatação (R$ 0,00)
- Gráficos com estado vazio elegante
- Mensagem sutil: "Seus dados aparecerão aqui conforme você registrar vendas"

#### Micro-interactions

- **Hover em KPI cards**: Elevação sutil (shadow aumenta)
- **Hover em gráficos**: Tooltip com valores detalhados
- **Troca de período**: Fade out/in dos dados (150ms)

---

### Feature: Cadastro de Clientes

#### Main Screen States

**Empty State**

- Ilustração minimalista (ou ícone Lucide)
- Título: "Nenhum cliente cadastrado"
- Descrição: "Comece adicionando seu primeiro cliente"
- CTA: Botão "Adicionar cliente"

**Loading State**

- Skeleton na tabela (5-6 linhas)
- Shimmer animation

**Success State (Populated)**

- Tabela com colunas: Nome, Email, WhatsApp, Cidade, Vendedor, Ações
- Busca no topo
- Paginação no rodapé
- Botão "Adicionar cliente" no header

**Error State**

- Toast de erro para falhas em ações
- Inline error em formulários (borda vermelha + mensagem)

#### Modal/Sidebar: Criar/Editar Cliente

**Estados do formulário:**

- Idle: Campos vazios, bordas neutras
- Focus: Borda primary no campo ativo
- Error: Borda vermelha, mensagem de erro abaixo
- Submitting: Botão com spinner, campos desabilitados
- Success: Toast de confirmação, modal fecha

#### Micro-interactions

- **Hover em linha da tabela**: Background `#F3F4F6`, ícones de ação aparecem
- **Click em Editar**: Modal abre com slide-in lateral (200ms)
- **Delete**: Modal de confirmação, shake se erro
- **Sucesso**: Toast slide-in do topo direito

---

### Feature: Cadastro de Produtos

#### Main Screen States

**Empty State**

- Ícone de caixa/produto
- Título: "Nenhum produto cadastrado"
- Descrição: "Adicione produtos para vincular às suas vendas"
- CTA: Botão "Adicionar produto"

**Success State (Populated)**

- Tabela com colunas: Código, Nome, Valor, Ações
- Busca por nome ou código
- Valores formatados em R$

#### Micro-interactions

- Mesmos padrões do cadastro de clientes

---

### Feature: Cadastro de Vendedores

#### Main Screen States

**Empty State**

- Ícone de pessoa
- Título: "Nenhum vendedor cadastrado"
- Descrição: "Adicione sua equipe de vendas"
- CTA: Botão "Adicionar vendedor"

**Success State (Populated)**

- Tabela simples: Nome, Email, Ações
- Sem paginação se poucos registros

#### Micro-interactions

- Mesmos padrões dos outros cadastros

---

### Feature: CRM Kanban

#### Main Screen States

**Empty State**

- Colunas visíveis mas vazias
- Card placeholder em "1º Contato": "Arraste oportunidades aqui ou clique em + para criar"
- CTA flutuante ou no header: "Nova oportunidade"

**Loading State**

- Skeleton cards em cada coluna (2-3 por coluna)
- Headers das colunas visíveis

**Success State (Populated)**

- 6 colunas lado a lado (scroll horizontal se necessário)
- Cards com: Nome do cliente, Valor (destaque), Vendedor (avatar/iniciais)
- Total em R$ no header de cada coluna
- Contador de cards por coluna

**Drag State**

- Card sendo arrastado: Elevação aumentada, leve rotação (2deg)
- Coluna destino: Background highlight sutil
- Drop zone: Linha indicadora onde o card vai cair

#### Modal/Sidebar: Criar/Editar Oportunidade

**Campos:**

- Cliente (select com busca)
- Produtos (multi-select com valores)
- Valor total (calculado automaticamente)
- Vendedor responsável (select)
- Etapa (select - padrão: 1º Contato)
- Observações (textarea opcional)

**Estados:**

- Mesmos padrões de formulário dos cadastros

#### Micro-interactions

- **Drag start**: Card eleva, cursor grab
- **Drag over coluna**: Coluna destaca com borda primary sutil
- **Drop**: Card anima para posição final (250ms spring)
- **Mover para "Venda Finalizada"**: Confetti sutil ou checkmark animation
- **Mover para "Desistiu"**: Confirmação rápida: "Tem certeza?"
- **Click em card**: Sidebar abre com detalhes
- **Hover em card**: Sombra aumenta, ícone de editar aparece

#### Transitions

- **Abertura de modal/sidebar**: Slide-in da direita (200ms)
- **Fechamento**: Slide-out para direita (150ms)
- **Troca de coluna**: Card fades out e in na nova posição (200ms)

---

### Componentes Globais

#### Sidebar de Navegação

- Logo InfinitePay no topo
- Menu: Dashboard, Clientes, Produtos, Vendedores, CRM
- Item ativo: Background `#EDE5FE`, texto `#6E08F2`
- Hover: Background `#F3F4F6`

#### Toast Notifications

- **Success**: Borda esquerda verde, ícone check
- **Error**: Borda esquerda vermelha, ícone X
- **Info**: Borda esquerda primary
- Posição: Top-right
- Auto-dismiss: 4 segundos
- Animação: Slide-in da direita

#### Modal de Confirmação (Delete)

- Overlay: Black 50% opacity
- Card centralizado, max-width 400px
- Título: "Excluir [item]?"
- Descrição: Consequências da ação
- Botões: "Cancelar" (secondary) + "Excluir" (destructive)

---

## 6. Technical Architecture

### Tech Stack

| Layer        | Technology                | Justificativa                                                    |
| ------------ | ------------------------- | ---------------------------------------------------------------- |
| Frontend     | Next.js 14 (App Router)   | SSR, React Server Components, performance                        |
| UI Framework | shadcn/ui + Tailwind CSS  | Componentes acessíveis, customizáveis, design system consistente |
| Language     | TypeScript                | Type-safety, melhor DX                                           |
| Backend      | REST API (Route Handlers) | Simplicidade, compatível com n8n                                 |
| Database     | Supabase (PostgreSQL)     | Managed, RLS para multi-tenancy, real-time ready                 |
| Auth         | Supabase Auth             | Integrado com DB, Row Level Security                             |
| Hosting      | Vercel                    | Edge, preview deployments, integração Next.js                    |

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENTE                                │
│                      (Browser Desktop)                          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Next.js 14                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │   Pages     │  │   API       │  │  Server         │  │   │
│  │  │   (RSC)     │  │   Routes    │  │  Components     │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐
│  Supabase Auth   │  │  Supabase    │  │  n8n (futuro)    │
│  (JWT + RLS)     │  │  PostgreSQL  │  │  via REST API    │
└──────────────────┘  └──────────────┘  └──────────────────┘
```

### Multi-Tenancy Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      TENANT (Empresa)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Users     │  │  Clientes   │  │  Produtos           │ │
│  │  (members)  │  │             │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────────────────────────────┐  │
│  │ Vendedores  │  │  Oportunidades (CRM)                │  │
│  └─────────────┘  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Estratégia:** Row Level Security (RLS) no Supabase

- Todas as tabelas têm coluna `tenant_id`
- Policies garantem que usuário só vê dados do seu tenant
- Sem necessidade de filtros manuais no código

### Data Models

```sql
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
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member', -- 'owner', 'admin', 'member'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendedores
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clientes
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  seller_id UUID REFERENCES sellers(id),
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
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  name TEXT NOT NULL,
  code TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Oportunidades (CRM)
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  seller_id UUID REFERENCES sellers(id),
  stage TEXT NOT NULL DEFAULT 'first_contact',
  -- stages: first_contact, proposal, negotiation, awaiting_payment, closed_won, closed_lost
  total_value DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

-- Produtos da Oportunidade (many-to-many)
CREATE TABLE opportunity_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS) Policies

```sql
-- Exemplo para tabela customers
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tenant customers"
  ON customers FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can insert own tenant customers"
  ON customers FOR INSERT
  WITH CHECK (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update own tenant customers"
  ON customers FOR UPDATE
  USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can delete own tenant customers"
  ON customers FOR DELETE
  USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Repetir para todas as tabelas com tenant_id
```

### API Specifications

#### Auth Endpoints (Supabase built-in)

| Endpoint        | Method | Description         |
| --------------- | ------ | ------------------- |
| /auth/v1/signup | POST   | Registro de usuário |
| /auth/v1/token  | POST   | Login               |
| /auth/v1/logout | POST   | Logout              |

#### REST API Endpoints (para n8n e integrações)

| Endpoint                | Method | Description              | Auth     |
| ----------------------- | ------ | ------------------------ | -------- |
| **Customers**           |        |                          |          |
| /api/clientes           | GET    | Lista clientes do tenant | Required |
| /api/clientes           | POST   | Cria cliente             | Required |
| /api/clientes/:id       | GET    | Busca cliente            | Required |
| /api/clientes/:id       | PUT    | Atualiza cliente         | Required |
| /api/clientes/:id       | DELETE | Remove cliente           | Required |
| **Products**            |        |                          |          |
| /api/produtos           | GET    | Lista produtos           | Required |
| /api/produtos           | POST   | Cria produto             | Required |
| /api/produtos/:id       | PUT    | Atualiza produto         | Required |
| /api/produtos/:id       | DELETE | Remove produto           | Required |
| **Sellers**             |        |                          |          |
| /api/vendedores         | GET    | Lista vendedores         | Required |
| /api/vendedores         | POST   | Cria vendedor            | Required |
| /api/vendedores/:id     | PUT    | Atualiza vendedor        | Required |
| /api/vendedores/:id     | DELETE | Remove vendedor          | Required |
| **Opportunities**       |        |                          |          |
| /api/oportunidades      | GET    | Lista oportunidades      | Required |
| /api/oportunidades      | POST   | Cria oportunidade        | Required |
| /api/oportunidades/:id  | PUT    | Atualiza oportunidade    | Required |
| /api/oportunidades/:id  | PATCH  | Atualiza stage (kanban)  | Required |
| /api/oportunidades/:id  | DELETE | Remove oportunidade      | Required |
| **Dashboard**           |        |                          |          |
| /api/dashboard/kpis     | GET    | KPIs do tenant           | Required |
| /api/dashboard/graficos | GET    | Dados dos gráficos       | Required |

### Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── registro/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── clientes/
│   │   │   └── page.tsx
│   │   ├── produtos/
│   │   │   └── page.tsx
│   │   ├── vendedores/
│   │   │   └── page.tsx
│   │   ├── crm/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── clientes/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── produtos/
│   │   ├── vendedores/
│   │   ├── oportunidades/
│   │   └── dashboard/
│   ├── layout.tsx
│   └── page.tsx (redirect to /dashboard)
├── components/
│   ├── ui/              # shadcn components
│   ├── dashboard/       # KPI cards, charts
│   ├── clientes/        # Customer table, form
│   ├── produtos/        # Product table, form
│   ├── vendedores/      # Seller table, form
│   ├── crm/             # Kanban board, opportunity card
│   └── layout/          # Sidebar, header
├── lib/
│   ├── supabase/
│   │   ├── client.ts    # Browser client
│   │   ├── server.ts    # Server client
│   │   └── middleware.ts
│   ├── utils.ts
│   └── validations/     # Zod schemas
├── hooks/
│   ├── use-clientes.ts
│   ├── use-produtos.ts
│   └── ...
├── types/
│   └── database.ts      # Generated from Supabase
└── styles/
    └── globals.css
```

### Security & Privacy

- [x] Row Level Security (RLS) no Supabase
- [x] Encryption at rest (Supabase default)
- [x] Encryption in transit (HTTPS)
- [x] Input validation (Zod schemas)
- [x] JWT tokens para autenticação
- [ ] Rate limiting (implementar se necessário)

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## 7. Project Rules

### Code Style

#### Naming Conventions

| Tipo             | Convenção              | Exemplo                   |
| ---------------- | ---------------------- | ------------------------- |
| Arquivos         | kebab-case             | `lista-clientes.tsx`      |
| Componentes      | PascalCase             | `ListaClientes`           |
| Funções          | camelCase (português)  | `buscarClientes()`        |
| Variáveis        | camelCase (português)  | `clienteSelecionado`      |
| Constantes       | UPPER_SNAKE_CASE       | `ETAPAS_CRM`              |
| Types/Interfaces | PascalCase (português) | `Cliente`, `Oportunidade` |
| Hooks            | camelCase com "use"    | `useClientes()`           |
| API Routes       | kebab-case             | `/api/clientes`           |

#### Exemplos de Código em Português

```typescript
// Types
interface Cliente {
  id: string
  nome: string
  email: string
  whatsapp: string
  cidade: string
  estado: string
  cep: string
  dataNascimento: Date
  vendedorId: string
}

// Funções
async function buscarClientes(tenantId: string): Promise<Cliente[]> {
  // ...
}

function calcularTicketMedio(vendas: Venda[]): number {
  // ...
}

// Componentes
export function CardOportunidade({ oportunidade }: CardOportunidadeProps) {
  // ...
}

// Hooks
export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  // ...
}

// Constantes
const ETAPAS_CRM = {
  PRIMEIRO_CONTATO: 'primeiro_contato',
  ELABORACAO_PROPOSTA: 'elaboracao_proposta',
  NEGOCIACAO: 'negociacao',
  AGUARDANDO_PAGAMENTO: 'aguardando_pagamento',
  VENDA_FINALIZADA: 'venda_finalizada',
  DESISTIU: 'desistiu',
} as const
```

### TypeScript

- Strict mode habilitado
- Sem `any` (usar `unknown` quando necessário)
- Return types explícitos em funções públicas
- Zod para validação em runtime
- Types gerados do Supabase (`supabase gen types`)

### Linting & Formatting

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error"
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Git Workflow

```
main (produção)
  │
  ├── feature/cadastro-clientes
  ├── feature/kanban-crm
  ├── fix/correcao-calculo-ticket
  └── refactor/melhoria-dashboard
```

#### Branch Naming

| Tipo         | Prefixo     | Exemplo                     |
| ------------ | ----------- | --------------------------- |
| Nova feature | `feature/`  | `feature/cadastro-clientes` |
| Correção     | `fix/`      | `fix/erro-login`            |
| Refatoração  | `refactor/` | `refactor/otimizar-queries` |
| Documentação | `docs/`     | `docs/atualizar-readme`     |

#### Commits (Conventional Commits em português)

```
feat: adiciona cadastro de clientes
fix: corrige cálculo do ticket médio
refactor: otimiza busca de oportunidades
docs: atualiza documentação da API
style: ajusta espaçamentos no kanban
test: adiciona testes do dashboard
```

#### Workflow

1. Criar branch a partir da `main`
2. Desenvolver e commitar
3. Abrir PR para `main`
4. Code review (se em equipe)
5. Merge após aprovação
6. Deploy automático via Vercel

### Testing

#### Estrutura

```
src/
├── components/
│   └── clientes/
│       ├── tabela-clientes.tsx
│       └── tabela-clientes.test.tsx  # co-located
├── lib/
│   └── calculos.ts
│       └── calculos.test.ts
└── __tests__/
    └── e2e/
        ├── fluxo-cadastro.spec.ts
        └── fluxo-kanban.spec.ts
```

#### Ferramentas

| Tipo            | Ferramenta            | Cobertura       |
| --------------- | --------------------- | --------------- |
| Unit Tests      | Vitest                | 90%+            |
| Component Tests | React Testing Library | 90%+            |
| E2E Tests       | Playwright            | Fluxos críticos |

#### O que testar (prioridade)

- [x] Funções de cálculo (KPIs, totais)
- [x] Validações de formulário (Zod schemas)
- [x] Hooks customizados
- [x] Componentes com lógica (tabelas, kanban)
- [x] API routes
- [x] Fluxos E2E: Login → Criar cliente → Criar oportunidade → Mover no kanban

#### Exemplo de Teste

```typescript
// calculos.test.ts
import { describe, it, expect } from 'vitest'
import { calcularTicketMedio, calcularTotalVendas } from './calculos'

describe('calcularTicketMedio', () => {
  it('deve retornar zero quando não há vendas', () => {
    expect(calcularTicketMedio([])).toBe(0)
  })

  it('deve calcular corretamente com múltiplas vendas', () => {
    const vendas = [{ valor: 100 }, { valor: 200 }, { valor: 300 }]
    expect(calcularTicketMedio(vendas)).toBe(200)
  })
})
```

### Accessibility (a11y)

- HTML semântico (`<main>`, `<nav>`, `<section>`)
- ARIA labels em elementos interativos
- Navegação por teclado funcional
- Contraste de cores WCAG 2.1 AA
- Focus states visíveis

### Performance

- Componentes lazy loaded onde apropriado
- Imagens otimizadas (next/image)
- Queries otimizadas com índices no Supabase
- Skeleton loaders para perceived performance

---

## 8. Implementation Plan

### Section 1: Project Setup

- [x] **Step 1.1**: Inicializar projeto Next.js
  - **Task**: Criar projeto Next.js 14 com TypeScript, Tailwind CSS, ESLint, Prettier
  - **Files**: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`, `.eslintrc.json`, `.prettierrc`
  - **Dependencies**: Nenhuma
  - **Acceptance**: `npm run dev` inicia sem erros

- [x] **Step 1.2**: Configurar shadcn/ui
  - **Task**: Instalar e configurar shadcn/ui com tema customizado (cores InfinitePay)
  - **Files**: `components.json`, `src/components/ui/*`, `src/app/globals.css`
  - **Dependencies**: Step 1.1
  - **Acceptance**: Componentes shadcn renderizam com cores corretas

- [x] **Step 1.3**: Configurar Supabase
  - **Task**: Criar projeto Supabase, configurar client e variáveis de ambiente
  - **Files**: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `.env.local`
  - **Dependencies**: Step 1.1
  - **User Instructions**: Criar projeto no Supabase, copiar URL e keys para `.env.local`
  - **Acceptance**: Conexão com Supabase funcional

- [x] **Step 1.4**: Criar schema do banco de dados
  - **Task**: Criar tabelas (tenants, users, sellers, customers, products, opportunities, opportunity_products) com RLS
  - **Files**: `supabase/migrations/001_initial_schema.sql`
  - **Dependencies**: Step 1.3
  - **Acceptance**: Tabelas criadas, RLS policies ativas

- [x] **Step 1.5**: Gerar types do Supabase
  - **Task**: Gerar tipos TypeScript a partir do schema
  - **Files**: `src/types/database.ts`
  - **Dependencies**: Step 1.4
  - **Acceptance**: Types disponíveis e sem erros de TS

- [x] **Step 1.6**: Configurar estrutura de pastas
  - **Task**: Criar estrutura de pastas conforme arquitetura definida
  - **Files**: Estrutura em `src/app/`, `src/components/`, `src/lib/`, `src/hooks/`
  - **Dependencies**: Step 1.1
  - **Acceptance**: Estrutura organizada e navegável

---

### Section 2: Autenticação

- [x] **Step 2.1**: Configurar Supabase Auth
  - **Task**: Configurar middleware de autenticação e providers
  - **Files**: `src/middleware.ts`, `src/lib/supabase/middleware.ts`
  - **Dependencies**: Step 1.3
  - **Acceptance**: Rotas protegidas redirecionam para login

- [x] **Step 2.2**: Criar página de Login
  - **Task**: Criar página de login com email/senha
  - **Files**: `src/app/(auth)/login/page.tsx`, `src/components/auth/formulario-login.tsx`
  - **Dependencies**: Step 2.1
  - **Acceptance**: Login funcional, redireciona para dashboard

- [x] **Step 2.3**: Criar página de Registro
  - **Task**: Criar página de registro com criação de tenant
  - **Files**: `src/app/(auth)/registro/page.tsx`, `src/components/auth/formulario-registro.tsx`
  - **Dependencies**: Step 2.1
  - **Acceptance**: Registro cria usuário + tenant, redireciona para dashboard

- [x] **Step 2.4**: Criar lógica de multi-tenancy
  - **Task**: Implementar hook e context para tenant atual
  - **Files**: `src/hooks/use-tenant.ts`, `src/contexts/tenant-context.tsx`
  - **Dependencies**: Step 2.3
  - **Acceptance**: Tenant disponível em toda aplicação autenticada

---

### Section 3: Layout Base

- [x] **Step 3.1**: Criar layout do dashboard
  - **Task**: Criar layout com sidebar e área de conteúdo
  - **Files**: `src/app/(dashboard)/layout.tsx`, `src/components/layout/sidebar.tsx`, `src/components/layout/header.tsx`, `src/components/layout/mobile-sidebar.tsx`, `src/components/layout/nav-items.tsx`
  - **Dependencies**: Step 2.1
  - **Acceptance**: Layout responsivo, navegação funcional

- [x] **Step 3.2**: Criar navegação da sidebar
  - **Task**: Implementar menu com links para todas as seções
  - **Files**: `src/components/layout/nav-items.tsx`
  - **Dependencies**: Step 3.1
  - **Acceptance**: Links funcionais, estado ativo visível
  - **Note**: Implemented as part of Step 3.1 (nav-items.tsx already includes NavItems component and ITENS_NAVEGACAO constant)

---

### Section 4: Cadastro de Vendedores

- [x] **Step 4.1**: Criar API de vendedores
  - **Task**: Implementar endpoints CRUD para vendedores
  - **Files**: `src/app/api/vendedores/route.ts`, `src/app/api/vendedores/[id]/route.ts`
  - **Dependencies**: Step 1.4
  - **Acceptance**: Endpoints funcionais, RLS aplicado

- [x] **Step 4.2**: Criar hook useVendedores
  - **Task**: Implementar hook para gerenciar estado de vendedores
  - **Files**: `src/hooks/use-vendedores.ts`
  - **Dependencies**: Step 4.1
  - **Acceptance**: Hook retorna dados, loading, erro

- [x] **Step 4.3**: Criar página de vendedores
  - **Task**: Implementar listagem, criação, edição e exclusão
  - **Files**: `src/app/(dashboard)/vendedores/page.tsx`, `src/components/vendedores/tabela-vendedores.tsx`, `src/components/vendedores/formulario-vendedor.tsx`, `src/components/vendedores/dialogo-excluir-vendedor.tsx`
  - **Dependencies**: Step 4.2
  - **Acceptance**: CRUD completo funcional

- [x] **Step 4.4**: Testes de vendedores
  - **Task**: Criar testes unitários e de integração
  - **Files**: `src/hooks/use-vendedores.test.ts`, `src/components/vendedores/*.test.tsx`
  - **Dependencies**: Step 4.3
  - **Acceptance**: Cobertura 90%+

---

### Section 5: Cadastro de Produtos

- [x] **Step 5.1**: Criar API de produtos
  - **Task**: Implementar endpoints CRUD para produtos
  - **Files**: `src/app/api/produtos/route.ts`, `src/app/api/produtos/[id]/route.ts`
  - **Dependencies**: Step 1.4
  - **Acceptance**: Endpoints funcionais, RLS aplicado

- [x] **Step 5.2**: Criar hook useProdutos
  - **Task**: Implementar hook para gerenciar estado de produtos
  - **Files**: `src/hooks/use-produtos.ts`
  - **Dependencies**: Step 5.1
  - **Acceptance**: Hook retorna dados, loading, erro

- [x] **Step 5.3**: Criar página de produtos
  - **Task**: Implementar listagem, criação, edição e exclusão
  - **Files**: `src/app/(dashboard)/produtos/page.tsx`, `src/components/produtos/tabela-produtos.tsx`, `src/components/produtos/formulario-produto.tsx`, `src/components/produtos/dialogo-excluir-produto.tsx`
  - **Dependencies**: Step 5.2
  - **Acceptance**: CRUD completo funcional, valores em R$

- [x] **Step 5.4**: Testes de produtos
  - **Task**: Criar testes unitários e de integração
  - **Files**: `src/hooks/use-produtos.test.ts`, `src/components/produtos/*.test.tsx`
  - **Dependencies**: Step 5.3
  - **Acceptance**: Cobertura 90%+

---

### Section 6: Cadastro de Clientes

- [x] **Step 6.1**: Criar API de clientes
  - **Task**: Implementar endpoints CRUD para clientes
  - **Files**: `src/app/api/clientes/route.ts`, `src/app/api/clientes/[id]/route.ts`
  - **Dependencies**: Step 1.4, Step 4.1
  - **Acceptance**: Endpoints funcionais, vinculação com vendedor

- [x] **Step 6.2**: Criar hook useClientes
  - **Task**: Implementar hook para gerenciar estado de clientes
  - **Files**: `src/hooks/use-clientes.ts`
  - **Dependencies**: Step 6.1
  - **Acceptance**: Hook retorna dados, loading, erro

- [ ] **Step 6.3**: Criar validações Zod
  - **Task**: Criar schemas de validação para formulário de cliente
  - **Files**: `src/lib/validations/cliente.ts`
  - **Dependencies**: Nenhuma
  - **Acceptance**: Validação de campos obrigatórios, formato de email/CEP

- [x] **Step 6.4**: Criar página de clientes
  - **Task**: Implementar listagem com busca, criação, edição e exclusão
  - **Files**: `src/app/(dashboard)/clientes/page.tsx`, `src/components/clientes/tabela-clientes.tsx`, `src/components/clientes/formulario-cliente.tsx`, `src/components/clientes/dialogo-excluir-cliente.tsx`
  - **Dependencies**: Step 6.2, Step 6.3
  - **Acceptance**: CRUD completo funcional, busca funciona

- [x] **Step 6.5**: Testes de clientes
  - **Task**: Criar testes unitários e de integração
  - **Files**: `src/hooks/use-clientes.test.ts`, `src/components/clientes/*.test.tsx`, `src/lib/validations/cliente.test.ts`
  - **Dependencies**: Step 6.4
  - **Acceptance**: Cobertura 90%+

---

### Section 7: CRM Kanban

- [x] **Step 7.1**: Criar API de oportunidades
  - **Task**: Implementar endpoints CRUD + PATCH para stage
  - **Files**: `src/app/api/oportunidades/route.ts`, `src/app/api/oportunidades/[id]/route.ts`
  - **Dependencies**: Step 6.1, Step 5.1
  - **Acceptance**: Endpoints funcionais, cálculo de total automático

- [x] **Step 7.2**: Criar hook useOportunidades
  - **Task**: Implementar hook com suporte a drag and drop
  - **Files**: `src/hooks/use-oportunidades.ts`
  - **Dependencies**: Step 7.1
  - **Acceptance**: Hook gerencia estado e atualização de stage

- [x] **Step 7.3**: Criar componente KanbanBoard
  - **Task**: Implementar board com 6 colunas e drag and drop
  - **Files**: `src/components/crm/kanban-board.tsx`, `src/components/crm/kanban-coluna.tsx`
  - **Dependencies**: Step 7.2
  - **Acceptance**: Drag and drop funcional entre colunas

- [x] **Step 7.4**: Criar componente CardOportunidade
  - **Task**: Implementar card com informações da oportunidade
  - **Files**: `src/components/crm/card-oportunidade.tsx`
  - **Dependencies**: Step 7.3
  - **Acceptance**: Card exibe cliente, valor, vendedor

- [x] **Step 7.5**: Criar formulário de oportunidade
  - **Task**: Implementar modal/sidebar para criar/editar oportunidade
  - **Files**: `src/components/crm/formulario-oportunidade.tsx`
  - **Dependencies**: Step 7.4
  - **Acceptance**: Seleção de cliente, produtos, vendedor funcional

- [x] **Step 7.6**: Criar página do CRM
  - **Task**: Integrar todos os componentes do kanban
  - **Files**: `src/app/(dashboard)/crm/page.tsx`
  - **Dependencies**: Step 7.5
  - **Acceptance**: Kanban completo funcional

- [x] **Step 7.7**: Testes do CRM
  - **Task**: Criar testes unitários, integração e E2E do fluxo
  - **Files**: `src/components/crm/*.test.tsx`, `src/__tests__/e2e/fluxo-kanban.spec.ts`
  - **Dependencies**: Step 7.6
  - **Acceptance**: Cobertura 90%+, E2E passa

---

### Section 8: Dashboard

- [x] **Step 8.1**: Criar API do dashboard
  - **Task**: Implementar endpoints para KPIs e dados de gráficos
  - **Files**: `src/app/api/dashboard/kpis/route.ts`, `src/app/api/dashboard/graficos/route.ts`
  - **Dependencies**: Step 7.1
  - **Acceptance**: Retorna dados agregados corretamente

- [x] **Step 8.2**: Criar funções de cálculo
  - **Task**: Implementar funções para calcular KPIs
  - **Files**: `src/lib/calculos.ts`
  - **Dependencies**: Nenhuma
  - **Acceptance**: Funções puras e testadas

- [x] **Step 8.3**: Criar hook useDashboard
  - **Task**: Implementar hook para dados do dashboard
  - **Files**: `src/hooks/use-dashboard.ts`
  - **Dependencies**: Step 8.1
  - **Acceptance**: Hook retorna KPIs e dados de gráficos

- [ ] **Step 8.4**: Criar componentes de KPI
  - **Task**: Implementar cards de KPI (Total Vendas, Ticket Médio, Em Negociação, Desistências)
  - **Files**: `src/components/dashboard/card-kpi.tsx`, `src/components/dashboard/grid-kpis.tsx`
  - **Dependencies**: Step 8.3
  - **Acceptance**: Cards exibem valores formatados em R$

- [ ] **Step 8.5**: Criar componentes de gráficos
  - **Task**: Implementar gráficos (vendas por mês, por vendedor, por produto, funil)
  - **Files**: `src/components/dashboard/grafico-vendas-mes.tsx`, `src/components/dashboard/grafico-vendas-vendedor.tsx`, `src/components/dashboard/grafico-vendas-produto.tsx`, `src/components/dashboard/grafico-funil.tsx`
  - **Dependencies**: Step 8.3
  - **Acceptance**: Gráficos renderizam com dados corretos

- [ ] **Step 8.6**: Criar página do dashboard
  - **Task**: Integrar KPIs e gráficos na página principal
  - **Files**: `src/app/(dashboard)/dashboard/page.tsx`
  - **Dependencies**: Step 8.4, Step 8.5
  - **Acceptance**: Dashboard completo com filtro de período

- [ ] **Step 8.7**: Testes do dashboard
  - **Task**: Criar testes unitários para cálculos e componentes
  - **Files**: `src/lib/calculos.test.ts`, `src/components/dashboard/*.test.tsx`
  - **Dependencies**: Step 8.6
  - **Acceptance**: Cobertura 90%+

---

### Section 9: Polish & Deploy

- [ ] **Step 9.1**: Implementar estados de loading e empty
  - **Task**: Adicionar skeleton loaders e empty states em todas as páginas
  - **Files**: Componentes existentes
  - **Dependencies**: Sections 4-8
  - **Acceptance**: UX fluida em todos os estados

- [ ] **Step 9.2**: Implementar tratamento de erros
  - **Task**: Adicionar toast notifications e error boundaries
  - **Files**: `src/components/ui/toast.tsx`, `src/app/error.tsx`
  - **Dependencies**: Sections 4-8
  - **Acceptance**: Erros tratados graciosamente

- [ ] **Step 9.3**: Configurar testes E2E completos
  - **Task**: Criar testes E2E para fluxos críticos
  - **Files**: `src/__tests__/e2e/*.spec.ts`, `playwright.config.ts`
  - **Dependencies**: Sections 4-8
  - **Acceptance**: Fluxos críticos cobertos

- [ ] **Step 9.4**: Otimizar performance
  - **Task**: Implementar lazy loading, otimizar queries
  - **Files**: Componentes e API routes existentes
  - **Dependencies**: Sections 4-8
  - **Acceptance**: Lighthouse score > 90

- [ ] **Step 9.5**: Configurar CI/CD
  - **Task**: Configurar GitHub Actions para lint, test e deploy
  - **Files**: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
  - **Dependencies**: Step 9.3
  - **Acceptance**: Pipeline passa, deploy automático

- [ ] **Step 9.6**: Deploy para produção
  - **Task**: Configurar projeto na Vercel, variáveis de ambiente
  - **Files**: `vercel.json` (se necessário)
  - **Dependencies**: Step 9.5
  - **User Instructions**: Conectar repo ao Vercel, adicionar env vars
  - **Acceptance**: Aplicação acessível em produção

---

### Resumo de Dependências

```
Section 1 (Setup) ─────────────────────────────────────┐
                                                       │
Section 2 (Auth) ──────────────────────────────────────┤
                                                       │
Section 3 (Layout) ────────────────────────────────────┤
                                                       ▼
┌──────────────────┬──────────────────┬──────────────────┐
│ Section 4        │ Section 5        │ Section 6        │
│ (Vendedores)     │ (Produtos)       │ (Clientes)       │
└────────┬─────────┴────────┬─────────┴────────┬─────────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            ▼
                   Section 7 (CRM Kanban)
                            │
                            ▼
                   Section 8 (Dashboard)
                            │
                            ▼
                   Section 9 (Polish & Deploy)
```

---

## Próximos Passos

1. Revisar e aprovar este PRD
2. Criar projeto Supabase e configurar ambiente
3. Iniciar implementação seguindo o Implementation Plan
4. Iteração e feedback contínuo
