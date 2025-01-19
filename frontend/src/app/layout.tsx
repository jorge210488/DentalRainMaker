'use client'

import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import './globals.css'
import FirebaseNotification from '@/components/firebaseNotification'
import AppInitializer from '@/components/appInitializer'
import Header from '@/components/patientDashboard/header' // Importa tu componente Header

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Excluir el Header en páginas específicas
  const excludeHeader = ['/login', '/register']

  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <Provider store={store}>
            {/* Componente que maneja el guardado del token */}
            <FirebaseNotification />
            <AppInitializer>
              {/* Mostrar el Header solo si la ruta no está en la lista de exclusión */}
              {!excludeHeader.includes(pathname) && <Header />}
              {children}
            </AppInitializer>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
