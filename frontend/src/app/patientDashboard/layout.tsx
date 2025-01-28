import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'
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
      <body className='overflow-y-auto font-sans'>
        <div className='flex h-screen bg-gray-50'>
          <DashboardShell />
          <div className='flex h-full flex-1 flex-col overflow-y-scroll sm:min-w-[100%] lg:min-w-[100%]'>
            <main className='min-w-[80%] flex-1 p-2 sm:absolute'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
