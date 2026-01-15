import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { OpportunityStage, OpportunityUpdate } from '@/types/database'
import { OPPORTUNITY_STAGES_ORDER } from '@/types/database'

// Tipo para produto na atualizacao de oportunidade
interface ProdutoOportunidade {
  produtoId: string
  quantidade?: number
  precoUnitario: number
}

// ============================================================================
// GET /api/oportunidades/:id - Busca oportunidade especifica
// ============================================================================
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const supabase = await criarClienteServidor()

    // Verifica autenticacao
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Nao autorizado' }, { status: 401 })
    }

    // Busca oportunidade com relacionamentos (RLS garante que so retorna do tenant do usuario)
    const { data: oportunidade, error } = await supabase
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
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ erro: 'Oportunidade nao encontrada' }, { status: 404 })
      }
      console.error('Erro ao buscar oportunidade:', error)
      return NextResponse.json({ erro: 'Erro ao buscar oportunidade' }, { status: 500 })
    }

    return NextResponse.json({ oportunidade })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// PUT /api/oportunidades/:id - Atualiza oportunidade (full update)
// ============================================================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const supabase = await criarClienteServidor()

    // Verifica autenticacao
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Nao autorizado' }, { status: 401 })
    }

    // Verifica se a oportunidade existe
    const { data: oportunidadeExistente, error: existError } = await supabase
      .from('opportunities')
      .select('id')
      .eq('id', id)
      .single()

    if (existError || !oportunidadeExistente) {
      return NextResponse.json({ erro: 'Oportunidade nao encontrada' }, { status: 404 })
    }

    // Parse do body
    const body = await request.json()
    const { clienteId, vendedorId, etapa, observacoes, produtos } = body as {
      clienteId?: string
      vendedorId?: string | null
      etapa?: OpportunityStage
      observacoes?: string | null
      produtos?: ProdutoOportunidade[]
    }

    // Objeto de atualizacao
    const atualizacao: OpportunityUpdate = {}

    // Valida e adiciona cliente se fornecido
    if (clienteId !== undefined) {
      const { data: cliente, error: clienteError } = await supabase
        .from('customers')
        .select('id')
        .eq('id', clienteId)
        .single()

      if (clienteError || !cliente) {
        return NextResponse.json({ erro: 'Cliente nao encontrado' }, { status: 404 })
      }
      atualizacao.customer_id = clienteId
    }

    // Valida e adiciona vendedor se fornecido
    if (vendedorId !== undefined) {
      if (vendedorId !== null) {
        const { data: vendedor, error: vendedorError } = await supabase
          .from('sellers')
          .select('id')
          .eq('id', vendedorId)
          .single()

        if (vendedorError || !vendedor) {
          return NextResponse.json({ erro: 'Vendedor nao encontrado' }, { status: 404 })
        }
      }
      atualizacao.seller_id = vendedorId
    }

    // Valida e adiciona etapa se fornecida
    if (etapa !== undefined) {
      if (!OPPORTUNITY_STAGES_ORDER.includes(etapa)) {
        return NextResponse.json({ erro: 'Etapa invalida' }, { status: 400 })
      }
      atualizacao.stage = etapa

      // Se a etapa for closed_won ou closed_lost, define closed_at
      if (etapa === 'closed_won' || etapa === 'closed_lost') {
        atualizacao.closed_at = new Date().toISOString()
      } else {
        atualizacao.closed_at = null
      }
    }

    // Adiciona observacoes se fornecidas
    if (observacoes !== undefined) {
      atualizacao.notes = observacoes?.trim() || null
    }

    // Se produtos foram fornecidos, valida e atualiza
    if (produtos !== undefined) {
      // Valida produtos
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

      // Remove produtos antigos
      const { error: deleteError } = await supabase
        .from('opportunity_products')
        .delete()
        .eq('opportunity_id', id)

      if (deleteError) {
        console.error('Erro ao remover produtos antigos:', deleteError)
        return NextResponse.json({ erro: 'Erro ao atualizar produtos' }, { status: 500 })
      }

      // Insere novos produtos
      if (produtos.length > 0) {
        const produtosOportunidade = produtos.map((prod) => ({
          opportunity_id: id,
          product_id: prod.produtoId,
          quantity: prod.quantidade || 1,
          unit_price: prod.precoUnitario,
        }))

        const { error: insertError } = await supabase
          .from('opportunity_products')
          .insert(produtosOportunidade)

        if (insertError) {
          console.error('Erro ao inserir novos produtos:', insertError)
          return NextResponse.json({ erro: 'Erro ao atualizar produtos' }, { status: 500 })
        }
      }

      // Calcula novo valor total
      const valorTotal = produtos.reduce((acc, prod) => {
        return acc + prod.precoUnitario * (prod.quantidade || 1)
      }, 0)
      atualizacao.total_value = valorTotal
    }

    // Atualiza a oportunidade se houver campos para atualizar
    if (Object.keys(atualizacao).length > 0) {
      const { error: updateError } = await supabase
        .from('opportunities')
        .update(atualizacao)
        .eq('id', id)

      if (updateError) {
        console.error('Erro ao atualizar oportunidade:', updateError)
        return NextResponse.json({ erro: 'Erro ao atualizar oportunidade' }, { status: 500 })
      }
    }

    // Busca oportunidade atualizada com relacionamentos
    const { data: oportunidadeAtualizada, error: fetchError } = await supabase
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
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Erro ao buscar oportunidade atualizada:', fetchError)
      return NextResponse.json({ erro: 'Erro ao buscar oportunidade atualizada' }, { status: 500 })
    }

    return NextResponse.json({ oportunidade: oportunidadeAtualizada })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// PATCH /api/oportunidades/:id - Atualiza apenas a etapa (para drag & drop do kanban)
// ============================================================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const supabase = await criarClienteServidor()

    // Verifica autenticacao
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Nao autorizado' }, { status: 401 })
    }

    // Verifica se a oportunidade existe
    const { data: oportunidadeExistente, error: existError } = await supabase
      .from('opportunities')
      .select('id, stage')
      .eq('id', id)
      .single()

    if (existError || !oportunidadeExistente) {
      return NextResponse.json({ erro: 'Oportunidade nao encontrada' }, { status: 404 })
    }

    // Parse do body
    const body = await request.json()
    const { etapa } = body as { etapa?: OpportunityStage }

    // Validacao de campo obrigatorio
    if (!etapa) {
      return NextResponse.json({ erro: 'Etapa e obrigatoria' }, { status: 400 })
    }

    // Valida etapa
    if (!OPPORTUNITY_STAGES_ORDER.includes(etapa)) {
      return NextResponse.json({ erro: 'Etapa invalida' }, { status: 400 })
    }

    // Prepara atualizacao
    const atualizacao: OpportunityUpdate = {
      stage: etapa,
    }

    // Se a etapa for closed_won ou closed_lost, define closed_at
    if (etapa === 'closed_won' || etapa === 'closed_lost') {
      atualizacao.closed_at = new Date().toISOString()
    } else {
      // Se movendo de uma etapa fechada para aberta, limpa closed_at
      if (
        oportunidadeExistente.stage === 'closed_won' ||
        oportunidadeExistente.stage === 'closed_lost'
      ) {
        atualizacao.closed_at = null
      }
    }

    // Atualiza a oportunidade
    const { error: updateError } = await supabase
      .from('opportunities')
      .update(atualizacao)
      .eq('id', id)

    if (updateError) {
      console.error('Erro ao atualizar etapa:', updateError)
      return NextResponse.json({ erro: 'Erro ao atualizar etapa' }, { status: 500 })
    }

    // Busca oportunidade atualizada com relacionamentos
    const { data: oportunidadeAtualizada, error: fetchError } = await supabase
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
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Erro ao buscar oportunidade atualizada:', fetchError)
      return NextResponse.json({ erro: 'Erro ao buscar oportunidade atualizada' }, { status: 500 })
    }

    return NextResponse.json({ oportunidade: oportunidadeAtualizada })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// DELETE /api/oportunidades/:id - Remove oportunidade
// ============================================================================
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const supabase = await criarClienteServidor()

    // Verifica autenticacao
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Nao autorizado' }, { status: 401 })
    }

    // Verifica se a oportunidade existe
    const { data: oportunidadeExistente, error: existError } = await supabase
      .from('opportunities')
      .select('id')
      .eq('id', id)
      .single()

    if (existError || !oportunidadeExistente) {
      return NextResponse.json({ erro: 'Oportunidade nao encontrada' }, { status: 404 })
    }

    // Remove produtos da oportunidade primeiro (cascade delete pode cuidar disso,
    // mas fazemos explicitamente para garantir)
    const { error: prodDeleteError } = await supabase
      .from('opportunity_products')
      .delete()
      .eq('opportunity_id', id)

    if (prodDeleteError) {
      console.error('Erro ao remover produtos da oportunidade:', prodDeleteError)
      return NextResponse.json(
        { erro: 'Erro ao remover produtos da oportunidade' },
        { status: 500 }
      )
    }

    // Remove a oportunidade
    const { error } = await supabase.from('opportunities').delete().eq('id', id)

    if (error) {
      console.error('Erro ao excluir oportunidade:', error)
      return NextResponse.json({ erro: 'Erro ao excluir oportunidade' }, { status: 500 })
    }

    return NextResponse.json({ sucesso: true })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
