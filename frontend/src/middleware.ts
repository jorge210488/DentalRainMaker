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

  if (!session && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && pathname === '/login') {
    const user = session.user as { type: string }
    switch (user.type) {
      case 'PATIENT':
        return NextResponse.redirect(
          new URL('/pages/patientDashboard', request.url),
        )
        break
      case 'EMPLOYEER':
        return NextResponse.redirect(
          new URL('/pages/doctorDashboard', request.url),
        )
        break
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Protege todas las rutas excepto recursos estáticos
  ],
}
