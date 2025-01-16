'use client'

import { SessionProvider } from 'next-auth/react'
import './globals.css'
import FirebaseNotification from '@/components/firebaseNotification'

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
          <FirebaseNotification />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
