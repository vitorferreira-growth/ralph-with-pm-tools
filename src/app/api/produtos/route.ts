import { NextResponse } from 'next/server'

// GET /api/produtos - Lista produtos
export async function GET(): Promise<NextResponse> {
  // A ser implementado em Step 5.1
  return NextResponse.json({ message: 'API de produtos - a ser implementada' }, { status: 501 })
}

// POST /api/produtos - Cria produto
export async function POST(): Promise<NextResponse> {
  // A ser implementado em Step 5.1
  return NextResponse.json({ message: 'API de produtos - a ser implementada' }, { status: 501 })
}
