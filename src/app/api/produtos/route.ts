import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { ProductInsert } from '@/types/database'

// ============================================================================
// GET /api/produtos - Lista produtos do tenant
// ============================================================================
export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await criarClienteServidor()

    // Verifica autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    // Busca produtos (RLS garante que só retorna do tenant do usuário)
    const { data: produtos, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      return NextResponse.json({ erro: 'Erro ao buscar produtos' }, { status: 500 })
    }

    return NextResponse.json({ produtos })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// POST /api/produtos - Cria novo produto
// ============================================================================
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await criarClienteServidor()

    // Verifica autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    // Busca tenant_id do usuário
    const { data: usuario, error: userError } = await supabase
      .from('users')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (userError || !usuario) {
      return NextResponse.json({ erro: 'Usuário não encontrado' }, { status: 404 })
    }

    // Parse do body
    const body = await request.json()
    const { nome, codigo, valor } = body as { nome?: string; codigo?: string; valor?: number }

    // Validação de nome
    if (!nome || !nome.trim()) {
      return NextResponse.json({ erro: 'Nome é obrigatório' }, { status: 400 })
    }

    // Validação de valor
    if (valor === undefined || valor === null) {
      return NextResponse.json({ erro: 'Valor é obrigatório' }, { status: 400 })
    }

    if (typeof valor !== 'number' || isNaN(valor)) {
      return NextResponse.json({ erro: 'Valor deve ser um número' }, { status: 400 })
    }

    if (valor < 0) {
      return NextResponse.json({ erro: 'Valor não pode ser negativo' }, { status: 400 })
    }

    // Verifica se já existe produto com esse código no tenant (se código fornecido)
    if (codigo && codigo.trim()) {
      const { data: existente } = await supabase
        .from('products')
        .select('id')
        .eq('code', codigo.trim())
        .single()

      if (existente) {
        return NextResponse.json({ erro: 'Já existe um produto com esse código' }, { status: 409 })
      }
    }

    // Cria o produto
    const novoProduto: ProductInsert = {
      tenant_id: usuario.tenant_id,
      name: nome.trim(),
      code: codigo?.trim() || null,
      price: valor,
    }

    const { data: produto, error } = await supabase
      .from('products')
      .insert(novoProduto)
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar produto:', error)
      return NextResponse.json({ erro: 'Erro ao criar produto' }, { status: 500 })
    }

    return NextResponse.json({ produto }, { status: 201 })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
