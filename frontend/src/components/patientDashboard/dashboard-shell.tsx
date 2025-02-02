'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import {
  Calendar,
  MessageSquare,
  User,
  Users,
  FileText,
  Home,
  Menu,
  Hospital,
  PersonStanding,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  setLogoutDialog: React.Dispatch<React.SetStateAction<boolean>>
  handleLogout: () => void
}

export function DashboardShell({
  children,
  setLogoutDialog,
  handleLogout,
}: DashboardShellProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const { data: session } = useSession()

  console.log('DATOS ==>', session)

  const routes = [
    {
      href: '/pages/patientDashboard',
      label: 'Dashboard',
      icon: Home,
      active: pathname === '/pages/dashboard',
    },
    {
      href: '/pages/doctorDashboard/patients',
      label: 'Patients',
      icon: Users,
      active: pathname === '/pages/dashboard',
    },
    {
      href: '/pages/patientDashboard/appointments',
      label: 'Appointments',
      icon: Calendar,
      active: pathname === '/pages/patientDashboard/appointments',
    },
    {
      href: '/pages/doctorDashboard/appointments',
      label: 'Appointments',
      icon: Calendar,
      active: pathname === '/pages/doctorDashboard/appointments',
    },
    {
      href: '',
      label: 'Employees',
      icon: PersonStanding,
      active: pathname === '',
    },
    {
      href: '',
      label: 'Clinics',
      icon: Hospital,
      active: pathname === '',
    },

    {
      href: '',
      label: 'Messages',
      icon: MessageSquare,
      active: pathname === '',
    },
    {
      href: '/pages/patientDashboard/records',
      label: 'Records',
      icon: FileText,
      active: pathname === '/pages/patientDashboard/records',
    },
  ]

  const common = [
    {
      href: '/pages/profile',
      label: 'Profile',
      icon: User,
      active: pathname === '/pages/patientDashboard/profile',
    },
    {
      href: '',
      label: 'Logout',
      icon: LogOut,
      active: pathname === '',
    },
  ]

  return (
    <div className='flex min-h-screen font-sans'>
      {/* Sidebar para desktop */}
      <aside className='fixed z-[1] hidden w-64 border-r bg-blue-600 text-white lg:block lg:h-[90.2%]'>
        <div className='flex h-full flex-col'>
          <nav className='flex-1 space-y-1 px-3 py-4'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                  route.active
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                )}
              >
                <route.icon className='mr-3 h-5 w-5' />
                {route.label}
              </Link>
            ))}
          </nav>
          <nav className=''>
            {common.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                onClick={
                  button.label === 'Logout'
                    ? () => {
                        setLogoutDialog(true)
                      }
                    : undefined
                }
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                  button.active
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                )}
              >
                {}
                <button.icon className='mr-3 h-5 w-5' />
                {button.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' className='lg:hidden'>
            <Menu className='h-6 w-6' />
          </Button>
        </SheetTrigger>
        <SheetContent
          side='left'
          className='h-[92%] w-64 bg-blue-600 p-0 font-sans text-white'
        >
          <div className='flex h-full flex-col'>
            <nav className='flex-1 space-y-1 px-3 py-4'>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                    route.active
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <route.icon className='mr-3 h-5 w-5' />
                  {route.label}
                </Link>
              ))}
            </nav>
            <nav className=''>
              {common.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  onClick={
                    button.label === 'Logout'
                      ? () => {
                          setLogoutDialog(true)
                        }
                      : undefined
                  }
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                    button.active
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {}
                  <button.icon className='mr-3 h-5 w-5' />
                  {button.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto'>
        <div className='container mx-auto py-6'>{children}</div>
      </main>
    </div>
  )
}
