import { type NextRequest, NextResponse } from 'next/server'
import { atualizarSessao } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

// Rotas que requerem autenticação
const rotasProtegidas = ['/dashboard', '/clientes', '/produtos', '/vendedores', '/crm']

// Rotas de autenticação (redireciona para dashboard se já logado)
const rotasAuth = ['/login', '/registro']

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Atualiza a sessão do Supabase
  const response = await atualizarSessao(request)

  const { pathname } = request.nextUrl

  // Cria cliente para verificar autenticação
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Verifica se é uma rota protegida
  const ehRotaProtegida = rotasProtegidas.some(
    (rota) => pathname === rota || pathname.startsWith(`${rota}/`)
  )

  // Verifica se é uma rota de autenticação
  const ehRotaAuth = rotasAuth.some((rota) => pathname === rota || pathname.startsWith(`${rota}/`))

  // Se não está autenticado e tenta acessar rota protegida, redireciona para login
  if (ehRotaProtegida && !user) {
    const urlLogin = new URL('/login', request.url)
    urlLogin.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(urlLogin)
  }

  // Se está autenticado e tenta acessar rota de auth, redireciona para dashboard
  if (ehRotaAuth && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
