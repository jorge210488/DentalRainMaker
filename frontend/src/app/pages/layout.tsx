'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
import { signOut } from 'next-auth/react'

const metadata: Metadata = {
  title: 'DentalRainMaker',
  description: 'Dental Practice Management Dashboard',
}

interface LogoutModalProps extends React.HTMLAttributes<HTMLDivElement> {
  setLogoutDialog: React.Dispatch<React.SetStateAction<boolean>>
  handleLogout: () => void
  logoutDialog: boolean
}

const handleLogout = async () => {
  await signOut({ callbackUrl: '/login' })
}

const LogoutModal = ({
  setLogoutDialog,
  handleLogout,
  logoutDialog,
}: LogoutModalProps) => {
  return (
    <Dialog open={logoutDialog} onOpenChange={setLogoutDialog}>
      <DialogHeader>Logout</DialogHeader>
      <DialogContent>
        <p>Are you sure you want to logout?</p>
        <DialogFooter>
          <Button
            onClick={() => setLogoutDialog(false)}
            className='bg-blue-600 text-white'
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleLogout()}
            className='bg-red-600 text-white'
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [logoutDialog, setLogoutDialog] = useState(false)

  return (
    <html lang='en'>
      <body className='overflow-y-auto font-sans'>
        <div className='flex h-screen bg-gray-50'>
          <DashboardShell
            setLogoutDialog={setLogoutDialog}
            handleLogout={handleLogout}
          />
          <div className='flex h-full flex-1 flex-col overflow-y-scroll sm:absolute sm:min-w-[100%] lg:min-w-[100%]'>
            <main className='min-w-[80%] flex-1 p-2 lg:absolute lg:right-0 lg:top-10'>
              {children}
              {logoutDialog === true && (
                <LogoutModal
                  logoutDialog={logoutDialog}
                  setLogoutDialog={setLogoutDialog}
                  handleLogout={handleLogout}
                />
              )}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
