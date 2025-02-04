import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/register'
  ) {
    return NextResponse.next()
  }

  // 🚨 Si no hay sesión y no está en /login, redirigir a /login
  if (!session && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 🚨 Si hay sesión y está en /login, redirigir según el tipo de usuario
  if (session && pathname === '/login') {
    const user = session.user as { type?: string } | undefined

    if (!user || !user.type) {
      return NextResponse.next()
    }

    const dashboardRoutes: Record<string, string> = {
      PATIENT: '/pages/patientDashboard',
      EMPLOYEER: '/pages/doctorDashboard',
    }

    const redirectPath = dashboardRoutes[user.type]

    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
