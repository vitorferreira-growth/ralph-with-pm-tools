import { NextResponse } from 'next/server'

// GET /api/clientes - Lista clientes do tenant
export async function GET(): Promise<NextResponse> {
  // A ser implementado em Step 6.1
  return NextResponse.json({ message: 'API de clientes - a ser implementada' }, { status: 501 })
}

// POST /api/clientes - Cria cliente
export async function POST(): Promise<NextResponse> {
  // A ser implementado em Step 6.1
  return NextResponse.json({ message: 'API de clientes - a ser implementada' }, { status: 501 })
}
