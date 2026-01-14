import { NextResponse } from 'next/server'

// GET /api/dashboard/graficos - Dados dos gráficos
export async function GET(): Promise<NextResponse> {
  // A ser implementado em Step 8.1
  return NextResponse.json({ message: 'API de dashboard - a ser implementada' }, { status: 501 })
}
