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
      id: 'DASHBOARD',
      href: '',
      hrefPat: '/pages/patientDashboard',
      hrefDoc: '/pages/doctorDashboard',
      hrefAdm: '/pages/adminDashboard',
      label: 'Dashboard',
      icon: Home,
      active: pathname === '/pages/dashboard',
    },
    {
      id: 'PATIENTS',
      href: '/pages/doctorDashboard/patients',
      label: 'Patients',
      icon: Users,
      active: pathname === '/pages/dashboard',
    },
    {
      id: 'APPOINTMENTS_PATIENT',
      href: '/pages/patientDashboard/appointments',
      label: 'Appointments',
      icon: Calendar,
      active: pathname === '/pages/patientDashboard/appointments',
    },
    {
      id: 'APPOINTMENTS_DOCTOR',
      href: '/pages/doctorDashboard/appointments',
      label: 'Appointments',
      icon: Calendar,
      active: pathname === '/pages/doctorDashboard/appointments',
    },
    {
      id: 'EMPLOYEES',
      href: '',
      label: 'Employees',
      icon: PersonStanding,
      active: pathname === '',
    },
    {
      id: 'CLINICS',
      href: '',
      label: 'Clinics',
      icon: Hospital,
      active: pathname === '',
    },

    {
      id: 'MESSAGES',
      href: '',
      label: 'Messages',
      icon: MessageSquare,
      active: pathname === '',
    },
    {
      id: 'RECORDS',
      href: '/pages/patientDashboard/records',
      label: 'Records',
      icon: FileText,
      active: pathname === '/pages/patientDashboard/records',
    },
  ]
  const routesForMapping = routes.filter((route) =>
    (session?.user?.views ?? []).includes(route.id),
  )

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
      <aside className='fixed z-[1] hidden w-60 border-r bg-blue-600 text-white lg:top-[7%] lg:block lg:h-[93%]'>
        <div className='flex h-full flex-col'>
          <nav className='flex-1 space-y-1 px-3 py-4'>
            {routesForMapping.map((route) => (
              <Link
                key={route.id}
                href={
                  route.label === 'Dashboard'
                    ? session?.user?.type === 'PATIENT'
                      ? (route.hrefPat ?? '')
                      : session?.user?.type === 'DOCTOR'
                        ? (route.hrefDoc ?? '')
                        : (route.hrefAdm ?? '')
                    : route.href
                }
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
          <Button variant='ghost' className='z-10 lg:hidden'>
            <Menu className='h-6 w-6' />
          </Button>
        </SheetTrigger>
        <SheetContent
          side='left'
          className='h-[100%] w-64 bg-blue-600 p-0 font-sans text-white'
        >
          <div className='flex h-full flex-col'>
            <nav className='flex-1 space-y-1 px-3 py-4'>
              {routesForMapping.map((route) => (
                <Link
                  key={route.href}
                  href={
                    route.label === 'Dashboard'
                      ? session?.user?.type === 'PATIENT'
                        ? (route.hrefPat ?? '')
                        : session?.user?.type === 'DOCTOR'
                          ? (route.hrefDoc ?? '')
                          : (route.hrefAdm ?? '')
                      : route.href
                  }
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
                      : () => setIsOpen(false)
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
