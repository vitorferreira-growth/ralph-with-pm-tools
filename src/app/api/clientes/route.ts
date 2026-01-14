import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { CustomerInsert } from '@/types/database'

// ============================================================================
// GET /api/clientes - Lista clientes do tenant
// ============================================================================
export async function GET(request: NextRequest): Promise<NextResponse> {
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

    // Parâmetros de busca
    const { searchParams } = new URL(request.url)
    const busca = searchParams.get('busca')
    const vendedorId = searchParams.get('vendedor_id')

    // Busca clientes com dados do vendedor (RLS garante que só retorna do tenant do usuário)
    let query = supabase
      .from('customers')
      .select(
        `
        *,
        seller:sellers(id, name, email)
      `
      )
      .order('name', { ascending: true })

    // Filtro de busca por nome ou email
    if (busca && busca.trim()) {
      const termoBusca = `%${busca.trim()}%`
      query = query.or(`name.ilike.${termoBusca},email.ilike.${termoBusca}`)
    }

    // Filtro por vendedor
    if (vendedorId) {
      query = query.eq('seller_id', vendedorId)
    }

    const { data: clientes, error } = await query

    if (error) {
      console.error('Erro ao buscar clientes:', error)
      return NextResponse.json({ erro: 'Erro ao buscar clientes' }, { status: 500 })
    }

    return NextResponse.json({ clientes })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// POST /api/clientes - Cria novo cliente
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
    const {
      nome,
      email,
      whatsapp,
      endereco,
      cidade,
      estado,
      cep,
      dataNascimento,
      vendedorId,
    } = body as {
      nome?: string
      email?: string
      whatsapp?: string
      endereco?: string
      cidade?: string
      estado?: string
      cep?: string
      dataNascimento?: string
      vendedorId?: string
    }

    // Validação de campo obrigatório
    if (!nome || !nome.trim()) {
      return NextResponse.json({ erro: 'Nome é obrigatório' }, { status: 400 })
    }

    // Validação de email (obrigatório conforme PRD)
    if (!email || !email.trim()) {
      return NextResponse.json({ erro: 'Email é obrigatório' }, { status: 400 })
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ erro: 'Email inválido' }, { status: 400 })
    }

    // Verifica se já existe cliente com esse email no tenant
    const { data: existente } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email.trim())
      .single()

    if (existente) {
      return NextResponse.json({ erro: 'Já existe um cliente com esse email' }, { status: 409 })
    }

    // Se vendedorId foi fornecido, verifica se existe
    if (vendedorId) {
      const { data: vendedor, error: vendedorError } = await supabase
        .from('sellers')
        .select('id')
        .eq('id', vendedorId)
        .single()

      if (vendedorError || !vendedor) {
        return NextResponse.json({ erro: 'Vendedor não encontrado' }, { status: 404 })
      }
    }

    // Validação de data de nascimento
    if (dataNascimento) {
      const data = new Date(dataNascimento)
      if (isNaN(data.getTime())) {
        return NextResponse.json({ erro: 'Data de nascimento inválida' }, { status: 400 })
      }
    }

    // Validação de CEP (formato brasileiro: 00000-000 ou 00000000)
    if (cep && cep.trim()) {
      const cepLimpo = cep.replace(/\D/g, '')
      if (cepLimpo.length !== 8) {
        return NextResponse.json({ erro: 'CEP inválido' }, { status: 400 })
      }
    }

    // Cria o cliente
    const novoCliente: CustomerInsert = {
      tenant_id: usuario.tenant_id,
      name: nome.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp?.trim() || null,
      address: endereco?.trim() || null,
      city: cidade?.trim() || null,
      state: estado?.trim() || null,
      zip_code: cep ? cep.replace(/\D/g, '') : null,
      birth_date: dataNascimento || null,
      seller_id: vendedorId || null,
    }

    const { data: cliente, error } = await supabase
      .from('customers')
      .insert(novoCliente)
      .select(
        `
        *,
        seller:sellers(id, name, email)
      `
      )
      .single()

    if (error) {
      console.error('Erro ao criar cliente:', error)
      return NextResponse.json({ erro: 'Erro ao criar cliente' }, { status: 500 })
    }

    return NextResponse.json({ cliente }, { status: 201 })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
