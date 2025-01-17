'use client'

import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import './globals.css'
import FirebaseNotification from '@/components/firebaseNotification'
import AppInitializer from '@/components/appInitializer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <Provider store={store}>
            {/* Componente que maneja el guardado del token */}
            <FirebaseNotification />
            <AppInitializer>{children}</AppInitializer>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
