import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { SellerInsert } from '@/types/database'

// ============================================================================
// GET /api/vendedores - Lista vendedores do tenant
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

    // Busca vendedores (RLS garante que só retorna do tenant do usuário)
    const { data: vendedores, error } = await supabase
      .from('sellers')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar vendedores:', error)
      return NextResponse.json({ erro: 'Erro ao buscar vendedores' }, { status: 500 })
    }

    return NextResponse.json({ vendedores })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// POST /api/vendedores - Cria novo vendedor
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
    const { nome, email } = body as { nome?: string; email?: string }

    // Validação
    if (!nome || !nome.trim()) {
      return NextResponse.json({ erro: 'Nome é obrigatório' }, { status: 400 })
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ erro: 'Email é obrigatório' }, { status: 400 })
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ erro: 'Email inválido' }, { status: 400 })
    }

    // Verifica se já existe vendedor com esse email no tenant
    const { data: existente } = await supabase
      .from('sellers')
      .select('id')
      .eq('email', email.trim())
      .single()

    if (existente) {
      return NextResponse.json({ erro: 'Já existe um vendedor com esse email' }, { status: 409 })
    }

    // Cria o vendedor
    const novoVendedor: SellerInsert = {
      tenant_id: usuario.tenant_id,
      name: nome.trim(),
      email: email.trim(),
    }

    const { data: vendedor, error } = await supabase
      .from('sellers')
      .insert(novoVendedor)
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar vendedor:', error)
      return NextResponse.json({ erro: 'Erro ao criar vendedor' }, { status: 500 })
    }

    return NextResponse.json({ vendedor }, { status: 201 })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
