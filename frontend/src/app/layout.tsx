'use client'

import { usePathname } from 'next/navigation'
import { SessionProvider, signOut } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import './globals.css'
import FirebaseNotification from '@/components/firebaseNotification'
import AppInitializer from '@/components/appInitializer'
import SessionAppInitializer from '@/components/sessionAppInitializer'
import Header from '@/components/patientDashboard/header'
import Script from 'next/script'

const brevoClientKey = process.env.NEXT_PUBLIC_BREVO_CLIENT_KEY

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Excluir el Header en páginas específicas
  const excludeHeader = ['/login', '/register']

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <html lang='en'>
      <body>
        {/* 🔹 Agregar JS Tracker de Brevo */}
        <Script
          src='https://cdn.brevo.com/js/sdk-loader.js'
          strategy='beforeInteractive'
        />
        <Script id='brevo-init' strategy='beforeInteractive'>
          {`
            window.Brevo = window.Brevo || [];
            Brevo.push([
                "init",
                {
                    client_key: "axvrkeiu9fp4fwkd5l6xvwr6", 
                }
            ]);
          `}
        </Script>
        <SessionProvider>
          <Provider store={store}>
            <FirebaseNotification />
            <AppInitializer>
              {/* 🔹 Mueve `useSession()` dentro de SessionProvider */}
              <SessionAppInitializer />

              {/* 🔹 Renderiza el Header inmediatamente */}
              {!excludeHeader.includes(pathname) && (
                <Header onLogout={handleLogout} />
              )}

              {children}
            </AppInitializer>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
