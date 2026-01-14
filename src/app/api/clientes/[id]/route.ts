import { NextRequest, NextResponse } from 'next/server'
import { criarClienteServidor } from '@/lib/supabase/server'
import type { CustomerUpdate } from '@/types/database'

// ============================================================================
// GET /api/clientes/:id - Busca cliente específico
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

    // Busca cliente com dados do vendedor (RLS garante que só retorna se for do tenant do usuário)
    const { data: cliente, error } = await supabase
      .from('customers')
      .select(
        `
        *,
        seller:sellers(id, name, email)
      `
      )
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ erro: 'Cliente não encontrado' }, { status: 404 })
      }
      console.error('Erro ao buscar cliente:', error)
      return NextResponse.json({ erro: 'Erro ao buscar cliente' }, { status: 500 })
    }

    return NextResponse.json({ cliente })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// PUT /api/clientes/:id - Atualiza cliente
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

    // Verifica se o cliente existe e pertence ao tenant do usuário
    const { data: clienteExistente, error: checkError } = await supabase
      .from('customers')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !clienteExistente) {
      return NextResponse.json({ erro: 'Cliente não encontrado' }, { status: 404 })
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
      whatsapp?: string | null
      endereco?: string | null
      cidade?: string | null
      estado?: string | null
      cep?: string | null
      dataNascimento?: string | null
      vendedorId?: string | null
    }

    // Monta o objeto de atualização
    const atualizacao: CustomerUpdate = {}

    // Validação de nome
    if (nome !== undefined) {
      if (!nome.trim()) {
        return NextResponse.json({ erro: 'Nome não pode ser vazio' }, { status: 400 })
      }
      atualizacao.name = nome.trim()
    }

    // Validação de email
    if (email !== undefined) {
      if (!email.trim()) {
        return NextResponse.json({ erro: 'Email não pode ser vazio' }, { status: 400 })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json({ erro: 'Email inválido' }, { status: 400 })
      }

      // Verifica se já existe outro cliente com esse email
      const { data: existente } = await supabase
        .from('customers')
        .select('id')
        .eq('email', email.trim().toLowerCase())
        .neq('id', id)
        .single()

      if (existente) {
        return NextResponse.json({ erro: 'Já existe outro cliente com esse email' }, { status: 409 })
      }

      atualizacao.email = email.trim().toLowerCase()
    }

    // WhatsApp (pode ser null para remover)
    if (whatsapp !== undefined) {
      atualizacao.whatsapp = whatsapp?.trim() || null
    }

    // Endereço (pode ser null para remover)
    if (endereco !== undefined) {
      atualizacao.address = endereco?.trim() || null
    }

    // Cidade (pode ser null para remover)
    if (cidade !== undefined) {
      atualizacao.city = cidade?.trim() || null
    }

    // Estado (pode ser null para remover)
    if (estado !== undefined) {
      atualizacao.state = estado?.trim() || null
    }

    // CEP (pode ser null para remover)
    if (cep !== undefined) {
      if (cep && cep.trim()) {
        const cepLimpo = cep.replace(/\D/g, '')
        if (cepLimpo.length !== 8) {
          return NextResponse.json({ erro: 'CEP inválido' }, { status: 400 })
        }
        atualizacao.zip_code = cepLimpo
      } else {
        atualizacao.zip_code = null
      }
    }

    // Data de nascimento (pode ser null para remover)
    if (dataNascimento !== undefined) {
      if (dataNascimento) {
        const data = new Date(dataNascimento)
        if (isNaN(data.getTime())) {
          return NextResponse.json({ erro: 'Data de nascimento inválida' }, { status: 400 })
        }
        atualizacao.birth_date = dataNascimento
      } else {
        atualizacao.birth_date = null
      }
    }

    // Vendedor responsável (pode ser null para remover)
    if (vendedorId !== undefined) {
      if (vendedorId) {
        // Verifica se o vendedor existe
        const { data: vendedor, error: vendedorError } = await supabase
          .from('sellers')
          .select('id')
          .eq('id', vendedorId)
          .single()

        if (vendedorError || !vendedor) {
          return NextResponse.json({ erro: 'Vendedor não encontrado' }, { status: 404 })
        }
        atualizacao.seller_id = vendedorId
      } else {
        atualizacao.seller_id = null
      }
    }

    // Verifica se há algo para atualizar
    if (Object.keys(atualizacao).length === 0) {
      return NextResponse.json({ erro: 'Nenhum campo para atualizar' }, { status: 400 })
    }

    // Atualiza o cliente
    const { data: cliente, error } = await supabase
      .from('customers')
      .update(atualizacao)
      .eq('id', id)
      .select(
        `
        *,
        seller:sellers(id, name, email)
      `
      )
      .single()

    if (error) {
      console.error('Erro ao atualizar cliente:', error)
      return NextResponse.json({ erro: 'Erro ao atualizar cliente' }, { status: 500 })
    }

    return NextResponse.json({ cliente })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}

// ============================================================================
// DELETE /api/clientes/:id - Remove cliente
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

    // Verifica se o cliente existe e pertence ao tenant do usuário
    const { data: clienteExistente, error: checkError } = await supabase
      .from('customers')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !clienteExistente) {
      return NextResponse.json({ erro: 'Cliente não encontrado' }, { status: 404 })
    }

    // Verifica se há oportunidades vinculadas a este cliente
    const { count: oportunidadesVinculadas } = await supabase
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', id)

    if (oportunidadesVinculadas && oportunidadesVinculadas > 0) {
      return NextResponse.json(
        {
          erro: `Este cliente possui ${oportunidadesVinculadas} oportunidade(s) vinculada(s). Remova as oportunidades antes de excluir o cliente.`,
        },
        { status: 409 }
      )
    }

    // Deleta o cliente
    const { error } = await supabase.from('customers').delete().eq('id', id)

    if (error) {
      console.error('Erro ao excluir cliente:', error)
      return NextResponse.json({ erro: 'Erro ao excluir cliente' }, { status: 500 })
    }

    return NextResponse.json({ mensagem: 'Cliente excluído com sucesso' })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 })
  }
}
