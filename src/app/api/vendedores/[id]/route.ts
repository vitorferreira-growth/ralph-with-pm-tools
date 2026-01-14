import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { SellerUpdate } from '@/types/database'

// ============================================================================
// GET /api/vendedores/:id - Busca vendedor específico
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

    // Busca vendedor (RLS garante que só retorna se for do tenant do usuário)
    const { data: vendedor, error } = await supabase
      .from('sellers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ erro: 'Vendedor não encontrado' }, { status: 404 })
      }
      console.error('Erro ao buscar vendedor:', error)
      return NextResponse.json({ erro: 'Erro ao buscar vendedor' }, { status: 500 })
    }

    return NextResponse.json({ vendedor })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// PUT /api/vendedores/:id - Atualiza vendedor
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

    // Verifica se o vendedor existe e pertence ao tenant do usuário
    const { data: vendedorExistente, error: checkError } = await supabase
      .from('sellers')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !vendedorExistente) {
      return NextResponse.json({ erro: 'Vendedor não encontrado' }, { status: 404 })
    }

    // Parse do body
    const body = await request.json()
    const { nome, email } = body as { nome?: string; email?: string }

    // Monta o objeto de atualização
    const atualizacao: SellerUpdate = {}

    if (nome !== undefined) {
      if (!nome.trim()) {
        return NextResponse.json({ erro: 'Nome não pode ser vazio' }, { status: 400 })
      }
      atualizacao.name = nome.trim()
    }

    if (email !== undefined) {
      if (!email.trim()) {
        return NextResponse.json({ erro: 'Email não pode ser vazio' }, { status: 400 })
      }

      // Validação básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json({ erro: 'Email inválido' }, { status: 400 })
      }

      // Verifica se já existe outro vendedor com esse email
      const { data: existente } = await supabase
        .from('sellers')
        .select('id')
        .eq('email', email.trim())
        .neq('id', id)
        .single()

      if (existente) {
        return NextResponse.json({ erro: 'Já existe outro vendedor com esse email' }, { status: 409 })
      }

      atualizacao.email = email.trim()
    }

    // Verifica se há algo para atualizar
    if (Object.keys(atualizacao).length === 0) {
      return NextResponse.json({ erro: 'Nenhum campo para atualizar' }, { status: 400 })
    }

    // Atualiza o vendedor
    const { data: vendedor, error } = await supabase
      .from('sellers')
      .update(atualizacao)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar vendedor:', error)
      return NextResponse.json({ erro: 'Erro ao atualizar vendedor' }, { status: 500 })
    }

    return NextResponse.json({ vendedor })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// DELETE /api/vendedores/:id - Remove vendedor
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

    // Verifica se o vendedor existe e pertence ao tenant do usuário
    const { data: vendedorExistente, error: checkError } = await supabase
      .from('sellers')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !vendedorExistente) {
      return NextResponse.json({ erro: 'Vendedor não encontrado' }, { status: 404 })
    }

    // Verifica se há clientes vinculados a este vendedor
    const { count: clientesVinculados } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('seller_id', id)

    if (clientesVinculados && clientesVinculados > 0) {
      return NextResponse.json(
        {
          erro: `Este vendedor possui ${clientesVinculados} cliente(s) vinculado(s). Remova ou reatribua os clientes antes de excluir.`,
        },
        { status: 409 }
      )
    }

    // Verifica se há oportunidades vinculadas a este vendedor
    const { count: oportunidadesVinculadas } = await supabase
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('seller_id', id)

    if (oportunidadesVinculadas && oportunidadesVinculadas > 0) {
      return NextResponse.json(
        {
          erro: `Este vendedor possui ${oportunidadesVinculadas} oportunidade(s) vinculada(s). Remova ou reatribua as oportunidades antes de excluir.`,
        },
        { status: 409 }
      )
    }

    // Deleta o vendedor
    const { error } = await supabase.from('sellers').delete().eq('id', id)

    if (error) {
      console.error('Erro ao excluir vendedor:', error)
      return NextResponse.json({ erro: 'Erro ao excluir vendedor' }, { status: 500 })
    }

    return NextResponse.json({ mensagem: 'Vendedor excluído com sucesso' })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
