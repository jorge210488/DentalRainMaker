import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/patientDashboard/header'
import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell'
import { DashboardHeader } from '@/components/patientDashboard/dashboard-header'

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
          <DashboardShell />
          <div className='flex flex-1 flex-col overflow-hidden'>
            <DashboardHeader
                    // heading={`Welcome back, ${session?.user?.name || 'Guest'}`}
                    heading='Welcome back, Doctor'
                    text='Manage your dental care journey'
                  />
            <main className='flex-1 overflow-y-auto p-4'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
