'use client'

import { SessionProvider } from 'next-auth/react'
import './globals.css'
import SaveFirebaseToken from '@/components/saveFirebaseToken'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          {/* Componente que maneja el guardado del token */}
          <SaveFirebaseToken />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
