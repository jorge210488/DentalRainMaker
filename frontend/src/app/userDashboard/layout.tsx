import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/patientDashboard/sidebar'
import Header from '@/components/patientDashboard/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DentalRainMaker',
  description: 'Dental Practice Management Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex h-screen bg-gray-50'>
          <Sidebar />
          <div className='flex flex-1 flex-col overflow-hidden'>
            <Header />
            <main className='flex-1 overflow-y-auto p-4'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
