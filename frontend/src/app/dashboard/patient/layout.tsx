import type { Metadata } from 'next'
import { Sidebar } from '@/components/userDashboard/sidebar'
import Header from '@/components/userDashboard/header'

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
      <body className='font-sans'>
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
