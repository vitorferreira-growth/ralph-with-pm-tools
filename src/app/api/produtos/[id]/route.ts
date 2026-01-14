import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { ProductUpdate } from '@/types/database'

// ============================================================================
// GET /api/produtos/:id - Busca produto específico
// ============================================================================
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const supabase = await criarClienteServidor()

    // Verifica autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    // Busca produto (RLS garante que só retorna se for do tenant do usuário)
    const { data: produto, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 })
      }
      console.error('Erro ao buscar produto:', error)
      return NextResponse.json({ erro: 'Erro ao buscar produto' }, { status: 500 })
    }

    return NextResponse.json({ produto })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// PUT /api/produtos/:id - Atualiza produto
// ============================================================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const supabase = await criarClienteServidor()

    // Verifica autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    // Verifica se o produto existe e pertence ao tenant do usuário
    const { data: produtoExistente, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !produtoExistente) {
      return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 })
    }

    // Parse do body
    const body = await request.json()
    const { nome, codigo, valor } = body as { nome?: string; codigo?: string; valor?: number }

    // Monta o objeto de atualização
    const atualizacao: ProductUpdate = {}

    if (nome !== undefined) {
      if (!nome.trim()) {
        return NextResponse.json({ erro: 'Nome não pode ser vazio' }, { status: 400 })
      }
      atualizacao.name = nome.trim()
    }

    if (codigo !== undefined) {
      // Código pode ser null/vazio para remover
      if (codigo && codigo.trim()) {
        // Verifica se já existe outro produto com esse código
        const { data: existente } = await supabase
          .from('products')
          .select('id')
          .eq('code', codigo.trim())
          .neq('id', id)
          .single()

        if (existente) {
          return NextResponse.json(
            { erro: 'Já existe outro produto com esse código' },
            { status: 409 }
          )
        }
        atualizacao.code = codigo.trim()
      } else {
        atualizacao.code = null
      }
    }

    if (valor !== undefined) {
      if (typeof valor !== 'number' || isNaN(valor)) {
        return NextResponse.json({ erro: 'Valor deve ser um número' }, { status: 400 })
      }

      if (valor < 0) {
        return NextResponse.json({ erro: 'Valor não pode ser negativo' }, { status: 400 })
      }

      atualizacao.price = valor
    }

    // Verifica se há algo para atualizar
    if (Object.keys(atualizacao).length === 0) {
      return NextResponse.json({ erro: 'Nenhum campo para atualizar' }, { status: 400 })
    }

    // Atualiza o produto
    const { data: produto, error } = await supabase
      .from('products')
      .update(atualizacao)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar produto:', error)
      return NextResponse.json({ erro: 'Erro ao atualizar produto' }, { status: 500 })
    }

    return NextResponse.json({ produto })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// DELETE /api/produtos/:id - Remove produto
// ============================================================================
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const supabase = await criarClienteServidor()

    // Verifica autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    // Verifica se o produto existe e pertence ao tenant do usuário
    const { data: produtoExistente, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !produtoExistente) {
      return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 })
    }

    // Verifica se há oportunidades vinculadas a este produto
    const { count: oportunidadesVinculadas } = await supabase
      .from('opportunity_products')
      .select('*', { count: 'exact', head: true })
      .eq('product_id', id)

    if (oportunidadesVinculadas && oportunidadesVinculadas > 0) {
      return NextResponse.json(
        {
          erro: `Este produto está vinculado a ${oportunidadesVinculadas} oportunidade(s). Remova as oportunidades primeiro ou remova o produto delas.`,
        },
        { status: 409 }
      )
    }

    // Deleta o produto
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      console.error('Erro ao excluir produto:', error)
      return NextResponse.json({ erro: 'Erro ao excluir produto' }, { status: 500 })
    }

    return NextResponse.json({ mensagem: 'Produto excluído com sucesso' })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
