import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { OpportunityInsert, OpportunityStage } from '@/types/database'
import { OPPORTUNITY_STAGES_ORDER } from '@/types/database'

// Tipo para produto na criacao de oportunidade
interface ProdutoOportunidade {
  produtoId: string
  quantidade?: number
  precoUnitario: number
}

// ============================================================================
// GET /api/oportunidades - Lista oportunidades do tenant
// ============================================================================
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await criarClienteServidor()

    // Verifica autenticacao
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Nao autorizado' }, { status: 401 })
    }

    // Parametros de busca
    const { searchParams } = new URL(request.url)
    const vendedorId = searchParams.get('vendedor_id')
    const etapa = searchParams.get('etapa')
    const clienteId = searchParams.get('cliente_id')

    // Busca oportunidades com dados relacionados (RLS garante que so retorna do tenant do usuario)
    let query = supabase
      .from('opportunities')
      .select(
        `
        *,
        customer:customers(id, name, email, whatsapp),
        seller:sellers(id, name, email),
        products:opportunity_products(
          id,
          quantity,
          unit_price,
          product:products(id, name, code, price)
        )
      `
      )
      .order('created_at', { ascending: false })

    // Filtro por vendedor
    if (vendedorId) {
      query = query.eq('seller_id', vendedorId)
    }

    // Filtro por etapa
    if (etapa && OPPORTUNITY_STAGES_ORDER.includes(etapa as OpportunityStage)) {
      query = query.eq('stage', etapa as OpportunityStage)
    }

    // Filtro por cliente
    if (clienteId) {
      query = query.eq('customer_id', clienteId)
    }

    const { data: oportunidades, error } = await query

    if (error) {
      console.error('Erro ao buscar oportunidades:', error)
      return NextResponse.json({ erro: 'Erro ao buscar oportunidades' }, { status: 500 })
    }

    return NextResponse.json({ oportunidades })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// POST /api/oportunidades - Cria nova oportunidade
// ============================================================================
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await criarClienteServidor()

    // Verifica autenticacao
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Nao autorizado' }, { status: 401 })
    }

    // Busca tenant_id do usuario
    const { data: usuario, error: userError } = await supabase
      .from('users')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (userError || !usuario) {
      return NextResponse.json({ erro: 'Usuario nao encontrado' }, { status: 404 })
    }

    // Parse do body
    const body = await request.json()
    const { clienteId, vendedorId, etapa, observacoes, produtos } = body as {
      clienteId?: string
      vendedorId?: string
      etapa?: OpportunityStage
      observacoes?: string
      produtos?: ProdutoOportunidade[]
    }

    // Validacao de campo obrigatorio
    if (!clienteId) {
      return NextResponse.json({ erro: 'Cliente e obrigatorio' }, { status: 400 })
    }

    // Verifica se cliente existe
    const { data: cliente, error: clienteError } = await supabase
      .from('customers')
      .select('id')
      .eq('id', clienteId)
      .single()

    if (clienteError || !cliente) {
      return NextResponse.json({ erro: 'Cliente nao encontrado' }, { status: 404 })
    }

    // Se vendedorId foi fornecido, verifica se existe
    if (vendedorId) {
      const { data: vendedor, error: vendedorError } = await supabase
        .from('sellers')
        .select('id')
        .eq('id', vendedorId)
        .single()

      if (vendedorError || !vendedor) {
        return NextResponse.json({ erro: 'Vendedor nao encontrado' }, { status: 404 })
      }
    }

    // Valida etapa se fornecida
    if (etapa && !OPPORTUNITY_STAGES_ORDER.includes(etapa)) {
      return NextResponse.json({ erro: 'Etapa invalida' }, { status: 400 })
    }

    // Valida produtos se fornecidos
    if (produtos && produtos.length > 0) {
      for (const prod of produtos) {
        if (!prod.produtoId) {
          return NextResponse.json({ erro: 'ID do produto e obrigatorio' }, { status: 400 })
        }
        if (typeof prod.precoUnitario !== 'number' || prod.precoUnitario < 0) {
          return NextResponse.json({ erro: 'Preco unitario invalido' }, { status: 400 })
        }
        if (
          prod.quantidade !== undefined &&
          (prod.quantidade < 1 || !Number.isInteger(prod.quantidade))
        ) {
          return NextResponse.json({ erro: 'Quantidade invalida' }, { status: 400 })
        }

        // Verifica se o produto existe
        const { data: produto, error: produtoError } = await supabase
          .from('products')
          .select('id')
          .eq('id', prod.produtoId)
          .single()

        if (produtoError || !produto) {
          return NextResponse.json(
            { erro: `Produto ${prod.produtoId} nao encontrado` },
            { status: 404 }
          )
        }
      }
    }

    // Calcula valor total
    let valorTotal = 0
    if (produtos && produtos.length > 0) {
      valorTotal = produtos.reduce((acc, prod) => {
        return acc + prod.precoUnitario * (prod.quantidade || 1)
      }, 0)
    }

    // Cria a oportunidade
    const novaOportunidade: OpportunityInsert = {
      tenant_id: usuario.tenant_id,
      customer_id: clienteId,
      seller_id: vendedorId || null,
      stage: etapa || 'first_contact',
      total_value: valorTotal,
      notes: observacoes?.trim() || null,
    }

    const { data: oportunidade, error } = await supabase
      .from('opportunities')
      .insert(novaOportunidade)
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar oportunidade:', error)
      return NextResponse.json({ erro: 'Erro ao criar oportunidade' }, { status: 500 })
    }

    // Insere os produtos da oportunidade
    if (produtos && produtos.length > 0) {
      const produtosOportunidade = produtos.map((prod) => ({
        opportunity_id: oportunidade.id,
        product_id: prod.produtoId,
        quantity: prod.quantidade || 1,
        unit_price: prod.precoUnitario,
      }))

      const { error: prodError } = await supabase
        .from('opportunity_products')
        .insert(produtosOportunidade)

      if (prodError) {
        console.error('Erro ao inserir produtos da oportunidade:', prodError)
        // Rollback: remove a oportunidade criada
        await supabase.from('opportunities').delete().eq('id', oportunidade.id)
        return NextResponse.json(
          { erro: 'Erro ao vincular produtos a oportunidade' },
          { status: 500 }
        )
      }
    }

    // Busca oportunidade completa com relacionamentos
    const { data: oportunidadeCompleta, error: fetchError } = await supabase
      .from('opportunities')
      .select(
        `
        *,
        customer:customers(id, name, email, whatsapp),
        seller:sellers(id, name, email),
        products:opportunity_products(
          id,
          quantity,
          unit_price,
          product:products(id, name, code, price)
        )
      `
      )
      .eq('id', oportunidade.id)
      .single()

    if (fetchError) {
      console.error('Erro ao buscar oportunidade criada:', fetchError)
      return NextResponse.json(
        { erro: 'Oportunidade criada, mas erro ao buscar dados completos' },
        { status: 500 }
      )
    }

    return NextResponse.json({ oportunidade: oportunidadeCompleta }, { status: 201 })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
