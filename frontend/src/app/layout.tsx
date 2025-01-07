'use client'

import { SessionProvider } from 'next-auth/react'
// import type { AppProps } from 'next/app'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
